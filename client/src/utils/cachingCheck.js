import store from "../store/index.js";

export function cachingTimeExpired(createdDate) {
  checkBasketExpiry();
  if (createdDate) {
    const five_min_cache = 5 * 60 * 1000;
    const now = new Date();
    // Check if a date is 24 hours old
    const result = now - new Date(createdDate) > five_min_cache;
    return result;
  } else {
    return true;
  }
}

function checkBasketExpiry() {
  const basketCreateTime = store.getters.getBasketCreateTime;
  if (basketCreateTime) {
    const six_hour_expiry = 3600 * 60 * 1000;
    const now = new Date();
    // Check if a date is 24 hours old
    const result = now - basketCreateTime > six_hour_expiry;
    if (result) {
      store.dispatch("clearBasket");
    }
  }
}
