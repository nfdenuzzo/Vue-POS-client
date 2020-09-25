import axios from "../httpClient/config.js";
import {
  Loading,
  QSpinnerGears
} from 'quasar'

const adminGeneralSettingsUrl = "/admin-options/general-settings";

const adminGeneralSettings = {
  state: {
    adminCurentVATRate: null,
    adminOpeningTimes: [],
    adminPlatformStatus: null,
    adminDeliveryCharges: []
  },
  getters: {
    getAdminDeliveryCharges: state => {
      return state.adminDeliveryCharges;
    },
    getAdminPlatformStatus: state => {
      return state.adminPlatformStatus;
    },
    getAdminTradingHours: state => {
      return state.adminOpeningTimes;
    },
    getAdminVATRate: state => {
      return state.adminCurentVATRate;
    }
  },
  actions: {
    async retrieveAdminGeneralSettings(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        const result = await axios.axiosInstance.get(
          `${adminGeneralSettingsUrl}`
        );
        if (result && result.status === 200) {
          commit("setAdminPlatformStatus", result.data.orderingActive);
          commit("setAdminTradingHours", result.data.openingHours);
          commit("setAdminVatRate", result.data.vat);
          commit("setAdminDeliveryCharges", result.data.deliveryCharges);
          return true;
        }
      } catch (ex) {
        console.log("retrieveAdminGeneralSettings -> ex", ex);
        return false;
      }
    },
    async updateTradingHours(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        const result = await axios.axiosInstance.put(
          `${adminGeneralSettingsUrl}/update-trading-hours`,
          payload
        );
        if (result && result.status === 200) {
          dispatch("retrieveAdminGeneralSettings");
          return result;
        }
      } catch (ex) {
        console.log("updateTradingHours -> ex", ex);
      }
    },
    async updatePlatformStatus(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        Loading.show({
          spinner: QSpinnerGears,
          spinnerColor: payload ? "positive" : "logoRed",
          backgroundColor: "darkgrey",
          message: "Processing."
        });
        const result = await axios.axiosInstance.put(
          `${adminGeneralSettingsUrl}/update-platform-status`,
          { platformStatus: payload }
        );
        if (result && result.status === 200) {
          await dispatch("retrieveAdminGeneralSettings");
          Loading.hide()
          return result;
        }
      } catch (ex) {
        console.log("updatePlatformStatus -> ex", ex);
        Loading.hide()
      }
    },
    async updateVATRate({ commit, dispatch, rootState, rootGetters }, payload) {
      try {
        const result = await axios.axiosInstance.put(
          `${adminGeneralSettingsUrl}/update-vatrate`,
          { vatRate: payload }
        );
        if (result && result.status === 200) {
          dispatch("retrieveAdminGeneralSettings");
          return result;
        }
      } catch (ex) {
        console.log("updateVATRate -> ex", ex);
      }
    },
    async updateDeliveryCharge(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        const result = await axios.axiosInstance.put(
          `${adminGeneralSettingsUrl}/update-delivery-area`,
          payload
        );
        if (result && result.status === 200) {
          await dispatch("retrieveAdminGeneralSettings");
          return result;
        }
      } catch (ex) {
        console.log("updateDeliveryCharge -> ex", ex);
      }
    },
    async deleteDeliveryCharge(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        const result = await axios.axiosInstance.delete(
          `${adminGeneralSettingsUrl}/delete-delivery-charge`,
          { data: { _id: payload } }
        );
        if (result && result.status === 200) {
          dispatch("retrieveAdminGeneralSettings");
          return result;
        }
      } catch (ex) {
        console.log("deleteDeliveryCharge -> ex", ex);
      }
    }
  },
  mutations: {
    setAdminTradingHours(state, payload) {
      state.adminOpeningTimes = payload;
    },
    setAdminPlatformStatus(state, payload) {
      state.adminPlatformStatus = payload;
    },
    setAdminVatRate(state, payload) {
      state.adminCurentVATRate = payload;
    },
    setAdminDeliveryCharges(state, payload) {
      state.adminDeliveryCharges = payload;
    }
  }
};

export default adminGeneralSettings;
