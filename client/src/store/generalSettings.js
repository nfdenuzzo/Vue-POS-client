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
    viewingPurchaseProcess: false,
    payNowStatus: false,
    deliveryServiceAvailable: true,
    currentCampaignSpecials: []
  },
  getters: {
    getCurrentCampaignSpecials: state => {
      return state.currentCampaignSpecials;
    },
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
    },
    getPayNowStatus: state => {
      return state.payNowStatus;
    },
    getDeliveryServiceAvailable: state => {
      return state.deliveryServiceAvailable;
    }
  },
  actions: {
    async retrieveDefaultSettings(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        // if (
        //   cachingTimeExpired(rootGetters.getSettingsRetrievedDate) ||
        //   (payload && payload.forceRefresh) ||
        //   rootGetters.getTradingHours.length === 0
        // ) {
        const result = await axios.axiosInstance.get(`${generalSettingsUrl}`);
        if (result && result.status === 200) {
          commit("setTradingHours", result.data.openingHours);
          commit("setSettingsRetrievedDate", new Date());
          commit("setVatRate", result.data.vat);
          commit("setDeliveryCharges", result.data.deliveryCharges);
          commit("setPayNowStatus", result.data.payNowStatus);
          commit(
            "setDeliveryServiceAvailable",
            result.data.deliveryServiceStatus
          );
          commit("setCurrentCampaignSpecials", result.data.campaignSpecials);
          return true;
        }
        // } else {
        //   return true;
        // }
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
          if (!result.data) {
            dispatch('clearBasket')
          }
          return true
        }
      } catch (ex) {
        console.log("retrieveDefaultSettings -> ex", ex);
        return true
      }
    },
    async retrieveSpecialImageUrl({ commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        const result = await axios.axiosInstance.get(
          `${generalSettingsUrl}/retrieve-campaign-image/${payload}`
        );
        if (result && result.status === 200) {
          console.log("result", result)
          return result.data.campaignImage;
        }
      } catch (ex) {
        console.log("retrieveSpecialImageUrl -> ex", ex);
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
    },
    setPayNowStatus(state, payload) {
      state.payNowStatus = payload;
    },
    setDeliveryServiceAvailable(state, payload) {
      state.deliveryServiceAvailable = payload;
    },
    setCurrentCampaignSpecials(state, payload) {
      state.currentCampaignSpecials = payload;
    }
  }
};

export default generalSettings;
