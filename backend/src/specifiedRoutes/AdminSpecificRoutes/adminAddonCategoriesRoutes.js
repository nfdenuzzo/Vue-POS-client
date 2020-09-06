const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const auth0 = require("auth0");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
require("dotenv").config();
const {
  hasReadPermission,
  hasUpdatePermission,
  hasDeletePermission,
  hasCreatePermission,
  isSuperAdmin,
} = require("../../../utils/getPermissions.js");

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
// retrieve latest side category items
router.get("/", hasReadPermission, async (req, res) => {
  const collection = await loadSpecificCollection("addonCategories");
  const allAddonCategories = await collection.find({}).toArray();

  res.send(allAddonCategories);
});
//#endregion

//#region
// create side category item
router.post(
  "/create-addon-category",
  checkJwt,
  hasCreatePermission,
  isSuperAdmin,
  [
    body("name")
      .not()
      .isEmpty()
      .trim()
      .withMessage("Category name is Required!"),
    body("disabled").optional(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const collection = await loadSpecificCollection("addonCategories");

    const token = await createToken(req);

    authClient.getProfile(token, async (err, userInfo) => {
      if (userInfo && userInfo.hasOwnProperty("error")) {
        return res.status(401).send(userInfo.error);
      } else if (err) {
        return res.status(500).send(err);
      }

      await collection.insertOne({
        name: req.body.name,
        disabled: req.body.disabled,
        createdAt: new Date(),
        createdAuthor: {
          sub: userInfo.sub,
          name: userInfo.name,
        },
      });
      res.status(200).send();
    });
  }
);
//#endregion

//#region
// update side category item
router.put(
  "/update-addon-category",
  checkJwt,
  hasUpdatePermission,
  isSuperAdmin,
  [
    body("_id").not().isEmpty().trim().withMessage("Item id is required"),
    body("name").not().isEmpty().trim().withMessage("Name is Required!"),
    body("disabled").optional(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const collection = await loadSpecificCollection("addonCategories");

    const token = await createToken(req);

    authClient.getProfile(token, async (err, userInfo) => {
      if (userInfo && userInfo.hasOwnProperty("error")) {
        return res.status(401).send(userInfo.error);
      } else if (err) {
        return res.status(500).send(err);
      }

      const queryAddonCategories = { _id: ObjectId(req.body._id) };

      const updateMatchingAddonCategory = {
        $set: {
          name: req.body.name,
          disabled: req.body.disabled,
          updatedAt: new Date(),
          updatedAuthor: {
            sub: userInfo.sub,
            name: userInfo.name,
          },
        },
      };
      // update the inital object
      await collection.updateOne(
        queryAddonCategories,
        updateMatchingAddonCategory
      );

      // we need to now update all records that contain the side category that was updated
      const sideItemCollection = await loadSpecificCollection("sideItems");

      // note we do not convert _id to a object as it is saved as a string in the database ObjectId !== string
      const querySideItemsContaininAddonCategory = {
        "addonCategory._id": req.body._id,
      };

      const updateMatchingSideItems = {
        $set: {
          "addonCategory.name": req.body.name,
          "addonCategory.disabled": req.body.disabled,
          "addonCategory.updatedAt": new Date(),
          "addonCategory.updatedAuthor": {
            sub: userInfo.sub,
            name: userInfo.name,
          },
        },
      };

      await sideItemCollection.updateMany(
        querySideItemsContaininAddonCategory,
        updateMatchingSideItems
      );

      res.status(200).send();
    });
  }
);
//#endregion

//#region
// create side category item
router.delete(
  "/delete-addon-category",
  checkJwt,
  hasDeletePermission,
  isSuperAdmin,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const collection = await loadSpecificCollection("addonCategories");

    const token = await createToken(req);

    authClient.getProfile(token, async (err, userInfo) => {
      if (userInfo && userInfo.hasOwnProperty("error")) {
        return res.status(401).send(userInfo.error);
      } else if (err) {
        return res.status(500).send(err);
      }

      const queryFindMatchingAddonCat = {
        _id: ObjectId(req.body._id),
      };

      await collection.findOneAndDelete(queryFindMatchingAddonCat);
      res.status(200).send();
    });
  }
);
//#endregion

module.exports = router;
