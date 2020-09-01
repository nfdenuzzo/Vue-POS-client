import axios from "../httpClient/config.js";
import { cachingTimeExpired } from "../utils/cachingCheck.js";

const myProfileUrl = "/my-profile";

const myProfile = {
  state: {
    myProfile: [],
    myProfileRetrievedDate: null
  },
  getters: {
    getMyProfile: state => {
      return state.myProfile;
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
        // if (
        //   cachingTimeExpired(rootGetters.getMyProfileRetrievedDate) ||
        //   (payload && payload.forceRefresh)
        // ) {
          const result = await axios.axiosInstance.get(`${myProfileUrl}`);
          if (result && result.status === 200) {
            commit("setMyProfile", result.data);
            commit(
              "setMyProfileRetrievedDate",
              new Date().toLocaleString("en-ZA")
            );
            return true;
          }
        // } else {
        //   return true;
        // }
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
          dispatch("retrieveMyProfile", { forceRefresh: true });
          return result;
        }
      } catch (ex) {
        console.log("updateMyProfile -> ex", ex);
      }
    }
  },
  mutations: {
    setMyProfile(state, payload) {
      state.myProfile = payload;
    },
    setMyProfileRetrievedDate(state, payload) {
      state.myProfileRetrievedDate = payload;
    }
  }
};

export default myProfile;
