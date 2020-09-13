<template>
  <div class="text-color">
    <div class="text-weight-bolder q-pb-xs  q-pt-md text-center text-h6">
      Stats
    </div>
    <div class="q-pa-md row justify-center">
      <div class="col-xs-11 col-sm-11 col-md-4 text-color">
        <q-card> Average Bill {{ getAverageBill }} </q-card>
      </div>
      <div class="col-xs-11 col-sm-11 col-md-4 text-color">
        <q-card> Total Sales {{ getTotalSales }} </q-card>
      </div>
      <div class="col-xs-11 col-sm-11 col-md-4 text-color">
        <q-card> Monthly Sales {{ getTotalSalesMonth }} </q-card>
      </div>
      <div class="col-xs-11 col-sm-11 col-md-4 text-color">
        <q-card> Top 5 Items Sold {{ getTopFiveItems }} </q-card>
      </div>

      <pieChart style="max-height:250px;"></pieChart>

      <lineChart style="max-height:250px;"></lineChart>
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
    getAverageBill() {
      if (this.getStats.averageBill) {
        return this.getStats.averageBill;
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
      if (this.getStats.TotalSalesMonth) {
        return this.getStats.TotalSalesMonth;
      } else {
        return 0;
      }
    },
    getTopFiveItems() {
      if (this.getStats.topFiveItems) {
        return this.getStats.topFiveItems;
      } else {
        return 0;
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
