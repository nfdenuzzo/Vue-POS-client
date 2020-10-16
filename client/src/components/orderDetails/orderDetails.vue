<template>
  <div class="row justify-center">
    <div class="col-xs-12 col-sm-12" v-if="dataPopulated">
      <q-card class="q-pa-md">
        <q-form ref="myForm" @submit="onSubmit">
          <div class="row justify-center">
            <div class="col-xs-12">
              <div
                class="col-xs-6 text-center q-pa-md text-color text-weight-bold"
                v-if="hasExistingContactNumber"
              >
                <q-checkbox
                  left-label
                  v-model="useExistingContactNumber"
                  :label="
                    `Use existing contact number (${updateOrderDetailsObj.contactNumber})`
                  "
                  color="positive"
                />
              </div>
              <div class="col-xs-11 q-pa-md" v-if="!useExistingContactNumber">
                <q-input
                  outlined
                  v-model="updateOrderDetailsObj.contactNumber"
                  label="Contact number"
                  lazy-rules
                  mask="(###) ### - ####"
                  color="positive"
                  :rules="[
                    val =>
                      (val && /\S/.test(val)) || 'Contact number is required!',
                    val =>
                      val.length === 16 || 'Valid contact number is required'
                  ]"
                />
              </div>
              <div class="col-xs-11 items-center ">
                <div class="row justify-center text-center">
                  <div>
                    <q-field
                      dense
                      class="delivery-fit-content"
                      borderless
                      :value="deliveryType"
                      :rules="[
                        val => val != null || 'Please select delivery type!'
                      ]"
                    >
                      <template v-slot:control>
                        <div
                          class="col-xs-12 justify-around text-center text-color text-weight-bold"
                        >
                          <q-option-group
                            inline
                            v-model="deliveryType"
                            :options="getOptions"
                            color="positive"
                          />
                        </div>
                      </template>
                    </q-field>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row justify-center" v-if="deliveryType === 'Delivery'">
            <div class="col-xs-12 items-center">
              <div
                class="col-xs-6 text-center text-color text-weight-bold"
                v-if="hasExistingAddresss"
              >
                <q-checkbox
                  left-label
                  v-model="useExistingAddress"
                  label="Use existing delivery address"
                  color="positive"
                />
              </div>
              <div class="col-xs-11 q-pa-md" v-if="!useExistingAddress">
                <q-input
                  outlined
                  v-model="updateOrderDetailsObj.address"
                  label="Delievery Address"
                  autogrow
                  lazy-rules
                  color="positive"
                  :rules="[
                    val =>
                      (val && val.length > 0 && /\S/.test(val)) ||
                      'Address is required!'
                  ]"
                />
              </div>
              <div class="col-xs-11 q-pa-md" v-if="!useExistingAddress">
                <q-input
                  outlined
                  v-model="updateOrderDetailsObj.addressLine2"
                  label="Delievery Address Line 2"
                  autogrow
                  color="positive"
                />
              </div>
              <div class="col-xs-11 q-pt-md q-px-md" v-if="!useExistingAddress">
                <q-select
                  outlined
                  v-model="updateOrderDetailsObj.deliveryArea"
                  :options="deliveryAreas"
                  label="Select Delivery Area"
                  color="positive"
                  dense
                  @filter="filterFn"
                  use-input
                  input-debounce="0"
                  option-value="_id"
                  option-label="area"
                  lazy-rules
                  :rules="[
                    val => val != null || 'Please select a delivery area!'
                  ]"
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
              <div
                class="col-xs-11 q-px-md text-color text-center text-weight-bold"
                v-if="deliveryType === 'Delivery'"
              >
                Delivery cost R {{ getDeliveryCost }}
              </div>
            </div>
          </div>
          <div
            class="col-xs-12 text-center q-px-md q-pt-md text-color text-weight-bold"
          >
            Notify me when the status of my order changes using:
          </div>
          <div class="row justify-center q-py-md">
            <div
              class="col-xs-6 text-center q-px-md text-color text-weight-bold"
            >
              <q-checkbox
                v-if="!$q.platform.is.ios"
                left-label
                v-model="subscribe"
                label="Phone notifications"
                color="positive"
              />
            </div>
            <div
              class="col-xs-6 text-center q-px-md text-color text-weight-bold"
            >
              <q-checkbox
                left-label
                v-model="subscribeEmail"
                label="Emails"
                color="positive"
              />
            </div>
          </div>
          <div
            class="col-xs-6 text-center text-caption text-color text-weight-bold q-pt-sm"
          >
            <span class="text-weight-bolder">
              Notifications will be sent to you when -
            </span>
            <br />
              Your order has been processed.
            <br />
              Your order is being prepared.
            <br />
            <span v-if="deliveryType === 'Delivery'">
              Your order is ready and out for Delivery
            </span>
            <span v-if="deliveryType !== 'Delivery'">
              <br />
              Your order is ready for Collection
            </span>
          </div>
        </q-form>
      </q-card>
    </div>
  </div>
