<template>
  <div class="text-color">
    <q-card-section class="text-color row items-center q-pb-none">
      <div class="col-xs-12">
        <div class="text-weight-bolder q-pb-xs text-center text-subtitle1">
          Whoops, somethings changed!
        </div>
      </div>
    </q-card-section>
    <div class="row justify-center text-color">
      <div class="col-xs-10 q-pa-sm">
        <q-card v-if="invalidNames.length > 0">
          <div class="row q-pa-sm justify-center">
            <div class="row q-pa-sm text-center">
              Unfortunately the following item(s) are no longer available for
              purchase at this time
            </div>
            <div
              class="row justify-center"
              v-for="(item, index) in invalidNames"
              :key="index"
            >
              <span class="text-weight-bold q-pa-xs"
                >{{ index + 1 }}) {{ item }}
              </span>
              <br />
            </div>
            <div class="row q-pa-sm text-center">
              They have been automatically removed from your basket, we
              apologies for any inconvinence caused.
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  mixins: [],
  props: {
    invalidNames: {
      type: Array,
      default: () => [],
      required: true
    },
    invalidIds: {
      type: Array,
      default: () => [],
      required: true
    },
    invalidCategories: {
      type: Array,
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
  async mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  methods: {}
};
</script>
<style></style>
