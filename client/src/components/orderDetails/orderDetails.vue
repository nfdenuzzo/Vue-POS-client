<template>
  <div class="row justify-center">
    <div class="col-xs-12 col-sm-12" v-if="updateOrderDetailsObj">
      <q-card class="q-pa-md">
        <q-form ref="myForm" @submit="onSubmit" @reset="onReset">
          <div class="row justify-center">
            <div class="col-xs-12">
              <div
                class="col-xs-6 text-center q-pa-md text-color text-weight-bold"
                v-if="updateOrderDetailsObj.contactNumber"
              >
                <q-checkbox
                  left-label
                  v-model="useExistingContactNumber"
                  label="Use existing contact number"
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
                      (val && val.length > 0 && /\S/.test(val)) ||
                      'Contact number is required!'
                  ]"
                />
              </div>
              <q-field
                dense
                borderless
                :value="deliveryType"
                :rules="[val => val != null || 'Please select delivery type!']"
              >
                <template v-slot:control>
                  <div
                    class="col-xs-12 justify-around text-center text-color text-weight-bold"
                  >
                    <q-option-group
                      inline
                      v-model="deliveryType"
                      :options="options"
                      color="positive"
                    />
                  </div>
                </template>
              </q-field>
            </div>
          </div>

          <div class="row justify-center" v-if="deliveryType === 'Delivery'">
            <div class="col-xs-12 items-center">
              <div
                class="col-xs-6 text-center text-color text-weight-bold"
                v-if="updateOrderDetailsObj.address"
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
                class="col-xs-11 q-px-md text-color text-weight-bold"
                v-if="deliveryType === 'Delivery'"
              >
                Delivery cost R {{ getDeliveryCost }}
              </div>
            </div>
          </div>
        </q-form>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      options: [
        { label: "Collection", value: "Collection" },
        { label: "Delivery", value: "Delivery" }
      ],
      updateOrderDetailsObj: null,
      useExistingAddress: false,
      useExistingContactNumber: false,
      deliveryType: false,
      deliveryAreas: []
    };
  },
  computed: {
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
        return 0
      }
    }
  },
  watch: {},
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
      console.log(
        "assignData -> this.updateOrderDetailsObj",
        this.updateOrderDetailsObj
      );
      if (this.updateOrderDetailsObj && this.updateOrderDetailsObj.address) {
        this.useExistingAddress = true;
      } else {
        this.useExistingAddress = false;
      }
      if (
        this.updateOrderDetailsObj &&
        this.updateOrderDetailsObj.contactNumber
      ) {
        this.useExistingContactNumber = true;
      } else {
        this.useExistingContactNumber = false;
      }
    },
    async onSubmit() {
      this.$emit("proceedPaymentMethod");
    },
    async onReset() {
      await this.assignData();
      this.$refs.myForm.resetValidation();
    }
  }
};
</script>
<style></style>
