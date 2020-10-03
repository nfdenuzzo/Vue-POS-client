<template>
  <div class="text-color">
    <div class="text-weight-bolder q-pb-xs q-pt-md text-center text-h6">
      Delivery Service Status
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-11 text-color text-center">
        <q-card style="height:80px;">
          <div class="row justify-center">
            <span class="q-pt-sm">
              <span>
                Delivery Status is set -
              </span>
              <q-toggle
                v-model="deliveryServiceStatus"
                color="green"
                size="xl"
              />
              <strong
                :class="
                  deliveryServiceStatus ? 'text-positive' : 'text-logoRed'
                "
              >
                {{ deliveryServiceStatus ? "ON" : "OFF" }}
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
    deliveryServiceStatus: {
      get() {
        return this.$store.getters.getAdminDeliveryServiceAvailable;
      },
      set(val) {
        this.$store.dispatch("updateDeliveryServiceAvailability", val);
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
