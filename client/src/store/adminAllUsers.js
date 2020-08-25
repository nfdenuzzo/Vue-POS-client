import axios from "../httpClient/config.js";
import { cachingTimeExpired } from "../utils/cachingCheck.js";

const usersAdminUrl = "/admin-options/users";

const adminAllUsers = {
  state: {
    userListRetrievedDate: null,
    userList: []
  },
  getters: {
    getUserList: state => {
      return state.userList;
    },
    getUserListRetrievedDate: state => {
      return state.userListRetrievedDate;
    }
  },
  actions: {
    async retrieveUsersList(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        if (
          cachingTimeExpired(rootGetters.getUserListRetrievedDate) ||
          (payload && payload.forceRefresh)
        ) {
          const result = await axios.axiosInstance.get(
            `${usersAdminUrl}/current-users`
          );
          if (result && result.status === 200) {
            commit("setUserList", result.data);
            commit(
              "setUserListRetrievedDate",
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
    }
  },
  mutations: {
    setUserList(state, payload) {
      state.userList = payload;
    },
    setUserListRetrievedDate(state, payload) {
      state.userListRetrievedDate = payload;
    }
  }
};

export default adminAllUsers;
