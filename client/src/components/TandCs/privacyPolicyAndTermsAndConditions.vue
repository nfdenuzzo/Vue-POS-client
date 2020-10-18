<template>
  <div
    class="column  text-color text-weight-bolder justify-end"
    style="height: 150px"
  >
    <div class="row justify-center">
      <q-btn
        @click="showPrivacyPolicy"
        flat
        color="positive"
        label="Privary Policy"
        class="text-weight-bolder  text-caption"
      />
    </div>
    <div class="row justify-center">
      <q-btn
        flat
        color="positive"
        label="Terms and Conditions"
        class="text-weight-bolder  text-caption"
      />
    </div>
    <div class="row justify-center text-caption text-weight-bold">
      Copyright © 2018 <br v-if="$q.screen.lt.md" />
      All rights reserved
    </div>

    <q-dialog
      v-model="viewPrivacyPolicy"
      :full-height="true"
      :full-width="true"
      transition-show="slide-up"
      transition-hide="slide-down"
      :no-esc-dismiss="false"
    >
      <privacy-policy :viewPrivacyPolicy.sync="viewPrivacyPolicy" />
    </q-dialog>
  </div>
</template>
<script>
export default {
  components: {
    "privacy-policy": () => import("./privacyPolicy.vue")
  },
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
      viewPrivacyPolicy: false
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
  methods: {
    showPrivacyPolicy() {
      this.viewPrivacyPolicy = true;
    }
  }
};
</script>
<style></style>
