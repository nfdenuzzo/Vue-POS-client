<template>
  <div>
    <v-btn
      @click="refreshTableData()"
      :loading="refreshBtnLoading"
      color="warning"
      round
      class="text-capitalize"
      ><v-icon>refresh</v-icon>Refresh</v-btn
    >
  </div>
</template>

<script>
export default {
  components: {},
  mixins: [],
  props: {
    refreshBtnLoading: {
      type: Boolean,
      default: false
    }
  },
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
  methods: {
    refreshTableData() {
      this.$emit("update:refreshBtnLoading", true);
      this.$emit("refreshData", true);
    }
  }
};
</script>
<style></style>