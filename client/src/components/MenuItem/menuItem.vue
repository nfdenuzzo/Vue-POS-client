<template>
  <div class="text-color row justify-center">
    <div class="col-xs-11">
      <q-card
        @click="viewDetails"
        style="cursor: pointer;"
        class="my-hover-shadow"
        :style="getCardMinHeight"
      >
        <div class="row q-pa-sm q-px-md">
          <div class="col-xs-8 text-subtitle1 text-weight-bolder">
            {{ item.name }}
          </div>
          <div
            class="col-xs-4 self-start text-right text-weight-bolder text-subtitle1"
          >
            R {{ item.price }}
          </div>
        </div>
        <div class="row q-px-md">
          <div
            class="col-xs-7"
            :class="item.menuItemImage ? 'col-xs-7' : 'col-xs-10'"
          >
            <div class="row text-caption">
              {{ item.description }}
            </div>
          </div>
          <div
            class="col-xs-5 self-end text-right self-center q-mb-lg"
            v-if="item.menuItemImage"
          >
            <q-avatar size="110px" color="black">
              <img contain :src="item.menuItemImage" />
            </q-avatar>
          </div>
        </div>
        <br />
      </q-card>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  mixins: [],
  props: {
    item: {
      type: Object,
      default: () => {},
      required: false
    }
  },
  data() {
    return {};
  },
  computed: {
    getCardMinHeight() {
      if (this.$route.path.includes("/menu-option-chef-specials")) {
        return "min-height: 200px; max-height: 200px";
      } else {
        return "min-height: 150px; max-height: 150px";
      }
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
    viewDetails() {
      this.$emit("viewDetails", this.item);
    }
  }
};
</script>
<style></style>
