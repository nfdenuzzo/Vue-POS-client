<template>
  <div class="row justify-center">
    <q-form ref="myForm" v-if="updateMenuItemObj">
      <div class="col-xs-11 col-md-5 q-pa-md text-color text-weight-bold">
        <q-checkbox
          left-label
          v-model="updateMenuItemObj.calzoneOffered"
          label="Calzone style Offered"
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
          v-model.number="updateMenuItemObj.calzonePrice"
          label="Item Price"
          lazy-rules
          mask="#####.##"
          color="positive"
          :rules="[val => (val && val >= 0) || 'Calzone Price is required!']"
        />
      </div>
    </q-form>
  </div>
</template>
<script>
export default {
  components: {},
  mixins: [],
  props: {
    menuItemObj: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
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
    resetFields() {
      this.updateMenuItemObj.calzonePrice = null;
      this.updateMenuItemObj.calzoneOffered = false;
      this.$refs.myForm.resetValidation();
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
