const router = require("express").Router();
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

//#region
// retrieve latest menu items
router.get("/", hasReadPermission, async (req, res) => {
  const collection = await loadSpecificCollection("menuItems");
  const allMenuItems = await collection.find({}).toArray();

  res.send(allMenuItems);
});
//#endregion

//#region
// create menu item
router.post(
  "/create-menu-item",
  checkJwt,
  hasCreatePermission,
  [
    body("name").not().isEmpty().trim().withMessage("Name is Required!"),
    body("disabled").optional(),
    body("description").not().isEmpty().withMessage("description is Required!"),
    body("price").isDecimal().withMessage("price is Required!"),
    body("menuCategory")
      .not()
      .isEmpty()
      .withMessage("menu category is Required!"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const collection = await loadSpecificCollection("menuItems");

    const token = await createToken(req);

    authClient.getProfile(token, async (err, userInfo) => {
      if (userInfo && userInfo.hasOwnProperty("error")) {
        return res.status(401).send(userInfo.error);
      } else if (err) {
        return res.status(500).send(err);
      }
      await collection.insertOne({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        disabled: req.body.disabled,
        menuItemImage: req.body.menuItemImage,
        menuCategory: req.body.menuCategory,
        calzonePrice: req.body.calzonePrice,
        calzoneOffered: req.body.calzoneOffered,
        hasBastingStyleOptions: req.body.hasBastingStyleOptions,
        chosenBastingStyleOptions: req.body.chosenBastingStyleOptions,
        hasEggStyleOptions: req.body.hasEggStyleOptions,
        chosenEggStyleOptions: req.body.chosenEggStyleOptions,
        offerExtraPizzaToppings: req.body.offerExtraPizzaToppings,
        offerExtraDessertToppings: req.body.offerExtraDessertToppings,
        offerExtraSaladToppings: req.body.offerExtraSaladToppings,
        offerExtraBurgerToppings: req.body.offerExtraBurgerToppings,
        offerExtraPastaToppings: req.body.offerExtraPastaToppings,
        offerExtraSuaces: req.body.offerExtraSuaces,
        offerExtraMainOptions: req.body.offerExtraMainOptions,
        hasFishStyleOptions: req.body.hasFishStyleOptions,
        chosenFishStyleOptions: req.body.chosenFishStyleOptions,
        hasMainToppings: req.body.hasMainToppings,
        chosenMainToppings: req.body.chosenMainToppings,
        hasMeatStyleOptions: req.body.hasMeatStyleOptions,
        chosenMeatStyleOptions: req.body.chosenMeatStyleOptions,
        hasPastaOptions: req.body.hasPastaOptions,
        chosenPastaOptions: req.body.chosenPastaOptions,
        hasPastaToppings: req.body.hasPastaToppings,
        chosenPastaToppings: req.body.chosenPastaToppings,
        hasPizzaToppings: req.body.hasPizzaToppings,
        chosenPizzaToppings: req.body.chosenPizzaToppings,
        hasBurgerToppings: req.body.hasBurgerToppings,
        chosenBurgerToppings: req.body.chosenBurgerToppings,
        hasSauceOptions: req.body.hasSauceOptions,
        chosenSauceOptions: req.body.chosenSauceOptions,
        hasSideOptions: req.body.hasSideOptions,
        chosenSideOptions: req.body.chosenSideOptions,
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
// update menu item
router.put(
  "/update-menu-item",
  checkJwt,
  hasUpdatePermission,
  [
    body("_id").not().isEmpty().trim().withMessage("Item id is required"),
    body("name").not().isEmpty().trim().withMessage("Name is Required!"),
    body("disabled").optional(),
    body("description").not().isEmpty().withMessage("description is Required!"),
    body("price").isDecimal().withMessage("price is Required!"),
    body("menuCategory")
      .not()
      .isEmpty()
      .withMessage("menu category is Required!"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const collection = await loadSpecificCollection("menuItems");

    const token = await createToken(req);

    authClient.getProfile(token, async (err, userInfo) => {
      if (userInfo && userInfo.hasOwnProperty("error")) {
        return res.status(401).send(userInfo.error);
      } else if (err) {
        return res.status(500).send(err);
      }
      const queryMatchingMenuItem = { _id: ObjectId(req.body._id) };

      const updateMatchingMenuItem = {
        $set: {
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          disabled: req.body.disabled,
          menuItemImage: req.body.menuItemImage,
          menuCategory: req.body.menuCategory,
          calzonePrice: req.body.calzonePrice,
          calzoneOffered: req.body.calzoneOffered,
          hasBastingStyleOptions: req.body.hasBastingStyleOptions,
          chosenBastingStyleOptions: req.body.chosenBastingStyleOptions,
          hasEggStyleOptions: req.body.hasEggStyleOptions,
          chosenEggStyleOptions: req.body.chosenEggStyleOptions,
          offerExtraPizzaToppings: req.body.offerExtraPizzaToppings,
          offerExtraDessertToppings: req.body.offerExtraDessertToppings,
          offerExtraSaladToppings: req.body.offerExtraSaladToppings,
          offerExtraBurgerToppings: req.body.offerExtraBurgerToppings,
          hasFishStyleOptions: req.body.hasFishStyleOptions,
          chosenFishStyleOptions: req.body.chosenFishStyleOptions,
          hasMainToppings: req.body.hasMainToppings,
          chosenMainToppings: req.body.chosenMainToppings,
          hasMeatStyleOptions: req.body.hasMeatStyleOptions,
          chosenMeatStyleOptions: req.body.chosenMeatStyleOptions,
          hasPastaOptions: req.body.hasPastaOptions,
          chosenPastaOptions: req.body.chosenPastaOptions,
          hasPastaToppings: req.body.hasPastaToppings,
          chosenPastaToppings: req.body.chosenPastaToppings,
          hasPizzaToppings: req.body.hasPizzaToppings,
          chosenPizzaToppings: req.body.chosenPizzaToppings,
          hasBurgerToppings: req.body.hasBurgerToppings,
          chosenBurgerToppings: req.body.chosenBurgerToppings,
          hasSauceOptions: req.body.hasSauceOptions,
          chosenSauceOptions: req.body.chosenSauceOptions,
          hasSideOptions: req.body.hasSideOptions,
          chosenSideOptions: req.body.chosenSideOptions,
          updatedAt: new Date(),
          updatedAuthor: {
            sub: userInfo.sub,
            name: userInfo.name,
          },
        },
      };
      // update the inital object
      await collection.updateOne(queryMatchingMenuItem, updateMatchingMenuItem);

      res.status(200).send();
    });
  }
);
//#endregion

//#region
// delete menu item
router.delete(
  "/delete-menu-item",
  checkJwt,
  hasDeletePermission,
  [body("_id").not().isEmpty().trim().withMessage("Item id is required")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const collection = await loadSpecificCollection("menuItems");

    const token = await createToken(req);

    authClient.getProfile(token, async (err, userInfo) => {
      if (userInfo && userInfo.hasOwnProperty("error")) {
        return res.status(401).send(userInfo.error);
      } else if (err) {
        return res.status(500).send(err);
      }

      const queryFindMatchingMenuItem = {
        _id: ObjectId(req.body._id),
      };
      await collection.remove(queryFindMatchingMenuItem);
      res.status(200).send();
    });
  }
);
//#endregion

module.exports = router;
