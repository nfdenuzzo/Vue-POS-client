<template>
  <div>
    <create-addon-cat />

    <current-addon-categories
      :viewDeleteDialog.sync="viewDeleteDialog"
      :viewUpdateDialog.sync="viewUpdateDialog"
    />
  </div>
</template>

<script>
export default {
  components: {
    "create-addon-cat": () =>
      import(
        "../../components/adminComps/AddonCatDetails/createUpdateAddonCatItem.vue"
      ),
    "current-addon-categories": () =>
      import(
        "../../components/adminComps/AddonCatDetails/addOnItemsDataTable.vue"
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
