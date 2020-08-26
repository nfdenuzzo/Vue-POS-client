export default {
  methods: {
    getPastaToppingsObject(pastaToppings) {
      return pastaToppings.map(item => {
        return {
          label: item.name,
          value: item.name
        };
      });
    },
    getPizzaToppingsObject(pizzaToppings) {
      return pizzaToppings.map(item => {
        return {
          label: item.name,
          value: item.name
        };
      });
    },
    getBurgerToppingsObject(burgerToppings) {
      return burgerToppings.map(item => {
        return {
          label: item.name,
          value: item.name
        };
      });
    },
    getMainToppingsObject(mainToppingsObject) {
      return mainToppingsObject.map(item => {
        return {
          label: item.name,
          value: item.name
        };
      });
    },
    getSauceOptionsObject(saucesObject) {
      return saucesObject.map(item => {
        return {
          label: item.name,
          value: item.name
        };
      });
    },
    getSideOptionsObject(sidesObject) {
      return sidesObject.map(item => {
        return {
          label: item.name,
          value: item.name
        };
      });
    },
    getPastaTypeOptionsObject(pastaTypeObject) {
      return pastaTypeObject.map(item => {
        return {
          label: item.name,
          value: item.name
        };
      });
    },
    getMeatStyleOptionsObject(meatStyleObject) {
      return meatStyleObject.map(item => {
        return {
          label: item.name,
          value: item.name
        };
      });
    },
    getBastingStyleOptionsObject(bastingStyleObject) {
      return bastingStyleObject.map(item => {
        return {
          label: item.name,
          value: item.name
        };
      });
    },
    getFishStyleOptionsObject(fishStyleObject) {
      return fishStyleObject.map(item => {
        return {
          label: item.name,
          value: item.name
        };
      });
    },
    getEggStyleOptionsObject(eggStyleObject) {
      return eggStyleObject.map(item => {
        return {
          label: item.name,
          value: item.name
        };
      });
    },
  }
};
