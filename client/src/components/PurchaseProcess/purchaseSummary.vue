<template>
  <div class="text-color">
    <q-card-section class="text-color row items-center q-pb-none">
      <div class="col-xs-12">
        <div class="text-weight-bolder q-pb-xs text-center text-subtitle1">
          Order Summary
        </div>
      </div>
    </q-card-section>
    <div class="row justify-center text-color">
      <div class="col-xs-10 q-pa-sm">
        <q-card>
          <div class="row q-pa-sm">
            <div
              class="col-xs-12 q-px-md q-py-xs"
              v-for="(item, index) in showItemsInOrder"
              :key="index"
            >
              <div class="row">
                <div class="col-xs-6">
                  {{ item.quantity }} x {{ item.name }}
                </div>
                <div class="col-xs-6 text-right">
                  R {{ item.price * item.quantity }}
                </div>
              </div>
            </div>

            <div class="row q-px-md q-pt-md">
              <div class="col-xs-12 text-weight-bold">
                Total items in Basket: {{ itemsInOrder }}
              </div>
            </div>
          </div>

          <div class="row q-pb-sm q-pa-sm">
            <div class="col-xs-12 q-px-md q-py-xs q-pb-md">
              <div class="col-xs-12 text-weight-bold text-right">
                SubTotal (Items + Extras): R {{ orderTotal }}
              </div>
              <div class="col-xs-12 text-weight-bold text-right">
                VAT (Already Included): R {{ vatTotal }}
              </div>
              <div
                class="col-xs-12 text-weight-bold text-right"
                v-if="orderDeliveryCharge > 0"
              >
                Delivery fee: R {{ orderDeliveryCharge }}
              </div>
              <div class="col-xs-12 text-weight-bolder text-right">
                Total Due: R {{ orderTotal + orderDeliveryCharge }}
              </div>
            </div>
          </div>
        </q-card>
      </div>
    </div>

    <div class="col-xs-11 items-center ">
      <div class="row justify-center text-center">
        <q-form ref="myForm" @submit="onSubmit">
          <q-field
            dense
            class="delivery-fit-content"
            borderless
            :value="paymentType"
            :rules="[val => val != null || 'Please select an option!']"
          >
            <template v-slot:control>
              <div
                class="col-xs-12 justify-around text-center text-color text-weight-bold"
              >
                <q-option-group
                  inline
                  v-model="paymentType"
                  :options="options"
                  color="positive"
                />
              </div>
            </template>
          </q-field>
        </q-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  mixins: [],
  props: {
    orderTotal: {
      type: Number,
      default: 0,
      required: true
    },
    orderDeliveryCharge: {
      type: Number,
      default: 0,
      required: true
    }
  },
  data() {
    return {
      paymentType: null,
      options: [
        { label: "Pay now", value: "Pay now" },
        { label: "Pay on Collection", value: "Pay on Collection" }
      ]
    };
  },
  computed: {
    showItemsInOrder() {
      return this.$store.getters.getBasket;
    },
    itemsInOrder() {
      return this.$store.getters.getBasket.reduce(
        (a, b) => +a + +b.quantity,
        0
      );
    },
    vatTotal() {
      return (this.orderTotal * Number(this.$store.getters.getVATRate)).toFixed(
        2
      );
    }
  },
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  methods: {
    async onSubmit() {
      await this.$refs.myForm.validate().then(async success => {
        if (success) {
          this.$emit("placeOrder", this.paymentType);
        }
      });
    }
  }
};
</script>
<style></style>
