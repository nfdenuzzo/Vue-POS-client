const router = require("express").Router();
const { loadSpecificCollection } = require("../../utils/dbUtils.js");
const { isPlatformClosed } = require("../../utils/isPlatformClosed.js");

//#region
// retrieve my general Settings
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

//#region
// retrieve my platform status
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

    if (isPlatformClosed(tradingHours, tradingHours.closed)) {
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

function getWeekDay(date) {
  //Create an array containing each day, starting with Sunday.
  const weekdays = new Array(
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  );
  //Use the getDay() method to get the day.
  const day = date.getDay();
  //Return the element that corresponds to that index.
  return weekdays[day];
}

module.exports = router;
