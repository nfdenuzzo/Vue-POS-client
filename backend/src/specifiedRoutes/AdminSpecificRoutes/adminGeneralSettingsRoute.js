const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const auth0 = require("auth0");
const jwt = require("express-jwt");
const {
  hasReadPermission,
  hasUpdatePermission,
  hasDeletePermission
} = require("../../../utils/getPermissions.js");
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
// retrieve admin general Settings
router.get("/", hasReadPermission, async (req, res) => {
  const collection = await loadSpecificCollection("generalSettings");
  const generalSettings = await collection.findOne({ _id: { $ne: null } });

  res.send(generalSettings);
});
//#endregion

//#region
// update platform Status
router.put(
  "/update-platform-status",
  checkJwt,
  hasUpdatePermission,
  [body("platformStatus").isBoolean().withMessage("Status is required")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const collection = await loadSpecificCollection("generalSettings");

    const token = await createToken(req);

    authClient.getProfile(token, async (err, userInfo) => {
      if (userInfo && userInfo.hasOwnProperty("error")) {
        return res.status(401).send(userInfo.error);
      } else if (err) {
        return res.status(500).send(err);
      }
      const generalSettings = await collection.findOne({ _id: { $ne: null } });

      const updateGeneralSetting = {
        $set: {
          orderingActive: req.body.platformStatus,
          updatedAt: new Date(),
          updatedAuthor: {
            sub: userInfo.sub,
            name: userInfo.name,
          },
        },
      };
      // update general settings
      await collection.updateOne(generalSettings, updateGeneralSetting);

      res.status(200).send();
    });
  }
);
//#endregion

//#region
// update platform Status
router.put(
  "/update-vatrate",
  checkJwt,
  hasUpdatePermission,
  [body("vatRate").isDecimal().withMessage("VAT rate is required")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const collection = await loadSpecificCollection("generalSettings");

    const token = await createToken(req);

    authClient.getProfile(token, async (err, userInfo) => {
      if (userInfo && userInfo.hasOwnProperty("error")) {
        return res.status(401).send(userInfo.error);
      } else if (err) {
        return res.status(500).send(err);
      }
      const generalSettings = await collection.findOne({ _id: { $ne: null } });

      const formatedVAT = req.body.vatRate / 100;

      const updateGeneralSetting = {
        $set: {
          vat: formatedVAT,
          updatedAt: new Date(),
          updatedAuthor: {
            sub: userInfo.sub,
            name: userInfo.name,
          },
        },
      };
      // update general settings
      await collection.updateOne(generalSettings, updateGeneralSetting);

      res.status(200).send();
    });
  }
);

//#region
// update platform trading hours
router.put(
  "/update-trading-hours",
  checkJwt,
  hasUpdatePermission,
  [
    body().isArray(),
    body("*.day").not().isEmpty().trim().withMessage("Day is Required!"),
    body("*.time").exists(),
    body("*.time.start.hours").isInt(),
    body("*.time.start.min").isInt(),
    body("*.time.end.hours").isInt(),
    body("*.time.end.min").isInt(),
    body("*.closed").isBoolean().withMessage("Closed status is missing"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const collection = await loadSpecificCollection("generalSettings");

    const token = await createToken(req);

    authClient.getProfile(token, async (err, userInfo) => {
      if (userInfo && userInfo.hasOwnProperty("error")) {
        return res.status(401).send(userInfo.error);
      } else if (err) {
        return res.status(500).send(err);
      }
      const generalSettings = await collection.findOne({ _id: { $ne: null } });
      const openingHours = req.body;

      const updateGeneralSetting = {
        $set: {
          openingHours: req.body,
          updatedAt: new Date(),
          updatedAuthor: {
            sub: userInfo.sub,
            name: userInfo.name,
          },
        },
      };
      // update general settings
      await collection.updateOne(generalSettings, updateGeneralSetting);

      res.status(200).send();
    });
  }
);
//#endregion

//#region
// update platform Status
router.put(
  "/update-delivery-area",
  checkJwt,
  hasUpdatePermission,
  [body("area").not().isEmpty().trim().withMessage("Area is Required!")],
  [body("price").isDecimal().withMessage("Price is required")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const collection = await loadSpecificCollection("generalSettings");

    const token = await createToken(req);

    authClient.getProfile(token, async (err, userInfo) => {
      if (userInfo && userInfo.hasOwnProperty("error")) {
        return res.status(401).send(userInfo.error);
      } else if (err) {
        return res.status(500).send(err);
      }
      const generalSettings = await collection.findOne({ _id: { $ne: null } });

      let deliveryCharges = generalSettings.deliveryCharges
        ? generalSettings.deliveryCharges
        : [];

      if (deliveryCharges.length > 0) {
        let matchingItemIndex = deliveryCharges.find((o) =>
          o._id.toString() === req.body._id ? req.body._id.toString() : ""
        );
        if (!matchingItemIndex) {
          await collection.updateOne(generalSettings, {
            $push: {
              deliveryCharges: {
                _id: ObjectId(),
                price: req.body.price,
                area: req.body.area,
              },
            },
          });
        } else {
          await collection.updateOne(
            { "deliveryCharges._id": ObjectId(req.body._id) },
            {
              $set: {
                "deliveryCharges.$.price": req.body.price,
                "deliveryCharges.$.area": req.body.area,
              },
            }
          );
        }
      } else {
        // update general settings
        await collection.updateOne(generalSettings, {
          $push: {
            deliveryCharges: {
              _id: ObjectId(),
              price: req.body.price,
              area: req.body.area,
            },
          },
        });
      }
      const updateGeneralSetting = {
        $set: {
          updatedAt: new Date(),
          updatedAuthor: {
            sub: userInfo.sub,
            name: userInfo.name,
          },
        },
      };
      // update general settings
      await collection.updateOne(generalSettings, updateGeneralSetting);

      res.status(200).send();
    });
  }
);
//#endregion

//#region
// delete side option item
router.delete(
  "/delete-delivery-charge",
  checkJwt,
  hasDeletePermission,
  [body("_id").not().isEmpty().trim().withMessage("Item id is required")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const collection = await loadSpecificCollection("generalSettings");

    const token = await createToken(req);

    authClient.getProfile(token, async (err, userInfo) => {
      if (userInfo && userInfo.hasOwnProperty("error")) {
        return res.status(401).send(userInfo.error);
      } else if (err) {
        return res.status(500).send(err);
      }
      const generalSettings = await collection.findOne({ _id: { $ne: null } });

      await collection.updateOne(
        { "deliveryCharges._id": ObjectId(req.body._id) },
        { $pull: { deliveryCharges: { _id: ObjectId(req.body._id) } } }
      );

      const updateGeneralSetting = {
        $set: {
          updatedAt: new Date(),
          updatedAuthor: {
            sub: userInfo.sub,
            name: userInfo.name,
          },
        },
      };
      // update general settings
      await collection.updateOne(generalSettings, updateGeneralSetting);

      res.status(200).send();
    });
  }
);
//#endregion

module.exports = router;
