import axios from "../httpClient/config.js";
import { cachingTimeExpired } from "../utils/cachingCheck.js";

const systemStatisticsAdminUrl = "/admin-options/system-statistics";

const systemStatistics = {
  state: {
    systemStatisticsRetrievedDate: null,
    systemStatisticsCollection: []
  },
  getters: {
    getSystemStatistics: state => {
      return state.systemStatisticsCollection;
    },
    getSystemStatisticsRetrievedDate: state => {
      return state.systemStatisticsRetrievedDate;
    }
  },
  actions: {
    async retrieveSystemStatistics(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        // if (
        //   cachingTimeExpired(rootGetters.getSystemStatisticsRetrievedDate) ||
        //   (payload && payload.forceRefresh)
        // ) {
            console.log("sdhfjbaskjhfbaksjdhfbakjshdbfaksjdhbfkjashddbf")
          const result = await axios.axiosInstance.get(`${systemStatisticsAdminUrl}`);
          if (result && result.status === 200) {
            commit("setSystemStatistics", result.data);
            commit(
              "setSystemStatisticsRetrievedDate",
              new Date().toLocaleString("en-ZA")
            );
            return true;
          }
        // } else {
        //   return true;
        // }
      } catch (ex) {
        console.log("retrieveSystemStatistics -> ex", ex);
        return false;
      }
    }
  },
  mutations: {
    setSystemStatistics(state, payload) {
      state.systemStatisticsCollection = payload;
    },
    setSystemStatisticsRetrievedDate(state, payload) {
      state.systemStatisticsRetrievedDate = payload;
    }
  }
};

export default systemStatistics;
