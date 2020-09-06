import axios from "../httpClient/config.js";
import { cachingTimeExpired } from "../utils/cachingCheck.js";

const ordersUrl = "/order";

const menuSideItems = {
  state: {
    activeOrdersRetrievedDate: null,
    activeOrders: []
  },
  getters: {
    getActiveOrders: state => {
      return state.activeOrders;
    },
    getActiveOrdersRetrievedDate: state => {
      return state.activeOrdersRetrievedDate;
    }
  },
  actions: {
    async placeOrder({ commit, dispatch, rootState, rootGetters }, payload) {
      const result = await axios.axiosInstance.post(
        `${ordersUrl}/place-order`,
        payload
      );
      if (result && result.status === 200) {
        commit("updateBasket", []);
        dispatch("retrieveActiveOrders", { forceRefresh: true });
        return true;
      } else {
        return false;
      }
    },
    async retrieveActiveOrders(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        if (
          cachingTimeExpired(rootGetters.getActiveOrdersRetrievedDate) ||
          (payload && payload.forceRefresh)
        ) {
          const result = await axios.axiosInstance.get(
            `${ordersUrl}/my-active-orders`
          );
          console.log("result", result);
          if (result && result.status === 200) {
            commit("setActiveOrders", result.data);
            commit(
              "setActiveOrdersRetrievedDate",
              new Date().toLocaleString("en-ZA")
            );
            return true;
          }
        } else {
          return true;
        }
      } catch (ex) {
        console.log("retrieveActiveOrders -> ex", ex);
        return false;
      }
    }
  },
  mutations: {
    setActiveOrders(state, payload) {
      state.activeOrders = payload;
    },
    setActiveOrdersRetrievedDate(state, payload) {
      state.activeOrdersRetrievedDate = payload;
    }
  }
};

export default menuSideItems;
