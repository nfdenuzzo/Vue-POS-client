<template>
  <div class="text-color">
    <div class="row justify-center" v-drag-and-drop="options">
      <div
        class="col-xs-12 col-sm-12 col-md-3 q-pa-sm"
        style="border: 1px solid #019247;"
        v-for="group in getGroupedByStatus"
        :key="group.id"
      >
        <div class="row justify-center text-center">
          <label class="text-weight-bolder q-pl-sm text-subtitle1">
            {{ group.Status }}
          </label>
          <q-separator color="positive" size="2px" />
        </div>
        <q-list
          :data-id="group.id"
          class="app-custom-list"
          @added="added($event, group)"
          @removed="removed($event, group)"
          @reordered="reordered($event, group)"
        >
          <q-item
            v-for="item in group.items"
            :key="item._id"
            :data-id="item._id"
            class="app-custom-item"
          >
            <q-item-section @dblclick="viewOrderDetailsDialog(item)">
              <q-card class="row" dark>
                <simple-order-view :orderSpecifications="item" />
              </q-card>
            </q-item-section>
            <br />
          </q-item>
        </q-list>
      </div>
    </div>

    <q-dialog
      v-model="viewOrderDetails"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card dark>
        <div class="row text-color">
          <div class="col-xs-12 text-right">
            <q-btn
              icon="close"
              flat
              round
              dense
              @click="closeOrderDetailsDialog"
            />
          </div>
        </div>
        <detailed-order-view
          v-if="viewOrderDetails"
          :orderSpecifications="selectedOrder"
          :adminView="true"
          @closeOrderDetailsDialog="closeOrderDetailsDialog"
          @refreshCurrentOrders="refreshCurrentOrders"
        />
        <div class="row justify-center q-pb-md q-pt-lg">
          <q-btn
            label="Cancel"
            @click="closeOrderDetailsDialog"
            color="negative"
            class="q-mr-lg text-capitalize"
          />
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import VueDraggable from "vue-draggable";
Vue.use(VueDraggable);
export default {
  components: {
    "simple-order-view": () =>
      import("../../components/adminComps/simpleOrderView.vue"),
    "detailed-order-view": () =>
      import("../../components/orderHistory/orderView.vue")
  },
  mixins: [],
  props: {},
  data() {
    return {
      selectedOrder: null,
      viewOrderDetails: false,
      options: {
        multipleDropzonesItemsDraggingEnabled: false,
        dropzoneSelector: ".q-list",
        draggableSelector: ".q-item"
      }
    };
  },
  computed: {
    getGroupedByStatus() {
      return [
        {
          id: 1,
          Status: "New",
          items: this.$store.getters.getActiveOrders.filter(
            item => item.orderStatus === "PROCESSING"
          )
        },
        {
          id: 2,
          Status: "Preparing",
          items: this.$store.getters.getActiveOrders.filter(
            item => item.orderStatus === "PREPARING"
          )
        },
        {
          id: 3,
          Status: "Ready",
          items: this.$store.getters.getActiveOrders.filter(
            item =>
              item.orderStatus === "OUT FOR DELIVERY" ||
              item.orderStatus === "READY FOR COLLECTION"
          )
        },
        {
          id: 4,
          Status: "Done",
          items: this.$store.getters.getActiveOrders.filter(
            item => item.orderStatus === "COMPLETE"
          )
        }
      ];
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
    refreshCurrentOrders() {},
    closeOrderDetailsDialog() {
      this.viewOrderDetails = false;
      this.selectedOrder = null;
    },
    viewOrderDetailsDialog(orderDetails) {
      this.selectedOrder = orderDetails;
      this.viewOrderDetails = true;
    },
    updateOrderStatus(val, uniqueOrderId, _id) {
      const dto = {
        orderStatus: val,
        uniqueOrderId: uniqueOrderId,
        _id: _id
      };
      this.$store.dispatch("updateOrderStatus", dto);
    },
    added(event, group) {
      const newItems = this.getGroupedByStatus
        .map(group => group.items)
        .reduce((prev, curr) => [...prev, ...curr], [])
        .filter(item => event.detail.ids.map(x => x).indexOf(item._id) >= 0);
      group.items.splice(event.detail.index, 0, ...newItems);
      let matchingOrder = this.$store.getters.getActiveOrders.find(
        order => order._id === event.detail.ids[0]
      );
      if (matchingOrder != null) {
        const selectedStatus = this.getCorrectStatus(group.Status.toUpperCase(), matchingOrder)
        this.updateOrderStatus(
          selectedStatus,
          matchingOrder.uniqueOrderId,
          matchingOrder._id
        );
      }
    },
    removed(event, group) {
      group.items = group.items.filter(
        item => event.detail.ids.map(x => x).indexOf(item._id) < 0
      );
    },
    reordered(event, group) {
      const reorderedItems = group.items.filter(
        item => event.detail.ids.map(x => x).indexOf(item._id) >= 0
      );
      const newItems = group.items.filter(
        item => event.detail.ids.map(x => x).indexOf(item._id) < 0
      );
      newItems.splice(event.detail.index, 0, ...reorderedItems);
      group.items = newItems;
    },
    getCorrectStatus(selectedGroup, selectedOrder) {
      console.log("getCorrectStatus -> selectedOrder", selectedOrder)
      console.log("getCorrectStatus -> selectedGroup", selectedGroup)
      switch (selectedGroup) {
        case "NEW":
          return "PROCESSING";
        case "PREPARING":
          return "PREPARING";
        case "READY":
          if (selectedOrder.orderType === "Delivery") {
            return "OUT FOR DELIVERY";
          } else {
            return "READY FOR COLLECTION";
          }
        case "DONE":
          return "COMPLETE";
      }
    }
  }
};
</script>
<style lang="scss">
.app-custom-list {
  min-width: 10rem;
  height: 90vh;
  margin-top: 0 !important;
}

.app-custom-item[aria-grabbed="true"] {
  background: $positive;
  color: #fff;
}

@keyframes nodeInserted {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 0.8;
  }
}

.item-dropzone-area {
  height: 2rem;
  background: $goldBrown;
  opacity: 0.8;
  animation-duration: 0.5s;
  animation-name: nodeInserted;
  margin-left: 0.6rem;
  margin-right: 0.6rem;
}
</style>
