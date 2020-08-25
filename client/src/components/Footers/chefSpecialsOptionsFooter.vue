<template>
  <div container>
    <q-footer bordered class="bg-main-layout-light">
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
          v-for="(option, index) in chefSpecialTypes"
          :key="index"
          exact
          class="text-capitalize"
          :ripple="false"
        />
      </q-tabs>
    </q-footer>
  </div>
</template>
<script>
export default {
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      chefSpecialTypes: [
        { name: "Meat", path: "/menu-option-chef-specials" },
        { name: "Chicken", path: "/menu-option-chef-specials/chicken-dishes" },
        { name: "Pork", path: "/menu-option-chef-specials/pork-dishes" },
        { name: "Other", path: "/menu-option-chef-specials/other-dishes" },
        { name: "Burgers", path: "/menu-option-chef-specials/burgers" }
      ]
    };
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
<style></style>
