export default {
  computed: {
    mixin_tabMenuDisplay() {
      return this.$route.path.includes("menu-option-");
    }
  }
};
