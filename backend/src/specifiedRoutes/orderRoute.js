const router = require("express").Router();
const {
  helperStandardDateTimeFormat,
  getStartOfDay,
  getEndOfDay,
} = require("../../utils/dateUtil.js");
const { createPayment } = require("../../utils/paymentUtil.js");
const { isPlatformClosed } = require("../../utils/isPlatformClosed.js");
const { getWeekDay } = require("../../utils/helpers.js");
const {
  loadSpecificCollection,
  authClient,
  checkJwt,
  createToken,
} = require("../../utils/dbUtils.js");
const { sendPushNotification } = require("../../utils/pushNotifications.js");
const { body, validationResult } = require("express-validator");
const ObjectId = require("mongodb").ObjectID;
const { generateUUID } = require("../../utils/generateUUID.js");
const {
  hasSuperAdminRights,
  hasUpdatePermission,
} = require("../../utils/getPermissions.js");
const { result } = require("lodash");

//#region retrieve last 5 orders
router.get("/order-history", checkJwt, async (req, res) => {
  const isSuperAdmin = await hasSuperAdminRights(req);
  const dateRange = JSON.parse(req.query.dateRange);
  const page = hasSuperAdminRights ? parseInt(req.query.page) : 1;
  const PAGE_SIZE = isSuperAdmin ? 20 : 5;
  const skip = (page - 1) * PAGE_SIZE;

  const token = await createToken(req);
  authClient.getProfile(token, async (err, userInfo) => {
    if (userInfo && userInfo.hasOwnProperty("error")) {
      return res.status(401).send(userInfo.error);
    } else if (err) {
      return res.status(500).send(err);
    }

    const returnFieldsOrders = { subscriptionObject: 0 };
    const collection = await loadSpecificCollection("orders");
    const count = await collection.countDocuments();

    const startDate = getStartOfDay(new Date(dateRange.dateFrom)); // set to 12:00 am today
    const endDate = getEndOfDay(new Date(dateRange.dateTo)); // set to 23:59 pm today

    const allOrders = await collection
      .find(
        {
          $and: [
            { userEmail: userInfo.email },
            { createdAt: { $gte: startDate, $lt: endDate } },
            {
              $or: [
                { orderStatus: { $eq: "COMPLETE" } },
                { orderStatus: { $eq: "CANCELLED" } },
              ],
            },
          ],
        },
        { projection: returnFieldsOrders }
      )
      .sort({ _id: -1 })
      .skip(skip)
      .limit(PAGE_SIZE)
      .toArray();

    const results = {
      data: allOrders,
      totalPages: Math.ceil(count / PAGE_SIZE),
      currentPage: page,
    };

    res.send(results);
  });
});
//#endregion

//#region retrieve my active orders
router.get("/active-orders", checkJwt, async (req, res) => {
  const token = await createToken(req);
  const isSuperAdmin = await hasSuperAdminRights(req);
  authClient.getProfile(token, async (err, userInfo) => {
    if (userInfo && userInfo.hasOwnProperty("error")) {
      return res.status(401).send(userInfo.error);
    } else if (err) {
      return res.status(500).send(err);
    }
    // used to get only active orders from today
    const startDate = getStartOfDay(new Date()); // set to 12:00 am today
    const endDate = getEndOfDay(new Date()); // set to 23:59 pm today

    const returnFieldsOrders = { subscriptionObject: 0 };
    const collection = await loadSpecificCollection("orders");
    const activeOrders = await collection
      .find(
        { userEmail: isSuperAdmin ? { $ne: null } : userInfo.email },
        {
          $and: [
            { orderStatus: { $ne: "CANCELLED" } },
            { orderStatus: { $ne: "COMPLETE" } },
            { orderStatus: { $ne: "PENDING" } },
            { orderStatus: { $ne: "FAILED" } },
            { createdAt: { $gte: startDate, $lt: endDate } },
          ],
        },
        { projection: returnFieldsOrders }
      )
      .sort({ _id: -1 })
      .toArray();

    res.send(activeOrders);
  });
});
//#endregion

