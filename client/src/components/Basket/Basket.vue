<template>
  <div class="text-color">
    <q-card-section class="text-color row items-center q-pb-none">
      <div class="col-xs-11">
        <div class="text-weight-bolder q-pb-xs text-center text-subtitle1">
          Your Order
        </div>
      </div>
    </q-card-section>
    <div class="text-color row items-center text-center q-pb-none">
      <div class="col-xs-11 text-weight-bold">{{ itemsInOrder }} Items</div>
    </div>
    <q-card-section class="text-color row items-center q-pa-sm">
      <div class="col-xs-12" v-if="hasItemsInOrder">
        <div class="row">
          <div
            class="col-xs-12 q-px-xs q-py-sm"
            v-for="(item, index) in showItemsInOrder"
            :key="index"
          >
            <q-card>
              <order-item-display :menuItemDetails="item" />
            </q-card>
          </div>
        </div>
        <div class="row q-pt-md q-px-lg">
          <div class="col-xs-12 text-right text-weight-bolder text-caption">
            Items Total: R {{ itemTotal }}
          </div>
        </div>
        <div class="row q-px-lg">
          <div
            class="col-xs-12 text-right text-weight-bolder text-caption"
            v-if="basketExtrasCost"
          >
            Extra's Total: R {{ basketExtrasCost }}
          </div>
        </div>
        <div class="row q-px-lg">
          <div class="col-xs-12 text-right text-weight-bolder text-caption">
            VAT {{ ($store.getters.getVATRate * 100).toFixed(2) }}% (Already
            Included): R {{ vatTotal }}
          </div>
        </div>
        <div class="row q-px-lg">
          <div class="col-xs-12 text-right text-weight-bolder text-subtitle1">
            Order Total: R {{ basketTotal }}
          </div>
        </div>
      </div>
      <div v-else>
        please select an item to order
      </div>
    </q-card-section>
  </div>
</template>

