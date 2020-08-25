<template>
  <div class="text-color">
    <div class="text-weight-bolder q-pb-xs q-pt-md text-center text-h6">
      Platform Status
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-11 text-color text-center">
        <q-card style="height:80px;">
          <div class="row justify-center">
            <span class="q-pt-sm">
              <span>
                Platform is set -
              </span>
              <q-toggle v-model="platformActive" color="green" size="xl" />
              <strong
                :class="platformActive ? 'text-positive' : 'text-logoRed'"
              >
                {{ platformActive ? "ON" : "OFF" }}
              </strong>
            </span>
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  mixins: [],
  props: {},
  data() {
    return {};
  },
  computed: {
    platformActive: {
      get() {
        return this.$store.getters.getAdminPlatformStatus;
      },
      set(val) {
        this.$store.dispatch("updatePlatformStatus", val);
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
</script>
<style></style>
