<template>
  <div>
    <div>
      <div class="row q-pt-md justify-center">
        <span class="text-h6 text-color text-weight-bolder">
          Welcome to
        </span>
      </div>

      <div class="row">
        <div class="col-12 no-wrap text-center">
          <span
            class="text-color text-weight-bolder"
            :class="
              $q.screen.height > 480 && $q.screen.width > 800
                ? 'text-h4'
                : 'text-h5'
            "
          >
            Black Forest Grill
          </span>
        </div>
      </div>

      <div
        class="row q-pt-sm justify-center"
        :class="{
          'q-pb-sm':
            $q.screen.height > 767 && getPlatformOpen && !$store.getters.getAuth
        }"
      >
        <div
          class="col-xs-12 text-subtitle2 text-color text-weight-bolder text-center"
        >
          Steak House and Pizzeria
        </div>
      </div>

      <div
        v-if="$store.getters.getAuth && $store.getters.getProfile.name"
        :class="{
          'q-pb-sm':
            $q.screen.height > 767 && getPlatformOpen && $store.getters.getAuth
        }"
      >
        <div class="row q-pt-sm justify-center">
          <div class="text-h6 text-color text-weight-bolder">
            Welcome {{ $store.getters.getProfile.name }}
          </div>
        </div>
      </div>
      <div class="row justify-center q-pt-sm" v-if="!getPlatformOpen">
        <q-banner
          class="bg-logoRed text-white"
          style="border-radius: 5px 5px 5px 5px"
        >
          <q-icon size="19px" name="fas fa-lock" class="q-mr-sm q-mb-xs" />
          Sorry, we are currently closed for takeaways.
        </q-banner>
      </div>

      <div
        class="row q-pt-md justify-center"
        v-for="(button, index) in getButtonOptions"
        :key="index"
      >
        <q-btn
          push
          class="text-capitalize"
          color="positive"
          :label="button.name"
          style="min-width: 200px;"
          size="md"
          @click="handler(button.action)"
        />
      </div>
    </div>
    <div>
      <div class="bg-transparent fixed-bottom absolute-bottom">
        <div
          class="row q-pa-sm text-color text-weight-bold"
          v-if="$q.screen.height > 767 && $q.screen.width > 700"
        >
          <div :class="!$q.platform.is.mobile ? 'col-xs-4' : 'col-xs-6'">
            <div class="text-subtitle1 text-weight-bolder q-pb-sm text-center">
              Contact us
            </div>
            <div class="text-body2 text-weight-bold text-center q-pb-sm">
              <q-icon size="19px" name="fas fa-phone" class="q-mr-sm q-mb-xs" />
              <a
                href="tel:0169323195"
                style="text-decoration: none;"
                class="text-color"
                >016 932 3195
              </a>
            </div>
            <trading-Hours />
          </div>
          <div v-if="!$q.platform.is.mobile" class="col-xs-4 q-mt-xl">
            <privacy-policy-and-terms-and-conditions />
          </div>
          <div :class="!$q.platform.is.mobile ? 'col-xs-4' : 'col-xs-6'">
            <div class="text-body2 text-weight-bold text-center">
              <q-icon
                size="16px"
                name="fas fa-map-marker-alt"
                class="q-mr-sm q-mb-xs"
              />
              <a
                href="https://www.google.com/maps/search/?api=1&query=blackforestgrill"
                style="text-decoration: none;"
                class="text-color"
              >
                Frikkie Meyer Blvd,<br />
                Vanderbijlpark, 1911,<br />
                South Africa
              </a>
            </div>
            <delivery-charges class="q-pt-lg" />
          </div>
        </div>
        <div class="row justify-center">
          <div class="text-body2 text-center q-mt-md">
            <span class="q-pa-xs q-pr-sm">
              <q-btn
                aria-label="google-link"
                round
                color="red"
                icon="fab fa-google"
                :ripple="false"
                size="md"
                @click="goToUrl('google')"
              />
            </span>
            <span class="q-pa-xs q-pr-sm">
              <q-btn
                aria-label="facebook-link"
                round
                color="blue"
                icon="fab fa-facebook"
                :ripple="false"
                size="md"
                @click="goToUrl('facebook')"
              />
            </span>
            <span class="q-pa-xs q-pl-sm">
              <q-btn
                aria-label="tripadvisor-link"
                round
                color="green"
                icon="fab fa-tripadvisor"
                :ripple="false"
                size="md"
                @click="goToUrl('tripadvisor')"
              />
            </span>
            <span class="q-pa-xs q-pl-sm">
              <q-btn
                round
                aria-label="instagram-link"
                style="background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)"
                icon="fab fa-instagram"
                text-color="white"
                :ripple="false"
                size="md"
                @click="goToUrl('instagram')"
              />
            </span>
            <span class="q-pa-xs q-pl-sm">
              <q-btn
                aria-label="phone-link"
                round
                color="primary"
                icon="fas fa-phone"
                :ripple="false"
                size="md"
                @click="goToUrl('phoneLink')"
              />
              <a id="phone-link" href="tel:0169323195" v-show="false" />
            </span>
          </div>
        </div>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import { isLoggedIn, login, logout } from "../utils/auth.js";
