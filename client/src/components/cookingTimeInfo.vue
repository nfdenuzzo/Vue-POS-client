<template>
  <div class="row justify-center q-pt-sm">
    <div
      class="text-center"
      v-for="(img, index) in images"
      :key="index"
      :class="drawer ? 'col-xs-6' : 'col-xs-5'"
    >
      <q-avatar :size="drawer ? '50px' : '70px'" color="logoRed">
        <q-img contain :src="img.src"></q-img>
      </q-avatar>
      <br />
      <span
        class="text-center text-caption text-color text-weight-medium"
        :class="drawer ? 'text-weight-medium' : 'text-weight-bolder'"
      >
        {{ img.descripton }}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  mixins: [],
  props: {
    drawer: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {
      images: [
        {
          name: "cookingIcon",
          src: require("../../src/assets/cookingIcon.png"),
          descripton: "+- 30min Food preperation time"
        },
        {
          name: "deliveryIcon",
          src: require("../../src/assets/deliveryIcon.png"),
          descripton: "Delivery time is area specific"
        }
      ]
    };
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
