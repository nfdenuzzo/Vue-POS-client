<template>
  <q-card>
    <div class="text-color q-pa-md">
      <div class="text-weight-bolder q-pb-xs  q-pt-md text-center text-h6">
        Transaction Result
      </div>
      <div v-if="getTransactionResult">
        <div
          class="row text-weight-bold q-py-lg justify-center text-caption q-pa-md"
        >
          <q-icon size="60px" class="far fa-check-circle text-logoGreen" />
        </div>

        <div
          class="row text-weight-bold q-pb-lg text-center text-caption q-pa-md"
        >
          Your Transaction was successful!
        </div>
      </div>
      <div v-else>
        <div
          class="row text-weight-bold q-py-lg justify-center text-caption q-pa-md"
        >
          <q-icon size="60px" class="far fa-times-circle text-logoRed" />
        </div>

        <div
          class="row text-weight-bold q-pb-lg text-center text-caption q-pa-md"
        >
          Your Transaction was unsuccessful!
        </div>
      </div>

      <div class="row justify-center q-pb-md">
        <q-btn
          label="Continue"
          color="positive"
          class="text-capitalize"
          @click="closeDialog"
        />
      </div>
    </div>
  </q-card>
</template>
<script>
import _ from "lodash";
export default {
  components: {},
  mixins: [],
  props: {
    viewPaymentStatusDialog: {
      type: Boolean,
      required: true,
      default: true
    },
    paymentResultSuccessful: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    getTransactionResult() {
      return this.paymentResultSuccessful;
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
    closeDialog() {
      this.$emit("update:viewPaymentStatusDialog", false);
      this.$emit("update:paymentResultSuccessful", false);
      this.$router.push("/")
    }
  }
};
</script>
<style></style>
