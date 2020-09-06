<template>
  <div class="text-color">
    <div class="row justify-center">
      <div
        class="col-xs-12 col-sm-12 col-md-4 q-pt-md"
        v-for="pizza in getPizzaList"
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
import _ from "lodash";
import computedFunctionsMixin from "../../mixins/computedFunctionsMixin.js";
export default {
  name: "pizza-option-selected",
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
    getPizzaList() {
      switch (this.$route.name) {
        case "signature-pizzas":
          return _.sortBy(
            this.$store.getters.getSignaturePizzasMenuItems,
            function(user) {
              return user.name.toLowerCase();
            }
          );
          break;
        case "classic-pizzas":
          return _.sortBy(
            this.$store.getters.getClassicPizzasMenuItems,
            function(user) {
              return user.name.toLowerCase();
            }
          );
          break;
        case "pizza-breads":
          return _.sortBy(this.$store.getters.getPizzaBreadsMenuItems, function(
            user
          ) {
            return user.name.toLowerCase();
          });
          break;
        default:
          return _.sortBy(this.$store.getters.getSignaturePizzas, function(
            user
          ) {
            return user.name.toLowerCase();
          });
      }
    }
  },
  watch: {
    viewMenuItemsDetails() {
      if (!this.viewMenuItemsDetails) {
        this.menuItemDetails = null;
      }
    }
  },
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
