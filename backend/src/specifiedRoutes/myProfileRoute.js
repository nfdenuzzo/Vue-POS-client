const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const {
  loadSpecificCollection,
  authClient,
  checkJwt,
  createToken,
} = require("../../utils/dbUtils.js");

//#region
// retrieve my profile
router.get("/", checkJwt, async (req, res) => {
  const token = await createToken(req);

  authClient.getProfile(token, async (err, userInfo) => {
    if (userInfo && userInfo.hasOwnProperty("error")) {
      return res.status(401).send(userInfo.error);
    } else if (err) {
      return res.status(500).send(err);
    }

    const myQuery = { userEmail: userInfo.email };

    const returnFields = {
      userEmail: 1,
      name: 1,
      address: 1,
      contactNumber: 1,
      addressLine2: 1,
      deliveryArea: 1,
      _id: 0,
    };

    const collection = await loadSpecificCollection("users");
    const myProfile = await collection.findOne(myQuery, {
      projection: returnFields,
    });

    res.send(myProfile);
  });
});
//#endregion

//#region
// update my profile details
router.put(
  "/update-profile",
  checkJwt,
  [
    body("contactNumber")
      .not()
      .isEmpty()
      .trim()
      .withMessage("Contact Number is required"),
    body("address").not().isEmpty().trim().withMessage("Address is Required!"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const collection = await loadSpecificCollection("users");

    const token = await createToken(req);

    authClient.getProfile(token, async (err, userInfo) => {
      if (userInfo && userInfo.hasOwnProperty("error")) {
        return res.status(401).send(userInfo.error);
      } else if (err) {
        return res.status(500).send(err);
      }
      const myQuery = { userEmail: userInfo.email };

      const myProfile = await collection.findOne(myQuery);

      const updateProfileDetails = {
        $set: {
          name: req.body.name ? req.body.name : myProfile.name,
          address: req.body.address ? req.body.address : myProfile.address,
          addressLine2: req.body.addressLine2
            ? req.body.addressLine2
            : myProfile.addressLine2,
          contactNumber: req.body.contactNumber
            ? req.body.contactNumber
            : myProfile.contactNumber,
          deliveryArea: req.body.deliveryArea
            ? req.body.deliveryArea
            : myProfile.deliveryArea,
          updatedAuthor: {
            sub: userInfo.sub,
            name: userInfo.name,
          },
        },
      };
      // update the inital object
      await collection.updateOne(myQuery, updateProfileDetails);

      res.status(200).send();
    });
  }
);
//#endregion

module.exports = router;
