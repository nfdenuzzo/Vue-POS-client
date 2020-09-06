import axios from "../httpClient/config.js";
import { cachingTimeExpired } from "../utils/cachingCheck.js";

const ordersUrl = "/order";

const menuSideItems = {
  state: {
    activeOrdersRetrievedDate: null,
    activeOrders: [],
    orderHistoryRetrievedDate: null,
    orderHistory: []
  },
  getters: {
    getActiveOrders: state => {
      return state.activeOrders;
    },
    getActiveOrdersRetrievedDate: state => {
      return state.activeOrdersRetrievedDate;
    },
    getOrderHistoryRetrievedDate: state => {
      return state.orderHistoryRetrievedDate;
    },
    getOrderHistory: state => {
      return state.orderHistory;
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
            `${ordersUrl}/active-orders`
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
    },
    async retrieveOrderHistory(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        // if (
        //   cachingTimeExpired(rootGetters.getActiveOrdersRetrievedDate) ||
        //   (payload && payload.forceRefresh)
        // ) {
          const page = payload && payload.page ? payload.page : 1;
          const result = await axios.axiosInstance.get(
            `${ordersUrl}/order-history?page=${page}`
          );
          if (result && result.status === 200) {
            console.log("result", result)
            commit("setOrderHistory", result.data);
            commit(
              "setOrderHistoryRetrievedDate",
              new Date().toLocaleString("en-ZA")
            );
            return true;
          }
        // } else {
        //   return true;
        // }
      } catch (ex) {
        console.log("retrieveOrderHistory -> ex", ex);
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
    },
    setOrderHistory(state, payload) {
      state.orderHistory = payload;
    },
    setOrderHistoryRetrievedDate(state, payload) {
      state.orderHistoryRetrievedDate = payload;
    }
  }
};

export default menuSideItems;
