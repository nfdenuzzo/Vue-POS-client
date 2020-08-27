<template>
  <div id="q-app">
    <q-layout view="lHh lpr lFf">
      <q-header
        class="bg-main-layout-light"
        :class="mixin_tabMenuDisplay ? 'shadow-1' : 'shadow-10'"
      >
        <q-toolbar class="bg-main-layout-light">
          <div class="col-xs-12">
            <div class="row">
              <div class="col-xs-1">
                <q-btn
                  flat
                  dense
                  round
                  icon="menu"
                  aria-label="Menu"
                  class="q-mt-md text-color"
                  @click="menuDrawerOpen = !menuDrawerOpen"
                  v-if="$store.getters.getAuth || $q.platform.is.mobile"
                />
              </div>
              <div class="col-xs-10 text-center">
                <img
                  :src="images.Logo"
                  no-default-spinner
                  style="height: 70px;"
                  contain
                  class="cursor-pointer"
                  @click="goHome"
                />
              </div>
              <div class="col-xs-1 text-right">
                <q-btn
                  v-if="hasItemsInOrder"
                  @click="showBasketDialog"
                  round
                  icon="shopping_cart"
                  class="q-mt-md q-mr-lg bg-goldBrown"
                >
                  <q-badge round color="logoRed" floating>{{ getItemsInOrderCount }}</q-badge>
                </q-btn>
              </div>
            </div>
          </div>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="menuDrawerOpen"
        :width="$q.screen.lt.md ? 230 : 330"
        overlay
        bordered
        behavior="mobile"
        content-class="bg-layout-color"
      >
        <q-scroll-area class="fit">
          <q-list padding class="menu-list">
            <div class="row justify-center" v-if="$store.getters.getAuth">
              <label
                class="text-weight-bolder text-subtitle1 text-color q-pb-sm"
              >
                {{ getAdminMainMenuItem.length > 0 ? "Admin Options" : "Main Menu" }}
              </label>
            </div>
            <!-- admin -->
            <q-separator
              v-if="$store.getters.getAuth && getAdminMainMenuItem.length > 0"
            />
            <div v-if="$store.getters.getAuth && getAdminMainMenuItem.length > 0">
              <q-item
                clickable
                v-ripple
                light
                v-for="(menuItem, index) in getAdminMainMenuItem"
                :key="index"
              >
                <q-item-section
                  avatar
                  :class="
                    $route.name === menuItem.routeName
                      ? 'text-logoGreen'
                      : 'text-logoRed'
                  "
                >
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section
                  class="text-color"
                  @click="proceedToLink(menuItem.routeLink)"
                >
                  {{ menuItem.name }}
                </q-item-section>
              </q-item>
              <q-separator />
            </div>
            <!-- user -->
            <q-separator
              v-if="$store.getters.getAuth && getUserMainMenuItem.length > 0"
            />
            <div v-if="$store.getters.getAuth && getUserMainMenuItem.length > 0">
              <q-item
                clickable
                v-ripple
                light
                v-for="(menuItem, index) in getUserMainMenuItem"
                :key="index"
              >
                <q-item-section
                  avatar
                  :class="
                    $route.name === menuItem.routeName
                      ? 'text-logoGreen'
                      : 'text-logoRed'
                  "
                >
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section
                  class="text-color"
                  @click="proceedToLink(menuItem.routeLink)"
                >
                  {{ menuItem.name }}
                </q-item-section>
              </q-item>
              <q-separator />
            </div>
            <div
              class="row justify-center q-pt-md"
              v-if="$store.getters.getAuth && $route.name !== 'HomePage'"
            >
              <q-btn
                push
                class="text-capitalize"
                color="positive"
                label="Logout"
                style="min-width: 100px;"
                size="md"
                @click="handleLogout"
              />
            </div>
            <cooking-time-info
              class="q-pt-lg q-pb-sm"
              v-if="$q.screen.height <= 800"
              :drawer="true"
            />
            <trading-Hours
              class="q-pt-md q-pb-md"
              v-if="$q.screen.height <= 800"
              :drawer="true"
            />
            <delivery-charges
              class="q-pt-md q-pb-md"
              v-if="$q.screen.height <= 800"
            />
            <terms-and-conditions />
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <mobile-tab-menu-options v-if="mixin_tabMenuDisplay" />
        <router-view />
        <q-dialog v-model="viewBasket"
          persistent
          :full-width="$q.platform.is.mobile ? true : false"
          :full-height="$q.platform.is.mobile ? true : false"
          transition-show="slide-up"
          transition-hide="slide-down">
          <basket v-if="viewBasket" :viewBasket.sync="viewBasket" />
        </q-dialog>
      </q-page-container>

    <q-footer
      class="bg-white"
      bordered
    >
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <div
          v-if="showAppInstallBanner"
          class="banner-container bg-positive"
        >
          <div class="constrain">
            <q-banner
              class="bg-positive text-white"
              inline-actions
              dense
            >
              <template v-slot:avatar>
                <q-avatar size="40px" color="white">
                  <q-img contain :src="images.Logo"></q-img>
                </q-avatar>
              </template>

              <b>Install Black Forest Grill App?</b>

              <template v-slot:action>
                <q-btn
                  @click="installApp"
                  label="Yes"
                  class="q-px-sm text-capitalize"
                  dense
                  flat
                />
                <q-btn
                  @click="showAppInstallBanner = false"
                  label="Later"
                  class="q-px-sm text-capitalize"
                  dense
                  flat
                />
                <q-btn
                  @click="neverShowAppInstallBanner"
                  label="Never"
                  class="q-px-sm text-capitalize"
                  dense
                  flat
                />
              </template>
            </q-banner>
          </div>
        </div>
      </transition>
    </q-footer>
    </q-layout>
  </div>
