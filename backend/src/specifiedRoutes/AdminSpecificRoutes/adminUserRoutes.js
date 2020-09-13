const router = require("express").Router();
const moment = require("moment-timezone");
const {
  loadSpecificCollection,
  authClient,
  checkJwt,
  createToken,
} = require("../../../utils/dbUtils.js");
const { hasReadPermission } = require("../../../utils/getPermissions.js");

//#region retrieve current users
router.get("/current-users", checkJwt, hasReadPermission, async (req, res) => {
  const collection = await loadSpecificCollection("users");
  const availableUsers = await collection.find({}).toArray();

  res.send(availableUsers);
});
//#endregion

//#region create user record if no matching email found else update record
router.get("/", checkJwt, async (req, res) => {
  const collection = await loadSpecificCollection("users");

  const token = await createToken(req);

  authClient.getProfile(token, async (err, userInfo) => {
    if (userInfo && userInfo.hasOwnProperty("error")) {
      return res.status(401).send(userInfo.error);
    } else if (err) {
      return res.status(500).send(err);
    }

    const myQuery = { userEmail: userInfo.email };

    const findExistingUserResult = await collection.findOne(myQuery);
    if (findExistingUserResult == null) {
      await collection.insertOne({
        userEmail: userInfo.email,
        lastLoginDate: userInfo.updated_at,
        createdAt: moment.tz("africa/Johannesburg"),
        name: userInfo.nickname,
        emailVerified: userInfo.email_verified,
        address: null,
        deliveryArea: null,
        addressLine2: null,
        contactNumber: null,
      });
      res.status(200).send();
    } else {
      const updateMatchingUser = {
        $set: {
          lastLoginDate: userInfo.updated_at,
          emailVerified: userInfo.email_verified,
        },
      };

      await collection.findOneAndUpdate(myQuery, updateMatchingUser);
      res.status(200).send();
    }
  });
});
//#endregion

module.exports = router;
