<template>
  <q-footer
    v-if="$q.screen.lt.md"
    style="height: 60px; !important;"
    elevated
    class="bg-grey-2"
  >
    <div class="row justify-center no-wrap">
      <div
        v-for="(item, index) in menuList"
        :key="index"
        class="row text-center q-my-sm"
      >
        <div class="col-12">
          <q-icon
            :name="item.icon"
            @click="proceedToLink(item.routeLink)"
            @mouseover="item.active = true"
            @mouseleave="item.active = false"
            :class="{ 'animated pulse': item.active }"
            :style="
              item.routeLink === $route.path ? 'color:#84754e' : 'color:#84754e'
            "
            style="font-size: 26px; cursor: pointer;"
          ></q-icon>
        </div>
        <div class="col-12">
          <q-btn
            :ripple="false"
            @click="proceedToLink(item.routeLink)"
            flat
            dense
            class="text-capitalize"
            style="font-size:10px; color:#84754e"
            >{{ $t(item.label) }}</q-btn
          >
        </div>
      </div>
    </div>
  </q-footer>
</template>

<script>
// import mainMenuMixin from "@/mixins/mainMenuMixin";
export default {
  components: {},
  mixins: [],
  data() {
    return {
      images: {
        // eslint-disable-next-line no-undef
        Logo: require("../../assets/logo.png")
      }
    };
  },
  computed: {
    menuList() {
      return [
        {
          icon: "fas fa-pizza-slice",
          label: "title_dashboard",
          routeLink: "/",
          active: false
        },
        {
          icon: "fas fa-steak",
          label: "title_orders",
          routeLink: "/orders",
          active: false
        },
        {
          icon: "fas fa-ice-cream",
          label: "title_statistics",
          routeLink: "/statistik",
          active: false
        }
      ];
    }
  },
  mounted() {},
  methods: {
    proceedToLink(link) {
      this.$router.push(link).catch(() => {});
    }
  }
};
</script>
