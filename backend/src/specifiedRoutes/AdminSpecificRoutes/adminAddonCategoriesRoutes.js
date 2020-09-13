const router = require("express").Router();
const moment = require("moment-timezone");
const { body, validationResult } = require("express-validator");
const {
  loadSpecificCollection,
  authClient,
  checkJwt,
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

//#region retrieve latest side category items
router.get("/", hasReadPermission, async (req, res) => {
  const collection = await loadSpecificCollection("addonCategories");
  const allAddonCategories = await collection.find({}).toArray();

  res.send(allAddonCategories);
});
//#endregion

//#region create side category item
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
        createdAt: moment.tz("africa/Johannesburg"),
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

//#region update side category item
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
          updatedAt: moment.tz("africa/Johannesburg"),
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
          "addonCategory.updatedAt": moment.tz("africa/Johannesburg"),
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

//#region create side category item
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
