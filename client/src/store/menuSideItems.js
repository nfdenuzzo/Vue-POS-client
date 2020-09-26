import axios from "../httpClient/config.js";
import { cachingTimeExpired } from "../utils/cachingCheck.js";

const sideItemUrl = "/side-items";

const menuSideItems = {
  state: {
    sideItemsRetrievedDate: null,
    sideItems: []
  },
  getters: {
    getSideItems: state => {
      return state.sideItems;
    },
    getSideItemsRetrievedDate: state => {
      return state.sideItemsRetrievedDate;
    }
  },
  actions: {
    async retrieveSideItem(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        // if (
        //   cachingTimeExpired(rootGetters.getSideItemsRetrievedDate) ||
        //   (payload && payload.forceRefresh) || (rootGetters.getSideItems.length === 0)
        // ) {
        const result = await axios.axiosInstance.get(`${sideItemUrl}`);
        if (result && result.status === 200) {
          commit("setSideItems", result.data);
          commit("setSideItemsRetrievedDate", new Date());
          return true;
        }
        // } else {
        //   return true;
        // }
      } catch (ex) {
        console.log("retrieveSideItem -> ex", ex);
        return false;
      }
    }
  },
  mutations: {
    setSideItems(state, payload) {
      state.sideItems = payload;
    },
    setSideItemsRetrievedDate(state, payload) {
      state.sideItemsRetrievedDate = payload;
    }
  }
};

export default menuSideItems;
