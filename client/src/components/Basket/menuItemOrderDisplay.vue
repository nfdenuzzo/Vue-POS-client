<template>
  <div class="text-color q-pa-sm">
    <div class="col-xs-10">
      <div class="row">
        <div class="col-xs-8 text-subtitle1 text-weight-bolder q-pb-sm q-pt-xs">
          {{ menuItemDetails.name }}
        </div>
        <div
          class="col-xs-4 text-right text-weight-bolder text-subtitle1 q-pt-xs "
          :class="{ 'q-pr-lg': !$q.platform.is.mobile && !viewingOrderHistory }"
        >
          R {{ menuItemDetails.price }}
        </div>
      </div>
      <div class="row">
        <div class="col-xs-7 q-pb-sm q-pt-xs">
          {{ menuItemDetails.description }}
        </div>
        <div
          class="col-xs-5 text-right text-weight-bolder text-subtitle1"
          :class="{ 'q-pt-xs': !viewingOrderHistory }"
        >
          <q-btn
            round
            v-if="!viewingOrderHistory"
            dense
            :size="$q.screen.lt.md ? 'sm' : 'md'"
            color="logoRed"
            icon="fas fa-minus"
            @click="decrementItems(menuItemDetails.id)"
            :disable="!$store.getters.getOrderingActive"
          />
          <label
            class="q-mt-sm q-px-sm text-color text-weight-bolder text-subtitle1"
            v-if="!viewingOrderHistory"
          >
            {{ menuItemDetails.quantity }}
          </label>
          <label class="text-color text-weight-bold text-caption" v-else>
            Quantity: {{ menuItemDetails.quantity }}
          </label>
          <q-btn
            dense
            v-if="!viewingOrderHistory"
            round
            :size="$q.screen.lt.md ? 'sm' : 'md'"
            color="positive"
            icon="fas fa-plus"
            @click="incrementItems(menuItemDetails.id)"
          />
        </div>
      </div>
      <div class="row q-py-sm">
        <div class="col-xs-12 q-pb-sm q-pt-xs text-right q-pr-md">
          <q-btn
            v-if="!viewingOrderHistory"
            outline
            size="xs"
            color="logoRed"
            label="Delete"
            class="text-capitalize text-weight-bolder"
            @click="removeItem(menuItemDetails.id)"
          />
        </div>
      </div>
      <div v-if="menuItemDetails.removedPizzaToppings.length > 0">
        <div
          class="row"
          v-for="(itemRemoved, index) in menuItemDetails.removedPizzaToppings"
          :key="index"
        >
          No {{ itemRemoved.label }}
        </div>
      </div>
      <div v-if="menuItemDetails.removedSaladToppings.length > 0">
        <div
          class="row"
          v-for="(itemRemoved, index) in menuItemDetails.removedSaladToppings"
          :key="index"
        >
          No {{ itemRemoved.label }}
        </div>
      </div>
      <div v-if="menuItemDetails.removedPastaToppings.length > 0">
        <div
          class="row"
          v-for="(itemRemoved, index) in menuItemDetails.removedPastaToppings"
          :key="index"
        >
          No {{ itemRemoved.label }}
        </div>
      </div>
      <div v-if="menuItemDetails.removedMainToppings.length > 0">
        <div
          class="row"
          v-for="(itemRemoved, index) in menuItemDetails.removedMainToppings"
          :key="index"
        >
          No {{ itemRemoved.label }}
        </div>
      </div>
      <div v-if="menuItemDetails.removedBurgerToppings.length > 0">
        <div
          class="row"
          v-for="(itemRemoved,
          index) in menuItemDetails.removedBurgerToppingsremovedBurgerToppings"
          :key="index"
        >
          No {{ itemRemoved.label }}
        </div>
      </div>

      <br />

      <div class="row" v-if="menuItemDetails.chosenBastingStyleOption">
        Chosen basting - {{ menuItemDetails.chosenBastingStyleOption }}
      </div>

      <div class="row" v-if="menuItemDetails.chosenEggStyleOption">
        Egg prepared - {{ menuItemDetails.chosenEggStyleOption }}
      </div>

      <div class="row" v-if="menuItemDetails.chosenFishStyleOption">
        Fish prepared - {{ menuItemDetails.chosenFishStyleOption }}
      </div>

      <div class="row" v-if="menuItemDetails.chosenMeatStyleOption">
        Meat prepared - {{ menuItemDetails.chosenMeatStyleOption }}
      </div>

      <div class="row" v-if="menuItemDetails.chosenPastaOption">
        Pasta type - {{ menuItemDetails.chosenPastaOption }}
      </div>

      <div class="row" v-if="menuItemDetails.chosenSauceOption">
        Chosen Sauce - {{ menuItemDetails.chosenSauceOption }}
      </div>

      <div class="row" v-if="menuItemDetails.chosenSideOption">
        Chosen side - {{ menuItemDetails.chosenSideOption }}
      </div>

      <div class="row text-body2 text-weight-bold q-py-xs" v-if="hasExtras">
        Selected Extras
      </div>

      <div class="row" v-if="menuItemDetails.makeCalzone">
        <div class="col-xs-6">
          Make Calzone
        </div>
        <div class="col-xs-2 text-right text-weight-bold">
          R {{ menuItemDetails.calzonePrice }}
        </div>
      </div>

      <div v-if="menuItemDetails.extraBurgerToppings.length > 0">
        <div
          class="row"
          v-for="(extraItem, index) in menuItemDetails.extraBurgerToppings"
          :key="index"
        >
          <div class="col-xs-6 q-pl-sm">
            {{ extraItem.label }}
          </div>
          <div class="col-xs-2 text-right text-weight-bold">
            R {{ extraItem.price }}
          </div>
        </div>
      </div>

      <div v-if="menuItemDetails.extraDessertToppings.length > 0">
        <div
          class="row"
          v-for="(extraItem, index) in menuItemDetails.extraDessertToppings"
          :key="index"
        >
          <div class="col-xs-6 q-pl-sm">
            {{ extraItem.label }}
          </div>
          <div class="col-xs-2 text-right text-weight-bold">
            R {{ extraItem.price }}
          </div>
        </div>
      </div>

      <div v-if="menuItemDetails.extraMainOptions.length > 0">
        <div
          class="row"
          v-for="(extraItem, index) in menuItemDetails.extraMainOptions"
          :key="index"
        >
          <div class="col-xs-6 q-pl-sm">
            {{ extraItem.label }}
          </div>
          <div class="col-xs-2 text-right text-weight-bold">
            R {{ extraItem.price }}
          </div>
        </div>
      </div>

      <div v-if="menuItemDetails.extraPastaToppings.length > 0">
        <div
          class="row"
          v-for="(extraItem, index) in menuItemDetails.extraPastaToppings"
          :key="index"
        >
          <div class="col-xs-6 q-pl-sm">
            {{ extraItem.label }}
          </div>
          <div class="col-xs-2 text-right text-weight-bold">
            R {{ extraItem.price }}
          </div>
        </div>
      </div>

      <div v-if="menuItemDetails.extraPizzaToppings.length > 0">
        <div
          class="row"
          v-for="(extraItem, index) in menuItemDetails.extraPizzaToppings"
          :key="index"
        >
          <div class="col-xs-6 q-pl-sm">
            {{ extraItem.label }}
          </div>
          <div class="col-xs-2 text-right text-weight-bold">
            R {{ extraItem.price }}
          </div>
        </div>
      </div>

      <div v-if="menuItemDetails.extraSaladToppings.length > 0">
        <div
          class="row"
          v-for="(extraItem, index) in menuItemDetails.extraSaladToppings"
          :key="index"
        >
          <div class="col-xs-6 q-pl-sm">
            {{ extraItem.label }}
          </div>
          <div class="col-xs-2 text-right text-weight-bold">
            R {{ extraItem.price }}
          </div>
        </div>
      </div>

      <div v-if="menuItemDetails.extraSuaces.length > 0">
        <div
          class="row"
          v-for="(extraItem, index) in menuItemDetails.extraSuaces"
          :key="index"
        >
          <div class="col-xs-6 q-pl-sm">
            {{ extraItem.label }}
          </div>
          <div class="col-xs-2 text-right text-weight-bold">
            R {{ extraItem.price }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  mixins: [],
  props: {
    viewingOrderHistory: {
      type: Boolean,
      required: false,
      default: false
    },
    menuItemDetails: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  computed: {
    hasExtras() {
      return (
        this.menuItemDetails.makeCalzone ||
        this.menuItemDetails.extraBurgerToppings.length > 0 ||
        this.menuItemDetails.extraDessertToppings.length > 0 ||
        this.menuItemDetails.extraMainOptions.length > 0 ||
        this.menuItemDetails.extraPastaToppings.length > 0 ||
        this.menuItemDetails.extraPizzaToppings.length > 0 ||
        this.menuItemDetails.extraSaladToppings.length > 0 ||
        this.menuItemDetails.extraSuaces.length > 0
      );
    }
  },
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  methods: {
    removeItem(menuItemId) {
      this.$store.dispatch("removeOrderItem", { id: menuItemId });
    },
    incrementItems(menuItemId) {
      this.menuItemDetails.quantity = this.menuItemDetails.quantity + 1;
      this.$store.dispatch("updateOrderItemCount", {
        id: menuItemId,
        count: this.menuItemDetails.quantity
      });
    },
    decrementItems(menuItemId) {
      if (this.menuItemDetails.quantity > 1) {
        this.menuItemDetails.quantity = this.menuItemDetails.quantity - 1;
        this.$store.dispatch("updateOrderItemCount", {
          id: menuItemId,
          count: this.menuItemDetails.quantity
        });
      }
    }
  }
};
</script>
<style></style>
