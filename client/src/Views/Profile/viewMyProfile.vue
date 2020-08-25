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
      updateProfileObj: null,
      updateBtnLoading: false
    };
  },
  computed: {
    getCurrentProfile() {
      return this.$store.getters.getMyProfiile;
    }
  },
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.assignData();
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  methods: {
    assignData() {
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
          message: "Profile updated successfully.",
          color: "positive"
        });
      }
      this.updateBtnLoading = false;
    },
    onReset() {
      this.assignData();
      this.$refs.myForm.resetValidation();
    }
  }
};
</script>
<style></style>
