export default {
  methods: {
    extraMainOptions() {
      return this.$store.getters.getSideItems
        .filter(
          item =>
            !item.disabled && item.addonCategory.name.includes("main-toppings")
        )
        .map(x => {
          return {
            label: `${x.name} (+ R ${x.price})`,
            value: x._id
          };
        });
    },
    extraDessertToppingsOptions() {
      return this.$store.getters.getSideItems
        .filter(
          item =>
            !item.disabled &&
            item.addonCategory.name.includes("dessert-toppings")
        )
        .map(x => {
          return {
            label: `${x.name} (+ R ${x.price})`,
            value: x._id
          };
        });
    },
    extraPastaToppingsOptions() {
      return this.$store.getters.getSideItems
        .filter(
          item =>
            !item.disabled && item.addonCategory.name.includes("pasta-toppings")
        )
        .map(x => {
          return {
            label: `${x.name} (+ R ${x.price})`,
            value: x._id
          };
        });
    },
    extraPizzaToppingsOptions() {
      return this.$store.getters.getSideItems
        .filter(
          item =>
            !item.disabled && item.addonCategory.name.includes("pizza-toppings")
        )
        .map(x => {
          return {
            label: `${x.name} (+ R ${x.price})`,
            value: x._id
          };
        });
    },
    extraSaladToppingsOptions() {
      return this.$store.getters.getSideItems
        .filter(
          item =>
            !item.disabled && item.addonCategory.name.includes("salad-toppings")
        )
        .map(x => {
          return {
            label: `${x.name} (+ R ${x.price})`,
            value: x._id
          };
        });
    },
    extraBurgerToppingsOptions() {
      return this.$store.getters.getSideItems
        .filter(
          item =>
            !item.disabled &&
            item.addonCategory.name.includes("burger-toppings")
        )
        .map(x => {
          return {
            label: `${x.name} (+ R ${x.price})`,
            value: x._id
          };
        });
    },
    extraSaucesOptions() {
      return this.$store.getters.getSideItems
        .filter(
          item =>
            !item.disabled && item.addonCategory.name.includes("sauce-options")
        )
        .map(x => {
          return {
            label: `${x.name} (+ R ${x.price})`,
            value: x._id
          };
        });
    }
  }
};
