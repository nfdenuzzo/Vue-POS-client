<template>
  <div class="text-color">
    <div class="text-weight-bolder q-pb-xs  q-pt-md text-center text-h6">
      Interesting Statistics
    </div>
    <div class="q-pa-md row justify-center">
      <div class="col-xs-12 col-sm-12 col-md-3 text-color q-pa-md">
        <q-card>
          <div
            class="row justify-center q-pa-md text-weight-bolder text-subtitle2"
          >
            Monthly Sales
          </div>
          <div class="row justify-center q-pa-md">
            R {{ getTotalSalesMonth.toFixed(2) }}
          </div>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-3 text-color q-pa-md">
        <q-card>
          <div
            class="row justify-center q-pa-md text-weight-bolder text-subtitle2"
          >
            Average Bill (Current Month)
          </div>
          <div class="row justify-center q-pa-md">
            R {{ getAverageMonthBill.toFixed(2) }}
          </div>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-3 text-color q-pa-md">
        <q-card>
          <div
            class="row justify-center q-pa-md text-weight-bolder text-subtitle2"
          >
            All Time Sales
          </div>
          <div class="row justify-center q-pa-md">
            R {{ getTotalSales.toFixed(2) }}
          </div>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-3 text-color q-pa-md">
        <q-card>
          <div
            class="row justify-center q-pa-md text-weight-bolder text-subtitle2"
          >
            Average Bill Total
          </div>
          <div class="row justify-center q-pa-md">
            R {{ getAverageBillTotal.toFixed(2) }}
          </div>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-4 text-color q-pa-md">
        <q-card>
          <div
            class="row justify-center q-pa-md text-weight-bolder text-subtitle2"
          >
            Top 5 Users
          </div>
          <div
            class="row justify-center q-px-md q-py-sm"
            v-for="(user, index) in getTopFiveUsers"
            :key="index"
          >
            <div class="row">
              <div class="col-xs-12">
                <span class="text-weight-bolder"> {{ index + 1 }}.</span>
                {{ user.user }},
                <span class="text-weight-bolder">Orders: </span>
                {{ user.count }}
              </div>
            </div>
          </div>
          <br />
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-4 text-color q-pa-md">
        <q-card>
          <div
            class="row justify-center q-pa-md text-weight-bolder text-subtitle2"
          >
            Top 5 Items Sold
          </div>
          <div
            class="row justify-center q-px-md q-py-sm"
            v-for="(item, index) in getTopFiveItems"
            :key="index"
          >
            <div class="row">
              <div class="col-xs-12">
                <span class="text-weight-bolder"> {{ index + 1 }}. Item:</span>
                {{ item.name }},
                <span class="text-weight-bolder">Sold: </span>
                {{ item.totalItemCount }}
              </div>
            </div>
          </div>
          <br />
        </q-card>
      </div>
    </div>
    <div class="row justify-center text-color">
      <div class="col-xs-12 col-sm-12 col-md-4 text-color q-pa-md">
        <pieChart style="max-height:250px;" />
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6 text-color q-pa-md">
        <q-card class="q-pa-md">
          <lineChart style="max-height:250px;" />
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import pieChart from "../../components/charts/pieChart.vue";
import lineChart from "../../components/charts/lineChart.vue";
export default {
  components: {
    pieChart,
    lineChart
  },
  mixins: [],
  props: {},
  data() {
    return {};
  },
  computed: {
    getStats() {
      return this.$store.getters.getSystemStatistics;
    },
    getAverageMonthBill() {
      if (this.getStats.averageMonthBill) {
        return this.getStats.averageMonthBill;
      } else {
        return 0;
      }
    },
    getAverageBillTotal() {
      if (this.getStats.averageBillTotal) {
        return this.getStats.averageBillTotal;
      } else {
        return 0;
      }
    },
    getTotalSales() {
      if (this.getStats.totalSales) {
        return this.getStats.totalSales;
      } else {
        return 0;
      }
    },
    getTotalSalesMonth() {
      if (this.getStats.totalSalesMonth) {
        return this.getStats.totalSalesMonth;
      } else {
        return 0;
      }
    },
    getTopFiveItems() {
      if (this.getStats.topFiveItems) {
        return this.getStats.topFiveItems;
      } else {
        return [];
      }
    },
    getTopFiveUsers() {
      if (this.getStats.topFiveUsers) {
        return this.getStats.topFiveUsers;
      } else {
        return [];
      }
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
  methods: {}
};
</script>
<style></style>
