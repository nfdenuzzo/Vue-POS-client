import axios from "../httpClient/config.js";

const AdminUrl = "/admin-options";

const auth = {
  state: {
    userAuthenticated: false,
    profile: null,
    userPermissions: []
  },
  getters: {
    getAuth: state => {
      return state.userAuthenticated;
    },
    getUserPermissions: state => {
      return state.userPermissions;
    },
    getProfile: state => {
      return state.profile;
    }
  },
  actions: {
    updateAuthStatus({ commit }, payload) {
      commit("setAuth", payload);
    },
    async checkUserRecords({ commit }, payload) {
      try {
        const result = await axios.axiosInstance.get(`${AdminUrl}/users`);
        if (result && result.status === 200) {
          return result;
        }
      } catch (ex) {
        console.log("checkUserRecords -> ex", ex);
        return false;
      }
    }
  },
  mutations: {
    setAuth(state, payload) {
      state.userAuthenticated = payload;
    },
    setUserPermissions(state, payload) {
      state.userPermissions = payload;
    },
    setProfile(state, payload) {
      state.profile = payload;
    }
  }
};

export default auth;
