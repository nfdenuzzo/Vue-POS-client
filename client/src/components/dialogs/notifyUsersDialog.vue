<template>
  <q-card>
    <div class="text-color">
      <div
        class="text-weight-bolder q-pb-xs  q-pt-md text-center text-subtitle1"
      >
        Are You sure?
      </div>
      <div
        class="row text-weight-bold q-pb-lg  q-pt-md text-center text-caption q-pa-md"
      >
        <span>
          Confirming this will send out a notification to ALL subscribed users,
          please do not spam this function as users will be likely to
          unsubscribe fi you do, we recommend to notify at most once a week
        </span>
      </div>

      <div class="row justify-center q-pb-md">
        <q-btn
          label="No"
          color="positive"
          class="q-mr-lg text-capitalize"
          @click="closeDialog"
        />
        <q-btn
          label="Yes"
          @click="confirmNotify"
          color="logoRed"
          class="text-capitalize"
          :loading="notifyBtnLoading"
        />
      </div>
    </div>
  </q-card>
</template>
<script>
export default {
  components: {},
  mixins: [],
  props: {
    notifyId: {
      type: String,
      default: "",
      required: true
    },
    viewNotifyUsers: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {
      notifyBtnLoading: false
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
    async confirmNotify() {
      this.notifyBtnLoading = true;
      const result = await this.$store.dispatch("notifyUsers", this.notifyId)
      if (result && result.status === 200) {
        this.$q.notify({
          type: "positive",
          message: "All users have been notified",
          color: "positive"
        });
      }
      this.notifyBtnLoading = false;
      this.$emit("update:viewNotifyUsers", false);
    },
    closeDialog() {
      this.$emit("update:viewNotifyUsers", false);
    }
  }
};
</script>
<style lang="scss"></style>
