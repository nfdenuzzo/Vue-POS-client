const router = require("express").Router();
const { loadSpecificCollection } = require("../../utils/dbUtils.js");

//#region retrieve latest menu items
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
