<template>
  <div class="text-color">
    <div class="text-weight-bolder q-pb-xs q-pt-md text-center text-h6">
      Platform Trading Hours
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12 text-color text-center">
        <q-card>
          <q-form
            ref="myForm"
            @submit="onSubmit"
            @reset="onReset"
            class="q-pt-md"
          >
            <div
              class="row justify-center"
              v-for="(item, index) in openingHours"
              :key="index"
            >
              <div
                class="col-xs-6 col-sm-6 col-md-4 col-lg-2 text-weight-bold text-weight-bold q-pt-sm"
              >
                {{ item.day }}
              </div>
              <div class="col-xs-6 col-sm-6 col-md-4 col-lg-2">
                <q-checkbox
                  left-label
                  v-model="item.closed"
                  label="Closed:"
                  color="positive"
                />
              </div>
              <div class="col-xs-12">
                <div class="row justify-center q-gutter-xs">
                  <div class="col-xs-5 col-sm-5 col-md-4 col-lg-2">
                    <q-input
                      stack-label
                      outlined
                      dense
                      label="Opening Time [HH]"
                      mask="##"
                      v-model="item.time.start.hours"
                      color="positive"
                      :rules="[val => val >= 0 || 'hours is required!']"
                    />
                  </div>
                  <div class="col-xs-5 col-sm-5 col-md-4 col-lg-2">
                    <q-input
                      stack-label
                      outlined
                      dense
                      label="Opening Time [mm]"
                      mask="##"
                      v-model="item.time.start.min"
                      color="positive"
                      :rules="[val => val >= 0 || 'hours is required!']"
                    />
                  </div>
                  <div class="col-xs-5 col-sm-5 col-md-4 col-lg-2">
                    <q-input
                      stack-label
                      outlined
                      dense
                      label="Closing Time [HH]"
                      mask="##"
                      v-model="item.time.end.hours"
                      color="positive"
                      :rules="[val => val >= 0 || 'hours is required!']"
                    />
                  </div>
                  <div class="col-xs-5 col-sm-5 col-md-4 col-lg-2">
                    <q-input
                      stack-label
                      outlined
                      dense
                      label="Closing Time [mm]"
                      mask="##"
                      v-model="item.time.end.min"
                      color="positive"
                      :rules="[val => val >= 0 || 'hours is required!']"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xs-5 col-sm-5 col-md-3 q-pb-md">
              <q-btn
                label="Reset"
                type="reset"
                color="logoRed"
                class="q-mr-lg text-capitalize"
              />
              <q-btn
                label="Update hours"
                type="submit"
                color="positive"
                class="text-capitalize"
                :loading="updateBtnLoading"
              />
            </div>
          </q-form>
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
      openingHours: [],
      updateBtnLoading: false
    };
  },
  computed: {},
  watch: {
    "$store.getters.getAdminTradingHours"() {
      this.openingHours = JSON.parse(
        JSON.stringify(this.$store.getters.getAdminTradingHours)
      );
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.openingHours = JSON.parse(
      JSON.stringify(this.$store.getters.getAdminTradingHours)
    );
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  methods: {
    onReset() {
      this.openingHours = JSON.parse(
        JSON.stringify(this.$store.getters.getAdminTradingHours)
      );
      this.$refs.myForm.reset();
    },
    async onSubmit() {
      this.updateBtnLoading = true;
      const result = await this.$store.dispatch(
        "updateTradingHours",
        this.openingHours
      );
      if (result && result.status === 200) {
        this.$q.notify({
          type: "positive",
          message: "Opening hours updated successfully.",
          color: "positive"
        });
      }
      this.updateBtnLoading = false;
    }
  }
};
</script>
<style></style>
