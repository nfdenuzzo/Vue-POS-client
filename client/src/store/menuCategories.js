import axios from "../httpClient/config.js";
import { cachingTimeExpired } from "../utils/cachingCheck.js";

const categoriesOptionUrl = "/menu-categories";

const menuCategories = {
  state: {
    menuCategoriesRetrievedDate: null,
    menuCategories: []
  },
  getters: {
    getMenuCategories: state => {
      return state.menuCategories;
    },
    getMenuCategoriesRetrievedDate: state => {
      return state.menuCategoriesRetrievedDate;
    }
  },
  actions: {
    async retrieveMenuCategories(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        if (
          cachingTimeExpired(rootGetters.getMenuCategoriesRetrievedDate) ||
          (payload && payload.forceRefresh) || (rootGetters.getMenuCategories.length === 0)
        ) {
          const result = await axios.axiosInstance.get(categoriesOptionUrl);
          if (result && result.status === 200) {
            commit("setMenuCategories", result.data);
            commit("setMenuCategoriesRetrievedDate", new Date());
            return true;
          }
        } else {
          return true;
        }
      } catch (ex) {
        console.log("retrieveMenuCategories -> ex", ex);
        return false;
      }
    }
  },
  mutations: {
    setMenuCategories(state, payload) {
      state.menuCategories = payload;
    },
    setMenuCategoriesRetrievedDate(state, payload) {
      state.menuCategoriesRetrievedDate = payload;
    }
  }
};

export default menuCategories;
