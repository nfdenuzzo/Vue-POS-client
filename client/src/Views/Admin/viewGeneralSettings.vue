<template>
  <div class="text-color">
    <div class="text-weight-bolder q-pb-xs  q-pt-md text-center text-h6">
      General Settings
    </div>
    <div class="q-pa-md row justify-center">
      <div class="col-xs-11 col-sm-11 col-md-10 text-color">
        <q-card>

          <div class="row justify-center">
            <div class="col-xs-11 col-sm-11 col-md-5">
              <platform-status></platform-status>
            </div>
            <div class="col-xs-11 col-sm-11 col-md-5">
              <platform-vat-rate></platform-vat-rate>
            </div>
          </div>

          <div class="row justify-center">
            <div class="col-xs-11 col-sm-11 col-md-5">
              <delivery-service-status></delivery-service-status>
            </div>
            <div class="col-xs-11 col-sm-11 col-md-5">
              <paynow-service-status></paynow-service-status>
            </div>
          </div>

          <div class="row justify-center">
            <div class="col-xs-11 col-sm-11 col-md-6">
              <delivery-charges></delivery-charges>
            </div>
            <div class="col-xs-10 col-sm-10 col-md-10">
              <platform-trading-hours></platform-trading-hours>
            </div>
          </div>
          
        </q-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    "platform-status": () =>
      import("../../components/adminComps/adminGeneralSettings/viewPlatformStatus.vue"),
    "platform-vat-rate": () =>
      import("../../components/adminComps/adminGeneralSettings/viewPlatformVatRate.vue"),
    "platform-trading-hours": () =>
      import("../../components/adminComps/adminGeneralSettings/viewPlatformTradingHours.vue"),
    "delivery-charges": () =>
      import("../../components/adminComps/adminGeneralSettings/viewDeliveryCharges.vue"),
    "delivery-service-status": () =>
      import("../../components/adminComps/adminGeneralSettings/viewDeliveryServiceStatus.vue"),
    "paynow-service-status": () =>
      import("../../components/adminComps/adminGeneralSettings/viewPayNowStatus.vue")
  },
  mixins: [],
  props: {},
  data() {
    return {};
  },
  computed: {},
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
<style lang="scss">
.q-table__title {
  color: $goldBrown;
  font-weight: bold;
}
.q-table--dense .q-table__top {
  padding-left: 0px;
  padding-right: 0px;
}
</style>
