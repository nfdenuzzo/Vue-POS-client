<template>
  <div class="text-color">
    <div class="text-h6 text-weight-bolder q-pt-md text-center q-pb-lg">
      My Profile
    </div>
    <div class="row justify-center">
      <div class="col-xs-12 col-sm-12 col-md-8">
        <q-card class="q-pa-md">
          <q-form ref="myForm" @submit="onSubmit" v-if="updateProfileObj">
            <div class="row justify-center">
              <div class="col-xs-11 col-md-5 col-lg-5 q-pa-md">
                <q-input
                  dark
                  outlined
                  v-model="updateProfileObj.userEmail"
                  label="Email"
                  color="positive"
                  :disable="true"
                />
              </div>
              <div class="col-xs-11 col-md-5 col-lg-5 q-pa-md">
                <q-input
                  dark
                  outlined
                  v-model="updateProfileObj.name"
                  label="Prefered username"
                  lazy-rules
                  color="positive"
                />
              </div>
              <div class="col-xs-11 col-md-5 col-lg-5 q-pa-md">
                <q-input
                  dark
                  outlined
                  v-model="updateProfileObj.address"
                  label="Address"
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
              <div class="col-xs-11 col-md-5 col-lg-5 q-pa-md">
                <q-input
                  dark
                  outlined
                  v-model="updateProfileObj.addressLine2"
                  label="Address Line 2"
                  autogrow
                  color="positive"
                />
              </div>
              <div class="col-xs-11 col-md-5 col-lg-5 q-pa-md">
                <q-select
                  outlined
                  v-model="updateProfileObj.deliveryArea"
                  :options="deliveryAreas"
                  label="Select Delivery Area"
                  color="positive"
                  dense
                  dark
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

              <div class="col-xs-11 col-md-5 col-lg-5 q-pa-md">
                <q-input
                  dark
                  outlined
                  v-model="updateProfileObj.contactNumber"
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
            </div>
            <div class="row justify-center" v-if="!$q.platform.is.ios">
              <div class="col-xs-10">
                <div class="row">
                  <div class="col-xs-11 col-md-5 col-lg-5 q-pa-md">
                    <q-checkbox
                      left-label
                      v-model="updateProfileObj.notificationsEnabled"
                      label="Subscribe to Phone Notifications"
                      color="positive"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="row justify-center">
              <div class="col-xs-10">
                <div class="row">
                  <div class="col-xs-11 col-md-5 col-lg-5 q-pa-md">
                    <q-checkbox
                      left-label
                      v-model="updateProfileObj.emailNotificationsEnabled"
                      label="Subscribe to Email Notifications"
                      color="positive"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="row justify-center q-pb-md">
              <q-btn
                label="Reset"
                @click="onReset"
                color="logoRed"
                class="q-mr-lg text-capitalize"
              />
              <q-btn
                label="Update Profile"
                type="submit"
                color="positive"
                class="text-capitalize"
                :loading="updateBtnLoading"
              />
            </div>
          </q-form>
          <div v-else>
            <q-spinner-hourglass color="logoRed" size="6em" />
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script>
import { webPushCreateSub } from "../../utils/webpushUtil.js";
export default {
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      deliveryAreas: [],
      updateProfileObj: null,
      updateBtnLoading: false
    };
  },
  computed: {
    getCurrentProfile() {
      return this.$store.getters.getMyProfile;
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
    async assignData() {
      this.updateProfileObj = JSON.parse(
        JSON.stringify(this.getCurrentProfile)
      );
    },
    async onSubmit() {
      this.updateBtnLoading = true;
      if (this.updateProfileObj.notificationsEnabled) {
        const obj = await webPushCreateSub();
        this.updateProfileObj.subscriptionObject = obj;
        this.updateProfileObj.isMobile = this.$q.platform.is.mobile;
        this.updateProfileObj.isDesktop = !this.$q.platform.is.mobile;
      }
      const result = await this.$store.dispatch(
        "updateUserProfile",
        this.updateProfileObj
      );
      if (result && result.status === 200) {
        this.$q.notify({
          type: "positive",
          message: "Profile updated successfully.",
          color: "positive"
        });
      }
      this.updateBtnLoading = false;
    },
    async onReset() {
      await this.assignData();
      this.$refs.myForm.reset();
    },
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
    }
  }
};
</script>
<style></style>
