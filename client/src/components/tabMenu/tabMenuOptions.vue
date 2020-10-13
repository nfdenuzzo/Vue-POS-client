<template>
  <div class="text-color">
    <q-tabs
      inline-label
      outside-arrows
      mobile-arrows
      class="bg-main-layout-light text-color shadow-2"
      active-color="logoRed"
      indicator-color="logoRed"
    >
      <q-route-tab
        :to="option.path"
        :label="option.name"
        v-for="(option, index) in menuOptions"
        :key="index"
        class="text-capitalize"
        :ripple="false"
      />
    </q-tabs>
  </div>
</template>
<script>
export default {
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      tabOption: null
    };
  },
  computed: {
    menuOptions() {
      return this.$store.getters.getMenuOptions;
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
