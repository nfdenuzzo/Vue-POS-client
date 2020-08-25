<template>
  <div class="text-color">
    <div class="row q-pt-md justify-center">
      <div class="col-xs-12 col-sm-12 col-md-10">
        <router-view />
      </div>
    </div>
    <div>
      <chef-specials-options />
    </div>
  </div>
</template>
<script>
import computedFunctionsMixin from "../../mixins/computedFunctionsMixin.js";
export default {
  name: "chef-specials",
  components: {
    "chef-specials-options": () =>
      import("../../components/Footers/chefSpecialsOptionsFooter.vue")
  },
  beforeRouteLeave(to, from, next) {
    if (this.viewMenuItemsDetails) {
      this.viewMenuItemsDetails = false;
      next(false);
    } else {
      next();
    }
  },
  mixins: [computedFunctionsMixin],
  props: {},
  data() {
    return {
      viewMenuItemsDetails: false
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
