<template>
  <div class="text-color">
    <q-card-section class="row items-center q-pb-none">
      <div class="col-xs-12 col-sm-12 col-md-6">
        <div class="text-weight-bolder q-pb-xs text-center text-subtitle1">
          Order No. {{ orderSpecifications.uniqueOrderId }}
        </div>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6">
        <div class="text-weight-bolder q-pb-xs text-center text-subtitle1">
          Order Status:
          <q-badge
            v-if="!adminView"
            outline
            :color="getLabelColor(orderSpecifications.orderStatus)"
          >
            <q-spinner
              v-if="showSpinner(orderSpecifications.orderStatus)"
              color="primary"
              size="2em"
            />
            <q-icon
              v-else
              :name="getIcon(orderSpecifications.orderStatus)"
              size="20px"
              class="q-pr-xs"
            />
            <span class="q-pl-sm">
              {{ getLabelText(orderSpecifications.orderStatus) }}</span
            >
          </q-badge>
          <q-select
            v-else
            outlined
            :value="status"
            :options="currentStatuses"
            color="positive"
            option-value="_id"
            option-label="name"
            dense
            @input="
              val =>
                confirmOrderStatusUpdate(
                  val,
                  orderSpecifications.uniqueOrderId,
                  orderSpecifications._id
                )
            "
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-italic text-grey">
                  No options available
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
      </div>
    </q-card-section>
    <div class="text-color row items-center text-center q-pb-none">
      <div class="col-xs-11 text-weight-bold">
        {{ orderSpecifications.itemsInOrder }} Items
      </div>
    </div>
    <div class="text-color row items-center text-center q-pb-none">
      <div class="col-xs-11 text-weight-bold">
        Order place at:
        {{ new Date(orderSpecifications.createdAt).toLocaleString() }}
      </div>
    </div>
    <div class="text-color row text-center q-pt-sm">
      <div class="col-xs-12 col-sm-6">
        <div class="row text-center">
          <div class="col-xs-12 text-weight-bold">
            User Details
          </div>
        </div>
        <div class="row text-center">
          <div class="col-xs-12">
            <span class="text-weight-bold">Name:</span>
            {{ orderSpecifications.name }}
          </div>
          <div class="col-xs-12">
            <span class="text-weight-bold">Contact Number:</span>
            {{ orderSpecifications.contactNumber }}
          </div>
          <div class="col-xs-12">
            <span class="text-weight-bold"> Email Address:</span>
            {{ orderSpecifications.userEmail }}
          </div>
          <div class="col-xs-12">
            <span class="text-weight-bold">Notify Status change:</span>
            {{ orderSpecifications.subscribeNotifications ? "Yes" : "No" }}
          </div>
        </div>
      </div>

      <div class="col-xs-12 col-sm-6">
        <div class="row text-center" :class="{ 'q-pt-sm': $q.screen.lt.md }">
          <div class="col-xs-12 text-weight-bold">
            Order Details
          </div>
          <div class="col-xs-12">
            <span class="text-weight-bold">Order for </span>
            {{ orderSpecifications.orderType }}
          </div>
          <div class="col-xs-12" v-if="orderSpecifications.paymentType === 'Pay now'">
            <span class="text-weight-bold">Payment Made</span>

          </div>
          <div class="col-xs-12" v-else>
            <span class="text-weight-bold">Pay on collection</span>
          </div>
        </div>

        <div
          class="row text-center"
          v-if="orderSpecifications.orderType === 'Delivery'"
        >
          <div class="col-xs-12">
            <span class="text-weight-bold">Address: </span>
            {{ orderSpecifications.address }}
            <br />
            <span v-if="orderSpecifications.addressLine2">
              {{ orderSpecifications.addressLine2 }}
            </span>
          </div>
          <div class="col-xs-12">
            <span class="text-weight-bold"> Area: </span
            >{{ orderSpecifications.deliveryArea.area }}
          </div>
        </div>
      </div>
    </div>
    <q-card-section class="text-color row items-center q-pa-sm">
      <div class="col-xs-12" v-if="hasItemsInOrder">
        <div class="row justify-center">
          <div
            class="col-xs-12 col-sm-12 col-md-6 q-px-sm q-py-sm"
            v-for="(item, index) in showItemsInOrder"
            :key="index"
          >
            <q-card>
              <order-item-display
                :menuItemDetails="item"
                :viewingOrderHistory="true"
              />
            </q-card>
          </div>
        </div>
        <div class="row q-pt-md q-px-lg">
          <div class="col-xs-12 text-right text-weight-bolder text-caption">
            Items Total: R {{ orderSpecifications.itemTotal }}
          </div>
        </div>
        <div class="row q-px-lg">
          <div
            class="col-xs-12 text-right text-weight-bolder text-caption"
            v-if="orderSpecifications.orderExtrasCost"
          >
            Extra's Total: R {{ orderSpecifications.orderExtrasCost }}
          </div>
        </div>
        <div class="row q-px-lg">
          <div class="col-xs-12 text-right text-weight-bolder text-caption">
            VAT {{ orderSpecifications.vatRate.toFixed(2) }}% (Already
            Included): R
            {{ orderSpecifications.vat }}
          </div>
        </div>
        <div
          class="row q-px-lg"
          v-if="orderSpecifications.orderType === 'Delivery'"
        >
          <div class="col-xs-12 text-right text-weight-bolder text-caption">
            Delivery Charge: R
            {{ deliveryCharge }}
          </div>
        </div>
        <div class="row q-px-lg">
          <div class="col-xs-12 text-right text-weight-bolder text-subtitle1">
            Order Total: R {{ orderSpecifications.orderTotal + deliveryCharge }}
          </div>
        </div>
      </div>
    </q-card-section>

    <q-dialog v-model="confirmationCancelOrder" persistent>
      <q-card class="text-color">
        <q-card-section class="row justify-center">
          <div class="text-weight-bolder q-pb-xs text-center text-subtitle1">
            Cancel Order?
          </div>
          <span class="q-pt-md text-center"
            >Are you sure you would like to cancel this order?, once you cancel it you will not be able to undo this action.</span
          >
        </q-card-section>

        <div class="row q-pa-sm justify-between q-pb-md">
          <q-btn
            class="text-capitalize"
            color="logoRed"
            label="Cancel"
            @click="closeDialog"
          />
          <q-btn
            class="text-capitalize"
            color="positive"
            label="Confirm"
            @click="updateOrderStatus"
          />
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  components: {
    "order-item-display": () => import("../Basket/menuItemOrderDisplay.vue")
  },
  mixins: [],
  props: {
    orderSpecifications: {
      type: Object,
      default: () => [],
      required: true
    },
    adminView: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {
      confirmationCancelOrder: false,
      selectedOrderId: null,
      selectedOrderUniqueOrderId: null,
      selectedStatus: null,
      status: "PROCESSING",
      currentStatuses: [
        "PROCESSING",
        "PREPARING",
        "OUT FOR DELIVERY",
        "READY FOR COLLECTION",
        "COMPLETE",
        "CANCELLED"
      ]
    };
  },
  computed: {
    hasItemsInOrder() {
      return this.orderSpecifications.itemsInOrder > 0;
    },
    showItemsInOrder() {
      return _.sortBy(this.orderSpecifications.orderDetails, "createdAt");
    },
    deliveryCharge() {
      if (
        this.orderSpecifications.orderType === "Delivery" &&
        this.orderSpecifications.deliveryArea
      ) {
        return this.orderSpecifications.deliveryArea.price;
      } else {
        return 0;
      }
    }
  },
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.status = this.orderSpecifications.orderStatus;
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  methods: {
    closeDialog() {
      this.confirmationCancelOrder = false;
      this.selectedOrderId = null;
      this.selectedOrderUniqueOrderId = null;
      this.selectedStatus = null;
    },
    confirmOrderStatusUpdate(val, uniqueOrderId, _id) {
      this.selectedOrderId = _id;
      this.selectedOrderUniqueOrderId = uniqueOrderId;
      this.selectedStatus = val;
      if (val === "CANCELLED") {
        this.confirmationCancelOrder = true;
      } else {
        this.updateOrderStatus();
      }
    },
    async updateOrderStatus() {
      this.confirmationCancelOrder = false;
      this.status = this.selectedStatus;
      const dto = {
        orderStatus: this.selectedStatus,
        uniqueOrderId: this.selectedOrderUniqueOrderId,
        _id: this.selectedOrderId
      };
      const result = await this.$store.dispatch("updateOrderStatus", dto);
      if (result && result.status === 200) {
        this.$emit("closeOrderDetailsDialog");
      }
      this.selectedOrderId = null;
      this.selectedOrderUniqueOrderId = null;
      this.selectedStatus = null;
    },
    showSpinner(text) {
      switch (text) {
        case "PROCESSING":
          return true;
        case "PREPARING":
          return true;
        default:
          return false;
      }
    },
    getIcon(text) {
      switch (text) {
        case "PROCESSING":
          return "fas fa-spinner";
        case "PREPARING":
          return "fas fa-spinner";
        case "CANCELLED":
          return "fas fa-ban";
        case "READY FOR COLLECTION":
          return "far fa-check-circle";
        case "OUT FOR DELIVERY":
          return "far fa-check-circle";
        case "COMPLETE":
          return "fas fa-check-double";
      }
    },
    getLabelColor(text) {
      switch (text) {
        case "PROCESSING":
          return "primary";
        case "PREPARING":
          return "primary";
        case "CANCELLED":
          return "logoRed";
        case "READY FOR COLLECTION":
          return "positive";
        case "OUT FOR DELIVERY":
          return "positive";
        case "COMPLETE":
          return "positive";
      }
    },
    getLabelText(text) {
      switch (text) {
        case "PROCESSING":
          return "Processing";
        case "PREPARING":
          return "Preparing";
        case "CANCELLED":
          return "Cancelled";
        case "READY FOR COLLECTION":
          return "Ready for collection";
        case "OUT FOR DELIVERY":
          return "Out for delivery";
        case "COMPLETE":
          return "Complete";
      }
    }
  }
};
</script>
<style></style>
