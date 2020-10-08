<template>
  <div class="text-color">
    <div class="text-weight-bolder q-pb-xs  q-pt-md text-center text-subtitle1">
      Our Current Promotion
    </div>
    <div class="row justify-center">
      <div class="col-xs-12 col-sm-10" v-if="!loading">
        <div class="constrain-more-large q-pa-md">
          <div class="camera-frame-large q-pa-md">
            <q-img :src="imageUrl" />
          </div>
        </div>
      </div>
      <div v-else>
        <q-spinner-cube color="logoRed" size="5.5em" />
      </div>
    </div>
    <div class="text-weight-bolder q-pb-xs  q-pt-md text-center text-body2">
      While stocks last.
    </div>
    <div class="text-weight-bolder q-pb-xs  q-pt-md text-center text-body2">
      Terms and conditions apply.
    </div>
    <div class="text-weight-bolder q-pb-xs  q-pt-md text-center text-body2">
      Please contact us if you have any further queries.
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      loading: true,
      imageUrl: null
    };
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.loadSpecialCampaginImage();
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  methods: {
    async loadSpecialCampaginImage() {
      const specialId = this.$route.params.special;
      this.imageUrl = await this.$store.dispatch(
        "retrieveSpecialImageUrl",
        specialId
      );
      this.loading = false;
    }
  }
};
</script>
<style lang="scss">
.constrain-large {
  max-width: 675px;
  margin: 0 auto;
}

.constrain-more-large {
  max-width: 600px;
  margin: 0 auto;
}

.camera-frame-large {
  border: 2px solid $grey-10;
  border-radius: 10px;
}
</style>
