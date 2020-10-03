<template>
  <q-card>
    <div class="text-color">
      <div
        class="text-weight-bolder q-pb-xs  q-pt-md text-center text-subtitle1"
      >
        Update Delivery area
      </div>
      <div clas="q-pa-md" v-if="!loadingData">
        <q-form ref="myForm" @submit="onSubmit">
          <div class="row justify-center q-pb-md">
            <div class="col-xs-11 col-md-5 q-pa-md">
              <q-input
                outlined
                dense
                v-model="updateDeliveryAreaObj.area"
                label="Area"
                lazy-rules
                color="positive"
                :rules="[
                  val =>
                    (val && val.length > 0 && /\S/.test(val)) ||
                    'Name of area required!'
                ]"
              />
            </div>

            <div class="col-xs-11 col-md-5 q-pa-md">
              <q-input
                outlined
                dense
                v-model="updateDeliveryAreaObj.price"
                label="Delivery charge"
                lazy-rules
                v-cleave="masks.TwoDecimals"
                @input.native="onInputCleaveFormatValue()"
                color="positive"
                :rules="[
                  val => (val && val >= 0) || 'Delivery charge is required!'
                ]"
              />
            </div>
          </div>

          <div class="row justify-center q-pb-md">
            <q-btn
              label="cancel"
              color="logoRed"
              class="q-mr-lg text-capitalize"
              @click="closeDialog"
            />
            <q-btn
              label="Update"
              type="submit"
              color="positive"
              class="text-capitalize"
              :loading="updateBtnLoading"
            />
          </div>
        </q-form>
      </div>
    </div>
  </q-card>
</template>
<script>
import Cleave from "cleave.js";
const cleave = {
  name: "cleave",
  bind(el, binding) {
    const input = el.querySelector("input");
    input._vCleave = new Cleave(input, binding.value);
  },
  unbind(el) {
    const input = el.querySelector("input");
    input._vCleave.destroy();
  }
};
export default {
  components: {},
  mixins: [],
  directives: { cleave },
  props: {
    selectedDeliveryAreaObj: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  data() {
    return {
      masks: {
        TwoDecimals: {
          numeral: true,
          numeralDecimalMark: ".",
          delimiter: "",
          numeralPositiveOnly: true,
          numeralDecimalScale: 2
        }
      },
      updateBtnLoading: false,
      updateDeliveryAreaObj: null,
      loadingData: true
    };
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  async mounted() {
    await this.assignData();
    this.loadingData = false;
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  methods: {
    onInputCleaveFormatValue() {
      this.updateDeliveryAreaObj.price = event.target._vCleave.getFormattedValue();
    },
    assignData() {
      this.updateDeliveryAreaObj = JSON.parse(
        JSON.stringify(this.selectedDeliveryAreaObj)
      );
    },
    async onSubmit() {
      this.updateBtnLoading = true;
      const result = await this.$store.dispatch(
        "updateDeliveryCharge",
        this.updateDeliveryAreaObj
      );
      if (result && result.status === 200) {
        this.$q.notify({
          type: "positive",
          message: "Delievery area updated successfully.",
          color: "positive"
        });
      }
      this.updateBtnLoading = false;
      this.$emit("closeViewDialog");
    },
    closeDialog() {
      this.updateDeliveryAreaObj = {};
      this.$emit("closeViewDialog");
    }
  }
};
</script>
<style lang="scss"></style>
