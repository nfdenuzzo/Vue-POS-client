<template>
  <q-card :style="!$q.platform.is.mobile ? 'width: 750px; bottom:25vh;' : ''">
    <div class="text-color">
      <q-card-section class="text-color row items-center q-pb-none">
        <div class="col-xs-11">
          <div class="text-weight-bolder q-pb-xs text-center text-subtitle1">
            Your Order
          </div>
        </div>
        <div class="col-xs-1">
          <q-btn icon="close" flat round dense @click="closeDialog" />
        </div>
      </q-card-section>
      <q-card-section class="text-color row items-center q-pa-sm">
        <div v-if="hasItemsInOrder" class="row">
          {{ showItemsInOrder }}
        </div>
        <div v-else>
          please select an item to order
        </div>
      </q-card-section>
      <div clas="q-pa-md">
        <div class="row justify-center q-pb-md q-pt-lg">
          <q-btn
            label="Order more"
            @click="closeDialog"
            color="logoRed"
            class="q-mr-lg text-capitalize"
          />
          <q-btn
            label="Choose Payment"
            @click="onSubmit"
            color="positive"
            class="text-capitalize"
            :disabled="hasItemsInOrder"
          />
        </div>
      </div>
    </div>
  </q-card>
</template>

<script>
export default {
  components: {},
  mixins: [],
  props: {
    viewBasket: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {
      btnLoading: false
    };
  },
  computed: {
    hasItemsInOrder() {
      return this.$store.getters.getBasket.length > 0;
    },
    showItemsInOrder() {
      return this.$store.getters.getBasket;
    }
  },
  watch: {
    hasItemsInOrder() {
      if (!this.hasItemsInOrder) {
        this.$emit("update:viewBasket", false);
      }
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  methods: {
    closeDialog() {
      this.$emit("update:viewBasket", false);
    },
    onSubmit() {}
  }
};
</script>
<style></style>
