<template>
  <q-card :style="!$q.platform.is.mobile ? 'width: 750px;' : ''">
    <q-stepper
      v-model="step"
      ref="stepper"
      color="primary"
      animated
      :vertical="$q.screen.lt.sm"
      :horizontal="$q.screen.gt.sm"
      :keep-alive="true"
    >
      <q-step
        :name="1"
        title="Confirm Order"
        icon="fas fa-receipt"
        :done="step > 1"
        done-color="positive"
        active-color="logoRed"
      >
        <div class="row">
          <div class="col-xs-12">
            <basket
              :viewPurchaseProcess="viewPurchaseProcess"
              v-if="step === 1"
            />
          </div>
        </div>
      </q-step>

      <q-step
        :name="2"
        title="Order Details"
        icon="fas fa-receipt"
        done-color="positive"
        active-color="logoRed"
        :done="step > 2"
      >
        <div class="row">
          <div class="col-xs-12">
            <orderDetails
              @proceedPaymentMethod="proceedPaymentMethod"
              ref="orderDetail"
              v-if="step === 2"
            />
          </div>
        </div>
      </q-step>

      <q-step
        :name="3"
        title="Payment Method"
        icon="far fa-credit-card"
        done-color="positive"
        active-color="logoRed"
      >
        This step won't show up because it is disabled.
      </q-step>

      <template v-slot:navigation>
        <div clas="q-pa-md">
          <div class="row justify-center q-pb-md">
            <q-stepper-navigation>
              <div class="row justify-center q-pb-md q-pt-sm">
                <q-btn
                  v-if="step > 1"
                  color="logoRed"
                  @click="$refs.stepper.previous()"
                  label="Back"
                  class="q-mr-lg text-capitalize"
                />
                <q-btn
                  v-else
                  label="Order more"
                  @click="closeDialog"
                  color="logoRed"
                  class="q-mr-lg text-capitalize"
                />
                <q-btn
                  v-if="hasItemsInOrder"
                  :label="getLabel"
                  @click="proceed"
                  color="positive"
                  class="text-capitalize"
                  :disabled="!$store.getters.getAuth"
                />
              </div>
            </q-stepper-navigation>
          </div>
        </div>
      </template>
    </q-stepper>
  </q-card>
</template>

<script>
import basket from "../Basket/Basket.vue";
import orderDetails from "../orderDetails/orderDetails.vue";
export default {
  components: {
    basket,
    orderDetails
  },
  mixins: [],
  props: {
    viewPurchaseProcess: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {
      step: 1,
      orderDetails: {}
    };
  },
  computed: {
    hasItemsInOrder() {
      return this.$store.getters.getBasket.length > 0;
    },
    getLabel() {
      if (!this.$store.getters.getAuth) {
        return "Login Required";
      } else if (this.step === 1) {
        return "Order Details";
      } else if (this.step === 2) {
        return "Payment Methods";
      } else {
        return "Pay";
      }
    }
  },
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {
    this.$store.dispatch("retrieveMyProfile");
    this.$store.dispatch("retrieveDefaultSettings", { forceRefresh: true });
  },
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  methods: {
    closeDialog() {
      this.$emit("update:viewPurchaseProcess", false);
    },
    proceedPaymentMethod(dto) {
      this.orderDetails = dto;
      this.step++;
    },
    proceed() {
      if (this.step === 1) {
        this.step++;
      } else if (this.step === 2) {
        this.$refs.orderDetail.onSubmit();
      } else if (this.step === 3) {
        const orderSpecs = this.orderDetails
        orderSpecs.orderDetails = this.$store.getters.getBasket;
        this.$store.dispatch('placeOrder', orderSpecs)
      }
    }
  }
};
</script>
<style lang="scss">
.q-stepper--horizontal .q-stepper__step-inner {
  padding: 0px;
}
</style>
