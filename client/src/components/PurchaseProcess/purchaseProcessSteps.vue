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
              @closeViewPurchaseProcess="closeDialog"
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
          ref="purchaseSummary"
          :deliveryOrCollection="orderDetails.orderType"
          :orderDeliveryCharge="orderDeliveryCharge"
          @placeOrder="placeOrder"
          :promoDiscounts="$refs.basket._data.simplifiedDiscountPromo"
          :totalPromoDiscounts="$refs.basket._data.totalPromoDiscounts"
        />
      </q-step>
      <template v-slot:navigation>
        <div clas="q-pa-md">
          <purchaseProcessError
            v-if="step === 4"
            :invalidNames="invalidNames"
            :invalidIds="invalidIds"
            :invalidCategories="invalidCategories"
          ></purchaseProcessError>
          <purchaseProcessSuccess v-if="step === 5"> </purchaseProcessSuccess>
          <div class="row justify-center q-pb-xl">
            <q-stepper-navigation
              :class="$q.platform.is.mobile ? 'fixed-bottom' : ''"
            >
              <div
                class="row justify-center q-pb-md q-pt-sm"
                :class="$q.platform.is.mobile ? 'q-card' : ''"
              >
                <q-btn
                  v-if="step > 1 && step !== 4 && step !== 5"
                  color="logoRed"
                  @click="$refs.stepper.previous()"
                  label="Back"
                  class="q-mr-lg text-capitalize"
                />
                <q-btn
                  v-if="step === 1"
                  label="Order more"
                  @click="closeDialog"
                  color="logoRed"
                  class="q-mr-lg text-capitalize"
                />
                <q-btn
                  v-if="step === 4 || step === 5"
                  label="Close"
                  @click="closeDialog"
                  color="logoRed"
                  class="q-mr-lg text-capitalize"
                />
                <q-btn
                  v-if="hasItemsInOrder && step !== 4 && step !== 5"
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
import purchaseSummary from "./purchaseSummary.vue";
import purchaseProcessError from "./purchaseProcessError.vue";
import purchaseProcessSuccess from "./purchaseProcessSuccess.vue";
import { QSpinnerHourglass } from "quasar";

export default {
  components: {
    basket,
    orderDetails,
    purchaseSummary,
    purchaseProcessError,
    purchaseProcessSuccess
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
      orderTotal: 0,
      orderDeliveryCharge: 0,
      invalidNames: [],
      invalidIds: [],
      invalidCategories: []
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
        return "Confirm";
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
      if (this.step === 5) {
        this.$store.dispatch("clearBasket");
      }
      if (this.step === 4) {
        this.updateBasket();
        this.updateMenuItems();
      }
      this.$emit("update:viewPurchaseProcess", false);
    },
    proceedPaymentMethod(obj) {
      this.orderDetails = obj.dto;
      this.orderDeliveryCharge = obj.deliveryCost;
      this.step++;
    },
    async placeOrder(paymentType) {
      this.orderDetails.paymentType = paymentType;
      const orderSpecs = this.orderDetails;
      orderSpecs.orderDetails = this.$store.getters.getBasket;
      this.$q.loading.show({
        spinner: QSpinnerHourglass,
        spinnerColor: "positive",
        backgroundColor: "darkgrey",
        message: "Processing Order...."
      });
      const result = await this.$store.dispatch("placeOrder", orderSpecs);
      this.$q.loading.hide();
      if (result && result.success != null && result.success) {
        if (orderSpecs.paymentType !== "Pay Now") {
          this.step = 5;
        }
      } else if (result && result.success == null) {
        this.invalidNames = result.invalidNames;
        this.invalidIds = result.invalidIds;
        this.invalidCategories = result.invalidCategories;
        this.step = 4;
      }
    },
    async proceed() {
      if (this.step === 1) {
        this.orderTotal = this.$refs.basket.totalItemsCost;
        this.step++;
      } else if (this.step === 2) {
        this.$refs.orderDetail.onSubmit();
      } else if (this.step === 3) {
        this.$refs.purchaseSummary.onSubmit();
      }
    },
    async updateBasket() {
      for (var i = 0; i < this.invalidIds.length; i++) {
        await this.$store.dispatch("filteroutBasketItem", this.invalidIds[i]);
      }
    },
    async updateMenuItems() {
      for (var i = 0; i < this.invalidCategories.length; i++) {
        await this.$store.dispatch("retrieveMenuItems", {
          forceRefresh: true,
          value: this.invalidCategories[i]
        });
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
