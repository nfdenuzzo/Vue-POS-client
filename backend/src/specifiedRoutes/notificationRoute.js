const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const MongoClient = require("mongodb").MongoClient;
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


//#region LoadSpecificCollection
async function loadSpecificCollection(collectionName) {
  const client = await MongoClient.connect(MONGODB_URL);
  return client.db(DB_NAME).collection(collectionName);
}
//#endregion

//#region
// retrieve my platform status
router.post(
    "/createSubscription",
    checkJwt,
    async (req, res) => {
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
          orderId: null,
          subscriptionObj: req.query,
          createdAt: new Date(),
        });
        res.status(200).send();
      });
    }
  );
//#endregion

module.exports = router;
