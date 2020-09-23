<template>
  <div>
    <create-campaign-rule />

    <!-- <current-side-items /> -->
  </div>
</template>

<script>
export default {
  components: {
    "create-campaign-rule": () =>
      import(
        "../../components/adminComps/SpecialRules/specialRules.vue"
      ),
    // "current-side-items": () =>
    //   import(
    //     "../../components/adminComps/SideItemDetails/sideItemsDataTable.vue"
    //   )
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
