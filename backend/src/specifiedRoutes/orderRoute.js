const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const auth0 = require("auth0");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
require("dotenv").config();

const { AUTH0_CLIENT_ID, AUTH0_DOMAIN, MONGODB_URL, DB_NAME } = process.env;

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer.
  audience: "https://bfgrill-pwa",
  issuer: `https://${AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
});

const authClient = new auth0.AuthenticationClient({
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_CLIENT_ID,
});

async function createToken(req) {
  return req.headers.authorization
    .replace("bearer ", "")
    .replace("Bearer ", "");
}

//#region LoadSpecificCollection
async function loadSpecificCollection(collectionName) {
  const client = await MongoClient.connect(MONGODB_URL);
  return client.db(DB_NAME).collection(collectionName);
}
//#endregion

//#region
// retrieve last 5 orders
router.get("/order-history", checkJwt, async (req, res) => {
  const token = await createToken(req);

    authClient.getProfile(token, async (err, userInfo) => {
      if (userInfo && userInfo.hasOwnProperty("error")) {
        return res.status(401).send(userInfo.error);
      } else if (err) {
        return res.status(500).send(err);
      }

      const collection = await loadSpecificCollection("orders");
      const allOrders = await collection.find({ _id: ObjectId(userInfo.userId), status: "Complete" }).sort({_id:-1}).limit(5).toArray();

      res.send(allOrders);

    })
});
//#endregion

//#region
// retrieve last 5 orders
router.get("/active-orders", checkJwt, async (req, res) => {
  const token = await createToken(req);

    authClient.getProfile(token, async (err, userInfo) => {
      if (userInfo && userInfo.hasOwnProperty("error")) {
        return res.status(401).send(userInfo.error);
      } else if (err) {
        return res.status(500).send(err);
      }

      const collection = await loadSpecificCollection("orders");
      const activeOrders = await collection.find({ _id: ObjectId(userInfo.userId) }, { $and: [ { status: { $ne: "Complete" } }, { status: { $ne: "Canceled" } } ]}).sort({_id:-1}).toArray();

      res.send(activeOrders);

    })
});
//#endregion

//#region
// create order
router.post(
  "/place-order",
  checkJwt,
  [
    body("name")
      .not()
      .isEmpty()
      .trim()
      .withMessage("name is required"),
    body("userEmail")
      .not()
      .isEmpty()
      .trim()
      .withMessage("user email is required"),
    body("contactNumber")
      .not()
      .isEmpty()
      .trim()
      .withMessage("Contact Number is required"),
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
    const ordersCollection = await loadSpecificCollection("orders");

    const token = await createToken(req);

    authClient.getProfile(token, async (err, userInfo) => {
      if (userInfo && userInfo.hasOwnProperty("error")) {
        return res.status(401).send(userInfo.error);
      } else if (err) {
        return res.status(500).send(err);
      }

      const myQuery = { userEmail: userInfo.email };

      const collection = await loadSpecificCollection("users");
      const myProfile = await collection.findOne(myQuery);

      try {
        await ordersCollection.insertOne({
          createdAt: new Date(),
          userId: myProfile._id,
          userEmail: myProfile.userEmail,
          orderDetails: req.body.orderDetails,
          contactNumber: req.body.contactNumber,
          name: req.body.name,
          orderType: req.body.orderType,
          deliveryArea: req.body.deliveryArea ? req.body.deliveryArea : null,
          address: req.body.address ? req.body.address : null,
          addressLine2: req.body.addressLine2 ? req.body.addressLine2 : null,
          subscribeNotifications: req.body.subscribeNotifications,
          orderStatus: "PROCESSING",
        });
      } catch (ex) {
        console.log("ex", ex)
      }

      res.status(200).send();
    });
  }
);
//#endregion

module.exports = router;
