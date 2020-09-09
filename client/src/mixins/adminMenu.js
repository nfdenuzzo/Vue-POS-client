import { isLoggedIn } from "../utils/auth.js";
export default {
  components: {},
  mixins: [],
  props: {},
  data() {
    return {};
  },
  computed: {
    hasAccessToken() {
      return this.$store.getters.getAuth && isLoggedIn();
    },
    hasRightToViewCurrentOrders() {
      return this.hasCorrectPermissions;
    },
    hasCorrectPermissions() {
      return this.$store.getters.getUserPermissions.includes("read:systemData");
    },
    adminMainMenuItems() {
      if (this.hasAccessToken && this.hasCorrectPermissions) {
        return [
          {
            name: "Home Page",
            routeLink: "/",
            icon: "fas fa-home",
            routeName: "HomePage"
          },
          {
            name: "View Menu Categories",
            routeLink: "/view-menu-categories",
            icon: "fas fa-eye",
            routeName: "menuCategories"
          },
          {
            name: "Create Add-on Category",
            routeLink: "/create-addon-category",
            icon: "fas fa-plus-square",
            routeName: "addCategory"
          },
          {
            name: "Create Side Items",
            routeLink: "/create-side-item",
            icon: "fas fa-plus-square",
            routeName: "addSide"
          },
          {
            name: "Create Menu Item",
            routeLink: "/create-menu-item",
            icon: "fas fa-plus-square",
            routeName: "addMenuItem"
          },
          {
            name: "Current Users",
            routeLink: "/current-users",
            icon: "fas fa-users",
            routeName: "currentUsers"
          },
          {
            name: "Current Orders",
            routeLink: "/current-orders",
            icon: "fas fa-list-ol",
            routeName: "currentActiveOrders"
          },
          {
            name: "Order History",
            routeLink: "/order-history",
            icon: "fas fa-list",
            routeName: "orderHistory"
          },
          {
            name: "General Settings",
            routeLink: "/general-settings",
            icon: "fas fa-cogs",
            routeName: "generalSettings"
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
