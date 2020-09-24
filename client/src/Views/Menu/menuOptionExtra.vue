<template>
  <div class="text-color">
    <div
      class="text-subtitle1 text-weight-bolder q-pt-md text-center"
      v-if="!mixin_tabMenuDisplay"
    >
      Extras
    </div>
    <div class="row q-pt-md justify-center">
      <div class="col-xs-12 col-sm-12 col-md-10">
        <div class="row justify-center">
          <div
            class="col-xs-12 col-sm-12 col-md-4 q-pt-md"
            v-for="extra in getExtrasList"
            :key="extra._id"
          >
            <menu-item
              @viewDetails="viewDetails"
              :item="kidsItem"
              v-if="extra._id"
            />
          </div>
        </div>
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
  name: "extras",
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
      viewMenuItemsDetails: false
    };
  },
  computed: {
    getExtrasList() {
      return sortBy(this.$store.getters.getExtraMenuItems, function(x) {
        return x.name.toLowerCase();
      });
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
