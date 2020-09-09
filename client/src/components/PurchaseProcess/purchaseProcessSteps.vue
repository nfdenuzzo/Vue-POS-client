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
              ref="basket"
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
        <purchaseSummary
          v-if="step === 3"
          :orderTotal="orderTotal"
          :orderDeliveryCharge="orderDeliveryCharge"
        />
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
                  :loading="placingOrder"
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
import purchaseSummary from "./purchaseSummary.vue";

const md5 = require("md5");
const params = new URLSearchParams({
  merchant_id: "10000100",
  merchant_key: "46f0cd694581a",
  return_url: "http://localhost:8080/",
  cancel_url: "http://localhost:8080/cancel",
  notify_url: "http://localhost:8080/success",
  name_first: "name_first",
  email_address: "email_address",
  m_payment_id: "unique_id_for_user",
  amount: "amount",
  item_name: "payment_name",
  item_description: "description_if_any",
  custom_int1: "custome_integer_value_if_any",
  custom_str1: "custome_string_value_if_any",
  custom_str2: "custome_string_value_if_any",
  passphrase: "passphrase_set_in_payfast_account"
});

// // Create an MD5 signature of it.
const MD5Signature = md5(params.toString());
export default {
  components: {
    basket,
    orderDetails,
    purchaseSummary
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
      orderDetails: {},
      placingOrder: false,
      orderTotal: 0,
      orderDeliveryCharge: 0
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
    calculateTotalAmount(basket, orderDetails) {
      console.log("calculateTotalAmount -> orderDetails", orderDetails);
      console.log("calculateTotalAmount -> basket", basket);
    },
    closeDialog() {
      this.$emit("update:viewPurchaseProcess", false);
    },
    proceedPaymentMethod(obj) {
      this.orderDetails = obj.dto;
      this.orderDeliveryCharge = obj.deliveryCost;
      this.step++;
    },
    async proceed() {
      if (this.step === 1) {
        this.orderTotal = this.$refs.basket.basketTotal;
        console.log("proceed -> this.orderTotal", this.orderTotal);
        this.step++;
      } else if (this.step === 2) {
        this.$refs.orderDetail.onSubmit();
        this.calculateTotalAmount(
          this.$store.getters.getBasket,
          this.orderDetails
        );
      } else if (this.step === 3) {
        const orderSpecs = this.orderDetails;
        orderSpecs.orderDetails = this.$store.getters.getBasket;
        this.placingOrder = true;
        const result = await this.$store.dispatch("placeOrder", orderSpecs);
        this.placingOrder = false;
        if (result) {
          if (orderSpecs.orderDetails.orderType !== "Delivery")
            this.$q.notify({
              type: "positive",
              message: "Order has been placed.",
              color: "positive"
            });
          this.closeDialog();
        }
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
