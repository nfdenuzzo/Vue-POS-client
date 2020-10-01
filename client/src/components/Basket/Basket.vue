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
import promo from "../../mixins/promo.js"
export default {
  components: {
    "order-item-display": () => import("./menuItemOrderDisplay.vue")
  },
  mixins: [promo],
  props: {},
  data() {
    return {
      discountPrice: 0,
      discountedItems: []
    };
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
      console.log("basketTotal -> this.discountedItems", this.discountedItems)
      console.log("basketTotal ->  this.discountPrice",  this.discountPrice)
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
  },
  watch: {
    discountedItems() {
       this.discountPrice = 0;
       if (this.discountedItems && this.discountedItems.length > 0) {
        for (let i = 0; i < this.discountedItems.length; i++) {
          this.discountPrice = this.discountPrice + this.discountedItems[i].price
        };
      }
    },
    async basketTotal() {
      this.discountedItems = await this.applyPromo()
    },
    hasItemsInOrder() {
      if (!this.hasItemsInOrder) {
        this.$emit("closeViewPurchaseProcess");
      }
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  async mounted() {
    this.discountedItems = await this.applyPromo()
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  methods: {
  }
};
</script>
<style></style>
