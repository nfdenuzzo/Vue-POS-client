const router = require("express").Router();
const MongoClient = require("mongodb").MongoClient;
const auth0 = require("auth0");
const jwt = require("express-jwt");
const {
  hasReadPermission,
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
// retrieve current users
router.get("/current-users", checkJwt, hasReadPermission, async (req, res) => {
  const token = await createToken(req);

  const collection = await loadSpecificCollection("users");
  const availableUsers = await collection.find({}).toArray();

  res.send(availableUsers);
});
//#endregion

//#region
// create user record if no matching email found else update record
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
        createdAt: new Date(),
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