//#region update order
router.put(
  "/update-order-status",
  checkJwt,
  hasUpdatePermission,
  [
    body("_id").not().isEmpty().trim().withMessage("Order Id is required"),
    body("uniqueOrderId")
      .not()
      .isEmpty()
      .trim()
      .withMessage("Unique Order Id is Required!"),
    body("orderStatus")
      .not()
      .isEmpty()
      .trim()
      .withMessage("Order Status is Required!"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const collection = await loadSpecificCollection("orders");

    const token = await createToken(req);

    authClient.getProfile(token, async (err, userInfo) => {
      if (userInfo && userInfo.hasOwnProperty("error")) {
        return res.status(401).send(userInfo.error);
      } else if (err) {
        return res.status(500).send(err);
      }

      const myQuery = {
        _id: ObjectId(req.body._id),
        uniqueOrderId: req.body.uniqueOrderId,
      };

      const specificOrder = await collection.findOne(myQuery);

      const newUpdatedValues = {
        $set: {
          orderStatus: req.body.orderStatus,
          updatedAt: helperStandardDateTimeFormat(new Date()),
          updatedAuthor: {
            sub: userInfo.sub,
            name: userInfo.name,
          },
        },
      };

      await collection.updateOne(myQuery, newUpdatedValues);

      if (
        specificOrder.subscribeNotifications &&
        req.body.orderStatus !== "CANCELLED"
      ) {
        await sendPushNotification(
          specificOrder.subscriptionObject,
          req.body.orderStatus
        );
      }

      res.status(200).send();
    });
  }
);
//#endregion

//#region update order assign table no
router.put(
  "/update-order-assign-table-no",
  checkJwt,
  hasUpdatePermission,
  [
    body("_id").not().isEmpty().trim().withMessage("Order Id is required"),
    body("tableNo").not().isEmpty().trim().withMessage("Table No. is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const collection = await loadSpecificCollection("orders");

    const token = await createToken(req);

    authClient.getProfile(token, async (err, userInfo) => {
      if (userInfo && userInfo.hasOwnProperty("error")) {
        return res.status(401).send(userInfo.error);
      } else if (err) {
        return res.status(500).send(err);
      }

      const myQuery = {
        _id: ObjectId(req.body._id),
      };

      const newUpdatedValues = {
        $set: {
          tableNo: req.body.tableNo,
          updateAt: helperStandardDateTimeFormat(new Date()),
          updatedAuthor: {
            sub: userInfo.sub,
            name: userInfo.name,
          },
        },
      };

      await collection.updateOne(myQuery, newUpdatedValues);

      res.status(200).send();
    });
  }
);
//#endregion

//#region create order
router.post(
  "/place-order",
  checkJwt,
  [
    body("contactNumber")
      .not()
      .isEmpty()
      .trim()
      .withMessage("Contact Number is required"),
    body("paymentType")
      .not()
      .isEmpty()
      .trim()
      .withMessage("Payment type is Required!"),
    body("orderType")
      .not()
      .isEmpty()
      .trim()
      .withMessage("Order type is Required!"),
    body("subscribeNotifications")
      .isBoolean()
      .withMessage("user email is required"),
    body("orderDetails").isArray(),
    body("orderDetails.*.calzoneOffered").isBoolean(),
    body("orderDetails.*.chosenBastingStyleOption").optional(),
    body("orderDetails.*.chosenEggStyleOption").optional(),
    body("orderDetails.*.chosenFishStyleOption").optional(),
    body("orderDetails.*.chosenMeatStyleOption").optional(),
    body("orderDetails.*.chosenPastaOption").optional(),
    body("orderDetails.*.chosenSauceOption").optional(),
    body("orderDetails.*.chosenSideOption").optional(),
    body("orderDetails.*.description")
      .not()
      .isEmpty()
      .trim()
      .withMessage("Description is required"),
    body("orderDetails.*.id").not().isEmpty().trim(),
    body("orderDetails.*.makeCalzone").isBoolean(),
    body("orderDetails.*.name")
      .not()
      .isEmpty()
      .trim()
      .withMessage("Name is Required!"),
    body("orderDetails.*.price").isInt(),
    body("orderDetails.*.quantity").isInt(),
    body("orderDetails.*.extraSuaces").isArray(),
    body("orderDetails.*.removedBurgerToppings").isArray(),
    body("orderDetails.*.removedMainToppings").isArray(),
    body("orderDetails.*.removedPastaToppings").isArray(),
    body("orderDetails.*.removedPizzaToppings").isArray(),
    body("orderDetails.*.selectedBurgerToppings").isArray(),
    body("orderDetails.*.selectedMainToppingOptions").isArray(),
    body("orderDetails.*.selectedPastaToppings").isArray(),
    body("orderDetails.*.selectedPizzaToppings").isArray(),
    body("orderDetails.*.extraBurgerToppings").isArray(),
    body("orderDetails.*.extraDessertToppings").isArray(),
    body("orderDetails.*.extraMainOptions").isArray(),
    body("orderDetails.*.extraPastaToppings").isArray(),
    body("orderDetails.*.extraPizzaToppings").isArray(),
    body("orderDetails.*.extraSaladToppings").isArray(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let externalUrl = null;
    let transactionId = null;

    const ordersCollection = await loadSpecificCollection("orders");

    const token = await createToken(req);

    authClient.getProfile(token, async (err, userInfo) => {
      if (userInfo && userInfo.hasOwnProperty("error")) {
        return res.status(401).send(userInfo.error);
      } else if (err) {
        return res.status(500).send(err);
      }

      const myQuery = { userEmail: userInfo.email };

      const paymentCollection = await loadSpecificCollection("payments");

      const collection = await loadSpecificCollection("users");
      const myProfile = await collection.findOne(myQuery);

      const returnFieldsGeneralSettings = {
        orderingActive: 1,
        deliveryCharges: 1,
        openingHours: 1,
        vat: 1,
        _id: 0,
      };
      const generalSettingsCollection = await loadSpecificCollection(
        "generalSettings"
      );
      const generalSettings = await generalSettingsCollection.findOne(
        { _id: { $ne: null } },
        { projection: returnFieldsGeneralSettings }
      );

      // check if platform is active
      if (generalSettings.orderingActive) {
        const dayOfTheWeek = getWeekDay(new Date());
        const tradingHours = generalSettings.openingHours.filter(
          (week) => week.day === dayOfTheWeek
        );

        const platformClosed = isPlatformClosed(
          tradingHours,
          tradingHours[0].closed
        );

        if (platformClosed) {
          return res.status(499).send();
        }
      } else {
        return res.status(499).send();
      }

      const returnFieldsMenuItem = { menuItemImage: 0 };
      const menuItemsCollection = await loadSpecificCollection("menuItems");
      const requiredItemIds = await getOrderItemIds(req.body.orderDetails);
      const menuItems = await menuItemsCollection
        .find(
          { _id: { $in: requiredItemIds } },
          { projection: returnFieldsMenuItem }
        )
        .toArray();

      const verifiedOrderItems = await ensureItemPriceIsCorrect(
        req.body.orderDetails,
        menuItems
      );

      const sideItemsCollection = await loadSpecificCollection("sideItems");
      const requiredSideItemIds = await getOrderSideItemIds(verifiedOrderItems);
      const sideItems = await sideItemsCollection
        .find({ _id: { $in: requiredSideItemIds } })
        .toArray();

      const verifiedOrderItemsAndSideItems = await ensureItemExtraPricesAreCorrect(
        verifiedOrderItems,
        sideItems
      );

      let deliveryCharges = null;
      if (req.body.orderType === "Delivery") {
        deliveryCharges = generalSettings.deliveryCharges.find(
          (area) => area._id.toString() === req.body.deliveryArea._id.toString()
        );
      }

      const basketExtrasCost = await getBasketExtrasCost(
        verifiedOrderItemsAndSideItems
      );
      const vat = await getVatTotal(
        generalSettings.vat,
        verifiedOrderItemsAndSideItems
      );
      const itemsInOrder = await getItemsInOrder(
        verifiedOrderItemsAndSideItems
      );
      const basketItemsTotal = await getItemTotal(
        verifiedOrderItemsAndSideItems
      );

      const basketTotal = await getBasketTotal(verifiedOrderItemsAndSideItems);
      const orderStatus =
        req.body.paymentType === "Pay now" ? "PENDING" : "PROCESSING";

      const uniqueOrderId = generateUUID();

      await ordersCollection.insertOne({
        uniqueOrderId: uniqueOrderId,
        createdAt: helperStandardDateTimeFormat(new Date()),
        userId: myProfile._id,
        userEmail: myProfile.userEmail,
        orderDetails: verifiedOrderItemsAndSideItems,
        contactNumber: req.body.contactNumber,
        paymentType: req.body.paymentType,
        name: myProfile.name,
        orderType: req.body.orderType,
        deliveryArea: deliveryCharges ? deliveryCharges : null,
        address: req.body.address ? req.body.address : null,
        addressLine2: req.body.addressLine2 ? req.body.addressLine2 : null,
        subscribeNotifications: req.body.subscribeNotifications,
        subscriptionObject: req.body.subscribeNotifications
          ? req.body.subscriptionObject
          : null,
        orderStatus: orderStatus,
        vat: vat,
        vatRate: generalSettings.vat * 100,
        itemsInOrder: itemsInOrder,
        itemTotal: basketItemsTotal,
        orderExtrasCost: basketExtrasCost,
        orderTotal: basketTotal,
        transaction_id: null
      });

      if (req.body.subscribeNotifications && req.body.paymentType !== "Pay now") {
        await sendPushNotification(req.body.subscriptionObject, orderStatus);
      }

      if (req.body.paymentType === "Pay now") {
        const dto = {
          orderId: uniqueOrderId,
          email: myProfile.userEmail,
          contactNumber: req.body.contactNumber,
          name: req.body.name,
          total: basketTotal,
          shippingEnabled: req.body.orderType === "Delivery",
        };
        const result = await createPayment(dto);

        await updateOrderTransactionId(
          uniqueOrderId,
          myProfile._id,
          result.transaction_id
        );

        await paymentCollection.insertOne(result);

        externalUrl = result.long_url;
        transactionId = result.transaction_id
      }

      res.status(200).send(externalUrl ? { externalUrl:externalUrl, transactionId: transactionId } : null);
    });
  }
);
//#endregion

async function updateOrderTransactionId(uniqueOrderId, userId, transaction_id) {
  const ordersCollection = await loadSpecificCollection("orders");

  const myOrderQuery = {
    uniqueOrderId: uniqueOrderId,
    userId: userId,
  };

  const updateOrderTransactionId = {
    $set: {
      transaction_id: transaction_id,
    },
  };

  await ordersCollection.updateOne(myOrderQuery, updateOrderTransactionId);

  return;
}

async function getItemsInOrder(orderItems) {
  return orderItems.reduce((a, b) => +a + +b.quantity, 0);
}

async function getVatTotal(vat, orderItems) {
  const basketTotal = await getBasketTotal(orderItems);
  return (basketTotal * Number(vat)).toFixed(2);
}

async function getBasketTotal(orderItems) {
  const itemsTotal = await getItemTotal(orderItems);
  const extrasTotal = await getBasketExtrasCost(orderItems);
  return itemsTotal + extrasTotal;
}

async function getItemTotal(orderItems) {
  return orderItems.reduce((a, b) => +a + +b.price * b.quantity, 0);
}

async function getBasketExtrasCost(orderItems) {
  let extrasCost = 0;
  orderItems.forEach((orderItemDetails) => {
    if (orderItemDetails.makeCalzone) {
      extrasCost = extrasCost + orderItemDetails.calzonePrice;
    }
    if (orderItemDetails.extraBurgerToppings.length > 0) {
      extrasCost =
        extrasCost + calculatePrice(orderItemDetails.extraBurgerToppings);
    }
    if (orderItemDetails.extraDessertToppings.length > 0) {
      extrasCost =
        extrasCost + calculatePrice(orderItemDetails.extraDessertToppings);
    }
    if (orderItemDetails.extraMainOptions.length > 0) {
      extrasCost =
        extrasCost + calculatePrice(orderItemDetails.extraMainOptions);
    }
    if (orderItemDetails.extraPastaToppings.length > 0) {
      extrasCost =
        extrasCost + calculatePrice(orderItemDetails.extraPastaToppings);
    }
    if (orderItemDetails.extraPizzaToppings.length > 0) {
      extrasCost =
        extrasCost + calculatePrice(orderItemDetails.extraPizzaToppings);
    }
    if (orderItemDetails.extraSaladToppings.length > 0) {
      extrasCost =
        extrasCost + calculatePrice(orderItemDetails.extraSaladToppings);
    }
    if (orderItemDetails.extraSuaces.length > 0) {
      extrasCost = extrasCost + calculatePrice(orderItemDetails.extraSuaces);
    }
  });
  return extrasCost;
}

async function ensureItemPriceIsCorrect(orderItems, backendItems) {
  orderItems.forEach((orderItemDetails) => {
    const matchingItem = backendItems.find(
      (item) => item._id.toString() === orderItemDetails.id.toString()
    );
    orderItemDetails.price = matchingItem ? matchingItem.price : 0;
    orderItemDetails.calzonePrice = matchingItem
      ? matchingItem.calzonePrice
      : 0;
    orderItemDetails.id = matchingItem
      ? matchingItem._id
      : ObjectId(orderItemDetails.id);
  });
  return orderItems;
}

async function getOrderItemIds(orderItems) {
  const orderItemIds = [];
  orderItems.forEach((orderItemDetails) => {
    orderItemIds.push(ObjectId(orderItemDetails.id));
  });
  return orderItemIds;
}

async function getOrderSideItemIds(orderItems) {
  const orderSideItemIds = [];
  orderItems.forEach((orderItemDetails) => {
    if (orderItemDetails.extraBurgerToppings.length > 0) {
      orderItemDetails.extraBurgerToppings.forEach((extra) => {
        orderSideItemIds.push(ObjectId(extra.value));
      });
    }
    if (orderItemDetails.extraDessertToppings.length > 0) {
      orderItemDetails.extraDessertToppings.forEach((extra) => {
        orderSideItemIds.push(ObjectId(extra.value));
      });
    }
    if (orderItemDetails.extraMainOptions.length > 0) {
      orderItemDetails.extraMainOptions.forEach((extra) => {
        orderSideItemIds.push(ObjectId(extra.value));
      });
    }
    if (orderItemDetails.extraPastaToppings.length > 0) {
      orderItemDetails.extraPastaToppings.forEach((extra) => {
        orderSideItemIds.push(ObjectId(extra.value));
      });
    }
    if (orderItemDetails.extraPizzaToppings.length > 0) {
      orderItemDetails.extraPizzaToppings.forEach((extra) => {
        orderSideItemIds.push(ObjectId(extra.value));
      });
    }
    if (orderItemDetails.extraSaladToppings.length > 0) {
      orderItemDetails.extraSaladToppings.forEach((extra) => {
        orderSideItemIds.push(ObjectId(extra.value));
      });
    }
    if (orderItemDetails.extraSuaces.length > 0) {
      orderItemDetails.extraSuaces.forEach((extra) => {
        orderSideItemIds.push(ObjectId(extra.value));
      });
    }
  });
  return orderSideItemIds;
}

async function ensureItemExtraPricesAreCorrect(orderItems, backendSideItems) {
  orderItems.forEach(async (orderItemDetails) => {
    if (orderItemDetails.extraBurgerToppings.length > 0) {
      orderItemDetails.extraBurgerToppings = await assignMatchingSideItemPrice(
        orderItemDetails.extraBurgerToppings,
        backendSideItems
      );
    }
    if (orderItemDetails.extraDessertToppings.length > 0) {
      orderItemDetails.extraDessertToppings = await assignMatchingSideItemPrice(
        orderItemDetails.extraDessertToppings,
        backendSideItems
      );
    }
    if (orderItemDetails.extraMainOptions.length > 0) {
      orderItemDetails.extraMainOptions = await assignMatchingSideItemPrice(
        orderItemDetails.extraMainOptions,
        backendSideItems
      );
    }
    if (orderItemDetails.extraPastaToppings.length > 0) {
      orderItemDetails.extraPastaToppings = await assignMatchingSideItemPrice(
        orderItemDetails.extraPastaToppings,
        backendSideItems
      );
    }
    if (orderItemDetails.extraPizzaToppings.length > 0) {
      orderItemDetails.extraPizzaToppings = await assignMatchingSideItemPrice(
        orderItemDetails.extraPizzaToppings,
        backendSideItems
      );
    }
    if (orderItemDetails.extraSaladToppings.length > 0) {
      orderItemDetails.extraSaladToppings = await assignMatchingSideItemPrice(
        orderItemDetails.extraSaladToppings,
        backendSideItems
      );
    }
    if (orderItemDetails.extraSuaces.length > 0) {
      orderItemDetails.extraSuaces = await assignMatchingSideItemPrice(
        orderItemDetails.extraSuaces,
        backendSideItems
      );
    }
  });
  return orderItems;
}

function calculatePrice(toppings) {
  return toppings.reduce((a, b) => +a + +b.price, 0);
}

function assignMatchingSideItemPrice(extras, backendSideItems) {
  extras.forEach((extra) => {
    const matchingItem = backendSideItems.find(
      (item) => item._id.toString() === extra.value.toString()
    );
    extra.price = matchingItem ? matchingItem.price : 0;
  });
  return extras;
}

module.exports = router;
