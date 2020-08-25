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
