import axios from "../httpClient/config.js";
import { cachingTimeExpired } from "../utils/cachingCheck.js";

const ordersUrl = "/order";

const menuSideItems = {
  state: {
    ordersRetrievedDate: null,
    orders: []
  },
  getters: {
    getOrders: state => {
      return state.orders;
    },
    getOrdersRetrievedDate: state => {
      return state.ordersRetrievedDate;
    }
  },
  actions: {
    async retrieveOrders(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        if (
          cachingTimeExpired(rootGetters.getOrdersRetrievedDate) ||
          (payload && payload.forceRefresh)
        ) {
          const result = await axios.axiosInstance.get(`${ordersUrl}`);
          if (result && result.status === 200) {
            commit("setOrders", result.data);
            commit(
              "setOrdersRetrievedDate",
              new Date().toLocaleString("en-ZA")
            );
            return true;
          }
        } else {
          return true;
        }
      } catch (ex) {
        console.log("retrieveOrders -> ex", ex);
        return false;
      }
    }
  },
  mutations: {
    setOrders(state, payload) {
      state.orders = payload;
    },
    setOrdersRetrievedDate(state, payload) {
      state.ordersRetrievedDate = payload;
    }
  }
};

export default menuSideItems;
