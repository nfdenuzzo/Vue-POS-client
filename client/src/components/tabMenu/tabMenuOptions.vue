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
      tabOption: null,
      menuOptions: [
        { name: "Starters", path: "/menu-option-starters" },
        { name: "Pizza", path: "/menu-option-pizza" },
        { name: "Pasta", path: "/menu-option-pasta" },
        { name: "Chef Specials", path: "/menu-option-chef-specials" },
        { name: "Seafood", path: "/menu-option-seafood" },
        { name: "Kids Menu", path: "/menu-option-kids-menu" },
        { name: "Desserts", path: "/menu-option-desserts" },
        { name: "Extras", path: "/menu-option-extras" }
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
