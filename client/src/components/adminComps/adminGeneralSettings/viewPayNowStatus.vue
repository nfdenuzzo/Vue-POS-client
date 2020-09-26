<template>
  <div class="text-color">
    <div class="text-weight-bolder q-pb-xs q-pt-md text-center text-h6">
      Pay Now Service Status
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12 text-color text-center">
        <q-card style="height:80px;">
          <div class="row justify-center">
            <span class="q-pt-sm">
              <span>
                Pay Now Service Status is set -
              </span>
              <q-toggle v-model="payNowServiceStatus" color="green" size="xl" />
              <strong
                :class="payNowServiceStatus ? 'text-positive' : 'text-logoRed'"
              >
                {{ payNowServiceStatus ? "ON" : "OFF" }}
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
    payNowServiceStatus: {
      get() {
        return this.$store.getters.getAdminPayNowStatus;
      },
      set(val) {
        this.$store.dispatch("updatePayNowOption", val);
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
