<template>
  <div class="text-color">
    <div class="text-weight-bolder q-pb-xs q-pt-md text-center text-h6">
      Platform VAT Rate
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12 text-color text-center">
        <q-card style="height:80px;">
          <q-form ref="myForm" @submit="onSubmit">
            <div class="row justify-center no-wrap">
              <div class="row no-wrap q-pt-md q-px-xs">
                <q-input
                  outlined
                  dense
                  mask="##.##"
                  v-model="vat"
                  color="positive"
                  :rules="[
                    val =>
                      (val && val.length > 0 && /\S/.test(val)) ||
                      'VAT rate is required!'
                  ]"
                />
                <span class="q-pt-sm q-pl-sm text-weight-bolder text-subtitle1"
                  >%</span
                >
              </div>
              <div class="col-xs-4 col-md-2 q-pt-md q-mt-xs">
                <q-btn
                  label="Update"
                  type="submit"
                  color="positive"
                  class="text-capitalize"
                  :loading="updateBtnLoading"
                />
              </div>
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
      vat: null,
      updateBtnLoading: false
    };
  },
  computed: {},
  watch: {
    "$store.getters.getAdminVATRate"() {
      this.vat = Number(this.$store.getters.getAdminVATRate) * 100;
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.vat = Number(this.$store.getters.getAdminVATRate) * 100;
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  methods: {
    onSubmit() {
      this.updateBtnLoading = true;
      const result = this.$store.dispatch("updateVATRate", Number(this.vat));
      if (result && result.status === 200) {
        this.$q.notify({
          type: "positive",
          message: "VAT rate updated successfully.",
          color: "positive"
        });
      }
      this.updateBtnLoading = false;
    }
  }
};
</script>
<style></style>
