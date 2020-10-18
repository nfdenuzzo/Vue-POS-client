<template>
  <div>
    <create-menu-item />

    <current-menu-items
      :viewDeleteDialog.sync="viewDeleteDialog"
      :viewUpdateDialog.sync="viewUpdateDialog"
    />
  </div>
</template>

<script>
export default {
  components: {
    "create-menu-item": () =>
      import(
        "../../components/adminComps/MenuItemDetails/createUpdateMenuItem.vue"
      ),
    "current-menu-items": () =>
      import(
        "../../components/adminComps/MenuItemDetails/menuItemsDataTable.vue"
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
