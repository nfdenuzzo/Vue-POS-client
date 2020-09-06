const router = require("express").Router();
const MongoClient = require("mongodb").MongoClient;
const { hasReadPermission } = require("../../utils/getPermissions.js");
require("dotenv").config();

const { MONGODB_URL, DB_NAME } = process.env;

//#region LoadSpecificCollection
async function loadSpecificCollection(collectionName) {
  const client = await MongoClient.connect(MONGODB_URL);
  return client.db(DB_NAME).collection(collectionName);
}
//#endregion

//#region
// retrieve latest side option items
router.get("/", hasReadPermission, async (req, res) => {
  const collection = await loadSpecificCollection("menuCategories");
  const availableMenuCategories = await collection.find({}).toArray();

  res.send(availableMenuCategories);
});
//#endregion

module.exports = router;
