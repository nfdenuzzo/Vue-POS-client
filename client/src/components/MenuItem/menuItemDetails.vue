<template>
  <q-card
    v-if="dataLoaded"
    :style="!$q.platform.is.mobile ? 'width: 750px; ' : ''"
  >
    <div class="row">
      <div class="col-xs-12 text-right text-color">
        <q-btn icon="close" flat round dense @click="closeMenuItemsDetails" />
      </div>
    </div>
    <div class="text-color row justify-center">
      <div class="col-xs-11 col-sm-11">
        <div class="row">
          <div class="col-xs-12">
            <div class="row">
              <div class="col-xs-9 text-h6 text-weight-bolder q-pb-sm q-pt-xs">
                {{ menuItemDetails.name }}
              </div>
              <div
                class="col-xs-3 text-right text-weight-bolder text-h6 q-pt-xs"
              >
                R {{ menuItemDetails.price }}
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div
            class="col-xs-7"
            :class="menuItemDetails.menuItemImage ? 'col-xs-7' : 'col-xs-10'"
          >
            <div class="row text-caption q-pb-xl">
              {{ menuItemDetails.description }}
            </div>
          </div>
          <div
            class="col-xs-5 pl-sm text-center q-mb-lg"
            v-if="menuItemDetails.menuItemImage"
          >
            <q-avatar size="110px" color="black">
              <img :src="menuItemDetails.menuItemImage" />
            </q-avatar>
          </div>
        </div>

        <q-form
          ref="myForm"
          :style="
            !$q.platform.is.mobile && menuItemDetails.menuItemImage
              ? 'margin-top: -40px'
              : ''
          "
          @submit="onSubmit"
          :greedy="true"
        >
          <div class="q-pb-md" v-if="menuItemDetails.calzoneOffered">
            <div class="row text-body2 text-weight-bold">
              <q-checkbox
                dense
                left-label
                v-model="selectedMenuItemDetails.makeCalzone"
                :label="`Calzone ( + R ${menuItemDetails.calzonePrice})`"
                color="positive"
              />
            </div>
            <div class="row">
              <label class="text-caption text-weight-medium"
                >(Pizza folded in a half-moon-shape stuffed with all its
                toppings)</label
              >
            </div>
          </div>

          <div class="q-py-sm" v-if="menuItemDetails.hasPizzaToppings">
            <div class="row text-weight-bold">
              Pizza toppings already included -
            </div>
            <div class="row text-caption text-weight-bold">
              <q-field
                dense
                borderless
                :value="selectedMenuItemDetails.selectedPizzaToppings"
                :rules="[
                  val =>
                    (val != null && val.length > 0) ||
                    'Please select atleast 1 topping!'
                ]"
              >
                <template v-slot:control>
                  <q-option-group
                    dense
                    v-model="selectedMenuItemDetails.selectedPizzaToppings"
                    :options="
                      getDropDownObject(menuItemDetails.chosenPizzaToppings)
                    "
                    color="positive"
                    type="checkbox"
                    inline
                    :disable="!$store.getters.getOrderingActive"
                  />
                </template>
              </q-field>
            </div>
          </div>

          <div class="q-py-sm" v-if="menuItemDetails.hasBurgerToppings">
            <div class="row text-weight-bold">
              Burger toppings already included -
            </div>
            <div class="row text-caption text-weight-bold">
              <q-field
                dense
                borderless
                :value="selectedMenuItemDetails.selectedBurgerToppings"
                :rules="[
                  val =>
                    (val != null && val.length > 0) ||
                    'Please select atleast 1 topping!'
                ]"
              >
                <template v-slot:control>
                  <q-option-group
                    dense
                    v-model="selectedMenuItemDetails.selectedBurgerToppings"
                    :options="
                      getDropDownObject(menuItemDetails.chosenBurgerToppings)
                    "
                    color="positive"
                    type="checkbox"
                    inline
                    :disable="!$store.getters.getOrderingActive"
                  />
                </template>
              </q-field>
            </div>
          </div>

          <div class="q-py-sm" v-if="menuItemDetails.hasSauceOptions">
            <div class="row text-weight-bold">
              Please select a sauce option:
            </div>
            <div class="row text-caption text-weight-bold">
              <q-field
                dense
                borderless
                :value="selectedMenuItemDetails.selectedSauceOption"
                :rules="[val => val != null || 'Please select a sauce!']"
              >
                <template v-slot:control>
                  <q-option-group
                    dense
                    v-model="selectedMenuItemDetails.selectedSauceOption"
                    :options="
                      getDropDownObject(menuItemDetails.chosenSauceOptions)
                    "
                    color="positive"
                    inline
                    :disable="!$store.getters.getOrderingActive"
                  />
                </template>
              </q-field>
            </div>
          </div>

          <div class="q-py-sm" v-if="menuItemDetails.hasSideOptions">
            <div class="row text-weight-bold">
              Please select a side option:
            </div>
            <div class="row text-caption text-weight-bold">
              <q-field
                dense
                borderless
                :value="selectedMenuItemDetails.selectedSideOption"
                :rules="[val => val != null || 'Please select a side option!']"
              >
                <template v-slot:control>
                  <q-option-group
                    dense
                    v-model="selectedMenuItemDetails.selectedSideOption"
                    :options="
                      getDropDownObject(menuItemDetails.chosenSideOptions)
                    "
                    color="positive"
                    inline
                    :disable="!$store.getters.getOrderingActive"
                  />
                </template>
              </q-field>
            </div>
          </div>

          <div class="q-py-sm" v-if="menuItemDetails.hasPastaOptions">
            <div class="row text-weight-bold">
              Please select Pasta Type:
            </div>
            <div class="row text-caption text-weight-bold">
              <q-field
                dense
                borderless
                :value="selectedMenuItemDetails.selectedPastaOption"
                :rules="[val => val != null || 'Please select a pasta type!']"
              >
                <template v-slot:control>
                  <q-option-group
                    dense
                    v-model="selectedMenuItemDetails.selectedPastaOption"
                    :options="
                      getDropDownObject(menuItemDetails.chosenPastaOptions)
                    "
                    color="positive"
                    inline
                    :disable="!$store.getters.getOrderingActive"
                  />
                </template>
              </q-field>
            </div>
          </div>

          <div class="q-py-sm" v-if="menuItemDetails.hasPastaToppings">
            <div class="row text-weight-bold">
              Pasta toppings already included -
            </div>
            <div class="row text-caption text-weight-bold">
              <q-field
                dense
                borderless
                :value="selectedMenuItemDetails.selectedPastaToppings"
                :rules="[
                  val =>
                    (val != null && val.length > 0) ||
                    'Please select atleast 1 topping!'
                ]"
              >
                <template v-slot:control>
                  <q-option-group
                    dense
                    v-model="selectedMenuItemDetails.selectedPastaToppings"
                    :options="
                      getDropDownObject(menuItemDetails.chosenPastaToppings)
                    "
                    color="positive"
                    type="checkbox"
                    inline
                    :disable="!$store.getters.getOrderingActive"
                  />
                </template>
              </q-field>
            </div>
          </div>

          <div class="q-py-sm" v-if="menuItemDetails.hasMeatStyleOptions">
            <div class="row text-weight-bold">
              How would you like your steak cooked?
            </div>
            <div class="row text-caption text-weight-bold">
              <q-field
                dense
                borderless
                :value="selectedMenuItemDetails.selectedMeatStyleOption"
                :rules="[
                  val =>
                    val != null ||
                    'Please specific how your meat should be cooked!'
                ]"
              >
                <template v-slot:control>
                  <q-option-group
                    dense
                    v-model="selectedMenuItemDetails.selectedMeatStyleOption"
                    :options="
                      getDropDownObject(menuItemDetails.chosenMeatStyleOptions)
                    "
                    color="positive"
                    inline
                    :disable="!$store.getters.getOrderingActive"
                  />
                </template>
              </q-field>
            </div>
          </div>

          <div class="q-py-sm" v-if="menuItemDetails.hasBastingStyleOptions">
            <div class="row text-weight-bold">
              Please select basting style:
            </div>
            <div class="row text-caption text-weight-bold">
              <q-field
                dense
                borderless
                :value="selectedMenuItemDetails.selectedBastingOption"
                :rules="[
                  val => val != null || 'Please specific basting style!'
                ]"
              >
                <template v-slot:control>
                  <q-option-group
                    dense
                    v-model="selectedMenuItemDetails.selectedBastingOption"
                    :options="
                      getDropDownObject(
                        menuItemDetails.chosenBastingStyleOptions
                      )
                    "
                    color="positive"
                    inline
                    :disable="!$store.getters.getOrderingActive"
                    :rules="[
                      val => val != null || 'Please specific basting style!'
                    ]"
                  />
                </template>
              </q-field>
            </div>
          </div>

          <div class="q-py-sm" v-if="menuItemDetails.hasFishStyleOptions">
            <div class="row text-weight-bold">
              How would you like your fish prepared?
            </div>
            <div class="row text-caption text-weight-bold">
              <div class="col-xs-12 col-md-7">
                <q-field
                  dense
                  borderless
                  :value="selectedMenuItemDetails.selectedFishCookedStyle"
                  :rules="[
                    val =>
                      val != null ||
                      'Please specific how we should prepare your fish!'
                  ]"
                >
                  <template v-slot:control>
                    <q-option-group
                      dense
                      v-model="selectedMenuItemDetails.selectedFishCookedStyle"
                      :options="
                        getDropDownObject(
                          menuItemDetails.chosenFishStyleOptions
                        )
                      "
                      color="positive"
                      inline
                      :disable="!$store.getters.getOrderingActive"
                    />
                  </template>
                </q-field>
              </div>
            </div>
          </div>

          <div class="q-py-sm" v-if="menuItemDetails.hasEggStyleOptions">
            <div class="row text-weight-bold">
              How would you like your egg prepared?
            </div>
            <div class="row text-caption text-weight-bold">
              <q-field
                dense
                borderless
                :value="selectedMenuItemDetails.selectedEggStyleOption"
                :rules="[
                  val =>
                    val != null ||
                    'Please specific how we should prepare your egg!'
                ]"
              >
                <template v-slot:control>
                  <q-option-group
                    dense
                    v-model="selectedMenuItemDetails.selectedEggStyleOption"
                    :options="
                      getDropDownObject(menuItemDetails.chosenEggStyleOptions)
                    "
                    color="positive"
                    inline
                    :disable="!$store.getters.getOrderingActive"
                  />
                </template>
              </q-field>
            </div>
          </div>

          <div class="q-py-sm" v-if="menuItemDetails.hasMainToppings">
            <div class="row text-weight-bold">
              Toppings already included -
            </div>
            <div class="row text-caption text-weight-bold">
              <q-field
                dense
                borderless
                :value="selectedMenuItemDetails.selectedMainToppingOptions"
                :rules="[
                  val =>
                    (val != null && val.length > 0) ||
                    'Please select atleast 1 topping!'
                ]"
              >
                <template v-slot:control>
                  <q-option-group
                    dense
                    v-model="selectedMenuItemDetails.selectedMainToppingOptions"
                    :options="
                      getDropDownObject(menuItemDetails.chosenMainToppings)
                    "
                    color="positive"
                    inline
                    type="checkbox"
                    :disable="!$store.getters.getOrderingActive"
                  />
                </template>
              </q-field>
            </div>
          </div>

          <div class="q-py-sm" v-if="menuItemDetails.offerExtraMainOptions">
            <div class="row text-weight-bold">
              <q-checkbox
                dense
                left-label
                label="Would you like to add extra's?"
                v-model="addExtraMainOptions"
                color="positive"
              />
            </div>
            <div
              class="row text-caption text-weight-bold"
              v-if="addExtraMainOptions"
            >
              <q-option-group
                v-model="selectedMenuItemDetails.extras.extraDessertToppings"
                :options="extraMainOptions"
                color="positive"
                type="checkbox"
                inline
                :disable="!$store.getters.getOrderingActive"
              />
            </div>
          </div>

          <div class="q-py-sm" v-if="menuItemDetails.offerExtraDessertToppings">
            <div class="row text-weight-bold">
              <q-checkbox
                dense
                left-label
                label="Would you like to add extra's to your dessert?"
                v-model="addExtraDessertToppings"
                color="positive"
              />
            </div>
            <div
              class="row text-caption text-weight-bold"
              v-if="addExtraDessertToppings"
            >
              <q-option-group
                v-model="selectedMenuItemDetails.extras.extraDessertToppings"
                :options="extraDessertToppingsOptions"
                color="positive"
                type="checkbox"
                inline
                :disable="!$store.getters.getOrderingActive"
              />
            </div>
          </div>

          <div class="q-py-sm" v-if="menuItemDetails.offerExtraPastaToppings">
            <div class="row text-weight-bold">
              <q-checkbox
                dense
                left-label
                label="Would you like to add extra's toppings to your pasta?"
                v-model="addExtraPastaToppings"
                color="positive"
              />
            </div>
            <div
              class="row text-caption text-weight-bold"
              v-if="addExtraPastaToppings"
            >
              <q-option-group
                v-model="selectedMenuItemDetails.extras.extraPastaToppings"
                :options="extraPastaToppingsOptions"
                color="positive"
                type="checkbox"
                inline
                :disable="!$store.getters.getOrderingActive"
              />
            </div>
          </div>

          <div class="q-py-sm" v-if="menuItemDetails.offerExtraBurgerToppings">
            <div class="row text-weight-bold">
              <q-checkbox
                dense
                left-label
                label="Would you like to add extra's to your burger?"
                v-model="addExtraBurgerToppings"
                color="positive"
              />
            </div>
            <div
              class="row text-caption text-weight-bold"
              v-if="addExtraBurgerToppings"
            >
              <q-option-group
                v-model="selectedMenuItemDetails.extras.extraBurgerToppings"
                :options="extraBurgerToppingsOptions"
                color="positive"
                type="checkbox"
                inline
                :disable="!$store.getters.getOrderingActive"
              />
            </div>
          </div>

          <div class="q-py-sm" v-if="menuItemDetails.offerExtraSaladToppings">
            <div class="row text-weight-bold">
              <q-checkbox
                dense
                left-label
                label="Would you like to add extra's to your salad?"
                v-model="addExtraSaladToppings"
                color="positive"
              />
            </div>
            <div
              class="row text-caption text-weight-bold"
              v-if="addExtraSaladToppings"
            >
              <q-option-group
                v-model="selectedMenuItemDetails.extras.extraSaladToppings"
                :options="extraSaladToppingsOptions"
                color="positive"
                type="checkbox"
                inline
                :disable="!$store.getters.getOrderingActive"
              />
            </div>
          </div>

          <div class="q-py-sm" v-if="menuItemDetails.offerExtraPizzaToppings">
            <div class="row text-weight-bold">
              <q-checkbox
                dense
                left-label
                label="Would you like to add extra toppings to your pizza?"
                v-model="addExtraPizzaToppings"
                color="positive"
              />
            </div>

            <div
              class="row text-caption text-weight-bold"
              v-if="addExtraPizzaToppings"
            >
              <q-option-group
                v-model="selectedMenuItemDetails.extras.extraPizzaToppings"
                :options="extraPizzaToppingsOptions"
                color="positive"
                type="checkbox"
                inline
                :disable="!$store.getters.getOrderingActive"
              />
            </div>
          </div>

          <div class="q-py-sm" v-if="menuItemDetails.offerExtraSuaces">
            <div class="row text-weight-bold">
              <q-checkbox
                dense
                left-label
                label="Would you like to add extra sauces?"
                v-model="addExtraSauces"
                color="positive"
              />
            </div>
            <div
              class="row text-caption text-weight-bold"
              v-if="addExtraSauces"
            >
              <q-option-group
                v-model="selectedMenuItemDetails.extras.extraSauces"
                :options="extraSaucesOptions"
                color="positive"
                type="checkbox"
                inline
                :disable="!$store.getters.getOrderingActive"
              />
            </div>
          </div>

          <div class="row q-py-lg justify-center">
            <q-btn
              round
              color="logoRed"
              icon="fas fa-minus"
              @click="decrementItems"
              :disable="!$store.getters.getOrderingActive"
            />
            <label
              class="q-mt-sm q-px-lg text-color text-weight-bolder text-subtitle1"
            >
              {{ items }}
            </label>
            <q-btn
              round
              color="positive"
              icon="fas fa-plus"
              @click="incrementItems"
            />
          </div>

          <div v-if="extrasOfferedCalculateNeeded">
            <div class="row q-pa-sm justify-center ">
              <div class="text-weight-bold text-body2">
                New Price with selected extras added
              </div>
            </div>

            <div class="row q-pa-sm justify-center ">
              <div class="text-weight-bolder text-body1">
                R {{ newPriceExtrasAdded }}
              </div>
            </div>
          </div>

          <div class="row q-pa-sm justify-between q-pb-md">
            <q-btn
              class="text-capitalize"
              color="logoRed"
              label="Cancel"
              @click="closeMenuItemsDetails"
            />
            <q-btn
              :disabled="!$store.getters.getAuth"
              class="text-capitalize"
              color="positive"
              :label="
                !$store.getters.getAuth ? 'Login Required' : 'Add to Order'
              "
              type="submit"
            />
          </div>
        </q-form>
      </div>
    </div>
  </q-card>
