const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const auth0 = require("auth0");

const { MONGODB_URL, DB_NAME, AUTH0_CLIENT_ID, AUTH0_DOMAIN } = process.env;

module.exports = {
  loadSpecificCollection,
  getAuthClient,
  createToken
};

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

function getAuthClient() {
  const authClient = new auth0.AuthenticationClient({
    domain: AUTH0_DOMAIN,
    clientId: AUTH0_CLIENT_ID,
  });

  return authClient;
}

