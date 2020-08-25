const express = require('express');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
})

router.use('/menu-items', require('./specifiedRoutes/menuItemsRoute'));
router.use('/menu-categories', require('./specifiedRoutes/menuCategoryRoute'));
router.use('/side-items', require('./specifiedRoutes/sideItemsRoute'));
router.use('/admin-options', require('./specifiedRoutes/adminRoutes'));
router.use('/my-profile', require('./specifiedRoutes/myProfileRoute'));
router.use('/general-settings', require('./specifiedRoutes/generalSettingsRoute'));

module.exports = router;
