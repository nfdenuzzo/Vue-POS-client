import axios from "../httpClient/config.js";
import { cachingTimeExpired } from "../utils/cachingCheck.js";

const menuItemsUrl = "/menu-items";

const menuItems = {
  state: {
    menuItemsRetrievedDate: null,
    extraMenuItems: [],
    kidsMenuItems: [],
    chefSpecialOtherMenuItems: [],
    chefSpecialPorkMenuItems: [],
    chefSpecialMeatMenuItems: [],
    chefSpecialChickenMenuItems: [],
    chefSpecialBurgerMenuItems: [],
    dessertMenuItems: [],
    seafoodMenuItems: [],
    pastaMenuItems: [],
    startersMenuItems: [],
    classicPizzasMenuItems: [],
    signaturePizzasMenuItems: [],
    pizzaBreadsMenuItems: [],
    // retrieved-dates
    extraMenuItemsRetrievedDate: null,
    kidsMenuItemsRetrievedDate: null,
    chefSpecialOtherMenuItemsRetrievedDate: null,
    chefSpecialPorkMenuItemsRetrievedDate: null,
    chefSpecialMeatMenuItemsRetrievedDate: null,
    chefSpecialChickenMenuItemsRetrievedDate: null,
    chefSpecialBurgerMenuItemsRetrievedDate: null,
    dessertMenuItemsRetrievedDate: null,
    seafoodMenuItemsRetrievedDate: null,
    pastaMenuItemsRetrievedDate: null,
    startersMenuItemsRetrievedDate: null,
    classicPizzasMenuItemsRetrievedDate: null,
    signaturePizzasMenuItemsRetrievedDate: null,
    pizzaBreadsMenuItemsRetrievedDate: null
  },
  getters: {
    getExtraMenuItems: state => {
      return state.extraMenuItems;
    },
    getKidsMenuItems: state => {
      return state.kidsMenuItems;
    },
    getChefSpecialOtherMenuItems: state => {
      return state.chefSpecialOtherMenuItems;
    },
    getChefSpecialPorkMenuItems: state => {
      return state.chefSpecialPorkMenuItems;
    },
    getChefSpecialMeatMenuItems: state => {
      return state.chefSpecialMeatMenuItems;
    },
    getChefSpecialChickenMenuItems: state => {
      return state.chefSpecialChickenMenuItems;
    },
    getChefSpecialBurgerMenuItems: state => {
      return state.chefSpecialBurgerMenuItems;
    },
    getDessertMenuItems: state => {
      return state.dessertMenuItems;
    },
    getSeafoodMenuItems: state => {
      return state.seafoodMenuItems;
    },
    getPastaMenuItems: state => {
      return state.pastaMenuItems;
    },
    getStartersMenuItems: state => {
      return state.startersMenuItems;
    },
    getClassicPizzasMenuItems: state => {
      return state.classicPizzasMenuItems;
    },
    getSignaturePizzasMenuItems: state => {
      return state.signaturePizzasMenuItems;
    },
    getPizzaBreadsMenuItems: state => {
      return state.pizzaBreadsMenuItems;
    },
    getStartersMenuItemRetrievedDate: state => {
      return state.startersMenuItemsRetrievedDate;
    },
    getClassicPizzasMenuItemRetrievedDate: state => {
      return state.classicPizzasMenuItemsRetrievedDate;
    },
    getPizzaBreadsMenuItemRetrievedDate: state => {
      return state.pizzaBreadsMenuItemsRetrievedDate;
    },
    getSignaturePizzasMenuItemRetrievedDate: state => {
      return state.signaturePizzasMenuItemsRetrievedDate;
    },
    getPastaMenuItemRetrievedDate: state => {
      return state.pastaMenuItemsRetrievedDate;
    },
    getSeafoodMenuItemRetrievedDate: state => {
      return state.seafoodMenuItemsRetrievedDate;
    },
    getDessertMenuItemRetrievedDate: state => {
      return state.dessertMenuItemsRetrievedDate;
    },
    getChefSpecialMeatMenuItemRetrievedDate: state => {
      return state.chefSpecialMeatMenuItemsRetrievedDate;
    },
    getChefSpecialChickenMenuItemRetrievedDate: state => {
      return state.chefSpecialChickenMenuItemsRetrievedDate;
    },
    getChefSpecialPorkMenuItemRetrievedDate: state => {
      return state.chefSpecialPorkMenuItemsRetrievedDate;
    },
    getChefSpecialBurgerMenuItemRetrievedDate: state => {
      return state.chefSpecialBurgerMenuItemsRetrievedDate;
    },
    getChefSpecialOtherMenuItemRetrievedDate: state => {
      return state.chefSpecialOtherMenuItemsRetrievedDate;
    },
    getKidsMenuItemRetrievedDate: state => {
      return state.kidsMenuItemsRetrievedDate;
    },
    getExtraMenuItemRetrievedDate: state => {
      return state.extraMenuItemsRetrievedDate;
    },
  },
  actions: {
    async retrieveMenuItems(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      try {
        const retrievedDate = await dispatch(
          "getDifferentMenuItemsRetrievedDate",
          payload.value
        );
        const category = payload.value;
        if (
          cachingTimeExpired(retrievedDate) ||
          (payload && payload.forceRefresh)
        ) {
          const result = await axios.axiosInstance.get(`${menuItemsUrl}/${category}`);
          if (result && result.status === 200) {
            await dispatch("updateSpecificCategoryMenuItems", payload.value);
            await dispatch("sortAndSetDifferentMenuItems", {
              data: result.data,
              value: payload.value
            });
            return true;
          }
        } else {
          return true;
        }
      } catch (ex) {
        console.log("retrieveMenuItems -> ex", ex);
        return false;
      }
    },
    async getDifferentMenuItemsRetrievedDate(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      switch (payload) {
        case "starters":
          return rootGetters.getStartersMenuItemRetrievedDate;
        case "classic-pizzas":
          return rootGetters.getClassicPizzasMenuItemRetrievedDate;
        case "pizza-breads":
          return rootGetters.getPizzaBreadsMenuItemRetrievedDate;
        case "signature-pizzas":
          return rootGetters.getSignaturePizzasMenuItemRetrievedDate;
        case "pasta":
          return rootGetters.getPastaMenuItemRetrievedDate;
        case "seafood":
          return rootGetters.getSeafoodMenuItemRetrievedDate;
        case "desserts":
          return rootGetters.getDessertMenuItemRetrievedDate;
        case "chef-special-meat":
          return rootGetters.getChefSpecialMeatMenuItemRetrievedDate;
        case "chef-special-chicken":
          return rootGetters.getChefSpecialChickenMenuItemRetrievedDate;
        case "chef-special-pork":
          return rootGetters.getChefSpecialPorkMenuItemRetrievedDate;
        case "chef-special-burgers":
          return rootGetters.getChefSpecialBurgerMenuItemRetrievedDate;
        case "chef-special-other":
          return rootGetters.getChefSpecialOtherMenuItemRetrievedDate;
        case "kids-menu":
          return rootGetters.getKidsMenuItemRetrievedDate;
        case "extras":
          return rootGetters.getExtraMenuItemRetrievedDate;
        default:
      }
    },
    async sortAndSetDifferentMenuItems(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      switch (payload.value) {
        case "starters":
          commit("setStartersMenuItems", payload.data);
          commit(
            "setStartersMenuItemRetrievedDate",
            new Date().toLocaleString("en-ZA")
          );
          return;
        case "classic-pizzas":
          commit("setClassicPizzasMenuItems", payload.data);
          commit(
            "setClassicPizzasMenuItemRetrievedDate",
            new Date().toLocaleString("en-ZA")
          );
          return;
        case "pizza-breads":
          commit("setPizzaBreadsMenuItems", payload.data);
          commit(
            "setPizzaBreadsMenuItemRetrievedDate",
            new Date().toLocaleString("en-ZA")
          );
          return;
        case "signature-pizzas":
          commit("setSignaturePizzasMenuItems", payload.data);
          commit(
            "setSignaturePizzasMenuItemRetrievedDate",
            new Date().toLocaleString("en-ZA")
          );
          return;
        case "pasta":
          commit("setPastaMenuItems", payload.data);
          commit(
            "setPastaMenuItemRetrievedDate",
            new Date().toLocaleString("en-ZA")
          );
          return;
        case "seafood":
          commit("setSeafoodMenuItems", payload.data);
          commit(
            "setSeafoodMenuItemRetrievedDate",
            new Date().toLocaleString("en-ZA")
          );
          return;
        case "desserts":
          commit("setDessertMenuItems", payload.data);
          commit(
            "setDessertMenuItemRetrievedDate",
            new Date().toLocaleString("en-ZA")
          );
          return;
        case "chef-special-meat":
          commit("setChefSpecialMeatMenuItems", payload.data);
          commit(
            "setChefSpecialMeatMenuItemRetrievedDate",
            new Date().toLocaleString("en-ZA")
          );
          return;
        case "chef-special-chicken":
          commit("setChefSpecialChickenMenuItems", payload.data);
          commit(
            "setChefSpecialChickenMenuItemRetrievedDate",
            new Date().toLocaleString("en-ZA")
          );
          return;
        case "chef-special-pork":
          commit("setChefSpecialPorkMenuItems", payload.data);
          commit(
            "setChefSpecialPorkMenuItemRetrievedDate",
            new Date().toLocaleString("en-ZA")
          );
          return;
        case "chef-special-burgers":
          commit("setChefSpecialBurgerMenuItems", payload.data);
          commit(
            "setChefSpecialBurgerMenuItemRetrievedDate",
            new Date().toLocaleString("en-ZA")
          );
          return;
        case "chef-special-other":
          commit("setChefSpecialOtherMenuItems", payload.data);
          commit(
            "setChefSpecialOtherMenuItemRetrievedDate",
            new Date().toLocaleString("en-ZA")
          );
          return;
        case "kids-menu":
          commit("setKidsMenuItems", payload.data);
          commit(
            "setKidsMenuItemRetrievedDate",
            new Date().toLocaleString("en-ZA")
          );
          return;
        case "extras":
          commit("setExtraMenuItems", payload.data);
          commit(
            "setExtraMenuItemRetrievedDate",
            new Date().toLocaleString("en-ZA")
          );
          return;
        default:
        // code block
      }
    },
    async updateSpecificCategoryMenuItems(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      switch (payload) {
        case "starters":
          commit("setStartersMenuItems", []);
          commit("setStartersMenuItemRetrievedDate", null);
          return;
        case "classic-pizzas":
          commit("setClassicPizzasMenuItems", []);
          commit("setClassicPizzasMenuItemRetrievedDate", null);
          return;
        case "pizza-breads":
          commit("setPizzaBreadsMenuItems", []);
          commit("setPizzaBreadsMenuItemRetrievedDate", null);
          return;
        case "signature-pizzas":
          commit("setSignaturePizzasMenuItems", []);
          commit("setSignaturePizzasMenuItemRetrievedDate", null);
          return;
        case "pasta":
          commit("setPastaMenuItems", []);
          commit("setPastaMenuItemRetrievedDate", null);
          return;
        case "seafood":
          commit("setSeafoodMenuItems", []);
          commit("setSeafoodMenuItemRetrievedDate", null);
          return;
        case "desserts":
          commit("setDessertMenuItems", []);
          commit("setDessertMenuItemRetrievedDate", null);
          return;
        case "chef-special-meat":
          commit("setChefSpecialMeatMenuItems", []);
          commit("setChefSpecialMeatMenuItemRetrievedDate", null);
          return;
        case "chef-special-chicken":
          commit("setChefSpecialChickenMenuItems", []);
          commit("setChefSpecialChickenMenuItemRetrievedDate", null);
          return;
        case "chef-special-pork":
          commit("setChefSpecialPorkMenuItems", []);
          commit("setChefSpecialPorkMenuItemRetrievedDate", null);
          return;
        case "chef-special-burgers":
          commit("setChefSpecialBurgerMenuItems", []);
          commit("setChefSpecialBurgerMenuItemRetrievedDate", null);
          return;
        case "chef-special-other":
          commit("setChefSpecialOtherMenuItems", []);
          commit("setChefSpecialOtherMenuItemRetrievedDate", null);
          return;
        case "kids-menu":
          commit("setKidsMenuItems", []);
          commit("setKidsMenuItemRetrievedDate", null);
          return;
        case "extras":
          commit("setExtraMenuItems", []);
          commit("setExtraMenuItemRetrievedDate", null);
          return;
        default:
      }
    }
  },
  mutations: {
    setExtraMenuItems(state, payload) {
      state.extraMenuItems = payload;
    },
    setKidsMenuItems(state, payload) {
      state.kidsMenuItems = payload;
    },
    setChefSpecialOtherMenuItems(state, payload) {
      state.chefSpecialOtherMenuItems = payload;
    },
    setChefSpecialPorkMenuItems(state, payload) {
      state.chefSpecialPorkMenuItems = payload;
    },
    setChefSpecialMeatMenuItems(state, payload) {
      state.chefSpecialMeatMenuItems = payload;
    },
    setChefSpecialChickenMenuItems(state, payload) {
      state.chefSpecialChickenMenuItems = payload;
    },
    setChefSpecialBurgerMenuItems(state, payload) {
      state.chefSpecialBurgerMenuItems = payload;
    },
    setDessertMenuItems(state, payload) {
      state.dessertMenuItems = payload;
    },
    setSeafoodMenuItems(state, payload) {
      state.seafoodMenuItems = payload;
    },
    setPastaMenuItems(state, payload) {
      state.pastaMenuItems = payload;
    },
    setStartersMenuItems(state, payload) {
      state.startersMenuItems = payload;
    },
    setClassicPizzasMenuItems(state, payload) {
      state.classicPizzasMenuItems = payload;
    },
    setSignaturePizzasMenuItems(state, payload) {
      state.signaturePizzasMenuItems = payload;
    },
    setPizzaBreadsMenuItems(state, payload) {
      state.pizzaBreadsMenuItems = payload;
    },
    // retrieve dates
    setStartersMenuItemRetrievedDate(state, payload) {
      state.startersMenuItemsRetrievedDate = payload;
    },
    setClassicPizzasMenuItemRetrievedDate(state, payload) {
      state.classicPizzasMenuItemsRetrievedDate = payload;
    },
    setPizzaBreadsMenuItemRetrievedDate(state, payload) {
      state.pizzaBreadsMenuItemsRetrievedDate = payload;
    },
    setSignaturePizzasMenuItemRetrievedDate(state, payload) {
      state.signaturePizzasMenuItemsRetrievedDate = payload;
    },
    setPastaMenuItemRetrievedDate(state, payload) {
      state.pastaMenuItemsRetrievedDate = payload;
    },
    setSeafoodMenuItemRetrievedDate(state, payload) {
      state.seafoodMenuItemsRetrievedDate = payload;
    },
    setDessertMenuItemRetrievedDate(state, payload) {
      state.dessertMenuItemsRetrievedDate = payload;
    },
    setChefSpecialMeatMenuItemRetrievedDate(state, payload) {
      state.chefSpecialMeatMenuItemsRetrievedDate = payload;
    },
    setChefSpecialChickenMenuItemRetrievedDate(state, payload) {
      state.chefSpecialChickenMenuItemsRetrievedDate = payload;
    },
    setChefSpecialPorkMenuItemRetrievedDate(state, payload) {
      state.chefSpecialPorkMenuItemsRetrievedDate = payload;
    },
    setChefSpecialBurgerMenuItemRetrievedDate(state, payload) {
      state.chefSpecialBurgerMenuItemsRetrievedDate = payload;
    },
    setChefSpecialOtherMenuItemRetrievedDate(state, payload) {
      state.chefSpecialOtherMenuItemsRetrievedDate = payload;
    },
    setKidsMenuItemRetrievedDate(state, payload) {
      state.kidsMenuItemsRetrievedDate = payload;
    },
    setExtraMenuItemRetrievedDate(state, payload) {
      state.extraMenuItemsRetrievedDate = payload;
    }
  }
};

export default menuItems;
