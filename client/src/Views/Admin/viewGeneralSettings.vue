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
            <div class="col-xs-11 col-sm-11 col-md-6">
              <delievery-charges></delievery-charges>
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
      import("../../components/adminComps/viewPlatformStatus.vue"),
    "platform-vat-rate": () =>
      import("../../components/adminComps/viewPlatformVatRate.vue"),
    "platform-trading-hours": () =>
      import("../../components/adminComps/viewPlatformTradingHours.vue"),
    "delievery-charges": () =>
      import("../../components/adminComps/viewDeliveryCharges.vue")
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