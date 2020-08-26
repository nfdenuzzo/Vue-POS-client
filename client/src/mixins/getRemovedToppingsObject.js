import _ from "lodash";
export default {
  methods: {
    getRemovedPastaToppings() {
      return this.getPastaToppingsObject(
        this.menuItemDetails.chosenPastaToppings
      ).filter(
        item =>
          !this.selectedMenuItemDetails.selectedPastaToppings.includes(
            item.value
          )
      );
    },
    getRemovedPizzaToppings() {
      return this.getPizzaToppingsObject(
        this.menuItemDetails.chosenPizzaToppings
      ).filter(
        item =>
          !this.selectedMenuItemDetails.selectedPizzaToppings.includes(
            item.value
          )
      );
    },
    getRemovedMainToppings() {
      return this.getMainToppingsObject(
        this.menuItemDetails.chosenMainToppings
      ).filter(
        item =>
          !this.selectedMenuItemDetails.selectedMainToppingOptions.includes(
            item.value
          )
      );
    },
    getRemovedBurgerToppings() {
      return this.getBurgerToppingsObject(
        this.menuItemDetails.chosenBurgerToppings
      ).filter(
        item =>
          !this.selectedMenuItemDetails.selectedBurgerToppings.includes(
            item.value
          )
      );
    }
  }
};
