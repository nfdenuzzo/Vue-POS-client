const router = require("express").Router();
const { loadSpecificCollection } = require("../../utils/dbUtils.js");

//#region retrieve latest side option items
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
