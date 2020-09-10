<template>
  <div>
    <create-side-item />

    <current-side-items />
  </div>
</template>

<script>
export default {
  components: {
    "create-side-item": () =>
      import(
        "../../components/adminComps/SideItemDetails/createUpdateSideItem.vue"
      ),
    "current-side-items": () =>
      import(
        "../../components/adminComps/SideItemDetails/sideItemsDataTable.vue"
      )
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
