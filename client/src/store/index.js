import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import generalSettings from "./generalSettings";
import adminGeneralSettings from "./adminGeneralSettings"
import adminSideItems from "./adminSideItems";
import adminAddonCategories from "./adminAddonCategories";
import adminMenuItems from "./adminMenuItems";
import adminAllUsers from "./adminAllUsers";
import userProfile from "./userProfile";
import menuItems from "./menuItems";
import menuSideItems from "./menuSideItems";
import menuCategories from "./menuCategories";

import createPersistedState from "vuex-persistedstate";

// import example from './module-example'

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.localStorage,
      paths: [
        "auth",
        "generalSettings.openingTimes",
        "generalSettings.curentVATRate",
        "generalSettings.deliveryCharges",
        "generalSettings.settingsRetrievedDate",
        "menuItems",
        "menuSideItems",
        "menuCategories"
      ]
    })
  ],
  state: {},
  getters: {},
  actions: {},
  mutations: {},
  modules: {
    auth,
    generalSettings,
    adminGeneralSettings,
    adminSideItems,
    adminAddonCategories,
    adminMenuItems,
    adminAllUsers,
    userProfile,
    menuItems,
    menuSideItems,
    menuCategories
  }
});

//   return store
// }
