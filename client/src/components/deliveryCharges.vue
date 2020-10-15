<template>
  <div class="text-color">
    <div class="text-weight-bolder q-pb-xs text-center text-body2">
      Delivery Rates
    </div>
    <div
      v-for="(item, index) in getDeliveryCharges"
      :key="index"
      class="text-center text-caption text-weight-bold"
    >
      <div class="row q-pt-xs justify-center">
        <div
          :class="
            !$store.getters.getAuth && drawer
              ? 'col-xs-11 col-sm-12 col-md-12 col-lg-12'
              : 'col-xs-10 col-sm-8 col-md-6 col-lg-6'
          "
        >
          <div class="row justify-center">
            <div class="text-left q-pl-sm" :class="(!$store.getters.getAuth && $route.name !== 'HomePage') && drawer ? 'col-xs-7 col-sm-6 col-md-5 col-lg-4 col-xl-3' : 'col-xs-7 col-sm-7 col-lg-4 col-xl-3'" >
              <span>
                {{ item.area }}
              </span>
            </div>
            <div class="col-xs-5 col-sm-5 col-lg-4 col-xl-3 text-right">
              <span> R {{ item.price }} </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  mixins: [],
  props: {
    drawer: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {};
  },
  computed: {
    getDeliveryCharges() {
      return this.$store.getters.getDeliveryCharges;
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
