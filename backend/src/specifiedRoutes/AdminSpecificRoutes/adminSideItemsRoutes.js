const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const {
  loadSpecificCollection,
  getAuthClient,
  createToken,
} = require("../../../utils/dbUtils.js");
const ObjectId = require("mongodb").ObjectID;
const {
  hasReadPermission,
  hasUpdatePermission,
  hasDeletePermission,
  hasCreatePermission,
  isSuperAdmin,
} = require("../../../utils/getPermissions.js");
const { AUTH0_DOMAIN } = process.env;
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
require("dotenv").config();

const authClient = getAuthClient();
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

//#region
// retrieve latest side option items
router.get("/", hasReadPermission, async (req, res) => {
  const collection = await loadSpecificCollection("sideItems");
  const availableSideItems = await collection.find({}).toArray();

  res.send(availableSideItems);
});
//#endregion

//#region
// create side option item
router.post(
  "/create-side-item",
  checkJwt,
  hasCreatePermission,
  [
    body("name").not().isEmpty().trim().withMessage("Name is Required!"),
    body("price").not().isEmpty().trim().withMessage("Price is Required!"),
    body("disabled").optional(),
    body("addonCategory").not().isEmpty().withMessage("Category is Required!"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const collection = await loadSpecificCollection("sideItems");

    const token = await createToken(req);

    authClient.getProfile(token, async (err, userInfo) => {
      if (userInfo && userInfo.hasOwnProperty("error")) {
        return res.status(401).send(userInfo.error);
      } else if (err) {
        return res.status(500).send(err);
      }

      await collection.insertOne({
        name: req.body.name,
        price: req.body.price,
        addonCategory: req.body.addonCategory,
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
// update side option items
router.put(
  "/update-side-item",
  checkJwt,
  hasUpdatePermission,
  [
    body("_id").not().isEmpty().trim().withMessage("Item id is required"),
    body("name").not().isEmpty().trim().withMessage("Name is Required!"),
    body("price").not().isEmpty().trim().withMessage("Price is Required!"),
    body("disabled").optional(),
    body("addonCategory").not().isEmpty().withMessage("Category is Required!"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const collection = await loadSpecificCollection("sideItems");

    const token = await createToken(req);

    authClient.getProfile(token, async (err, userInfo) => {
      if (userInfo && userInfo.hasOwnProperty("error")) {
        return res.status(401).send(userInfo.error);
      } else if (err) {
        return res.status(500).send(err);
      }

      const myQuery = { _id: ObjectId(req.body._id) };

      const newUpdatedValues = {
        $set: {
          name: req.body.name,
          price: req.body.price,
          addonCategory: req.body.addonCategory,
          disabled: req.body.disabled,
          updatedAt: new Date(),
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

//#region
// delete side option item
router.delete(
  "/delete-side-item",
  checkJwt,
  hasDeletePermission,
  [body("_id").not().isEmpty().trim().withMessage("Item id is required")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const collection = await loadSpecificCollection("sideItems");

    const token = await createToken(req);

    authClient.getProfile(token, async (err, userInfo) => {
      if (userInfo && userInfo.hasOwnProperty("error")) {
        return res.status(401).send(userInfo.error);
      } else if (err) {
        return res.status(500).send(err);
      }

      const queryFindMatchingSideItem = {
        _id: ObjectId(req.body._id),
      };
      await collection.remove(queryFindMatchingSideItem);
      res.status(200).send();
    });
  }
);
//#endregion

module.exports = router;
