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

      <div clas="q-pa-md" v-if="dataLoaded">
        <q-form ref="myForm" @submit="onSubmit">
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
                v-model="menuItemObj.price"
                label="Item Price"
                lazy-rules
                v-cleave="masks.TwoDecimals"
                @input.native="onInputCleaveFormatValue()"
                color="positive"
                :rules="[val => (val && val >= 0) || 'Price of item required!']"
              />
            </div>

            <div class="col-xs-11 col-sm-4 col-md-4 col-lg-2 q-px-md">
              <q-input
                outlined
                dense
                v-model="menuItemObj.description"
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
                :isEditing="isEditing"
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
            <div class="col-xs-11 col-sm-4 col-md-4 col-lg-2 q-px-md">
              <hasDessertOption
                :menuItemObj.sync="menuItemObj"
                ref="hasDessertOption"
              />
            </div>
            <div class="col-xs-11 col-sm-4 col-md-4 col-lg-2 q-px-md">
              <hasSaladTopping
                :menuItemObj.sync="menuItemObj"
                ref="hasSaladToppings"
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
import hasDessertOption from "../menuItemOptions/itemHasDessertOption.vue";
import hasSaladTopping from "../menuItemOptions/itemHasSaladTopping.vue";
import hasExtrasOffered from "../menuItemOptions/itemHasExtrasOffered.vue";
import imagePage from "../../imagePage.vue";
import sortBy from "lodash/sortBy";
import Cleave from "cleave.js";
const cleave = {
  name: "cleave",
  bind(el, binding) {
    const input = el.querySelector("input");
    input._vCleave = new Cleave(input, binding.value);
  },
  unbind(el) {
    const input = el.querySelector("input");
    input._vCleave.destroy();
  }
};
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
    hasDessertOption,
    hasSaladTopping,
    imagePage
  },
  directives: { cleave },
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
      masks: {
        TwoDecimals: {
          numeral: true,
          numeralDecimalMark: ".",
          delimiter: "",
          numeralPositiveOnly: true,
          numeralDecimalScale: 2
        }
      },
      dataLoaded: false,
      createUpdateBtnLoading: false,
      menuItemObj: this.defaultMenuItemObject()
    };
  },
  computed: {
    getMenuCategories() {
      return sortBy(this.$store.getters.getMenuCategories, function(item) {
        return item.name.toLowerCase();
      });
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
    onInputCleaveFormatValue() {
      this.menuItemObj.price = event.target._vCleave.getFormattedValue();
    },
    defaultMenuItemObject() {
      return {
        name: null,
        description: null,
        price: null,
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
        hasDessertOptions: false,
        chosenDessertOptions: [],
        hasSaladToppings: false,
        chosenSaladToppings: [],
        hasSideOptions: false,
        chosenSideOptions: [],
        hasBurgerToppings: false,
        chosenBurgerToppings: []
      };
    },
    closeDialog() {
      this.menuItemObj = this.defaultMenuItemObject();
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
      this.$refs.hasCalzoneOption.resetFields();
      this.$refs.hasPizzaToppings.resetFields();
      this.$refs.hasPastaOptions.resetFields();
      this.$refs.hasPastaToppings.resetFields();
      this.$refs.hasSauceOptions.resetFields();
      this.$refs.hasDessertOption.resetFields();
      this.$refs.hasSaladToppings.resetFields();
      this.$refs.hasMainToppings.resetFields();
      this.$refs.hasSideOptions.resetFields();
      this.$refs.hasMeatStyleOptions.resetFields();
      this.$refs.hasBurgerToppings.resetFields();
      this.$refs.hasFishStyleOptions.resetFields();
      this.$refs.hasEggStyleOptions.resetFields();
      this.$refs.hasExtrasOffered.resetFields();
      this.$refs.hasBastingStyleOption.resetFields();
      this.$refs.imagePage.resetFields();
      this.$refs.myForm.reset();
      this.menuItemObj = this.defaultMenuItemObject();
    }
  }
};
</script>
<style lang="scss"></style>
