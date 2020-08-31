<template>
  <div class="text-color">
    <div class="text-h6 text-weight-bolder q-pt-md text-center q-pb-lg">
      My Profile
    </div>
    <div class="row justify-center">
      <div class="col-xs-12 col-sm-12 col-md-8">
        <q-card class="q-pa-md">
          <q-form
            ref="myForm"
            @submit="onSubmit"
            @reset="onReset"
            v-if="updateProfileObj"
          >
            <div class="row justify-center">
              <div class="col-xs-11 col-md-5 col-lg-5 q-pa-md">
                <q-input
                  outlined
                  v-model="updateProfileObj.userEmail"
                  label="Email"
                  color="positive"
                  :disable="true"
                />
              </div>
              <div class="col-xs-11 col-md-5 col-lg-5 q-pa-md">
                <q-input
                  outlined
                  v-model="updateProfileObj.name"
                  label="Prefered username"
                  lazy-rules
                  color="positive"
                />
              </div>
              <div class="col-xs-11 col-md-5 col-lg-5 q-pa-md">
                <q-input
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
                @filter="filterFn"
                use-input
                input-debounce="0"
                option-value="_id"
                option-label="area"
                lazy-rules
                :rules="[
                  val =>
                    (val != null) ||
                    'Please select a delivery area!'
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
            <div class="row justify-center q-pb-md">
              <q-btn
                label="Reset"
                type="reset"
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
      const result = await this.$store.dispatch(
        "updateUserProfile",
        this.updateProfileObj
      );
      if (result && result.status === 200) {
        this.$q.notify({
          type: 'positive',
          message: "Profile updated successfully.",
          color: "positive"
        });
      }
      this.updateBtnLoading = false;
    },
    async onReset() {
      await this.assignData();
      this.$refs.myForm.resetValidation();
    },
    filterFn (val, update, abort) {
      update(() => {
        const needle = val.toLocaleLowerCase()
        this.deliveryAreas = this.$store.getters.getDeliveryCharges.filter(v => v.area.toLocaleLowerCase().indexOf(needle) > -1)
      })
    },

    setModel (val) {
      this.deliveryAreas = val
    }
  }
};
</script>
<style></style>
