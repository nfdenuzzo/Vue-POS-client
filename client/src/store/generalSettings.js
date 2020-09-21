import axios from "../httpClient/config.js";
import { cachingTimeExpired } from "../utils/cachingCheck.js";

const generalSettingsUrl = "/general-settings";

const generalSettings = {
  state: {
    orderingActive: true,
    curentVATRate: true,
    openingTimes: [],
    settingsRetrievedDate: null,
    deliveryCharges: [],
    viewingPurchaseProcess: false
  },
  getters: {
    getViewingPurchaseProcess: state => {
      return state.viewingPurchaseProcess;
    },
    getDeliveryCharges: state => {
      return state.deliveryCharges;
    },
    getOrderingActive: state => {
      return state.orderingActive;
    },
    getTradingHours: state => {
      return state.openingTimes;
    },
    getVATRate: state => {
      return state.curentVATRate;
    },
    getSettingsRetrievedDate: state => {
      return state.settingsRetrievedDate;
    }
  },
  actions: {
    async retrieveDefaultSettings(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        if (
          cachingTimeExpired(rootGetters.getSettingsRetrievedDate) ||
          (payload && payload.forceRefresh) ||
          rootGetters.getTradingHours.length === 0
        ) {
          const result = await axios.axiosInstance.get(`${generalSettingsUrl}`);
          if (result && result.status === 200) {
            commit("setTradingHours", result.data.openingHours);
            commit(
              "setSettingsRetrievedDate",
              new Date().toLocaleString("en-ZA")
            );
            commit("setVatRate", result.data.vat);
            commit("setDeliveryCharges", result.data.deliveryCharges);
            return true;
          }
        } else {
          return true;
        }
      } catch (ex) {
        console.log("retrieveDefaultSettings -> ex", ex);
        return false;
      }
    },
    async retrievePlatformStatus(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        const result = await axios.axiosInstance.get(
          `${generalSettingsUrl}/platform-status`
        );
        if (result && result.status === 200) {
          commit("setOrderingActive", result.data);
        }
      } catch (ex) {
        console.log("retrieveDefaultSettings -> ex", ex);
      }
    }
  },
  mutations: {
    setDeliveryCharges(state, payload) {
      state.deliveryCharges = payload;
    },
    setTradingHours(state, payload) {
      state.openingTimes = payload;
    },
    setOrderingActive(state, payload) {
      state.orderingActive = payload;
    },
    setVatRate(state, payload) {
      state.curentVATRate = payload;
    },
    setSettingsRetrievedDate(state, payload) {
      state.settingsRetrievedDate = payload;
    },
    setViewingPurchaseProcess(state, payload) {
      state.viewingPurchaseProcess = payload;
    }
  }
};

export default generalSettings;
