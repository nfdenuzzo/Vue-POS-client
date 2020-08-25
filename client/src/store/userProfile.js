import axios from "../httpClient/config.js";
import { cachingTimeExpired } from "../utils/cachingCheck.js";

const myProfileUrl = "/my-profile";

const myProfile = {
  state: {
    myProfiile: [],
    myProfileRetrievedDate: null
  },
  getters: {
    getMyProfiile: state => {
      return state.myProfiile;
    },
    getMyProfileRetrievedDate: state => {
      return state.myProfileRetrievedDate;
    }
  },
  actions: {
    async retrieveMyProfile(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        if (
          cachingTimeExpired(rootGetters.getMyProfileRetrievedDate) ||
          (payload && payload.forceRefresh)
        ) {
          const result = await axios.axiosInstance.get(`${myProfileUrl}`);
          if (result && result.status === 200) {
            commit("setMyProfile", result.data);
            commit(
              "setMyProfileRetrievedDate",
              new Date().toLocaleString("en-ZA")
            );
            return true;
          }
        } else {
          return true;
        }
      } catch (ex) {
        console.log("retrieveUsersList -> ex", ex);
        return false;
      }
    },
    async updateUserProfile(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        const result = await axios.axiosInstance.put(
          `${myProfileUrl}/update-profile`,
          payload
        );
        if (result && result.status === 200) {
          commit("retrieveMyProfile", { forceRefresh: true });
          return result;
        }
      } catch (ex) {
        console.log("updateMyProfile -> ex", ex);
      }
    }
  },
  mutations: {
    setMyProfile(state, payload) {
      state.myProfiile = payload;
    },
    setMyProfileRetrievedDate(state, payload) {
      state.myProfileRetrievedDate = payload;
    }
  }
};

export default myProfile;
