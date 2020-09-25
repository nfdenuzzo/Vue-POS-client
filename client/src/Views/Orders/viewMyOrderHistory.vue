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
      <div class="col-xs-5 col-sm-5 col-md-3 col-lg-1 q-pa-md">
        <q-btn
          label="Reset"
          color="warning"
          class="q-mr-lg text-capitalize"
          @click="resetCalender"
        />
      </div>
    </div>
    <div class="q-pa-md row justify-center">
      <div
        class="col-xs-12 col-sm-12 col-md-6 col-xl-4 q-pa-md"
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
import {
  getStartOfMonth,
  helperStandardDateOnlyFormat
} from "../../utils/dateUtil.js";
import isValid from "date-fns/isValid";
import parseISO from "date-fns/parseISO";
export default {
  components: {
    "view-order": () => import("../../components/orderHistory/orderView.vue")
  },
  mixins: [],
  props: {},
  data() {
    return {
      resettingCalender: false,
      current: 1,
      page: 1,
      dateFrom: getStartOfMonth(new Date()),
      dateTo: helperStandardDateOnlyFormat(new Date())
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
      if (
        isValid(parseISO(this.dateFrom)) &&
        this.dateFrom.length === 10 &&
        !this.resettingCalender
      ) {
        this.fetchPage();
      }
    },
    dateTo() {
      if (
        isValid(parseISO(this.dateTo)) &&
        this.dateFrom.length === 10 &&
        !this.resettingCalender
      ) {
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
    resetCalender() {
      this.resettingCalender = true;
      this.dateFrom = getStartOfMonth(new Date());
      this.dateTo = helperStandardDateOnlyFormat(new Date());
      this.resettingCalender = false;
      this.fetchPage();
    },
    optionsDateToFn(date) {
      return (
        new Date(date) <= new Date() &&
        new Date(date) >= new Date(this.dateFrom)
      );
    },
    optionsDateFromFn(date) {
      return new Date(date) <= new Date();
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
        dateRange: { dateFrom: this.dateFrom, dateTo: this.dateTo }
      });
    }
  }
};
</script>
<style></style>
