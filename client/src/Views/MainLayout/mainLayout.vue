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
                  v-if="
                    (($store.getters.getAuth ||
                      !($q.screen.height > 767 && $q.screen.width > 700)) || (!$store.getters.getAuth && $route.name !== 'HomePage'))
                  "
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
                  v-if="hasItemsInOrder && $store.getters.getAuth"
                  @click="showPurchaseProcessDialog"
                  round
                  size="md"
                  icon="shopping_cart"
                  style="right:10px;"
                  class="q-mt-md q-mr-lg bg-goldBrown"
                >
                  <q-badge round color="logoRed" floating>{{
                    getItemsInOrderCount
                  }}</q-badge>
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
        v-if="
          (($store.getters.getAuth ||
            !($q.screen.height > 767 && $q.screen.width > 700)) ||
            (!$store.getters.getAuth && $route.name !== 'HomePage'))
        "
      >
        <q-scroll-area class="fit">
          <q-list padding class="menu-list">
            <div class="row justify-center" v-if="$store.getters.getAuth">
              <label
                class="text-weight-bolder text-subtitle1 text-color q-pb-sm"
              >
                {{
                  getAdminMainMenuItem.length > 0
                    ? "Admin Options"
                    : "Main Menu"
                }}
              </label>
            </div>
            <!-- admin -->
            <q-separator
              v-if="$store.getters.getAuth && getAdminMainMenuItem.length > 0"
            />
            <div
              v-if="$store.getters.getAuth && getAdminMainMenuItem.length > 0"
            >
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
            <div
              class="row justify-center q-pt-md"
              v-if="!$store.getters.getAuth && $route.name !== 'HomePage'"
            >
              <q-btn
                push
                class="text-capitalize"
                color="positive"
                label="Home Page"
                style="min-width: 100px;"
                size="md"
                @click="goHome"
              />
            </div>
            <div
              v-if="$store.getters.getAuth && getUserMainMenuItem.length > 0"
            >
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
              v-if="($q.screen.width <= 700) || (!$store.getters.getAuth && $route.name !== 'HomePage')"
              :drawer="true"
            />
            <trading-Hours
              class="q-pt-md q-pb-md"
              v-if="($q.screen.width <= 700) || (!$store.getters.getAuth && $route.name !== 'HomePage')"
              :drawer="true"
            />
            <delivery-charges
              class="q-pt-md q-pb-md"
              v-if="($q.screen.width <= 700) || (!$store.getters.getAuth && $route.name !== 'HomePage')"
              :drawer="true"
            />
            <terms-and-conditions />
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <div
            v-if="showNotificationsBanner && pushNotificationsSupported"
            class="banner-container bg-positive"
          >
            <div class="constrain">
              <q-banner class="bg-positive text-white" inline-actions dense>
                <template v-slot:avatar>
                  <q-avatar size="40px" color="white">
                    <q-img contain :src="images.Logo"></q-img>
                  </q-avatar>
                </template>

                <b> Would you like to enable notifications?</b>

                <template v-slot:action>
                  <q-btn
                    @click="enableNotifications"
                    label="Yes"
                    class="q-px-sm text-capitalize"
                    dense
                    flat
                  />
                  <q-btn
                    @click="showNotificationsBanner = false"
                    label="Later"
                    class="q-px-sm text-capitalize"
                    dense
                    flat
                  />
                  <q-btn
                    @click="neverShowNotificationsBanner"
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
        <tab-menu-options v-if="mixin_tabMenuDisplay" />
        <transition name="component-fade" mode="out-in">
          <router-view />
        </transition>
        <q-dialog
          v-model="viewPurchaseProcess"
          persistent
          :full-width="$q.platform.is.mobile ? true : false"
          :full-height="$q.platform.is.mobile ? true : false"
          transition-show="slide-up"
          transition-hide="slide-down"
        >
          <purchaseProcess
            v-if="viewPurchaseProcess"
            :viewPurchaseProcess.sync="viewPurchaseProcess"
          />
        </q-dialog>
        <q-dialog
          v-model="viewPaymentStatusDialog"
          persistent
          :full-width="$q.platform.is.mobile ? true : false"
          :full-height="$q.platform.is.mobile ? true : false"
          transition-show="slide-up"
          transition-hide="slide-down"
        >
          <payment-result
            v-if="viewPaymentStatusDialog"
            :viewPaymentStatusDialog.sync="viewPaymentStatusDialog"
            :paymentResultSuccessful.sync="paymentResultSuccessful"
          />
        </q-dialog>
      </q-page-container>

      <q-footer class="bg-transparent">
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
          v-if="!$q.platform.is.ios && showAppInstallBanner"
        >
          <div class="banner-container bg-positive">
            <div class="constrain">
              <q-banner class="bg-positive text-white" inline-actions dense>
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
        <div
          class="row"
          v-if="!showAppInstallBanner && $route.name === 'HomePage'"
        >
          <div class="col-xs-12 text-right q-px-md text-color no-wrap">
            <q-icon
              size="12px"
              name="fas fa-circle"
              :color="getOnlineStatus ? 'positive' : 'logoRed'"
            >
              <q-tooltip self="top middle" content-class="bg-white">
                <span class="text-color">
                  {{ getOnlineStatus ? "Server: Online" : "Server: Offline" }}
                </span>
              </q-tooltip>
            </q-icon>
            <span> v{{ getLatestVersion }} </span>
          </div>
        </div>
        <div
          v-if="
            $q.platform.is.ios &&
              $q.platform.is.safari &&
              $q.platform.is.mobile &&
              showAppInstallBanner &&
              !getStandAloneStatus
          "
        >
          <div class="row justify-center">
            <div
              class="col-xs-12 col-md-4 text-center bg-positive"
              style="max-height:70px; min-height:70px; border-radius: 15px;"
            >
              <div class="row text-white">
                <div class="col-xs-12 text-right q-pr-md q-pt-xs">
                  <q-btn
                    icon="close"
                    flat
                    round
                    dense
                    size="sm"
                    @click="neverShowAppInstallBanner"
                  />
                </div>
              </div>
              <div class="text-white" style="margin-top:-17px;">
                Install this webapp on your iPhone,
                <br />
                Tap
                <q-img
                  class="q-mb-xs"
                  height="22px"
                  width="22px"
                  :src="images.AppleShareIcon"
                ></q-img>
                and then add to homescreen
              </div>
            </div>
          </div>
          <div class="row justify-center">
            <div
              style="
              width: 0; 
              height: 0;
              border-left: 20px solid transparent;
              border-right: 20px solid transparent;
              border-top: 20px solid #019247;"
            ></div>
          </div>
        </div>
      </q-footer>
    </q-layout>
  </div>
