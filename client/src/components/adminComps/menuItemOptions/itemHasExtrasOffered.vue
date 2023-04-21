<template>
  <q-form ref="myForm" v-if="updateMenuItemObj">
    <div class="row justify-center">
      <div
        class="col-xs-11 col-sm-4 col-md-5 col-lg-3 q-pa-md text-color text-weight-bold"
      >
        <q-checkbox
          left-label
          v-model="updateMenuItemObj.offerExtraPizzaToppings"
          label="Product can have extra pizza toppings?"
          color="positive"
          dark
        />
      </div>

      <div
        class="col-xs-11 col-sm-4 col-md-5 col-lg-3 q-pa-md text-color text-weight-bold"
      >
        <q-checkbox
          left-label
          v-model="updateMenuItemObj.offerExtraPastaToppings"
          label="Product can have extra pasta toppings?"
          color="positive"
          dark
        />
      </div>

      <div
        class="col-xs-11 col-sm-4  col-md-5 col-lg-3 q-pa-md text-color text-weight-bold"
      >
        <q-checkbox
          left-label
          v-model="updateMenuItemObj.offerExtraBurgerToppings"
          label="Product can have extra burger toppings?"
          color="positive"
          dark
        />
      </div>

      <div
        class="col-xs-11 col-sm-4 col-md-5 col-lg-3 q-pa-md text-color text-weight-bold"
      >
        <q-checkbox
          left-label
          v-model="updateMenuItemObj.offerExtraDessertToppings"
          label="Product can have extra dessert toppings?"
          color="positive"
          dark
        />
      </div>
    </div>

    <div class="row justify-center">
      <div
        class="col-xs-11 col-sm-4 col-md-5 col-lg-3 q-pa-md text-color text-weight-bold"
      >
        <q-checkbox
          left-label
          v-model="updateMenuItemObj.offerExtraSaladToppings"
          label="Product can have extra salad toppings?"
          color="positive"
          dark
        />
      </div>

      <div
        class="col-xs-11 col-sm-4 col-md-5 col-lg-3 q-pa-md text-color text-weight-bold"
      >
        <q-checkbox
          left-label
          v-model="updateMenuItemObj.offerExtraSuaces"
          label="Product can have extra sauces?"
          color="positive"
          dark
        />
      </div>

      <div
        class="col-xs-11 col-sm-4 col-md-5 col-lg-3 q-pa-md text-color text-weight-bold"
      >
        <q-checkbox
          left-label
          v-model="updateMenuItemObj.offerExtraMainOptions"
          label="Product can have main extras?"
          color="positive"
          dark
        />
      </div>
    </div>
  </q-form>
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
      this.updateMenuItemObj.offerExtraPizzaToppings = false;
      this.updateMenuItemObj.offerExtraDessertToppings = false;
      this.updateMenuItemObj.offerExtraSaladToppings = false;
      this.updateMenuItemObj.offerExtraBurgerToppings = false;
      this.updateMenuItemObj.offerExtraPastaToppings = false;
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
