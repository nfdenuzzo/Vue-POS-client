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
    },
    async updateOrderItemCount(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      const existingItem = rootGetters.getBasket.find(x => x.id === payload.id);
      const objIndex = rootGetters.getBasket.findIndex((obj => obj.id === payload.id));
      existingItem.quantity = payload.count;
      commit('updateSpecifiedBasketItemCount', {index: objIndex, item: existingItem})
    },
    async removeOrderItem(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      const existingItem = rootGetters.getBasket.find(x => x.id === payload.id);
      const objIndex = rootGetters.getBasket.findIndex((obj => obj.id === payload.id));
      commit('removeSpecifiedBasketItem', { index: objIndex })
    }
  },
  mutations: {
    setNewBasketItem(state, payload) {
      state.basket.push(payload);
    },
    updateBasket(state, payload) {
      state.basket = payload;
    },
    updateSpecifiedBasketItemCount(state, payload) {
      state.basket[payload.index] = payload.item;
    },
    removeSpecifiedBasketItem(state, payload) {
      state.basket.splice(payload.index, 1);
    }
  }
};

export default basket;
