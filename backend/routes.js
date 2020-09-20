const express = require("express");

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

router.use("/order", require("./src/specifiedRoutes/orderRoute.js"));
router.use("/menu-items", require("./src/specifiedRoutes/menuItemsRoute.js"));
router.use(
  "/menu-categories",
  require("./src/specifiedRoutes/menuCategoryRoute.js")
);
router.use("/side-items", require("./src/specifiedRoutes/sideItemsRoute.js"));
router.use("/admin-options", require("./src/specifiedRoutes/adminRoutes.js"));
router.use("/my-profile", require("./src/specifiedRoutes/myProfileRoute.js"));
router.use(
  "/general-settings",
  require("./src/specifiedRoutes/generalSettingsRoute.js")
);

router.use("/notifications", require("./src/specifiedRoutes/notificationRoute.js"));
router.use("/response", require("./src/specifiedRoutes/paymentResponseRoute.js"));

module.exports = router;
