<template>
  <div>
    <create-campaign-rule />

    <current-campaign-rules />
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
