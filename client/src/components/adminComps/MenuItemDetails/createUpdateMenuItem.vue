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
        class="text-weight-bolder q-pb-md  q-pt-md text-center text-subtitle1"
      >
        {{ isEditing ? "Update" : "Create" }} Menu Item
      </div>

      <div clas="q-pa-md" v-if="dataLoaded" :key="rerenderKey">
        <q-form ref="myForm" @submit="onSubmit" @reset="onReset">
          <div class="row justify-center q-pb-sm">
            <div class="col-xs-11 col-sm-4 col-md-4 col-lg-2 q-px-md">
              <q-input
                outlined
                dense
                v-model="menuItemObj.name"
                label="Item Name"
                lazy-rules
                color="positive"
                :rules="[
                  val =>
                    (val && val.length > 0 && /\S/.test(val)) ||
                    'Name of item required!'
                ]"
              />
            </div>

            <div class="col-xs-11 col-sm-4 col-md-4 col-lg-2 q-px-md">
              <q-input
                outlined
                dense
                v-model.number="menuItemObj.price"
                label="Item Price"
                lazy-rules
                mask="#####.##"
                color="positive"
                :rules="[val => (val && val >= 0) || 'Price of item required!']"
              />
            </div>

            <div class="col-xs-11 col-sm-4 col-md-4 col-lg-2 q-px-md">
              <q-input
                outlined
                dense
                v-model.number="menuItemObj.description"
                label="Item Description"
                lazy-rules
                autogrow
                color="positive"
                :rules="[
                  val =>
                    (val && val.length > 0 && /\S/.test(val)) ||
                    'Description of item required!'
                ]"
              />
            </div>

            <div class="col-xs-11 col-sm-4 col-md-4 col-lg-2 q-px-md">
              <q-select
                outlined
                v-model="menuItemObj.menuCategory"
                :options="getMenuCategories"
                label="Menu Category"
                color="positive"
                dense
                option-value="_id"
                option-label="name"
                lazy-rules
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
              class="col-xs-6 col-sm-4 col-md-4 col-lg-1 q-px-md text-color text-weight-bold"
            >
              <q-checkbox
                left-label
                v-model="menuItemObj.disabled"
                label="Disable Item"
                color="positive"
              />
            </div>

            <div class="col-xs-12 q-px-md">
              <imagePage
                ref="imagePage"
                :menuItemImage.sync="menuItemObj.menuItemImage"
              />
            </div>
          </div>

          <div class="row justify-center">
            <div class="col-xs-11 col-sm-4 col-md-4 col-lg-2 q-px-md">
              <hasCalzoneOption
                :menuItemObj.sync="menuItemObj"
                ref="hasCalzoneOption"
              />
            </div>
            <div class="col-xs-11 col-sm-4 col-md-4 col-lg-2 q-px-md">
              <hasPizzaTopping
                :menuItemObj.sync="menuItemObj"
                ref="hasPizzaToppings"
              />
            </div>
          </div>

          <div class="row justify-center">
            <div class="col-xs-11 col-sm-4 col-md-4 col-lg-2 q-px-md">
              <hasPastaOption
                :menuItemObj.sync="menuItemObj"
                ref="hasPastaOptions"
              />
            </div>
            <div class="col-xs-11 col-sm-4 col-md-4 col-lg-2 q-px-md">
              <hasPastaTopping
                :menuItemObj.sync="menuItemObj"
                ref="hasPastaToppings"
              />
            </div>
          </div>

          <div class="row justify-center">
            <div class="col-xs-11 col-sm-4 col-md-4 col-lg-2 q-px-md">
              <hasSauceOption
                :menuItemObj.sync="menuItemObj"
                ref="hasSauceOptions"
              />
            </div>
            <div class="col-xs-11 col-sm-4 col-md-4 col-lg-2 q-px-md">
              <hasMainTopping
                :menuItemObj.sync="menuItemObj"
                ref="hasMainToppings"
              />
            </div>
          </div>

          <div class="row justify-center">
            <div class="col-xs-11 col-sm-4 col-md-4 col-lg-2 q-px-md">
              <hasSideOption
                :menuItemObj.sync="menuItemObj"
                ref="hasSideOptions"
              />
            </div>
            <div class="col-xs-11 col-sm-4 col-md-4 col-lg-2 q-px-md">
              <hasMeatStyleOption
                :menuItemObj.sync="menuItemObj"
                ref="hasMeatStyleOptions"
              />
            </div>
          </div>

          <div class="row justify-center">
            <div class="col-xs-11 col-sm-4 col-md-4 col-lg-2 q-px-md">
              <hasEggStyleOption
                :menuItemObj.sync="menuItemObj"
                ref="hasEggStyleOptions"
              />
            </div>
            <div class="col-xs-11 col-sm-4 col-md-4 col-lg-2 q-px-md">
              <hasFishStyleOption
                :menuItemObj.sync="menuItemObj"
                ref="hasFishStyleOptions"
              />
            </div>
          </div>

          <div class="row justify-center">
            <div class="col-xs-11 col-sm-4 col-md-4 col-lg-2 q-px-md">
              <hasBurgerTopping
                :menuItemObj.sync="menuItemObj"
                ref="hasBurgerToppings"
              />
            </div>
            <div class="col-xs-11 col-sm-4 col-md-4 col-lg-2 q-px-md">
              <hasBastingStyleOption
                :menuItemObj.sync="menuItemObj"
                ref="hasBastingStyleOption"
              />
            </div>
          </div>

          <div class="row justify-center">
            <hasExtrasOffered
              :menuItemObj.sync="menuItemObj"
              ref="hasExtrasOffered"
            />
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
import hasPizzaTopping from "../menuItemOptions/itemHasPizzaTopping.vue";
import hasBurgerTopping from "../menuItemOptions/itemHasBurgerTopping.vue";
import hasPastaTopping from "../menuItemOptions/itemHasPastaTopping.vue";
import hasCalzoneOption from "../menuItemOptions/itemHasCalzoneOption.vue";
import hasSauceOption from "../menuItemOptions/itemHasSauceOption.vue";
import hasSideOption from "../menuItemOptions/itemHasSideOption.vue";
import hasMainTopping from "../menuItemOptions/itemHasMainTopping.vue";
import hasPastaOption from "../menuItemOptions/itemHasPastaOption.vue";
import hasMeatStyleOption from "../menuItemOptions/itemHasMeatStyleOption.vue";
import hasFishStyleOption from "../menuItemOptions/itemHasFishStyleOption.vue";
import hasEggStyleOption from "../menuItemOptions/itemHasEggStyleOption.vue";
import hasBastingStyleOption from "../menuItemOptions/itemHasBastingStyleOption.vue";
import hasExtrasOffered from "../menuItemOptions/itemHasExtrasOffered.vue";
import imagePage from "../../imagePage.vue";
import _ from "lodash";
export default {
  components: {
    hasPizzaTopping,
    hasBurgerTopping,
    hasPastaTopping,
    hasCalzoneOption,
    hasSauceOption,
    hasSideOption,
    hasMainTopping,
    hasPastaOption,
    hasMeatStyleOption,
    hasFishStyleOption,
    hasEggStyleOption,
    hasExtrasOffered,
    hasBastingStyleOption,
    imagePage
  },
  mixins: [],
  props: {
    selectedMenuItem: {
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
      dataLoaded: false,
      createUpdateBtnLoading: false,
      menuItemObj: {
        name: null,
        description: null,
        price: false,
        menuItemImage: null,
        menuCategory: null,
        disabled: false,
        calzonePrice: null,
        calzoneOffered: false,
        hasBastingStyleOptions: false,
        chosenBastingStyleOptions: [],
        hasEggStyleOptions: false,
        chosenEggStyleOptions: [],
        offerExtraPizzaToppings: false,
        offerExtraDessertToppings: false,
        offerExtraSaladToppings: false,
        offerExtraBurgerToppings: false,
        offerExtraPastaToppings: false,
        offerExtraSuaces: false,
        offerExtraMainOptions: false,
        hasFishStyleOptions: false,
        chosenFishStyleOptions: [],
        hasMainToppings: false,
        chosenMainToppings: [],
        hasMeatStyleOptions: false,
        chosenMeatStyleOptions: [],
        hasPastaOptions: false,
        chosenPastaOptions: [],
        hasPastaToppings: false,
        chosenPastaToppings: [],
        hasPizzaToppings: false,
        chosenPizzaToppings: [],
        hasSauceOptions: false,
        chosenSauceOptions: [],
        hasSideOptions: false,
        chosenSideOptions: [],
        hasBurgerToppings: false,
        chosenBurgerToppings: []
      }
    };
  },
  computed: {
    getMenuCategories() {
      if (this.filterMenuCategories) {
        return _.sortBy(
          this.$store.getters.getMenuCategories.filter(item =>
            item.name.includes(this.filterMenuCategories)
          ),
          "name"
        );
      } else {
        return _.sortBy(this.$store.getters.getMenuCategories, function(user) {
          return user.name.toLowerCase();
        });
      }
    }
  },
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {
    this.$store.dispatch("retrieveMenuCategories");
    this.$store.dispatch("retrieveAdminAddonCategories");
    this.$store.dispatch("retrieveAdminSideItem");
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
      this.menuItemObj = {
        name: null,
        description: null,
        price: false,
        menuItemImage: null,
        menuCategory: null,
        disabled: false,
        calzonePrice: null,
        calzoneOffered: false,
        hasBastingStyleOptions: false,
        chosenBastingStyleOptions: [],
        hasEggStyleOptions: false,
        chosenEggStyleOptions: [],
        offerExtraPizzaToppings: false,
        offerExtraDessertToppings: false,
        offerExtraSaladToppings: false,
        offerExtraBurgerToppings: false,
        offerExtraPastaToppings: false,
        offerExtraSuaces: false,
        offerExtraMainOptions: false,
        hasFishStyleOptions: false,
        chosenFishStyleOptions: [],
        hasMainToppings: false,
        chosenMainToppings: [],
        hasMeatStyleOptions: false,
        chosenMeatStyleOptions: [],
        hasPastaOptions: false,
        chosenPastaOptions: [],
        hasPastaToppings: false,
        chosenPastaToppings: [],
        hasPizzaToppings: false,
        chosenPizzaToppings: [],
        hasSauceOptions: false,
        chosenSauceOptions: [],
        hasSideOptions: false,
        chosenSideOptions: [],
        hasBurgerToppings: false,
        chosenBurgerToppings: []
      };
      this.$emit("update:viewUpdateDialog", false);
    },
    async assignData() {
      this.menuItemObj = JSON.parse(JSON.stringify(this.selectedMenuItem));
    },
    async onSubmit() {
      const method = this.isEditing ? "updateMenuItem" : "createMenuItem";
      this.createUpdateBtnLoading = true;
      const result = await this.$store.dispatch(method, this.menuItemObj);
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
      this.$refs.hasCalzoneOption.resetFields();
      this.$refs.hasPizzaToppings.resetFields();
      this.$refs.hasPastaOptions.resetFields();
      this.$refs.hasPastaToppings.resetFields();
      this.$refs.hasSauceOptions.resetFields();
      this.$refs.hasMainToppings.resetFields();
      this.$refs.hasSideOptions.resetFields();
      this.$refs.hasMeatStyleOptions.resetFields();
      this.$refs.hasBurgerToppings.resetFields();
      this.$refs.hasFishStyleOptions.resetFields();
      this.$refs.hasEggStyleOptions.resetFields();
      this.$refs.hasExtrasOffered.resetFields();
      this.$refs.hasBastingStyleOption.resetFields();
      this.$refs.imagePage.resetFields();
      this.$refs.myForm.resetValidation();
      this.menuItemObj = {
        name: null,
        description: null,
        price: false,
        menuItemImage: null,
        menuCategory: null,
        disabled: false,
        calzonePrice: null,
        calzoneOffered: false,
        hasBastingStyleOptions: false,
        chosenBastingStyleOptions: [],
        hasEggStyleOptions: false,
        chosenEggStyleOptions: [],
        offerExtraPizzaToppings: false,
        offerExtraDessertToppings: false,
        offerExtraSaladToppings: false,
        offerExtraBurgerToppings: false,
        offerExtraPastaToppings: false,
        offerExtraSuaces: false,
        offerExtraMainOptions: false,
        hasFishStyleOptions: false,
        chosenFishStyleOptions: [],
        hasMainToppings: false,
        chosenMainToppings: [],
        hasMeatStyleOptions: false,
        chosenMeatStyleOptions: [],
        hasPastaOptions: false,
        chosenPastaOptions: [],
        hasPastaToppings: false,
        chosenPastaToppings: [],
        hasPizzaToppings: false,
        chosenPizzaToppings: [],
        hasSauceOptions: false,
        chosenSauceOptions: [],
        hasSideOptions: false,
        chosenSideOptions: []
      };
    }
  }
};
</script>
<style lang="scss"></style>
