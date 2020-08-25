import axios from "../httpClient/config.js";
import { cachingTimeExpired } from "../utils/cachingCheck.js";

const menuItemsAdminUrl = "/admin-options/menu-items";

const adminMenuItems = {
  state: {
    adminMenuItemsRetrievedDate: null,
    adminMenuItems: []
  },
  getters: {
    getAdminMenuItems: state => {
      return state.adminMenuItems;
    },
    getAdminMenuItemsRetrievedDate: state => {
      return state.adminMenuItemsRetrievedDate;
    }
  },
  actions: {
    async updateMenuItem(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        const result = await axios.axiosInstance.put(
          `${menuItemsAdminUrl}/update-menu-item`,
          payload
        );
        if (result && result.status === 200) {
          dispatch("retrieveAdminMenuItems", { forceRefresh: true });
          return result;
        }
      } catch (ex) {
        console.log("updateMenuItem -> ex", ex);
      }
    },
    async createMenuItem(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        const result = await axios.axiosInstance.post(
          `${menuItemsAdminUrl}/create-menu-item`,
          payload
        );
        if (result && result.status === 200) {
          dispatch("retrieveAdminMenuItems", { forceRefresh: true });
          return result;
        }
      } catch (ex) {
        console.log("createMenuItem -> ex", ex);
      }
    },
    async deleteMenuItem(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        const result = await axios.axiosInstance.delete(
          `${menuItemsAdminUrl}/delete-menu-item`,
          { data: { _id: payload } }
        );
        if (result && result.status === 200) {
          dispatch("retrieveAdminMenuItems", { forceRefresh: true });
          return result;
        }
      } catch (ex) {
        console.log("deleteMenuItem -> ex", ex);
      }
    },
    async retrieveAdminMenuItems(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        if (
          cachingTimeExpired(rootGetters.getAdminMenuItemsRetrievedDate) ||
          (payload && payload.forceRefresh)
        ) {
          const result = await axios.axiosInstance.get(menuItemsAdminUrl);
          if (result && result.status === 200) {
            commit("setAdminMenuItems", result.data);
            commit(
              "setAdminMenuItemsRetrievedDate",
              new Date().toLocaleString("en-ZA")
            );
            return true;
          }
        } else {
          return true;
        }
      } catch (ex) {
        console.log("retrieveAdminMenuItems -> ex", ex);
        return false;
      }
    }
  },
  mutations: {
    setAdminMenuItems(state, payload) {
      state.adminMenuItems = payload;
    },
    setAdminMenuItemsRetrievedDate(state, payload) {
      state.adminMenuItemsRetrievedDate = payload;
    }
  }
};

export default adminMenuItems;
