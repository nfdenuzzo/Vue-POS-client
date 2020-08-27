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
          Deleting is a destructive operation, and should be avoided if possible
          - once an item has been deleted it cannot be recovered. are you sure u
          want to delete:
          <br />
          <span class="font-weight-bolder text-logoRed">{{
            selectedItem ? selectedItem.name : ""
          }}</span>
          <span v-if="selectedItem && selectedItem.addonCategory"
            ><br />
            it is currently assigned to the following side category:
            <span class="font-weight-bolder text-logoRed"
              >{{
                selectedItem.addonCategory.name
                  ? selectedItem.addonCategory.name
                  : "Not assigned to a side category"
              }}
            </span>
          </span>
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
          @click="confirmDelete"
          color="logoRed"
          class="text-capitalize"
          :loading="deleteBtnLoading"
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
    selectedItem: {
      type: Object,
      default: () => {},
      required: true
    },
    deleteFunction: {
      type: String,
      default: "",
      required: true
    }
  },
  data() {
    return {
      deleteBtnLoading: false
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
    async confirmDelete() {
      this.deleteBtnLoading = true;
      const result = await this.$store.dispatch(
        this.deleteFunction,
        this.selectedItem._id
      );
      if (result && result.status === 200) {
        this.$q.notify({
          type: 'positive',
          message: "Item deleted successfully.",
          color: "positive"
        });
      }
      this.deleteBtnLoading = false;
      this.$emit("closeDeleteDialog");
    },
    closeDialog() {
      this.$emit("closeDeleteDialog");
    }
  }
};
</script>
<style lang="scss"></style>
