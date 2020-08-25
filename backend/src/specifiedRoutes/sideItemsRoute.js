const router = require("express").Router();
const MongoClient = require("mongodb").MongoClient;
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
router.get("/", async (req, res) => {
  const collection = await loadSpecificCollection("sideItems");
  const allSideItems = await collection.find({}).toArray();
  const availableSideItems = allSideItems.filter(
    (sideItem) => !sideItem.disabled
  );

  res.send(availableSideItems);
});
//#endregion

module.exports = router;
