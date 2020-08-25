<template>
  <div>
      <create-addon-cat />

      <current-addon-categories />
  </div>
</template>

<script>
export default {
  components: {
    "create-addon-cat": () =>
      import("../../components/adminComps/AddonCatDetails/createUpdateAddonCatItem.vue"),
    "current-addon-categories": () =>
      import("../../components/adminComps/AddonCatDetails/addOnItemsDataTable.vue")
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