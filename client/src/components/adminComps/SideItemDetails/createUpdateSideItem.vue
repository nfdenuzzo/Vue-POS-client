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
        {{ isEditing ? "Update" : "Create" }} Side Item
      </div>
      <div clas="q-pa-md" v-if="dataLoaded" :key="rerenderKey">
        <q-form ref="myForm" @submit="onSubmit" @reset="onReset">
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
                      : 'col-xs-11 col-sm-3 col-md-3 col-lg-3'
                  "
                  class="q-pa-md"
                >
                  <q-input
                    outlined
                    dense
                    v-model="sideItemObj.name"
                    label="Name"
                    color="positive"
                    :rules="[
                      val =>
                        (val && val.length > 0 && /\S/.test(val)) ||
                        'Name of side required!'
                    ]"
                  />
                </div>

                <div
                  :class="
                    isEditing
                      ? 'col-xs-8 '
                      : 'col-xs-11 col-sm-3 col-md-3 col-lg-3'
                  "
                  class="q-pa-md"
                >
                  <q-select
                    outlined
                    v-model="sideItemObj.addonCategory"
                    :options="getAddonCategoriesExcludingDisabled"
                    label="Add-on Category"
                    color="positive"
                    option-value="_id"
                    option-label="name"
                    dense
                    :rules="[val => val != null || 'Please select a category!']"
                  >
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-italic text-grey">
                          No options available
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </div>

                <div
                  :class="
                    isEditing
                      ? 'col-xs-8 '
                      : 'col-xs-11 col-sm-3 col-md-3 col-lg-3'
                  "
                  class="q-pa-md"
                >
                  <q-input
                    outlined
                    dense
                    v-model.number="sideItemObj.price"
                    label="Item Price"
                    lazy-rules
                    mask="#####.##"
                    color="positive"
                    :rules="[
                      val => (val && val >= 0) || 'Price is required!'
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
                    v-model="sideItemObj.disabled"
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
              type="reset"
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
    selectedSideItem: {
      type: Object,
      required: false,
      default: () => {}
    },
    viewUpdateDialog: {
      type: Boolean,
      required: false,
      default: false
    },
    isEditing: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      rerenderKey: 0,
      createUpdateBtnLoading: false,
      sideItemObj: {
        name: null,
        price: null,
        addonCategory: null,
        disabled: false
      },
      dataLoaded: false
    };
  },
  computed: {
    getAddonCategoriesExcludingDisabled() {
      return this.$store.getters.getAdminAddonCategories.filter(
        x => !x.disabled
      );
    }
  },
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {
    this.$store.dispatch("retrieveAdminAddonCategories");
  },
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
      (this.sideItemObj = {
        name: null,
        addonCategory: null,
        disabled: false
      }),
        this.$emit("update:viewUpdateDialog", false);
    },
    async assignData() {
      this.sideItemObj = JSON.parse(JSON.stringify(this.selectedSideItem));
    },
    async onSubmit() {
      const method = this.isEditing ? "updateSideItem" : "createSideItem";
      this.createUpdateBtnLoading = true;
      const result = await this.$store.dispatch(method, this.sideItemObj);
      if (result && result.status === 200) {
        this.$q.notify({
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
      this.sideItemObj = {
        name: null,
        price: null,
        disabled: false,
        addonCategory: null
      };
      this.$refs.myForm.resetValidation();
    }
  }
};
</script>
<style lang="scss"></style>
