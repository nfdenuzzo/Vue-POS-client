const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const MongoClient = require("mongodb").MongoClient;
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

//#region LoadSpecificCollection
async function loadSpecificCollection(collectionName) {
  const client = await MongoClient.connect(MONGODB_URL);
  return client.db(DB_NAME).collection(collectionName);
}
//#endregion

//#region
// create order
router.post(
  "/",
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
    body("orderDetails.*.chosenBastingStyleOption").optional().isBoolean(),
    body("orderDetails.*.chosenEggStyleOption").optional().isBoolean(),
    body("orderDetails.*.chosenFishStyleOption").optional().isBoolean(),
    body("orderDetails.*.chosenMeatStyleOption").optional().isBoolean(),
    body("orderDetails.*.chosenPastaOption").optional().isBoolean(),
    body("orderDetails.*.chosenSauceOption").optional().isBoolean(),
    body("orderDetails.*.chosenSideOption").optional().isBoolean(),
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

      const ordersCollection = await loadSpecificCollection("orders");

      req.body.forEach(async (item) => {
        await ordersCollection.insertOne({
          createdAt: new Date(),
          userId: myProfile._id,
          userEmail: myProfile.userEmail,
          calzoneOffered: item.calzoneOffered,
          chosenBastingStyleOption: item.chosenBastingStyleOption,
          chosenEggStyleOption: item.chosenEggStyleOption,
          chosenFishStyleOption: item.chosenFishStyleOption,
          chosenMeatStyleOption: item.chosenMeatStyleOption,
          chosenPastaOption: item.chosenPastaOption,
          chosenSauceOption: item.chosenSauceOption,
          chosenSideOption: item.chosenSideOption,
          description: item.description,
          extraBurgerToppings: item.extraBurgerToppings,
          extraDessertToppings: item.extraDessertToppings,
          extraMainOptions: item.extraMainOptions,
          extraPastaToppings: item.extraPastaToppings,
          extraPizzaToppings: item.extraPizzaToppings,
          extraSaladToppings: item.extraSaladToppings,
          extraSuaces: item.extraSuaces,
          orderId: item.id,
          makeCalzone: item.makeCalzone,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          removedBurgerToppings: item.removedBurgerToppings,
          removedMainToppings: item.removedMainToppings,
          removedPastaToppings: item.removedPastaToppings,
          removedPizzaToppings: item.removedPizzaToppings,
          selectedBurgerToppings: item.selectedBurgerToppings,
          selectedMainToppingOptions: item.selectedMainToppingOptions,
          selectedPastaToppings: item.selectedPastaToppings,
          selectedPizzaToppings: item.selectedPizzaToppings,
          orderStatus: "PROCESSING",
        });
      });

      res.status(200).send();
    });
  }
);
//#endregion

//#endregion

module.exports = router;
