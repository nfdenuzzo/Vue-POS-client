<template>
  <div class="text-color">
    <q-card>
      <q-card-section
        class="text-color row items-center q-pb-none"
        v-if="isEditing"
      >
        <q-space />
        <q-btn icon="close" flat round dense @click="closeDialog" />
      </q-card-section>
      <div
        class="text-weight-bolder q-pb-xs  q-pt-md text-center text-subtitle1"
      >
        {{ isEditing ? "Update" : "Create" }} Add-on Category
      </div>
      <div clas="q-pa-md" v-if="dataLoaded">
        <q-form ref="myForm" @submit="onSubmit">
          <div class="row justify-center q-pb-md">
            <div
              :class="
                isEditing
                  ? 'col-xs-11'
                  : 'col-xs-12 col-sm-12 col-md-10 col-lg-8'
              "
            >
              <div class="row justify-center">
                <div
                  :class="
                    isEditing
                      ? 'col-xs-8'
                      : 'col-xs-11 col-sm-4 col-md-4 col-lg-4'
                  "
                  class="q-pa-md"
                >
                  <q-input
                    outlined
                    dense
                    dark
                    v-model="addonCatObj.name"
                    label="Name"
                    lazy-rules
                    color="positive"
                    :rules="[
                      val =>
                        (val && val.length > 0 && /\S/.test(val)) ||
                        'Name of category required!'
                    ]"
                  />
                </div>

                <div
                  :class="
                    isEditing
                      ? 'col-xs-8'
                      : 'col-xs-11 col-sm-3 col-md-3 col-lg-2'
                  "
                  class="q-pa-md text-color text-weight-bold"
                >
                  <q-checkbox
                    left-label
                    dark
                    v-model="addonCatObj.disabled"
                    label="Disable Item"
                    color="positive"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="row justify-center q-pb-md q-pt-lg">
            <q-btn
              v-if="isEditing"
              label="Cancel"
              @click="closeDialog"
              color="negative"
              class="q-mr-lg text-capitalize"
            />
            <q-btn
              v-if="!isEditing"
              label="Reset"
              @click="onReset"
              color="logoRed"
              class="q-mr-lg text-capitalize"
            />
            <q-btn
              :label="isEditing ? 'Update' : 'Create'"
              type="submit"
              color="positive"
              class="text-capitalize"
              :loading="createUpdateBtnLoading"
            />
          </div>
        </q-form>
      </div>
    </q-card>
  </div>
</template>
<script>
export default {
  components: {},
  mixins: [],
  props: {
    selectedAddOnItem: {
      type: Object,
      required: false,
      default: () => {}
    },
    isEditing: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      createUpdateBtnLoading: false,
      addonCatObj: {
        name: null,
        disabled: false
      },
      dataLoaded: false
    };
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  async mounted() {
    if (this.isEditing) {
      await this.assignData();
      this.dataLoaded = true;
    } else {
      this.dataLoaded = true;
    }
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  methods: {
    closeDialog() {
      (this.addonCatObj = {
        name: null,
        disabled: false
      }),
        this.$emit("closeUpdateDialog");
    },
    async assignData() {
      this.addonCatObj = JSON.parse(JSON.stringify(this.selectedAddOnItem));
    },
    async onSubmit() {
      const method = this.isEditing
        ? "updateAddonCatOption"
        : "createAddonCatOption";
      this.createUpdateBtnLoading = true;
      const result = await this.$store.dispatch(method, this.addonCatObj);
      if (result && result.status === 200) {
        this.$q.notify({
          type: "positive",
          message: this.isEditing
            ? "Item updated successfully."
            : "Item created successfully.",
          color: "positive"
        });
        if (this.isEditing) {
          this.closeDialog();
        } else {
          this.onReset();
        }
      }
      this.createUpdateBtnLoading = false;
    },
    onReset() {
      this.addonCatObj = {
        name: null,
        disabled: false
      };
      this.$refs.myForm.reset();
    }
  }
};
</script>
<style lang="scss"></style>
