const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const auth0 = require("auth0");

const { MONGODB_URL, DB_NAME, AUTH0_CLIENT_ID, AUTH0_DOMAIN } = process.env;

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

const authClient = new auth0.AuthenticationClient({
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_CLIENT_ID,
});

const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
//
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

//
module.exports = {
    loadSpecificCollection,
    authClient,
    checkJwt,
    createToken,
  };