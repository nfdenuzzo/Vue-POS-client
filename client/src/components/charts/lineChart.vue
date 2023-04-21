<script>
import { Line } from "vue-chartjs";
export default {
  extends: Line,
  computed: {
    getCorrespondingDay() {
      if (this.$store.getters.getSystemStatistics.monthlyDaySales.length > 0) {
        return this.$store.getters.getSystemStatistics.monthlyDaySales.map(
          item => {
            return item.date;
          }
        );
      } else {
        return 0;
      }
    },
    getCorrespondingDaySales() {
      if (this.$store.getters.getSystemStatistics.monthlyDaySales.length > 0) {
        return this.$store.getters.getSystemStatistics.monthlyDaySales.map(
          item => {
            return item.ordersTotal;
          }
        );
      } else {
        return 0;
      }
    }
  },
  mounted() {
    this.renderChart(
      {
        labels: this.getCorrespondingDay,
        datasets: [
          {
            label: "Daily Sales",
            backgroundColor: ["#18c977"],
            data: this.getCorrespondingDaySales
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          labels: {
            fontColor: 'white'
          }
        },
        scales: {
          yAxes: [{
            ticks: {
                fontColor: 'white'
            }
          }],
          xAxes: [{
            ticks: {
                fontColor: 'white',
            }
          }]
       }
      }
    );
  }
};
</script>

<style></style>