import adminMenu from "../mixins/adminMenu.js";
export default {
  name: "homepage",
  components: {
    "delivery-charges": () => import("../components/deliveryCharges.vue"),
    "trading-Hours": () => import("../components/tradingHours.vue"),
    "privacy-policy-and-terms-and-conditions": () =>
      import("../components/TandCs/privacyPolicyAndTermsAndConditions.vue")
  },
  mixins: [adminMenu],
  props: {},
  data() {
    return {
      images: {
        // eslint-disable-next-line no-undef
        Logo: require("../assets/logo.png")
      },
      error: "",
      profile: null,
      googleLink: "https://g.page/BlackForestGrill?gm",
      tripadvisorLink:
        "https://www.tripadvisor.co.uk/Restaurant_Review-g312589-d4139247-Reviews-Black_Forest_Grill-Vanderbijlpark_Gauteng.html?m=19905",
      facebookLink: "https://www.facebook.com/TheBlackForestGrill",
      isntagramLink: "https://www.instagram.com/black_forest_grill/"
    };
  },
  beforeRouteLeave(to, from, next) {
    if (this.$store.getters.getViewingPurchaseProcess) {
      next(false);
    } else {
      next();
    }
  },
  computed: {
    getPlatformOpen() {
      return this.$store.getters.getOrderingActive;
    },
    getButtonOptions() {
      let options = [];
      options.push({ name: "Menu", action: "/menu-options" });
      if (this.$store.getters.getAuth) {
        if (this.hasRightToViewCurrentOrders) {
          options.push({
            name: "View Current Orders",
            action: "/current-orders"
          });
        } else {
          options.push({
            name: "View Active Orders",
            action: "/view-my-active-orders"
          });
        }
        options.push({ name: "Sign out", action: "signout" });
      } else {
        options.push({ name: "Login / Sign-up", action: "signin" });
      }
      return options;
    }
  },
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  async mounted() {
    if (this.$route.params.checkDetails != null) {
      await this.handleUserLogin();
    }
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  methods: {
    async handleUserLogin() {
      if (this.$store.getters.getAuth) {
        const result = this.$store.dispatch("checkUserRecords");
      } else if (!this.$store.getters.getAuth) {
        logout();
      } else {
        this.$q.notify({
          type: "negative",
          message:
            "Unable to grant you access, please contact Black Forest Grill for more information",
          timeout: 4500,
          color: "logoRed"
        });
      }
    },
    handleLogin() {
      login();
    },
    handleLogout() {
      logout();
    },
    isLoggedIn() {
      return isLoggedIn();
    },
    handler(actionName) {
      switch (actionName) {
        case "signin":
          this.handleLogin();
          break;
        case "signout":
          this.handleLogout();
          this.updateAuth("logout");
          break;
        default:
          this.$router.push(actionName);
          break;
      }
    },
    goToUrl(url) {
      switch (url) {
        case "google":
          window.open(this.googleLink, "_blank");
          break;
        case "tripadvisor":
          window.open(this.tripadvisorLink, "_blank");
          break;
        case "facebook":
          window.open(this.facebookLink, "_blank");
          break;
        case "instagram":
          window.open(this.isntagramLink, "_blank");
          break;
        case "phoneLink":
          const link = document.getElementById("phone-link");
          link.click();
      }
    },
    updateAuth(action) {
      if (this.$store.getters.getProfile == null || action === "logout") {
        if (action === "logout") {
          logout();
        }
        this.$store.commit(
          "setUserPermissions",
          action === "logout" ? [] : this.permissions
        );
        this.$store.commit(
          "setProfile",
          action === "logout" ? null : this.profile
        );
      }
    }
  }
};
</script>
<style></style>
