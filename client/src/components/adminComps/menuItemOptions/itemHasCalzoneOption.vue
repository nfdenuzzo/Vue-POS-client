<template>
  <div class="row justify-center">
    <q-form ref="myForm" v-if="updateMenuItemObj">
      <div class="col-xs-11 col-md-5 q-pa-md text-color text-weight-bold">
        <q-checkbox
          left-label
          v-model="updateMenuItemObj.calzoneOffered"
          label="Calzone style offered"
          color="positive"
        />
      </div>

      <div
        class="col-xs-11 col-md-5 q-pa-md"
        v-if="updateMenuItemObj.calzoneOffered"
      >
        <q-input
          outlined
          dense
          v-model="updateMenuItemObj.calzonePrice"
          label="Calzone Add-on Price"
          lazy-rules
          v-cleave="masks.TwoDecimals"
          @input.native="onInputCleaveFormatValue()"
          color="positive"
          :rules="[val => (val && val >= 0) || 'Calzone Price is required!']"
        />
      </div>
    </q-form>
  </div>
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
    menuItemObj: {
      type: Object,
      required: true,
      default: () => {}
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
      updateMenuItemObj: null
    };
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.updateMenuItemObj = this.menuItemObj;
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  methods: {
    onInputCleaveFormatValue() {
      this.updateMenuItemObj.calzonePrice = event.target._vCleave.getFormattedValue();
    },
    resetFields() {
      this.updateMenuItemObj.calzonePrice = null;
      this.updateMenuItemObj.calzoneOffered = false;
      this.$refs.myForm.reset();
      this.$emit("update:menuItemObj", this.updateMenuItemObj);
    },
    updateMenuItemObject() {
      this.$refs.myForm.validate().then(success => {
        if (success) {
          this.$emit("update:menuItemObj", this.updateMenuItemObj);
        }
      });
    }
  }
};
</script>
<style></style>
