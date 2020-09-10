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
        <div class="col-xs-10 col-sm-6 col-md-6">
          <div class="row justify-center">
            <div class="col-xs-4 text-center">
              <span>
                {{ item.area }}
              </span>
            </div>
            <div class="col-xs-4 text-center">
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
  props: {},
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
