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
          <div
            class="col-xs-12 text-right text-weight-bolder text-caption"
          >
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
          <div
            class="col-xs-12 text-right text-weight-bolder text-caption"
          >
            VAT {{ ($store.getters.getVATRate * 100).toFixed(0) }}% (Already Included): R {{ vatTotal }}
          </div>
        </div>
        <div class="row q-px-lg">
          <div
            class="col-xs-12 text-right text-weight-bolder text-subtitle1"
          >
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
export default {
  components: {
    "order-item-display": () => import("./menuItemOrderDisplay.vue")
  },
  mixins: [],
  props: {
    viewPurchaseProcess: {
      type: Boolean,
      default: false,
      required: true
    }
  },
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
      return (this.basketTotal * Number(this.$store.getters.getVATRate)).toFixed(2)
    },
    basketTotal() {
      return this.itemTotal + this.basketExtrasCost;
    },
    itemTotal() {
      return this.$store.getters.getBasket.reduce((a, b) => +a + (+b.price * b.quantity), 0);
    },
    basketExtrasCost() {
      let extrasCost = 0;
      this.showItemsInOrder.forEach(menuItemDetails => {
        console.log("basketExtrasCost -> menuItemDetails", menuItemDetails)
        if (menuItemDetails.makeCalzone) {
          extrasCost = extrasCost + menuItemDetails.calzonePrice
        }
        if (menuItemDetails.extraBurgerToppings.length > 0) {
          extrasCost = extrasCost + menuItemDetails.extraBurgerToppings.reduce(
            (a, b) => +a + +b.price,
            0
          );
        }
        if (menuItemDetails.extraDessertToppings.length > 0) {
          extrasCost = extrasCost + menuItemDetails.extraDessertToppings.reduce(
            (a, b) => +a + +b.price,
            0
          );
        }
        if (menuItemDetails.extraMainOptions.length > 0) {
          extrasCost = extrasCost + menuItemDetails.extraMainOptions.reduce(
            (a, b) => +a + +b.price,
            0
          );
        }
        if (menuItemDetails.extraPastaToppings.length > 0) {
          extrasCost = extrasCost + menuItemDetails.extraPastaToppings.reduce(
            (a, b) => +a + +b.price,
            0
          );
        }
        if (menuItemDetails.extraPizzaToppings.length > 0) {
          extrasCost = extrasCost + menuItemDetails.extraPizzaToppings.reduce(
            (a, b) => +a + +b.price,
            0
          );
        }
        if (menuItemDetails.extraSaladToppings.length > 0) {
          extrasCost = extrasCost + menuItemDetails.extraSaladToppings.reduce(
            (a, b) => +a + +b.price,
            0
          );
        }
        if (menuItemDetails.extraSuaces.length > 0) {
          extrasCost = extrasCost + menuItemDetails.extraSuaces.reduce(
            (a, b) => +a + +b.price,
            0
          );
        }
      });
      return extrasCost;
    }
  },
  watch: {
    hasItemsInOrder() {
      if (!this.hasItemsInOrder) {
        this.$emit("update:viewPurchaseProcess", false);
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
