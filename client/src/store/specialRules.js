import axios from "../httpClient/config.js";

const specialRulesUrl = "/admin-options/campaign-specials";

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
    async updateSpecialCampaignRule(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        const result = await axios.axiosInstance.put(
          `${specialRulesUrl}/update-rule`,
          payload
        );
        if (result && result.status === 200) {
          await dispatch("retrieveRules", { forceRefresh: true });
          return result;
        }
      } catch (ex) {
        console.log("updateSpecialCampaignRule -> ex", ex);
      }
    },
    async deleteSpecialCampaignRule(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        const result = await axios.axiosInstance.delete(
          `${specialRulesUrl}/delete-rule`,
          { data: { _id: payload } }
        );
        if (result && result.status === 200) {
          await dispatch("retrieveRules", { forceRefresh: true });
          return result;
        }
      } catch (ex) {
        console.log("deleteSpecialCampaignRule -> ex", ex);
      }
    },
    async retrieveRules({ commit, dispatch, rootState, rootGetters }, payload) {
      try {
        const result = await axios.axiosInstance.get(`${specialRulesUrl}/`);
        if (result && result.status === 200) {
          commit("setRules", result.data);
          return result;
        }
      } catch (ex) {
        console.log("retrieveRules -> ex", ex);
      }
    },
    async createSpecialCampaignRule(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        const result = await axios.axiosInstance.post(
          `${specialRulesUrl}/create-rule`,
          payload
        );
        if (result && result.status === 200) {
          await dispatch("retrieveRules", { forceRefresh: true });
          return result;
        }
      } catch (ex) {
        console.log("createSpecialCampaignRule -> ex", ex);
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
