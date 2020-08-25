<template>
  <div>
      <create-menu-item />

      <current-menu-items />
  </div>
</template>

<script>
export default {
  components: {
    "create-menu-item": () =>
      import("../../components/adminComps/MenuItemDetails/createUpdateMenuItem.vue"),
    "current-menu-items": () =>
      import("../../components/adminComps/MenuItemDetails/menuItemsDataTable.vue")
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
<style></style>