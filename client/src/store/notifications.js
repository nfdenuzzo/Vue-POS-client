import axios from "../httpClient/config.js";
const notificationsUrl = "/notifications";

const notifications = {
  state: {},
  getters: {},
  actions: {
    async subscribeNotifications(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        const result = await axios.axiosInstance.post(
          `${notificationsUrl}/createSubscription?${payload}`
        );
        console.log("result", result)
        if (result && result.status === 200) {
          return true;
        } else {
          return false;
        }
      } catch (ex) {
        console.log("subscribeNotifications -> ex", ex);
        return false;
      }
    }
  },
  mutations: {}
};

export default notifications;
