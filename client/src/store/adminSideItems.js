import axios from "../httpClient/config.js";
import { cachingTimeExpired } from "../utils/cachingCheck.js";

const sideItemAdminUrl = "/admin-options/side-items";

const adminSideItems = {
  state: {
    adminSideItemsRetrievedDate: null,
    adminSideItems: []
  },
  getters: {
    getAdminSideItems: state => {
      return state.adminSideItems;
    },
    getAdminSideItemsRetrievedDate: state => {
      return state.adminSideItemsRetrievedDate;
    }
  },
  actions: {
    async updateSideItem(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        const result = await axios.axiosInstance.put(
          `${sideItemAdminUrl}/update-side-item`,
          payload
        );
        console.log("🚀 ~ file: adminSideItems.js ~ line 29 ~ result", result)
        if (result && result.status === 200) {
          await dispatch("retrieveAdminSideItem", { forceRefresh: true });
          return result;
        }
      } catch (ex) {
        console.log("updateSideItem -> ex", ex);
      }
    },
    async createSideItem(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        const result = await axios.axiosInstance.post(
          `${sideItemAdminUrl}/create-side-item`,
          payload
        );
        console.log("🚀 ~ file: adminSideItems.js ~ line 47 ~ result", result)
        if (result && result.status === 200) {
          await dispatch("retrieveAdminSideItem", { forceRefresh: true });
          return result;
        }
      } catch (ex) {
        console.log("createSideItem -> ex", ex);
      }
    },
    async deleteSideItem(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        const result = await axios.axiosInstance.delete(
          `${sideItemAdminUrl}/delete-side-item`,
          { data: { _id: payload } }
        );
        if (result && result.status === 200) {
          await dispatch("retrieveAdminSideItem", { forceRefresh: true });
          return result;
        }
      } catch (ex) {
        console.log("deleteSideItem -> ex", ex);
      }
    },
    async retrieveAdminSideItem(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        // if (
        //   cachingTimeExpired(rootGetters.getAdminSideItemsRetrievedDate) ||
        //   (payload && payload.forceRefresh) || (rootGetters.getAdminSideItems.length === 0)
        // ) {
        const result = await axios.axiosInstance.get(`${sideItemAdminUrl}`);
        if (result && result.status === 200) {
          commit("setAdminSideItems", result.data);
          commit("setAdminSideItemsRetrievedDate", new Date());
          return true;
        }
        // } else {
        //   return true;
        // }
      } catch (ex) {
        console.log("retrieveAdminSideItem -> ex", ex);
        return false;
      }
    }
  },
  mutations: {
    setAdminSideItems(state, payload) {
      state.adminSideItems = payload;
    },
    setAdminSideItemsRetrievedDate(state, payload) {
      state.adminSideItemsRetrievedDate = payload;
    }
  }
};

export default adminSideItems;
