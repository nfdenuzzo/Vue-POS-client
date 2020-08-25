const moment = require("moment-timezone");

export function cachingTimeExpired(createdDate) {
  if (createdDate) {
    const five_min_cache = 5 * 60 * 1000;
    const now = moment.tz("africa/Johannesburg");
    // Check if a date is 24 hours old
    const result = (now - new Date(createdDate)) > five_min_cache;
    return result;
  } else {
    return true;
  }
}
