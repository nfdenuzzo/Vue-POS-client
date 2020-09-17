const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const { sendPushNotification } = require("../../utils/pushNotifications.js");
const { helperStandardDateTimeFormat } = require("../../utils/dateUtil.js");
const {
  loadSpecificCollection,
  authClient,
  checkJwt,
  createToken,
} = require("../../utils/dbUtils.js");

//#region recieve payment response
router.post("/", async (req, res) => {
  // we update the payment record to include the payment response for future reference maybe
  const paymentsCollection = await loadSpecificCollection("payments");

  let responseData = JSON.parse(req.body.response);

  const paymentRecordQuery = {
    transaction_id: responseData.transaction_id,
  };

  // update the payment record object
  const newUpdatedPaymentValues = {
    $set: {
      paymentResponse: responseData,
      updateAt: helperStandardDateTimeFormat(new Date()),
      updatedAuthor: {
        sub: "system",
        name: "system",
      },
    },
  };

  // update the payment record
  await paymentsCollection.updateOne(
    paymentRecordQuery,
    newUpdatedPaymentValues
  );

  // once the payment record has been updated we then update the corresponding order record
  const ordersCollection = await loadSpecificCollection("orders");

  const myOrderQuery = {
    transaction_id: responseData.transaction_id,
  };

  // statuses supplied by documentation
  // Two possible result codes of NOK for failure in the payment attempt and ACK for a successful payment.
  let newOrderStatus = responseData.result === "ACK" ? "PREPARING" : "FAILED";

  const specificOrder = await ordersCollection.findOne(myOrderQuery);

  const newUpdatedValues = {
    $set: {
      orderStatus: newOrderStatus,
      updateAt: helperStandardDateTimeFormat(new Date()),
      updatedAuthor: {
        sub: "system",
        name: "system",
      },
    },
  };

  await ordersCollection.updateOne(myOrderQuery, newUpdatedValues);

  if (specificOrder.subscribeNotifications) {
    await sendPushNotification(
      specificOrder.subscriptionObject,
      newOrderStatus
    );
  }

  res.status(200).send();
});
//#endregion

//#region update payment record
router.put(
  "/update-payment-status",
  checkJwt,
  [body("tranId").not().isEmpty().trim().withMessage("tranId is required")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const token = await createToken(req);

    authClient.getProfile(token, async (err, userInfo) => {
      if (userInfo && userInfo.hasOwnProperty("error")) {
        return res.status(401).send(userInfo.error);
      } else if (err) {
        return res.status(500).send(err);
      }

      const paymentCollection = await loadSpecificCollection("payments");

      const paymentRecordQuery = {
        email: userInfo.email,
        transaction_id: req.body.tranId,
      };

      // update the inital object
      const newUpdatedPaymentValues = {
        $set: {
          status: "USER CANCELLED TRANSACTION",
          updateAt: helperStandardDateTimeFormat(new Date()),
          updatedAuthor: {
            sub: "system",
            name: "system",
          },
        },
      };

      await paymentCollection.updateOne(
        paymentRecordQuery,
        newUpdatedPaymentValues
      );

      const ordersCollection = await loadSpecificCollection("orders");

      const orderRecordQuery = {
        email: userInfo.email,
        transaction_id: req.body.tranId,
      };

      const specificOrder = await ordersCollection.findOne(orderRecordQuery);

      const newUpdatedOrderValues = {
        $set: {
          orderStatus: "FAILED",
          updateAt: helperStandardDateTimeFormat(new Date()),
          updatedAuthor: {
            sub: "system",
            name: "system",
          },
        },
      };

      await ordersCollection.updateOne(orderRecordQuery, newUpdatedOrderValues);

      res
        .status(200)
        .send(
          specificOrder && !specificOrder.subscribeNotifications
            ? "CANCELLED"
            : null
        );
    });
  }
);
//#endregion

//#region query payment status
router.get("/query-payment-status/:id", checkJwt, async (req, res) => {
  const token = await createToken(req);

  authClient.getProfile(token, async (err, userInfo) => {
    if (userInfo && userInfo.hasOwnProperty("error")) {
      return res.status(401).send(userInfo.error);
    } else if (err) {
      return res.status(500).send(err);
    }

    const myProfileQuery = { userEmail: userInfo.email };

    const orderCollection = await loadSpecificCollection("users");
    const myProfile = await orderCollection.findOne(myProfileQuery);

    const myPaymentQuery = { email: userInfo.email, reference_number: req.params.id }

    const paymentCollection = await loadSpecificCollection("payments");
    const specificPaymentRecord = await paymentCollection.findOne(myPaymentQuery);
    let result = false;
    if (specificPaymentRecord && specificPaymentRecord.paymentResponse && specificPaymentRecord.paymentResponse.result === "ACK") {
      result = true
    }
    res.send(result);
  });
});
//#endregion

module.exports = router;