<script>
import groupBy from "lodash/groupBy";
import uniqBy from "lodash/uniqBy";
export default {
  components: {
    "order-item-display": () => import("./menuItemOrderDisplay.vue")
  },
  mixins: [],
  props: {},
  data() {
    return {};
  },
  computed: {
    hasItemsInOrder() {
      return this.$store.getters.getBasket.length > 0;
    },
    showItemsInOrder() {
      return this.$store.getters.getBasket;
    },
    itemsInOrder() {
      return this.$store.getters.getBasket.reduce(
        (a, b) => +a + +b.quantity,
        0
      );
    },
    vatTotal() {
      return (
        this.basketTotal * Number(this.$store.getters.getVATRate)
      ).toFixed(2);
    },
    basketTotal() {
      this.applyPromo;
      return this.itemTotal + this.basketExtrasCost;
    },
    itemTotal() {
      return this.$store.getters.getBasket.reduce(
        (a, b) => +a + +b.price * b.quantity,
        0
      );
    },
    basketExtrasCost() {
      let extrasCost = 0;
      this.showItemsInOrder.forEach(menuItemDetails => {
        if (menuItemDetails.makeCalzone) {
          extrasCost = extrasCost + menuItemDetails.calzonePrice;
        }
        if (menuItemDetails.extraBurgerToppings.length > 0) {
          extrasCost =
            extrasCost +
            menuItemDetails.extraBurgerToppings.reduce(
              (a, b) => +a + +b.price,
              0
            );
        }
        if (menuItemDetails.extraDessertToppings.length > 0) {
          extrasCost =
            extrasCost +
            menuItemDetails.extraDessertToppings.reduce(
              (a, b) => +a + +b.price,
              0
            );
        }
        if (menuItemDetails.extraMainOptions.length > 0) {
          extrasCost =
            extrasCost +
            menuItemDetails.extraMainOptions.reduce((a, b) => +a + +b.price, 0);
        }
        if (menuItemDetails.extraPastaToppings.length > 0) {
          extrasCost =
            extrasCost +
            menuItemDetails.extraPastaToppings.reduce(
              (a, b) => +a + +b.price,
              0
            );
        }
        if (menuItemDetails.extraPizzaToppings.length > 0) {
          extrasCost =
            extrasCost +
            menuItemDetails.extraPizzaToppings.reduce(
              (a, b) => +a + +b.price,
              0
            );
        }
        if (menuItemDetails.extraSaladToppings.length > 0) {
          extrasCost =
            extrasCost +
            menuItemDetails.extraSaladToppings.reduce(
              (a, b) => +a + +b.price,
              0
            );
        }
        if (menuItemDetails.extraSuaces.length > 0) {
          extrasCost =
            extrasCost +
            menuItemDetails.extraSuaces.reduce((a, b) => +a + +b.price, 0);
        }
      });
      return extrasCost;
    },
    applyPromo() {
      let simplifiedItems = [];
      this.showItemsInOrder.forEach(item => {
        for (var i = 0; i < item.quantity; i++) {
          simplifiedItems.push({
            itemId: item.id,
            itemName: item.name,
            categoryId: item.categoryId,
            categoryName: item.categoryName,
            price: item.price
          });
        }
      });
      console.log("applyPromo -> simplifiedItems", simplifiedItems);
      let discountItems = [];
      let promo = this.$store.getters.getCurrentCampaignSpecials;
      if (promo && promo.length > 0) {
        promo.forEach(element => {
          let repeatLoop = true;
          let queryItemsObj = JSON.parse(JSON.stringify(simplifiedItems));
          do {
          let count = [];
          // lets see how many "conditons" we need to satisfy
          if (element.buyCategories.length > 0) {
            let validIndex = [];
            let uniqueCategories = uniqBy(element.buyCategories, function (e) {
              return e._id;
            });
            uniqueCategories.forEach(cat => {
              queryItemsObj.forEach((qObj, index) => {
                if (cat._id === qObj.categoryId) {
                  validIndex.push(index);
                }
              });
            });

            if (validIndex.length >= element.buyCategories.length) {
              count.push({ index: 0, value: true });
              validIndex.sort().length = element.buyCategories.length;
            }
            
            validIndex.sort().reverse().forEach(i => {
              queryItemsObj.splice(i, 1);
            });
          } else if (element.buyCategories.length === 0) {
            count.push({ index: 0, value: true });
          }
          ///////////////////////////////////

          if (element.buyItems.length > 0) {
            let validIndex = [];
            let uniqueItems = uniqBy(element.buyItems, function (e) {
              return e._id;
            });
            uniqueItems.forEach(item => {
              queryItemsObj.forEach((qObj, index) => {
                if (item._id === qObj.itemId) {
                  validIndex.push(index);
                }
              });
            });
            if (validIndex.length >= element.buyItems.length) {
              count.push({ index: 0, value: true });
              validIndex = validIndex.sort().slice(element.buyItems.length);
            }
            
            validIndex.sort().reverse().forEach(i => {
              queryItemsObj.splice(i, 1);
            });
          } else if (element.buyItems.length === 0) {
            count.push({ index: 1, value: true });
          }
          ///////////////////////////////////
          
          if (element.getCategories.length > 0) {
            let validIndex = [];
            let uniqueCategories = uniqBy(element.getCategories, function (e) {
              return e._id;
            });
            uniqueCategories.forEach(cat => {
              queryItemsObj.forEach((qObj, index) => {
                if (cat._id === qObj.categoryId) {
                  validIndex.push(index);
                }
              });
            });

            if (validIndex.length >= element.getCategories.length) {
              count.push({ index: 0, value: true });
              validIndex.sort().length = element.getCategories.length;
            }
            
            validIndex.sort().reverse().forEach(i => {
              discountItems.push(queryItemsObj[i]);
            });
            validIndex.sort().reverse().forEach(i => {
              queryItemsObj.splice(i, 1);
            });
          } else if (element.getCategories.length === 0) {
            count.push({ index: 2, value: true });
          }
          //////////////////////////////////////////////////////

          if (element.getItems.length > 0) {
            let validIndex = [];
            let uniqueItems = uniqBy(element.getItems, function (e) {
              return e._id;
            });
            uniqueItems.forEach(item => {
              queryItemsObj.forEach((qObj, index) => {
                if (item._id === qObj.itemId) {
                  validIndex.push(index);
                }
              });
            });
            if (validIndex.length >= element.getItems.length) {
              count.push({ index: 0, value: true });
              validIndex = validIndex.sort().slice(element.getItems.length);
            }

            validIndex.sort().reverse().forEach(i => {
              discountItems.push(queryItemsObj[i]);
            });
            validIndex.sort().reverse().forEach(i => {
              queryItemsObj.splice(i, 1);
            });
          } else if (element.getItems.length === 0) {
            count.push({ index: 3, value: true });
          }

          if (count.length === 4) {
            repeatLoop = true
          } else {
            repeatLoop = false
          }
          console.log("applyPromo -> queryItemsObj", queryItemsObj)

          console.log("applyPromo -> count", count);
          console.log("discountItems", discountItems);
          } while (repeatLoop);
        });
      }
      return 0;
    }
  },
  watch: {
    hasItemsInOrder() {
      if (!this.hasItemsInOrder) {
        this.$emit("closeViewPurchaseProcess");
      }
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  methods: {}
};
</script>
<style></style>
