import axios from "../httpClient/config.js";
import moment from "moment";
import momentTZ from "moment-timezone";
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
    async updateOrderStatus(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        const result = await axios.axiosInstance.put(
          `${ordersUrl}/update-order-status`,
          payload
        );
        if (result && result.status === 200) {
          dispatch("retrieveActiveOrders", { forceRefresh: true });
          return result;
        }
      } catch (ex) {
        console.log("updateSideItem -> ex", ex);
      }
    },
    async updateOrderAssignTableNo(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        const result = await axios.axiosInstance.put(
          `${ordersUrl}/update-order-assign-table-no`,
          payload
        );
        if (result && result.status === 200) {
          dispatch("retrieveActiveOrders", { forceRefresh: true });
          return result;
        }
      } catch (ex) {
        console.log("updateSideItem -> ex", ex);
      }
    },
    async retrieveActiveOrders(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        //   if (
        //     cachingTimeExpired(rootGetters.getActiveOrdersRetrievedDate) ||
        //     (payload && payload.forceRefresh)
        //   ) {
        const result = await axios.axiosInstance.get(
          `${ordersUrl}/active-orders`
        );
        if (result && result.status === 200) {
          commit("setActiveOrders", result.data);
          commit(
            "setActiveOrdersRetrievedDate",
            new Date().toLocaleString("en-ZA")
          );
          return true;
        }
        // } else {
        //   return true;
        // }
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
        const params = {
          dateFrom: payload.dateRange
            ? payload.dateRange.dateFrom
            : momentTZ.tz("africa/Johannesburg").startOf('month').utc(),
          dateTo: payload.dateRange ? payload.dateRange.dateTo : momentTZ.tz("africa/Johannesburg")
        };
        console.log("params", params)
        const result = await axios.axiosInstance.get(
          `${ordersUrl}/order-history?page=${page}`,
          {
            params: {
              dateRange: params
            }
          }
        );
        if (result && result.status === 200) {
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
