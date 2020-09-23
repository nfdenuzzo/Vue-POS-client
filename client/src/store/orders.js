import axios from "../httpClient/config.js";
import {
  getStartOfMonth,
  helperStandardDateOnlyFormat
} from "../utils/dateUtil.js";

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
        dispatch("retrieveActiveOrders", { forceRefresh: true });
        if (result.data && result.data.externalUrl) {
          commit("setTranId", result.data.transactionId);
          window.location.href = result.data.externalUrl;
        } else {
          commit("updateBasket", []);
        }
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
        const result = await axios.axiosInstance.get(
          `${ordersUrl}/active-orders`
        );
        if (result && result.status === 200) {
          commit("setActiveOrders", result.data);
          commit("setActiveOrdersRetrievedDate", new Date());
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
        const page = payload && payload.page ? payload.page : 1;
        const params = {
          dateFrom: payload.dateRange
            ? payload.dateRange.dateFrom
            : getStartOfMonth(new Date()),
          dateTo: payload.dateRange
            ? payload.dateRange.dateTo
            : helperStandardDateOnlyFormat(new Date())
        };
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
          commit("setOrderHistoryRetrievedDate", new Date());
          return true;
        }
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
