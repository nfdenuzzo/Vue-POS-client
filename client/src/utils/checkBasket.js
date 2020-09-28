
import store from "../store/index.js";

export async function checkBasketExpiry() {
    const basketCreateTime = store.getters.getBasketCreateTime;
    if (basketCreateTime) {
      const six_hour_expiry = 60 * 60 * 6 * 1000;
      const now = new Date()
      // Check if a date is 24 hours old
      const result = now - new Date(basketCreateTime) > six_hour_expiry;
      if (result) {
        store.dispatch("clearBasket");
      }
      if (result) {
        return true;
      } else {
          // we return false as expiry has not occured
        return false;
      }
    } else {
      return false;
    }
  }
  