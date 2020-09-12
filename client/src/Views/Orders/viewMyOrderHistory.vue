<template>
  <div class="text-color">
    <div class="text-weight-bolder q-pb-xs q-pt-md text-center text-subtitle1">
      Order History {{ hasCorrectPermissions ? "" : "(Last 5)" }}
    </div>
    <div class="row justify-center">
      <div class="col-xs-5 col-sm-5 col-md-3 col-lg-2 q-pa-md">
        <q-input
          outlined
          dense
          v-model="dateFrom"
          mask="date"
          :rules="['date']"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="dateFrom"
                  :options="optionsDateFromFn"
                  color="positive"
                  text-color="white"
                >
                  <div class="row justify-center">
                    <q-btn label="Close" v-close-popup color="negative" />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col-xs-5 col-sm-5 col-md-3 col-lg-2 q-pa-md">
        <q-input outlined dense v-model="dateTo" mask="date" :rules="['date']">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="dateTo"
                  :options="optionsDateToFn"
                  color="positive"
                  text-color="white"
                >
                  <div class="row justify-center">
                    <q-btn label="Close" v-close-popup color="negative" />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
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
      <div
        class="text-weight-bold q-pb-xs  q-pt-md text-center text-subtitle1"
        v-if="getMyOrderHistory.length === 0"
      >
        <q-icon
          name="fas fa-exclamation-triangle"
          class="text-logoRed"
          style="font-size: 2rem;"
        />
        <span class="q-pl-md"
          >There is currently no order history available</span
        >
      </div>
    </div>
    <div
      class="q-pa-md row justify-center"
      v-if="hasCorrectPermissions && getMyOrderHistory.length > 0"
    >
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
import moment from "moment";
import momentTZ from "moment-timezone";
export default {
  components: {
    "view-order": () => import("../../components/orderHistory/orderView.vue")
  },
  mixins: [],
  props: {},
  data() {
    return {
      current: 1,
      page: 1,
      dateFrom: momentTZ.tz("africa/Johannesburg").startOf('month').utc().format("YYYY/MM/DD"),
      dateTo: momentTZ.tz("africa/Johannesburg").format("YYYY/MM/DD")
    };
  },
  computed: {
    hasCorrectPermissions() {
      return this.$store.getters.getUserPermissions.includes("read:systemData");
    },
    getMyOrderHistory() {
      return this.$store.getters.getOrderHistory.data
        ? this.$store.getters.getOrderHistory.data
        : [];
    },
    getMyOrderHistoryPage() {
      return this.$store.getters.getOrderHistory.totalPages
        ? this.$store.getters.getOrderHistory.totalPages
        : 1;
    }
  },
  watch: {
    dateFrom() {
      if (moment(this.dateFrom).isValid() && this.dateFrom.length === 10) {
        this.fetchPage();
      }
    },
    dateTo() {
      if (moment(this.dateTo).isValid() && this.dateFrom.length === 10) {
        this.fetchPage();
      }
    },
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
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  methods: {
    optionsDateToFn(date) {
      return date <= momentTZ.tz("africa/Johannesburg").format("YYYY/MM/DD") && date >= this.dateFrom;
    },
    optionsDateFromFn(date) {
      return date <= momentTZ.tz("africa/Johannesburg").format("YYYY/MM/DD");
    },
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
        page: this.page,
        dateRange: { dateFrom: this.dateFrom,  dateTo: this.dateTo }
      });
    }
  }
};
</script>
<style></style>