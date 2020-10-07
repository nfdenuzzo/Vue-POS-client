const other = {
  state: {
    menuOptions: [
      { name: "Starters", path: "/menu-option-starters" },
      { name: "Pizza", path: "/menu-option-pizza" },
      { name: "Pasta", path: "/menu-option-pasta" },
      { name: "Chef Specials", path: "/menu-option-chef-specials" },
      { name: "Seafood", path: "/menu-option-seafood" },
      { name: "Kids Menu", path: "/menu-option-kids-menu" },
      { name: "Desserts", path: "/menu-option-desserts" },
      { name: "Extras", path: "/menu-option-extras" }
    ]
  },
  getters: {
    getMenuOptions: state => {
      return state.menuOptions;
    }
  },
  actions: {
    async navigateNextTab(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      let currentIndex = rootGetters.getMenuOptions.findIndex(
        x => x.path === payload || `${x.path}/` === payload
      );
      if (currentIndex < 7) {
        return rootGetters.getMenuOptions[currentIndex + 1].path;
      } else {
        return false;
      }
    },
    async navigateTabBack(
      { commit, dispatch, rootState, rootGetters },
      payload
    ) {
      let currentIndex = rootGetters.getMenuOptions.findIndex(
        x => x.path === payload || `${x.path}/` === payload
      );
      if (currentIndex > 0) {
        return rootGetters.getMenuOptions[currentIndex - 1].path;
      } else {
        return false;
      }
    }
  },
  mutations: {}
};

export default other;