</template>
<script>
import lodashKeys from "lodash/keys";
export default {
  components: {},
  mixins: [],
  props: {
    menuItemSelected: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data() {
    return {
      extraMainOptions: [],
      extraDessertToppingsOptions: [],
      extraPastaToppingsOptions: [],
      extraBurgerToppingsOptions: [],
      extraSaladToppingsOptions: [],
      extraPizzaToppingsOptions: [],
      extraSaucesOptions: [],
      addExtraMainOptions: false,
      addExtraDessertToppings: false,
      addExtraPastaToppings: false,
      addExtraBurgerToppings: false,
      addExtraSaladToppings: false,
      addExtraPizzaToppings: false,
      addExtraSauces: false,
      menuItemDetails: null,
      extrasOfferedCalculateNeeded: false,
      items: 1,
      image: {
        name: "cookingIcon",
        src: require("../../assets/pizza2.jpg"),
        descripton: "+- 30min Food preperation time"
      },
      selectedMenuItemDetails: {
        id: null,
        name: null,
        price: null,
        makeCalzone: false,
        selectedPizzaToppings: [],
        selectedSauceOption: null,
        selectedSideOption: null,
        selectedPastaOption: null,
        selectedPastaToppings: [],
        selectedBurgerOption: null,
        selectedBurgerToppings: [],
        selectedMeatStyleOption: null,
        selectedBastingOption: null,
        selectedFishCookedStyle: null,
        selectedEggStyleOption: null,
        selectedMainToppingOptions: [],
        extras: {
          extraSauces: [],
          extraPizzaToppings: [],
          extraPastaToppings: [],
          extraMainToppings: [],
          extraBurgerToppings: [],
          extraSaladToppings: [],
          extraDessertToppings: []
        }
      },
      dataLoaded: false
    };
  },
  computed: {
    newPriceExtrasAdded() {
      let price = this.menuItemDetails.price;
      if (
        this.menuItemDetails.calzoneOffered &&
        this.selectedMenuItemDetails.makeCalzone
      ) {
        price = price + this.menuItemDetails.calzonePrice;
      }
      const keys = lodashKeys(this.selectedMenuItemDetails.extras);
      keys.forEach(key => {
        if (this.selectedMenuItemDetails.extras[key].length > 0) {
          price = price + this.calculateExtrasSelectedCost(key);
        }
      });
      return price;
    }
  },
  watch: {
    selectedMenuItemDetails: {
      deep: true,
      handler() {
        if (
          this.selectedMenuItemDetails.makeCalzone ||
          this.selectedMenuItemDetails.extras.extraSauces.length > 0 ||
          this.selectedMenuItemDetails.extras.extraPizzaToppings.length > 0 ||
          this.selectedMenuItemDetails.extras.extraPastaToppings.length > 0 ||
          this.selectedMenuItemDetails.extras.extraMainToppings.length > 0 ||
          this.selectedMenuItemDetails.extras.extraBurgerToppings.length > 0 ||
          this.selectedMenuItemDetails.extras.extraSaladToppings.length > 0 ||
          this.selectedMenuItemDetails.extras.extraDessertToppings.length > 0
        ) {
          this.extrasOfferedCalculateNeeded = true;
        } else {
          this.extrasOfferedCalculateNeeded = false;
        }
      }
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {
    this.$store.dispatch("retrieveSideItem");
  },
  async mounted() {
    await this.assignData();
    this.dataLoaded = true;
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  methods: {
    getSelectedExtraToppingsAndOptions(key1, key2) {
      return this.$store.getters.getSideItems
        .filter(
          item => !item.disabled && item.addonCategory.name.includes(key1)
        )
        .filter(item =>
          this.selectedMenuItemDetails.extras[key2].includes(item._id)
        )
        .map(x => {
          return {
            label: x.name,
            price: x.price,
            value: x._id
          };
        });
    },
    getRemovedToppings(key1, key2) {
      return this.getDropDownObject(this.menuItemDetails[key1]).filter(
        item => !this.selectedMenuItemDetails[key2].includes(item.value)
      );
    },
    getDropDownObject(object) {
      return object.map(item => {
        return {
          label: item.name,
          value: item.name
        };
      });
    },
    getExtraToppingsOrOptionsObject(key) {
      return this.$store.getters.getSideItems
        .filter(item => !item.disabled && item.addonCategory.name.includes(key))
        .map(x => {
          return {
            label: `${x.name} (+ R ${x.price})`,
            value: x._id
          };
        });
    },
    createDisplayOrderObject() {
      return {
        id: this.menuItemDetails._id,
        price: this.menuItemDetails.price,
        name: this.menuItemDetails.name,
        description: this.menuItemDetails.description,
        quantity: this.items,
        calzoneOffered: this.menuItemDetails.calzoneOffered,
        makeCalzone: this.selectedMenuItemDetails.makeCalzone,
        calzonePrice: this.selectedMenuItemDetails.makeCalzone
          ? this.menuItemDetails.calzonePrice
          : 0,
        //choosen option
        chosenFishStyleOption: this.selectedMenuItemDetails
          .selectedFishCookedStyle,
        chosenMeatStyleOption: this.selectedMenuItemDetails
          .selectedMeatStyleOption,
        chosenPastaOption: this.selectedMenuItemDetails.selectedPastaOption,
        chosenSauceOption: this.selectedMenuItemDetails.selectedSauceOption,
        chosenSideOption: this.selectedMenuItemDetails.selectedSideOption,
        chosenBastingStyleOption: this.selectedMenuItemDetails
          .selectedBastingOption,
        chosenEggStyleOption: this.selectedMenuItemDetails
          .selectedEggStyleOption,
        //removed items
        removedPastaToppings: this.getRemovedToppings(
          "chosenPastaToppings",
          "selectedPastaToppings"
        ),
        removedPizzaToppings: this.getRemovedToppings(
          "chosenPizzaToppings",
          "selectedPizzaToppings"
        ),
        removedMainToppings: this.getRemovedToppings(
          "chosenMainToppings",
          "selectedMainToppingOptions"
        ),
        removedBurgerToppings: this.getRemovedToppings(
          "chosenBurgerToppings",
          "selectedBurgerToppings"
        ),
        //selected items
        selectedPizzaToppings: this.selectedMenuItemDetails
          .selectedPizzaToppings,
        selectedMainToppingOptions: this.selectedMenuItemDetails
          .selectedMainToppingOptions,
        selectedPastaToppings: this.selectedMenuItemDetails
          .selectedPastaToppings,
        selectedBurgerToppings: this.selectedMenuItemDetails
          .selectedBurgerToppings,
        //extras
        extraPizzaToppings: this.getSelectedExtraToppingsAndOptions(
          "pizza-toppings",
          "extraPizzaToppings"
        ),
        extraDessertToppings: this.getSelectedExtraToppingsAndOptions(
          "dessert-toppings",
          "extraDessertToppings"
        ),
        extraSaladToppings: this.getSelectedExtraToppingsAndOptions(
          "salad-toppings",
          "extraSaladToppings"
        ),
        extraBurgerToppings: this.getSelectedExtraToppingsAndOptions(
          "burger-toppings",
          "extraBurgerToppings"
        ),
        extraPastaToppings: this.getSelectedExtraToppingsAndOptions(
          "pasta-toppings",
          "extraPastaToppings"
        ),
        extraSuaces: this.getSelectedExtraToppingsAndOptions(
          "sauce-options",
          "extraSauces"
        ),
        extraMainOptions: this.getSelectedExtraToppingsAndOptions(
          "main-toppings",
          "extraMainToppings"
        )
      };
    },
    calculateExtrasSelectedCost(key) {
      const results = this.$store.getters.getSideItems.filter(
        function(item) {
          return this.selectedMenuItemDetails.extras[key].includes(item._id);
        }.bind(this)
      );
      return results.reduce((a, b) => +a + +b.price, 0);
    },
    async assignData() {
      this.menuItemDetails = JSON.parse(JSON.stringify(this.menuItemSelected));
      this.selectedMenuItemDetails.id = this.menuItemDetails._id;
      this.selectedMenuItemDetails.name = this.menuItemDetails.name;
      this.selectedMenuItemDetails.price = this.menuItemDetails.price;
      this.selectedMenuItemDetails.description = this.menuItemDetails.description;
      if (this.menuItemDetails.hasMainToppings) {
        this.selectedMenuItemDetails.selectedMainToppingOptions = this.getDropDownObject(
          this.menuItemDetails.chosenMainToppings
        ).map(itemName => {
          return itemName.value;
        });
      }
      if (this.menuItemDetails.hasPastaToppings) {
        this.selectedMenuItemDetails.selectedPastaToppings = this.getDropDownObject(
          this.menuItemDetails.chosenPastaToppings
        ).map(itemName => {
          return itemName.value;
        });
      }
      if (this.menuItemDetails.hasPizzaToppings) {
        this.selectedMenuItemDetails.selectedPizzaToppings = this.getDropDownObject(
          this.menuItemDetails.chosenPizzaToppings
        ).map(itemName => {
          return itemName.value;
        });
      }
      if (this.menuItemDetails.hasBurgerToppings) {
        this.selectedMenuItemDetails.selectedBurgerToppings = this.getDropDownObject(
          this.menuItemDetails.chosenBurgerToppings
        ).map(itemName => {
          return itemName.value;
        });
      }
      this.extraMainOptions = this.getExtraToppingsOrOptionsObject(
        "main-toppings"
      );
      this.extraDessertToppingsOptions = this.getExtraToppingsOrOptionsObject(
        "dessert-toppings"
      );
      this.extraPastaToppingsOptions = this.getExtraToppingsOrOptionsObject(
        "pasta-toppings"
      );
      this.extraBurgerToppingsOptions = this.getExtraToppingsOrOptionsObject(
        "burger-toppings"
      );
      this.extraSaladToppingsOptions = this.getExtraToppingsOrOptionsObject(
        "salad-toppings"
      );
      this.extraPizzaToppingsOptions = this.getExtraToppingsOrOptionsObject(
        "pizza-toppings"
      );
      this.extraSaucesOptions = this.getExtraToppingsOrOptionsObject(
        "sauce-options"
      );
    },
    incrementItems() {
      this.items++;
    },
    decrementItems() {
      if (this.items > 1) {
        this.items--;
      }
    },
    closeMenuItemsDetails() {
      this.$emit("closeMenuItemsDetails");
    },
    async onSubmit() {
      const specifiedItem = this.createDisplayOrderObject();
      this.$store.dispatch("addToBasket", specifiedItem);
      this.$q.notify({
        type: "positive",
        message: `${this.items} x ${this.menuItemDetails.name} has been been added to your order.`,
        color: "positive"
      });
      this.closeMenuItemsDetails();
    }
  }
};
</script>
<style></style>