</template>

<script>
import { webPushCreateSub } from "../../utils/webpushUtil.js";
import isEmpty from "lodash/isEmpty";
export default {
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      updateOrderDetailsObj: null,
      useExistingAddress: false,
      useExistingContactNumber: false,
      hasExistingAddresss: false,
      hasExistingContactNumber: false,
      deliveryType: null,
      deliveryAreas: [],
      subscribe: false,
      subscribeEmail: false,
      assignedDataLoaded: false
    };
  },
  computed: {
    dataPopulated() {
      return !isEmpty(this.updateOrderDetailsObj);
    },
    getOptions() {
      const options = [];
      if (this.$store.getters.getDeliveryServiceAvailable) {
        options.push({ label: "Collection", value: "Collection" });
        options.push({ label: "Delivery", value: "Delivery" });
        return options;
      } else {
        options.push({ label: "Collection", value: "Collection" });
        return options;
      }
    },
    getCurrentProfile() {
      return this.$store.getters.getMyProfile;
    },
    getDeliveryCost() {
      if (
        this.deliveryType === "Delivery" &&
        this.updateOrderDetailsObj.deliveryArea
      ) {
        return this.updateOrderDetailsObj.deliveryArea.price;
      } else {
        return 0;
      }
    }
  },
  watch: {
    getCurrentProfile(to, from) {
      if (!isEmpty(to) && isEmpty(from) && this.assignedDataLoaded && isEmpty(this.updateOrderDetailsObj)) {
        this.assignData()
      }
    },
    useExistingAddress() {
      if (this.useExistingAddress) {
        this.updateOrderDetailsObj.address = this.getCurrentProfile.address;
        this.updateOrderDetailsObj.addressLine2 = this.getCurrentProfile.addressLine2;
        this.updateOrderDetailsObj.deliveryArea = this.getCurrentProfile.deliveryArea;
      }
    },
    useExistingContactNumber() {
      if (this.useExistingAddress) {
        this.updateOrderDetailsObj.contactNumber = this.getCurrentProfile.contactNumber;
      }
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  async mounted() {
    await this.assignData();
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  methods: {
    filterFn(val, update, abort) {
      update(() => {
        const needle = val.toLocaleLowerCase();
        this.deliveryAreas = this.$store.getters.getDeliveryCharges.filter(
          v => v.area.toLocaleLowerCase().indexOf(needle) > -1
        );
      });
    },

    setModel(val) {
      this.deliveryAreas = val;
    },
    async assignData() {
      this.updateOrderDetailsObj = JSON.parse(
        JSON.stringify(this.getCurrentProfile)
      );
      if (this.updateOrderDetailsObj && this.updateOrderDetailsObj.address) {
        this.hasExistingAddresss = true;
        this.useExistingAddress = true;
      } else {
        this.useExistingAddress = false;
      }
      if (
        this.updateOrderDetailsObj &&
        this.updateOrderDetailsObj.contactNumber
      ) {
        this.hasExistingContactNumber = true;
        this.useExistingContactNumber = true;
      } else {
        this.useExistingContactNumber = false;
      }
      this.assignedDataLoaded = true
    },
    async onSubmit() {
      await this.$refs.myForm.validate().then(async success => {
        if (success) {
          const dto = await this.createDTO();
          this.$emit("proceedPaymentMethod", {
            dto: dto,
            deliveryCost: this.getDeliveryCost
          });
        }
      });
    },
    async createDTO() {
      this.updateOrderDetailsObj.subscribeNotifications = this.subscribe;
      this.updateOrderDetailsObj.subscribeEmailNotifications = this.subscribeEmail;
      if (this.updateOrderDetailsObj.subscribeNotifications) {
        this.updateOrderDetailsObj.subscriptionObject = await webPushCreateSub();
      }
      const dto = Object.assign({}, this.updateOrderDetailsObj);
      dto.orderType = this.deliveryType;
      if (this.deliveryType !== "Delivery") {
        delete dto.deliveryArea;
        delete dto.address;
        delete dto.addressLine2;
      }
      return dto;
    }
  }
};
</script>
<style>
.delivery-fit-content {
  width: fit-content;
}
</style>
