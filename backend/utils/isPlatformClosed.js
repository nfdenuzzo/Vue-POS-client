const moment = require("moment-timezone");

module.exports = {
  isPlatformClosed,
};

function isPlatformClosed(tradingHours, isClosed) {
  // Is Date on a monday?
  const today = moment.tz("africa/Johannesburg");
  const openTime = moment(
    `${tradingHours[0].time.start.hours}:${tradingHours[0].time.start.mins}`,
    "hh:mm"
  ).valueOf();
  const closedTime = moment(
    `${tradingHours[0].time.end.hours}:${tradingHours[0].time.end.mins}`,
    "hh:mm"
  ).valueOf();

  const isTradingHours = today.isAfter(openTime) && today.isBefore(closedTime);

  // Return true if platform should be closed
  if (isClosed || !isTradingHours) return true;
  else return false;
}
