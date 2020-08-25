const express = require("express");

const router = express.Router();

router.use(
  "/side-items",
  require("./AdminSpecificRoutes/adminSideItemsRoutes.js")
);
router.use(
  "/addon-categories",
  require("./AdminSpecificRoutes/adminAddonCategoriesRoutes")
);
router.use("/menu-items", require("./AdminSpecificRoutes/adminMenuItemRoutes"));
router.use("/users", require("./AdminSpecificRoutes/adminUserRoutes"));
router.use(
  "/general-settings",
  require("./AdminSpecificRoutes/adminGeneralSettingsRoute")
);

module.exports = router;
