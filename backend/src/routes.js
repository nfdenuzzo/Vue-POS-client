const express = require('express');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
})

router.use('/place-order', require('./specifiedRoutes/orderRoute.js'));
router.use('/menu-items', require('./specifiedRoutes/menuItemsRoute.js'));
router.use('/menu-categories', require('./specifiedRoutes/menuCategoryRoute.js'));
router.use('/side-items', require('./specifiedRoutes/sideItemsRoute.js'));
router.use('/admin-options', require('./specifiedRoutes/adminRoutes.js'));
router.use('/my-profile', require('./specifiedRoutes/myProfileRoute.js'));
router.use('/general-settings', require('./specifiedRoutes/generalSettingsRoute.js'));

module.exports = router;
