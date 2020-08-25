const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const auth0 = require("auth0");
const jwt = require("express-jwt");
const {
  hasReadPermission,
  hasUpdatePermission,
  hasDeletePermission,
  hasCreatePermission,
  isSuperAdmin,
} = require("../../utils/getPermissions.js");
const jwksRsa = require("jwks-rsa");
const { isPlatformClosed } = require("../../utils/isPlatformClosed.js");
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
// retrieve my general Settings
router.get("/", async (req, res) => {
  const returnFields = { deliveryCharges: 1, openingHours: 1, vat: 1, _id: 0 };
  const collection = await loadSpecificCollection("generalSettings");
  const generalSettings = await collection.findOne(
    { _id: { $ne: null } },
    { projection: returnFields }
  );

  res.send(generalSettings);
});
//#endregion

//#region
// retrieve my platform status
router.get("/platform-status", async (req, res) => {
  const returnFields = { orderingActive: 1, openingHours: 1, _id: 0 };
  const collection = await loadSpecificCollection("generalSettings");
  const platformStatus = await collection.findOne(
    { _id: { $ne: null } },
    { projection: returnFields }
  );

  // check if platform is active
  if (platformStatus.orderingActive) {
    const dayOfTheWeek = getWeekDay(new Date());
    const tradingHours = platformStatus.openingHours.filter(
      (week) => week.day === dayOfTheWeek
    );

    if (isPlatformClosed(tradingHours, tradingHours.closed)) {
      platformStatus.orderingActive = false;
    } else {
      platformStatus.orderingActive = true;
    }
  } else {
    platformStatus.orderingActive = false;
  }

  res.send(platformStatus.orderingActive);
});
//#endregion

function getWeekDay(date) {
  //Create an array containing each day, starting with Sunday.
  const weekdays = new Array(
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  );
  //Use the getDay() method to get the day.
  const day = date.getDay();
  //Return the element that corresponds to that index.
  return weekdays[day];
}

module.exports = router;
