<template>
  <div class="text-color q-pa-sm">
    <div class="col-xs-10">
      <div class="row">
        <div class="col-xs-8 text-subtitle1 text-weight-bolder q-pb-sm q-pt-xs">
          {{ orderDetails.name }}
        </div>
        <div
          class="col-xs-4 text-right text-weight-bolder text-subtitle1 q-pt-xs "
          :class="{'q-pr-lg': !$q.platform.is.mobile}"
        >
          R {{ orderDetails.price }}
        </div>
      </div>
      <div class="row">
        <div class="col-xs-7 q-pb-sm q-pt-xs">
          {{ orderDetails.description }}
        </div>
        <div
          class="col-xs-5 text-right text-weight-bolder text-subtitle1 q-pt-xs"
        >
          <label
            class="q-mt-sm q-px-sm text-color text-weight-bolder text-subtitle1"
          >
            Quantity: {{ orderDetails.quantity }}
          </label>
        </div>
      </div>
      <div v-if="orderDetails.removedPizzaToppings.length > 0">
        <div
          class="row"
          v-for="(itemRemoved, index) in orderDetails.removedPizzaToppings"
          :key="index"
        >
          No {{ itemRemoved.label }}
        </div>
      </div>
      <div v-if="orderDetails.removedPastaToppings.length > 0">
        <div
          class="row"
          v-for="(itemRemoved, index) in orderDetails.removedPastaToppings"
          :key="index"
        >
          No {{ itemRemoved.label }}
        </div>
      </div>
      <div v-if="orderDetails.removedMainToppings.length > 0">
        <div
          class="row"
          v-for="(itemRemoved, index) in orderDetails.removedMainToppings"
          :key="index"
        >
          No {{ itemRemoved.label }}
        </div>
      </div>
      <div v-if="orderDetails.removedBurgerToppings.length > 0">
        <div
          class="row"
          v-for="(itemRemoved,
          index) in orderDetails.removedBurgerToppingsremovedBurgerToppings"
          :key="index"
        >
          No {{ itemRemoved.label }}
        </div>
      </div>

      <div class="row" v-if="orderDetails.makeCalzone">
        Make Calzone
      </div>

      <div class="row" v-if="orderDetails.chosenBastingStyleOption">
        Chosen basting - {{ orderDetails.chosenBastingStyleOption }}
      </div>

      <div class="row" v-if="orderDetails.chosenEggStyleOption">
        Egg prepared - {{ orderDetails.chosenEggStyleOption }}
      </div>

      <div class="row" v-if="orderDetails.chosenFishStyleOption">
        Fish prepared - {{ orderDetails.chosenFishStyleOption }}
      </div>

      <div class="row" v-if="orderDetails.chosenMeatStyleOption">
        Meat prepared - {{ orderDetails.chosenMeatStyleOption }}
      </div>

      <div class="row" v-if="orderDetails.chosenPastaOption">
        Pasta type - {{ orderDetails.chosenPastaOption }}
      </div>

      <div class="row" v-if="orderDetails.chosenSauceOption">
        Chosen Sauce - {{ orderDetails.chosenSauceOption }}
      </div>

      <div class="row" v-if="orderDetails.chosenSideOption">
        Chosen side - {{ orderDetails.chosenSideOption }}
      </div>

      <div class="row text-body2 text-weight-bold q-py-xs" v-if="hasExtras">
        Selected Extras
      </div>

      <div v-if="orderDetails.extraBurgerToppings.length > 0">
        <div
          class="row"
          v-for="(extraItem, index) in orderDetails.extraBurgerToppings"
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

      <div v-if="orderDetails.extraDessertToppings.length > 0">
        <div
          class="row"
          v-for="(extraItem, index) in orderDetails.extraDessertToppings"
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

      <div v-if="orderDetails.extraMainOptions.length > 0">
        <div
          class="row"
          v-for="(extraItem, index) in orderDetails.extraMainOptions"
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

      <div v-if="orderDetails.extraPastaToppings.length > 0">
        <div
          class="row"
          v-for="(extraItem, index) in orderDetails.extraPastaToppings"
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

      <div v-if="orderDetails.extraPizzaToppings.length > 0">
        <div
          class="row"
          v-for="(extraItem, index) in orderDetails.extraPizzaToppings"
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

      <div v-if="orderDetails.extraSaladToppings.length > 0">
        <div
          class="row"
          v-for="(extraItem, index) in orderDetails.extraSaladToppings"
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

      <div v-if="orderDetails.extraSuaces.length > 0">
        <div
          class="row"
          v-for="(extraItem, index) in orderDetails.extraSuaces"
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
    orderDetails: {
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
        this.orderDetails.extraBurgerToppings.length > 0 ||
        this.orderDetails.extraDessertToppings.length > 0 ||
        this.orderDetails.extraMainOptions.length > 0 ||
        this.orderDetails.extraPastaToppings.length > 0 ||
        this.orderDetails.extraPizzaToppings.length > 0 ||
        this.orderDetails.extraSaladToppings.length > 0 ||
        this.orderDetails.extraSuaces.length > 0
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
  }
};
</script>
<style></style>
