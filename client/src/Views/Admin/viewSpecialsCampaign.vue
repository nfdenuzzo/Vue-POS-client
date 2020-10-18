<template>
  <div>
    <create-campaign-rule />

    <current-campaign-rules
      :viewDeleteDialog.sync="viewDeleteDialog"
      :viewUpdateDialog.sync="viewUpdateDialog"
    />
  </div>
</template>

<script>
export default {
  components: {
    "create-campaign-rule": () =>
      import(
        "../../components/adminComps/SpecialRules/createUpdateSpecialRules.vue"
      ),
    "current-campaign-rules": () =>
      import(
        "../../components/adminComps/SpecialRules/specialRulesDataTable.vue"
      )
  },
  mixins: [],
  beforeRouteLeave(to, from, next) {
    if (this.viewUpdateDialog || this.viewDeleteDialog) {
      this.viewUpdateDialog = false;
      this.viewDeleteDialog = false;
      next(false);
    } else {
      next();
    }
  },
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
