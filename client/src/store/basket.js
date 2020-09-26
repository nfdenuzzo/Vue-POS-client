const basket = {
  state: {
    basketCreateTime: null,
    basket: [],
    orderDetails: null
  },
  getters: {
    getBasket: state => {
      return state.basket;
    },
    getOrderDetails: state => {
      return state.orderDetails;
    },
    getBasketCreateTime: state => {
      return state.basketCreateTime;
    }
  },
  actions: {
    async addToBasket({ commit, dispatch, rootState, rootGetters }, payload) {
      if (rootGetters.getBasket.length === 0) {
        commit("setBasketCreateTime", new Date());
      }
      commit("setNewBasketItem", payload);
    },
    async clearBasket({ commit, dispatch, rootState, rootGetters }, payload) {
      commit("updateBasket", []);
      commit("setBasketCreateTime", null);
    },
    async updateOrderItemCount(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      const existingItem = rootGetters.getBasket.find(x => x.id === payload.id);
      const objIndex = rootGetters.getBasket.findIndex(
        obj => obj.id === payload.id
      );
      existingItem.quantity = payload.count;
      commit("updateSpecifiedBasketItemCount", {
        index: objIndex,
        item: existingItem
      });
    },
    async removeOrderItem(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      const objIndex = rootGetters.getBasket.findIndex(
        obj => obj.id === payload.id
      );
      commit("removeSpecifiedBasketItem", { index: objIndex });
    },
    async filteroutBasketItem(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      const newBasket = rootGetters.getBasket.filter(
        item => item.id !== payload
      );
      commit("updateBasket", newBasket);
    }
  },
  mutations: {
    setBasketCreateTime(state, payload) {
      state.basketCreateTime = payload;
    },
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
    },
    setOrderDetails(state, payload) {
      state.orderDetails = payload;
    }
  }
};

export default basket;
