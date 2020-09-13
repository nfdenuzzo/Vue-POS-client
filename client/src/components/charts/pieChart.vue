<script>
import { Pie } from "vue-chartjs";
export default {
  extends: Pie,
  computed: {
    getOrdersForCollection() {
      if (
        this.$store.getters.getSystemStatistics.orderTypeCounts &&
        this.$store.getters.getSystemStatistics.orderTypeCounts
          .collectionOrdersCount
      ) {
        return this.$store.getters.getSystemStatistics.orderTypeCounts
          .collectionOrdersCount;
      } else {
        return 0;
      }
    },
    getOrdersForDelivery() {
      if (
        this.$store.getters.getSystemStatistics.orderTypeCounts &&
        this.$store.getters.getSystemStatistics.orderTypeCounts
          .collectionOrdersCount
      ) {
        return this.$store.getters.getSystemStatistics.orderTypeCounts
          .deliveryOrdersCount;
      } else {
        return 0;
      }
    }
  },
  mounted() {
    this.renderChart(
      {
        labels: ["Collection", "Delivery"],
        datasets: [
          {
            backgroundColor: ["#019247", "#D32735"],
            data: [this.getOrdersForCollection, this.getOrdersForDelivery]
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false
      }
    );
  }
};
</script>

<style></style>
