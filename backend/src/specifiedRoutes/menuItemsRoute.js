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
// retrieve latest menu items
router.get("/:category", async (req, res) => {
  const myQuery = { "menuCategory.name": req.params.category };

  const collection = await loadSpecificCollection("menuItems");
  const allMenuItems = await collection.find(myQuery).toArray();
  const availableMenuItems = allMenuItems.filter(
    (menuItem) => !menuItem.disabled
  );

  res.send(availableMenuItems);
});
//#endregion

module.exports = router;
