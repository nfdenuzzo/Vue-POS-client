const router = require("express").Router();
const { helperStandardDateTimeFormat } = require("../../utils/dateUtil.js")

const {
  loadSpecificCollection,
  authClient,
  checkJwt,
  createToken,
} = require("../../utils/dbUtils.js");
const { body, validationResult } = require("express-validator");

//#region retrieve my platform status
router.post("/createSubscription", checkJwt, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const collection = await loadSpecificCollection("notifications");

  const token = await createToken(req);

  authClient.getProfile(token, async (err, userInfo) => {
    if (userInfo && userInfo.hasOwnProperty("error")) {
      return res.status(401).send(userInfo.error);
    } else if (err) {
      return res.status(500).send(err);
    }

    await collection.insertOne({
      userEmail: userInfo.email,
      subscriptionObj: req.query,
      createdAt: helperStandardDateTimeFormat(new Date()),
    });
    res.status(200).send();
  });
});
//#endregion

module.exports = router;
