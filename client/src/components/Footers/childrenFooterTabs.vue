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
          v-for="(option, index) in childrenTabOptions"
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
      pizzaTypes: [
        { name: "Signature Pizzas", path: "/menu-option-pizza" },
        { name: "Classic Pizzas", path: "/menu-option-pizza/classic-pizzas" },
        { name: "Pizza Breads", path: "/menu-option-pizza/pizza-breads" }
      ],
      chefSpecialTypes: [
        { name: "Meat", path: "/menu-option-chef-specials" },
        { name: "Chicken", path: "/menu-option-chef-specials/chicken-dishes" },
        { name: "Pork", path: "/menu-option-chef-specials/pork-dishes" },
        { name: "Other", path: "/menu-option-chef-specials/other-dishes" },
        { name: "Burgers", path: "/menu-option-chef-specials/burgers" }
      ]
    };
  },
  computed: {
    childrenTabOptions() {
      if (this.$route.path.includes("/menu-option-pizza/")) {
        return this.pizzaTypes;
      } else {
        return this.chefSpecialTypes;
      }
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
