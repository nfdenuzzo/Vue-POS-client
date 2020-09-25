<template>
  <div class="text-color">
    <div class="text-weight-bolder q-pb-xs  q-pt-md text-center text-subtitle1">
      Current Active Orders
    </div>
    <div class="q-pa-md row justify-center">
      <div
        class="col-xs-12 col-sm-12 col-md-5 q-pa-md"
        v-for="(order, index) in getActiveOrders"
        :key="index"
      >
        <q-card class="q-pa-xs">
          <view-order :orderSpecifications="order"></view-order>
        </q-card>
      </div>
      <div
        class="text-weight-bold q-pb-xs  q-pt-md text-center text-subtitle1"
        v-if="getActiveOrders.length === 0"
      >
        <q-icon
          name="far fa-question-circle"
          class="text-logoGreen"
          style="font-size: 2rem;"
        />
        <span class="q-pl-md"
          >You currently have no active orders, please place an order!</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    "view-order": () => import("../../components/orderHistory/orderView.vue")
  },
  mixins: [],
  props: {},
  data() {
    return {};
  },
  computed: {
    getActiveOrders() {
      return this.$store.getters.getActiveOrders;
    }
  },
  watch: {},
  beforeCreate() {},
  created() {},
  async beforeMount() {
    await this.$store.dispatch("retrieveActiveOrders");
  },
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  methods: {}
};
</script>
<style></style>
