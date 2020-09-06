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
      console.log(
        "getActiveOrders -> this.$store.getters.getActiveOrders",
        this.$store.getters.getActiveOrders
      );
      return this.$store.getters.getActiveOrders;
    }
  },
  watch: {},
  beforeCreate() {},
  created() {},
  async beforeMount() {
    // await this.$store.dispatch("retrieveActiveOrders");
  },
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  methods: {}
};
</script>
<style></style>
