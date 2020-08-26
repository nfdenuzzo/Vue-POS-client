import axios from "../httpClient/config.js";
import { cachingTimeExpired } from "../utils/cachingCheck.js";

const generalBasketUrl = "/general-settings";

const basket = {
  state: {
    basket: []
  },
  getters: {
    getBasket: state => {
      return state.basket;
    }
  },
  actions: {
    async addToBasket({ commit, dispatch, rootState, rootGetters }, payload) {
      commit("setNewBasketItem", payload);
    },
    async removeFromBasket(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      const existingItem = rootGetters.getBasket.find(x => x.id === payload.id);
      if (existingItem) {
        const results = rootState.basket.filter(
          item => item.id !== existingItem.id
        );
        commit("updateBasket", results);
      }
    },
    async clearBasket(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      commit("updateBasket", []);
    }
  },
  mutations: {
    setNewBasketItem(state, payload) {
      state.basket.push(payload);
    },
    updateBasket(state, payload) {
      state.basket = payload;
    }
  }
};

export default basket;
