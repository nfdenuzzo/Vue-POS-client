export default {
  methods: {
    getSelectedExtraMainOptions() {
      return this.$store.getters.getSideItems
        .filter(
          item =>
            !item.disabled && item.addonCategory.name.includes("main-toppings")
        )
        .filter(item =>
          this.selectedMenuItemDetails.extras.extraMainToppings.includes(
            item._id
          )
        )
        .map(x => {
          return {
            label: x.name,
            price: x.price,
            value: x._id
          };
        });
    },
    getSelectedExtraDessertToppings() {
      return this.$store.getters.getSideItems
        .filter(
          item =>
            !item.disabled &&
            item.addonCategory.name.includes("dessert-toppings")
        )
        .filter(item =>
          this.selectedMenuItemDetails.extras.extraDessertToppings.includes(
            item._id
          )
        )
        .map(x => {
          return {
            label: x.name,
            price: x.price,
            value: x._id
          };
        });
    },
    getSelectedExtraPastaToppings() {
      return this.$store.getters.getSideItems
        .filter(
          item =>
            !item.disabled && item.addonCategory.name.includes("pasta-toppings")
        )
        .filter(item =>
          this.selectedMenuItemDetails.extras.extraPastaToppings.includes(
            item._id
          )
        )
        .map(x => {
          return {
            label: x.name,
            price: x.price,
            value: x._id
          };
        });
    },
    getSelectedExtraPizzaToppings() {
      return this.$store.getters.getSideItems
        .filter(
          item =>
            !item.disabled && item.addonCategory.name.includes("pizza-toppings")
        )
        .filter(item =>
          this.selectedMenuItemDetails.extras.extraPizzaToppings.includes(
            item._id
          )
        )
        .map(x => {
          return {
            label: x.name,
            price: x.price,
            value: x._id
          };
        });
    },
    getSelectedExtraSaladToppings() {
      return this.$store.getters.getSideItems
        .filter(
          item =>
            !item.disabled && item.addonCategory.name.includes("salad-toppings")
        )
        .filter(item =>
          this.selectedMenuItemDetails.extras.extraSaladToppings.includes(
            item._id
          )
        )
        .map(x => {
          return {
            label: x.name,
            price: x.price,
            value: x._id
          };
        });
    },
    getSelectedExtraBurgerToppings() {
      return this.$store.getters.getSideItems
        .filter(
          item =>
            !item.disabled &&
            item.addonCategory.name.includes("burger-toppings")
        )
        .filter(item =>
          this.selectedMenuItemDetails.extras.extraBurgerToppings.includes(
            item._id
          )
        )
        .map(x => {
          return {
            label: x.name,
            price: x.price,
            value: x._id
          };
        });
    },
    getSelectedExtraSauceOptions() {
      return this.$store.getters.getSideItems
        .filter(
          item =>
            !item.disabled && item.addonCategory.name.includes("sauce-options")
        )
        .filter(item =>
          this.selectedMenuItemDetails.extras.extraSauces.includes(item._id)
        )
        .map(x => {
          return {
            label: x.name,
            price: x.price,
            value: x._id
          };
        });
    }
  }
};
