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
        <div class="col-xs-10 col-sm-6 col-md-6">
          <div class="row justify-center">
            <div
              class="col-xs-4 col-sm-4 col-md-4 col-lg-4"
              :class="[
                { 'text-center': $q.screen.xs },
                { 'text-center': $q.screen.sm },
                { 'text-left': $q.screen.gt.sm }
              ]"
            >
              <span v-if="!item.closed">
                {{ item.day }}
              </span>
            </div>
            <div class="col-xs-8 col-sm-8 col-md-4 col-lg-4" v-if="item.time">
              <span v-if="!item.closed">
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
