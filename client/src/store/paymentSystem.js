import axios from "../httpClient/config.js";
import { Notify } from "quasar";

const paymentSystemUrl = "/response";

const paymentSystem = {
  state: {
    tranId: null
  },
  getters: {
    getTranId: state => {
      return state.tranId;
    }
  },
  actions: {
    async updateOutstandingTransaction(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        const result = await axios.axiosInstance.put(
          `${paymentSystemUrl}/update-payment-status`,
          { tranId: rootGetters.getTranId }
        );
        if (result && result.status === 200) {
          if (result.data === "CANCELLED") {
            Notify.create({
              type: "negative",
              message:
                "There was a problem processing your payment please try again",
              color: "logoRed"
            });
          }
          commit("setTranId", null);
        }
      } catch (ex) {
        console.log("retrieveDefaultSettings -> ex", ex);
      }
    },
    async queryTransactionResult(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        const result = await axios.axiosInstance.get(
          `${paymentSystemUrl}/query-payment-status/${payload}`
        );
        if (result && result.status === 200) {
          return result.data;
        }
      } catch (ex) {
        console.log("retrieveDefaultSettings -> ex", ex);
      }
    }
  },
  mutations: {
    setTranId(state, payload) {
      state.tranId = payload;
    }
  }
};

export default paymentSystem;
