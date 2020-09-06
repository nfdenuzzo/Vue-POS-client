<template>
  <div class="text-color">
    <div class="text-weight-bolder q-pb-xs  q-pt-md text-center text-subtitle1">
      Order History {{ hasCorrectPermissions ? '' : '(Last 5)' }} 
    </div>
    <div class="q-pa-md row justify-center">
      <div
        class="col-xs-12 col-sm-12 col-md-5 q-pa-md"
        v-for="(order, index) in getMyOrderHistory"
        :key="index"
      >
        <q-card class="q-pa-xs">
          <view-order :orderSpecifications="order"></view-order>
        </q-card>
      </div>
    </div>
    <div class="q-pa-md row justify-center" v-if='hasCorrectPermissions'>
      <q-pagination
        color="logoRed"
        v-model="current"
        :max="getMyOrderHistoryPage"
        :direction-links="true"
        :boundary-links="true"
        icon-first="skip_previous"
        icon-last="skip_next"
        icon-prev="fast_rewind"
        icon-next="fast_forward"
      >
      </q-pagination>
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
    return {
      current: 1,
      page: 1
    };
  },
  computed: {
    hasCorrectPermissions() {
      return this.$store.getters.getUserPermissions.includes("read:systemData");
    },
    getMyOrderHistory() {
      return this.$store.getters.getOrderHistory.data ? this.$store.getters.getOrderHistory.data : [];
    },
    getMyOrderHistoryPage() {
      return this.$store.getters.getOrderHistory.totalPages ? this.$store.getters.getOrderHistory.totalPages : 1;
    },
  },
  watch: {
    current(to, from) {
      if (to > from) {
        this.nextPage();
      } else {
        this.previousPage();
      }
    }
  },
  beforeCreate() {},
  created() {},
  async beforeMount() {
    await this.$store.dispatch("retrieveOrderHistory");
  },
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  methods: {
    nextPage() {
      this.page += 1;
      this.fetchPage();
    },
    previousPage() {
      if (this.page > 1) {
        this.page -= 1;
        this.fetchPage();
      }
    },
    fetchPage() {
      this.$store.dispatch("retrieveOrderHistory", {
        forceRefresh: true,
        page: this.page
      });
    }
  }
};
</script>
<style></style>
