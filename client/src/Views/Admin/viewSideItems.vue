<template>
  <div>
    <create-side-item />

    <current-side-items
      :viewDeleteDialog.sync="viewDeleteDialog"
      :viewUpdateDialog.sync="viewUpdateDialog"
    />
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
  beforeRouteLeave(to, from, next) {
    if (this.viewUpdateDialog || this.viewDeleteDialog) {
      this.viewUpdateDialog = false;
      this.viewDeleteDialog = false;
      next(false);
    } else {
      next();
    }
  },
  mixins: [],
  props: {},
  data() {
    return {
      viewUpdateDialog: false,
      viewDeleteDialog: false
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
