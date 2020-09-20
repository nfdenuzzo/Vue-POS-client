const router = require("express").Router();
const { loadSpecificCollection } = require("../../utils/dbUtils.js");
const { isPlatformClosed } = require("../../utils/isPlatformClosed.js");
const { getWeekDay } = require("../../utils/helpers.js")

//#region retrieve my general Settings
router.get("/", async (req, res) => {
  const returnFields = { deliveryCharges: 1, openingHours: 1, vat: 1, _id: 0 };
  const collection = await loadSpecificCollection("generalSettings");
  const generalSettings = await collection.findOne(
    { _id: { $ne: null } },
    { projection: returnFields }
  );

  res.send(generalSettings);
});
//#endregion

//#region retrieve my platform status
router.get("/platform-status", async (req, res) => {
  const returnFields = { orderingActive: 1, openingHours: 1, _id: 0 };
  const collection = await loadSpecificCollection("generalSettings");
  const platformStatus = await collection.findOne(
    { _id: { $ne: null } },
    { projection: returnFields }
  );

  // check if platform is active
  if (platformStatus.orderingActive) {
    const dayOfTheWeek = getWeekDay(new Date());
    const tradingHours = platformStatus.openingHours.filter(
      (week) => week.day === dayOfTheWeek
    );

    if (isPlatformClosed(tradingHours, tradingHours[0].closed)) {
      platformStatus.orderingActive = false;
    } else {
      platformStatus.orderingActive = true;
    }
  } else {
    platformStatus.orderingActive = false;
  }

  res.send(platformStatus.orderingActive);
});
//#endregion

module.exports = router;
