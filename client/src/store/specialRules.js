import axios from "../httpClient/config.js";

const specialRulesUrl = "/response";

const specialRules = {
  state: {
    rules: null
  },
  getters: {
    getRules: state => {
      return state.rules;
    }
  },
  actions: {
    async retrieveRules(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        const result = await axios.axiosInstance.get(
          `${specialRulesUrl}/current-specials`);
        if (result && result.status === 200) {
          commit("setRules", result);
        }
      } catch (ex) {
        console.log("retrieveRules -> ex", ex);
      }
    }
  },
  mutations: {
    setRules(state, payload) {
      state.rules = payload;
    }
  }
};

export default specialRules;
