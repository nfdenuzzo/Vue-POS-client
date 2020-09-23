<template>
  <div class="text-color">
    <q-card-section class="row items-center q-pb-none">
      <div :class="orderSpecifications.tableNo ? 'col-xs-6' : 'col-xs-12'">
        <div class="text-weight-bolder q-pb-xs text-center text-subtitle1">
          Order No. {{ orderSpecifications.uniqueOrderId }}
        </div>
      </div>
      <div class="col-xs-6" v-if="orderSpecifications.tableNo">
        <div class="text-weight-bolder q-pb-xs text-center text-subtitle1">
          Table No. {{ orderSpecifications.tableNo }}
        </div>
      </div>
    </q-card-section>
    <div class="text-color row items-center text-center q-pb-none">
      <div class="col-xs-11 text-weight-bold">
        {{ orderSpecifications.itemsInOrder }} Items
      </div>
    </div>
    <div class="text-color row items-center text-center q-pb-none">
      <div class="col-xs-11 text-weight-bold">
        Order place at:
        {{ orderSpecifications.createdAt }}
      </div>
    </div>
    <div class="text-color row text-center q-pt-sm q-pb-md">
      <div class="col-xs-12 col-sm-6">
        <div class="row text-center">
          <div class="col-xs-12 text-weight-bold">
            User Details
          </div>
        </div>
        <div class="row text-center">
          <div class="col-xs-12">
            <span class="text-weight-bold">Name:</span>
            {{ orderSpecifications.name }}
          </div>
          <div class="col-xs-12">
            <span class="text-weight-bold">Contact Number:</span>
            <br />
            {{ orderSpecifications.contactNumber }}
          </div>
          <div class="col-xs-12">
            <span class="text-weight-bold"> Email Address:</span>
            <br />
            {{ orderSpecifications.userEmail }}
          </div>
        </div>
      </div>

      <div class="col-xs-12 col-sm-6">
        <div class="row text-center" :class="{ 'q-pt-sm': $q.screen.lt.md }">
          <div class="col-xs-12 text-weight-bold">
            Order Details
          </div>
          <div class="col-xs-12">
            <span class="text-weight-bold">Order for </span>
            {{ orderSpecifications.orderType }}
          </div>
        </div>

        <div
          class="row text-center"
          v-if="orderSpecifications.orderType === 'Delivery'"
        >
          <div class="col-xs-12">
            <span class="text-weight-bold">Address: </span>
            {{ orderSpecifications.address }}
            <br />
            <span v-if="orderSpecifications.addressLine2">
              {{ orderSpecifications.addressLine2 }}
            </span>
          </div>
          <div class="col-xs-12">
            <span class="text-weight-bold"> Area: </span
            >{{ orderSpecifications.deliveryArea.area }}
          </div>
        </div>
        <div class="col-xs-12">
          <span class="text-weight-bold">Notify Status change:</span>
          {{ orderSpecifications.subscribeNotifications ? "Yes" : "No" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  mixins: [],
  props: {
    orderSpecifications: {
      type: Object,
      default: () => [],
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
