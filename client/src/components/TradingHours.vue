<template>
  <div class="text-color">
    <div
      class="text-weight-bolder q-pb-xs text-center"
      :class="drawer ? 'text-subtitle2' : 'text-subtitle1'"
    >
      Trading Hours
    </div>
    <div
      v-for="(item, index) in getTradingHours"
      :key="index"
      class="text-center text-caption text-weight-bold"
    >
      <div class="row q-pt-xs justify-center">
        <div class="col-xs-10 col-md-8 col-lg-6">
          <div class="row justify-center">
            <div class="col-xs-7 col-sm-4 col-md-3 col-lg-3 col-xl-3 text-left">
              <span v-if="!item.closed">
                {{ item.day }}
              </span>
            </div>
            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-3 text-right" v-if="item.time">
              <span v-if="!item.closed" class="no-wrap">
                {{ item.time.start.hours }}:{{ item.time.start.min }} -
                {{ item.time.end.hours }}:{{ item.time.end.min }}
              </span>
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
    getTradingHours() {
      return this.$store.getters.getTradingHours;
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