</template>

<script>
import computedFunctionsMixin from "../../mixins/computedFunctionsMixin.js";
import adminMenu from "../../mixins/adminMenu.js";
import userMenu from "../../mixins/userMenu.js";
import { logout } from "../../utils/auth.js";
let deferredPrompt;
export default {
  name: "MainLayout",
  mixins: [computedFunctionsMixin, adminMenu, userMenu],
  components: {
    "basket": () => import("../../components/Basket/Basket.vue"),
    "delivery-charges": () => import("../../components/deliveryCharges.vue"),
    "trading-Hours": () => import("../../components/tradingHours.vue"),
    "cooking-time-info": () => import("../../components/cookingTimeInfo.vue"),
    "mobile-tab-menu-options": () =>
      import("../../components/mobileTabMenu/mobileTabMenuOptions.vue"),
    "terms-and-conditions": () =>
      import("../../components/TandCs/privacyPolicyAndTermsAndConditions.vue")
  },
  computed: {
    getAdminMainMenuItem() {
      return this.adminMainMenuItems;
    },
    getUserMainMenuItem() {
      return this.userMainMenuItems;
    },
    hasItemsInOrder() {
      return (this.$store.getters.getBasket.length > 0)
    },
    getItemsInOrderCount() {
      return this.$store.getters.getBasket.length;
    },
  },
  data() {
    return {
      images: {
        // eslint-disable-next-line no-undef
        Logo: require("../../assets/logo-min.png")
      },
      viewBasket: false,
      showAppInstallBanner: false,
      menuDrawerOpen: false
    };
  },
  beforeMount() {
    this.$store.dispatch("retrieveDefaultSettings");
    this.$store.dispatch("retrievePlatformStatus");
  },
  async mounted() {
    let neverShowAppInstallBanner = this.$q.localStorage.getItem(
      "neverShowAppInstallBanner"
    );
    if (!neverShowAppInstallBanner) {
      window.addEventListener("beforeinstallprompt", e => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        // Update UI notify the user they can install the PWA
        setTimeout(() => {
          this.showAppInstallBanner = true;
        }, 2000);
      });
    }
  },
  watch: {},
  methods: {
    showBasketDialog() {
      this.viewBasket = true;
    },
    installApp() {
      // Hide the app provided install promotion
      this.showAppInstallBanner = false;
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
          this.neverShowAppInstallBanner();
        } else {
          console.log("User dismissed the install prompt");
        }
      });
    },
    neverShowAppInstallBanner() {
      this.showAppInstallBanner = false;
      this.$q.localStorage.set("neverShowAppInstallBanner", true);
    },
    handleLogout() {
      logout();
    },
    proceedToLink(link) {
      this.$router.push(link).catch(() => {});
    },
    goHome() {
      this.$router.push("/").catch(() => {});
    }
  }
};
</script>
<style lang="scss"></style>
