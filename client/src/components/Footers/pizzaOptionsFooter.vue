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
          v-for="(option, index) in pizzaTypes"
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
      tab: "Signature Pizzas",
      pizzaTypes: [
        { name: "Signature Pizzas", path: "/menu-option-pizza" },
        { name: "Classic Pizzas", path: "/menu-option-pizza/classic-pizzas" },
        { name: "Pizza Breads", path: "/menu-option-pizza/pizza-breads" }
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
