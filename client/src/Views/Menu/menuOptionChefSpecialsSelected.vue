<template>
  <div class="text-color">
    <div class="row justify-center">
      <div
        class="col-xs-12 col-sm-12 col-md-4 q-pt-md"
        v-for="pizza in getChefSpecialsList"
        :key="pizza._id"
      >
        <menu-item @viewDetails="viewDetails" :item="pizza" v-if="pizza._id" />
      </div>
    </div>
    <q-page-scroller
      position="bottom-right"
      :scroll-offset="150"
      :offset="[18, 18]"
    >
      <q-btn
        round
        icon="keyboard_arrow_up"
        color="logoRed"
        :size="$q.screen.gt.md ? 'lg' : 'md'"
        dense
      />
    </q-page-scroller>

    <q-dialog
      v-model="viewMenuItemsDetails"
      v-if="viewMenuItemsDetails"
      :full-width="$q.platform.is.mobile ? true : false"
      :full-height="$q.platform.is.mobile ? true : false"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <menu-item-details
        :menuItemSelected="menuItemDetails"
        @closeMenuItemsDetails="closeMenuItemsDetails"
      />
    </q-dialog>
  </div>
</template>
<script>
import sortBy from "lodash/sortBy";
import computedFunctionsMixin from "../../mixins/computedFunctionsMixin.js";
export default {
  name: "chef-specials-option-selected",
  components: {
    "menu-item": () => import("../../components/MenuItem/menuItem.vue"),
    "menu-item-details": () =>
      import("../../components/MenuItem/menuItemDetails.vue")
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
      viewMenuItemsDetails: false,
      menuItemDetails: null
    };
  },
  computed: {
    getChefSpecialsList() {
      switch (this.$route.name) {
        case "meat-dishes":
          return sortBy(
            this.$store.getters.getChefSpecialMeatMenuItems,
            function(x) {
              return x.name.toLowerCase();
            }
          );
          break;
        case "chicken-dishes":
          return sortBy(
            this.$store.getters.getChefSpecialChickenMenuItems,
            function(x) {
              return x.name.toLowerCase();
            }
          );
          break;
        case "pork-dishes":
          return sortBy(
            this.$store.getters.getChefSpecialPorkMenuItems,
            function(x) {
              return x.name.toLowerCase();
            }
          );
          break;
        case "other-dishes":
          return sortBy(
            this.$store.getters.getChefSpecialOtherMenuItems,
            function(x) {
              return x.name.toLowerCase();
            }
          );
          break;
        case "burgers":
          return sortBy(
            this.$store.getters.getChefSpecialBurgerMenuItems,
            function(x) {
              return x.name.toLowerCase();
            }
          );
          break;
        default:
          return sortBy(
            this.$store.getters.getChefSpecialMeatMenuItems,
            function(x) {
              return x.name.toLowerCase();
            }
          );
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
  methods: {
    viewDetails(menuObject) {
      this.viewMenuItemsDetails = true;
      this.menuItemDetails = menuObject;
    },
    closeMenuItemsDetails() {
      this.viewMenuItemsDetails = false;
    }
  }
};
</script>
<style></style>
