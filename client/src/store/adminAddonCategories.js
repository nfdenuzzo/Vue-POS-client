import axios from "../httpClient/config.js";
import { cachingTimeExpired } from "../utils/cachingCheck.js";

const addonCategoriesAdminUrl = "/admin-options/addon-categories";

const adminAddonCategories = {
  state: {
    adminAddonCategoriesRetrievedDate: null,
    adminAddonCategories: []
  },
  getters: {
    getAdminAddonCategories: state => {
      return state.adminAddonCategories;
    },
    getAdminAddonCategoriesRetrievedDate: state => {
      return state.adminAddonCategoriesRetrievedDate;
    }
  },
  actions: {
    async updateAddonCatOption(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        const result = await axios.axiosInstance.put(
          `${addonCategoriesAdminUrl}/update-addon-category`,
          payload
        );
        if (result && result.status === 200) {
          dispatch("retrieveAdminAddonCategories", { forceRefresh: true });
          return result;
        }
      } catch (ex) {
        console.log("updateAddonCatOption -> ex", ex);
      }
    },
    async createAddonCatOption(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        const result = await axios.axiosInstance.post(
          `${addonCategoriesAdminUrl}/create-addon-category`,
          payload
        );
        if (result && result.status === 200) {
          dispatch("retrieveAdminAddonCategories", { forceRefresh: true });
          return result;
        }
      } catch (ex) {
        console.log("createSideItem -> ex", ex);
      }
    },
    async deleteAddonCatOption(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        const result = await axios.axiosInstance.delete(
          `${addonCategoriesAdminUrl}/delete-addon-category`,
          { data: { _id: payload } }
        );
        if (result && result.status === 200) {
          dispatch("retrieveAdminAddonCategories", { forceRefresh: true });
          return result;
        }
      } catch (ex) {
        console.log("deleteAddonCatOption -> ex", ex);
      }
    },
    async retrieveAdminAddonCategories(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        // if (
        //   cachingTimeExpired(
        //     rootGetters.getAdminAddonCategoriesRetrievedDate
        //   ) ||
        //   (payload && payload.forceRefresh) ||
        //   rootGetters.getAdminAddonCategories.length === 0
        // ) {
        const result = await axios.axiosInstance.get(addonCategoriesAdminUrl);
        if (result && result.status === 200) {
          commit("setAdminAddonCategories", result.data);
          commit("setAdminAddonCategoriesRetrievedDate", new Date());
          return true;
        }
        // } else {
        //   return true;
        // }
      } catch (ex) {
        console.log("retrieveAdminAddonCategories -> ex", ex);
        return false;
      }
    }
  },
  mutations: {
    setAdminAddonCategories(state, payload) {
      state.adminAddonCategories = payload;
    },
    setAdminAddonCategoriesRetrievedDate(state, payload) {
      state.adminAddonCategoriesRetrievedDate = payload;
    }
  }
};

export default adminAddonCategories;
