const router = require("express").Router();
const { loadSpecificCollection } = require("../../utils/dbUtils.js");
const { hasReadPermission } = require("../../utils/getPermissions.js");

//#region
// retrieve latest side option items
router.get("/", hasReadPermission, async (req, res) => {
  const collection = await loadSpecificCollection("menuCategories");
  const availableMenuCategories = await collection.find({}).toArray();

  res.send(availableMenuCategories);
});
//#endregion

module.exports = router;
