const getIsLoggedIn = () => import("../utils/auth.js");
export default {
  components: {},
  mixins: [],
  props: {},
  data() {
    return {};
  },
  computed: {
    async hasAccessToken() {
      const isLoggedIn = await getIsLoggedIn().then(resp => resp.isLoggedIn);
      return this.$store.getters.getAuth && isLoggedIn();
    },
    hasNoPermissions() {
      return !this.$store.getters.getUserPermissions.includes(
        "read:systemData"
      );
    },
    userMainMenuItems() {
      if (this.hasAccessToken && this.hasNoPermissions) {
        return [
          {
            name: "Home Page",
            routeLink: "/",
            icon: "fas fa-home",
            routeName: "HomePage"
          },
          {
            name: "My Profile",
            routeLink: "/view-my-profile",
            icon: "fas fa-user",
            routeName: "myProfile"
          }
        ];
      } else {
        return [];
      }
    }
  },
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
