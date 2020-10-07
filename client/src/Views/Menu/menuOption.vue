<template>
  <div class="text-color">
    <div
      class="row q-pt-md justify-center"
      v-touch-swipe.mouse.left.right="handleSwipe"
    >
      <div class="col-xs-12 col-sm-12 col-md-10">
        <div class="row justify-center">
          <div
            class="col-xs-12 col-sm-12 col-md-4 q-pt-md"
            v-for="menuItem in getItemsList"
            :key="menuItem._id"
          >
            <menu-item
              @viewDetails="viewDetails"
              :item="menuItem"
              v-if="menuItem._id"
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
      menuItemDetails: null,
      requiredListName: null
    };
  },
  computed: {
    getItemsList() {
      if (this.requiredListName) {
        return sortBy(this.$store.getters[this.requiredListName], function(x) {
          return x.name.toLowerCase();
        });
      } else {
        return [];
      }
    }
  },
  watch: {
    $route() {
      this.$store
        .dispatch("retrieveRequiredListName", this.$route.name)
        .then(resp => {
          this.requiredListName = resp;
        });
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    // children routes will use the watcher main routes will use the mounted
    this.$store
      .dispatch("retrieveRequiredListName", this.$route.name)
      .then(resp => {
        this.requiredListName = resp;
      });
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  methods: {
    async handleSwipe({ evt, ...info }) {
      if (info.direction === "left") {
        const path = this.$route.path;
        let result = await this.$store.dispatch("navigateNextTab", path);
        if (result) {
          this.$router.push(result);
        }
      } else if (info.direction === "right") {
        const path = this.$route.path;
        let result = await this.$store.dispatch("navigateTabBack", path);
        if (result) {
          this.$router.push(result);
        }
      }
    },
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
