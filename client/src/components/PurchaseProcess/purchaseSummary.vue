<template>  <div class="text-color">
    <q-card-section class="text-color row items-center q-pb-none">
      <div class="col-xs-12">
        <div class="text-weight-bolder q-pb-xs text-center text-subtitle1">
          Invoice Total
        </div>
      </div>
    </q-card-section>
    <q-card-section class="text-color items-center q-pa-sm">
        <div class="row q-pt-md q-px-lg">
          <div class="col-xs-12 text-center text-weight-bold text-subtitle1" v-if="orderDeliveryCharge > 0">
            Delivery Charge: R {{ orderDeliveryCharge }}
          </div>
        </div>
        <div class="row q-px-lg">
          <div class="col-xs-12 text-center text-weight-bold text-subtitle1">
            Order Total: R {{ orderTotal }}
          </div>
        </div>

        <div class="row q-px-lg q-pt-md">
          <div class="col-xs-12 text-center text-weight-bolder text-subtitle1">
            Total Due: R {{ orderTotal + orderDeliveryCharge }}
          </div>
        </div>
    </q-card-section>
    <!-- <form action="https://www.payfast.co.za/eng/process" method="POST"> -->
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
    return {};
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  methods: {}
};
</script>
<style></style>