</template>

<script>
import computedFunctionsMixin from "../../mixins/computedFunctionsMixin.js";
import adminMenu from "../../mixins/adminMenu.js";
import userMenu from "../../mixins/userMenu.js";
const getLogout = () => import("../../utils/auth.js");
const getUrlBase64ToUint8Array = () => import("../../utils/webpushUtil.js");
import { checkBasketExpiry } from "../../utils/checkBasket.js";
import { QSpinnerHourglass } from "quasar";
const isInStandaloneMode = () =>
  "standalone" in window.navigator && window.navigator.standalone;
let deferredPrompt;
export default {
  name: "MainLayout",
  mixins: [computedFunctionsMixin, adminMenu, userMenu],
  components: {
    purchaseProcess: () =>
      import("../../components/PurchaseProcess/purchaseProcessSteps.vue"),
    "delivery-charges": () => import("../../components/deliveryCharges.vue"),
    "payment-result": () => import("../../components/paymentResult.vue"),
    "trading-Hours": () => import("../../components/tradingHours.vue"),
    "cooking-time-info": () => import("../../components/cookingTimeInfo.vue"),
    "tab-menu-options": () =>
      import("../../components/tabMenu/tabMenuOptions.vue"),
    "terms-and-conditions": () =>
      import("../../components/TandCs/privacyPolicyAndTermsAndConditions.vue")
  },
  computed: {
    getLatestVersion() {
      return process.env.VUE_APP_APP_V;
    },
    serviceWorkerSupported() {
      if ("serviceWorker" in navigator) return true;
      return false;
    },
    pushNotificationsSupported() {
      if ("PushManager" in window) return true;
      return false;
    },
    getAdminMainMenuItem() {
      return this.adminMainMenuItems;
    },
    getUserMainMenuItem() {
      return this.userMainMenuItems;
    },
    hasItemsInOrder() {
      return this.$store.getters.getBasket != null
        ? this.$store.getters.getBasket.length > 0
        : false;
    },
    getItemsInOrderCount() {
      return this.$store.getters.getBasket.reduce(
        (a, b) => +a + +b.quantity,
        0
      );
    },
    getOnlineStatus() {
      return navigator.onLine;
    },
    getStandAloneStatus() {
      return isInStandaloneMode();
    }
  },
  data() {
    return {
      images: {
        // eslint-disable-next-line no-undef
        Logo: require("../../assets/logo-min.png"),
        AppleShareIcon: require("../../assets/shareIcon-min.png")
      },
      viewPurchaseProcess: false,
      showAppInstallBanner: false,
      showNotificationsBanner: false,
      viewPaymentStatusDialog: false,
      paymentResultSuccessful: false,
      menuDrawerOpen: false
    };
  },
  beforeMount() {
    if (this.$store.getters.getAuth) {
      checkBasketExpiry();
      this.$store.dispatch("retrieveDefaultSettings");
      this.$store.dispatch("retrievePlatformStatus");
    }
  },
  async mounted() {
    // payment -> the response form payment gateway redirect sends us here with a query in the url
    /// the tr query is the orderId we will use to query the payment status when we return to this page
    if (this.$route.query && this.$route.query.tr) {
      this.$q.loading.show({
        spinner: QSpinnerHourglass,
        spinnerColor: "positive",
        backgroundColor: "darkgrey",
        message: "Processing...."
      });
      const result = await this.$store.dispatch(
        "queryTransactionResult",
        this.$route.query.tr
      );
      if (result) {
        // if the  transaction was successfuly we can then clear the basket
        this.$store.commit("updateBasket", []);
      }
      this.$q.loading.hide();
      this.viewPaymentStatusDialog = true;
      this.paymentResultSuccessful = result;
      this.$store.commit("setTranId", null);
    }
    // check if user has pressed back from payment gateway
    if (this.$store.getters.getTranId) {
      this.$store.dispatch("updateOutstandingTransaction");
    }
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
          let showInstallBannerTest = this.$q.localStorage.getItem(
            "neverShowAppInstallBanner"
          );
          if (!showInstallBannerTest) this.showAppInstallBanner = true;
        }, 2000);
      });

      if (this.$q.platform.is.ios && this.$q.platform.is.mobile) {
        setTimeout(() => {
          let showInstallBannerTest = this.$q.localStorage.getItem(
            "neverShowAppInstallBanner"
          );
          if (!showInstallBannerTest) this.showAppInstallBanner = true;
        }, 2000);
      }
    }
  },
  watch: {
    "$store.getters.getAuth"() {
      if (this.$store.getters.getAuth) {
        this.initNotificationsBanner();
      }
    },
    viewPurchaseProcess() {
      if (this.viewPurchaseProcess) {
        this.$store.commit("setViewingPurchaseProcess", true);
      } else {
        this.$store.commit("setViewingPurchaseProcess", false);
      }
    }
  },
  methods: {
    async showPurchaseProcessDialog() {
      let result = await checkBasketExpiry();
      if (!result) {
        this.viewPurchaseProcess = true;
      }
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
          this.showAppInstallBanner = false;
        }
      });
    },
    neverShowAppInstallBanner() {
      this.$q.localStorage.set("neverShowAppInstallBanner", true);
      this.showAppInstallBanner = false;
    },
    async handleLogout() {
      const logout = await getLogout().then(resp => resp.logout);
      logout();
    },
    proceedToLink(link) {
      this.$router.push(link).catch(() => {});
    },
    goHome() {
      this.menuDrawerOpen = false;
      this.$router.push("/").catch(() => {});
    },
    initNotificationsBanner() {
      let neverShowNotificationsBanner = this.$q.localStorage.getItem(
        "neverShowNotificationsBanner"
      );

      if (!neverShowNotificationsBanner) {
        this.showNotificationsBanner = true;
      }
    },
    async enableNotifications() {
      if (this.pushNotificationsSupported) {
        Notification.requestPermission(async result => {
          this.neverShowNotificationsBanner();
          if (result == "granted") {
            this.checkForExistingPushSubscription();
          }
        });
      }
    },
    checkForExistingPushSubscription() {
      if (this.serviceWorkerSupported && this.pushNotificationsSupported) {
        let reg;
        navigator.serviceWorker.ready
          .then(swreg => {
            reg = swreg;
            return swreg.pushManager.getSubscription();
          })
          .then(sub => {
            this.createPushSubscription(reg);
          });
      }
    },
    async createPushSubscription(reg) {
      const vapidPublicKey =
        "BJeT3WbOLmulqq1RNixIGxdtDcO7oxIZ2XYzZtk5MV0ucrbMrGIq-JLW26x53JTh33hBeoI_aOu31XM8Z3Mq2kE";
      const urlBase64ToUint8Array = await getUrlBase64ToUint8Array().then(
        resp => resp.urlBase64ToUint8Array
      );
      const vapidPublicKeyConverted = urlBase64ToUint8Array(vapidPublicKey);
      reg.pushManager
        .subscribe({
          applicationServerKey: vapidPublicKeyConverted,
          userVisibleOnly: true
        })
        .then(async newSub => {
          const qs = require("qs");
          const newSubData = newSub.toJSON(),
            newSubDataQS = qs.stringify(newSubData);
          const payload = {
            subscriptionObj: newSubDataQS,
            isMobile: this.$q.platform.is.mobile,
            isDesktop: !this.$q.platform.is.mobile
          };
          let result = await this.$store.dispatch(
            "subscribeNotifications",
            payload
          );
          if (result) {
            this.displayGrantedNotification();
          }
        })
        .catch(err => {
          console.log("err: ", err);
        });
    },
    displayGrantedNotification() {
      if (this.serviceWorkerSupported && this.pushNotificationsSupported) {
        navigator.serviceWorker.ready.then(swreg => {
          swreg.showNotification("You're subscribed to notifications!", {
            body: "Thanks for subscribing!",
            icon: "icons/icon-128x128.png",
            image: "icons/icon-128x128.png",
            badge: "icons/icon-128x128.png",
            dir: "ltr",
            lang: "en-US",
            vibrate: [100, 50, 200],
            tag: "confirm-notification",
            renotify: true
          });
        });
      }
    },
    neverShowNotificationsBanner() {
      this.showNotificationsBanner = false;
      this.$q.localStorage.set("neverShowNotificationsBanner", true);
    }
  }
};
</script>
<style lang="scss"></style>
