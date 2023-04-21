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
        {{ isEditing ? "Update" : "Create" }} Special Campagin Rule
      </div>
      <div class="row justify-center">
        <div class="q-pa-md">
          <q-option-group
            :options="options"
            label="Rule Structure"
            type="radio"
            color="positive"
            v-model="ruleObject.ruleStructure"
          />
        </div>
      </div>
      <div clas="q-pa-md" v-if="dataLoaded">
        <q-form ref="myForm" @submit="onSubmit" v-if="ruleObject.ruleStructure">
          <div class="row justify-center q-pb-md">
            <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
              <q-input
                outlined
                dense
                dark
                v-model="ruleObject.name"
                label="Name"
                lazy-rules
                color="positive"
                :rules="[
                  val =>
                    (val && val.length > 0 && /\S/.test(val)) ||
                    'Name of campaign rule required!'
                ]"
              />
            </div>
          </div>
          <div class="row justify-center q-pb-md">
            <div class="col-xs-12 col-sm-12 col-md-10 col-lg-10">
              <div class="row justify-center">
                <div class="col-xs-12 col-sm-12 col-md-1 text-center">
                  <span class="text-weight-bolder text-h6"> BUY </span>
                </div>

                <div class="col-xs-11 col-sm-4 col-md-2 q-px-md">
                  <q-select
                    outlined
                    :options="getMenuCategories"
                    label="Select Menu Categories"
                    :value="[]"
                    dark
                    dense
                    @input="option => selectBuyCatOption(option)"
                    color="positive"
                    option-value="_id"
                    option-label="name"
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

                <div class="col-xs-11 col-sm-4 col-md-2 q-px-md q-py-sm">
                  <q-select
                    outlined
                    v-model="ruleObject.buyCategories"
                    label="Selected Categories"
                    color="positive"
                    dense
                    dark
                    multiple
                    use-chips
                    option-value="_id"
                    option-label="name"
                    lazy-rules
                    :rules="[
                      val =>
                        (val != null && val.length > 0) ||
                        ruleObject.buyItems.length > 0 ||
                        'Please select a few categories!'
                    ]"
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

                <div class="col-xs-12 col-sm-12 col-md-1 text-center">
                  <span class="text-weight-bolder text-h4"> / </span>
                </div>
                <div class="col-xs-11 col-sm-4 col-md-2 q-px-md q-py-sm">
                  <q-select
                    outlined
                    :value="[]"
                    :options="buyMenuItemOptions"
                    label="Select Menu Items"
                    color="positive"
                    dense
                    dark
                    multiple
                    use-chips
                    @input="option => selectBuyItemOption(option)"
                    @filter="filterFnBuyMenuItems"
                    use-input
                    option-value="_id"
                    option-label="name"
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

                <div class="col-xs-11 col-sm-4 col-md-2 q-px-md q-py-sm">
                  <q-select
                    outlined
                    v-model="ruleObject.buyItems"
                    :options="buyMenuItemOptions"
                    label="Selected Menu Items"
                    color="positive"
                    @remove="option => removeBuyItemOption(option)"
                    dense
                    dark
                    multiple
                    use-chips
                    option-value="_id"
                    option-label="name"
                    lazy-rules
                    :rules="[
                      val =>
                        (val != null && val.length > 0) ||
                        ruleObject.buyCategories.length > 0 ||
                        'Please select a few menu items1!'
                    ]"
                  >
                  </q-select>
                </div>
              </div>
            </div>
          </div>
          <div class="row justify-center q-pb-md">
            <div class="col-xs-12 col-sm-12 col-md-10 col-lg-10">
              <div class="row justify-center">
                <div class="col-xs-12 col-sm-12 col-md-1 text-center">
                  <span class="text-weight-bolder text-h6"> GET </span>
                </div>

                <div class="col-xs-11 col-sm-4 col-md-2 q-px-md q-py-sm">
                  <q-select
                    outlined
                    :options="getMenuCategories"
                    label="Menu Categories"
                    :value="[]"
                    dense
                    dark
                    @input="option => selectGetCatOption(option)"
                    color="positive"
                    option-value="_id"
                    option-label="name"
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

                <div class="col-xs-11 col-sm-4 col-md-2 q-px-md q-py-sm">
                  <q-select
                    outlined
                    v-model="ruleObject.getCategories"
                    label="Menu Categories"
                    color="positive"
                    dense
                    dark
                    multiple
                    use-chips
                    option-value="_id"
                    option-label="name"
                    lazy-rules
                    :rules="[
                      val =>
                        (val != null && val.length > 0) ||
                        ruleObject.getItems.length > 0 ||
                        'Please select a few categories!'
                    ]"
                  >
                  </q-select>
                </div>

                <div class="col-xs-12 col-sm-12 col-md-1 text-center">
                  <span class="text-weight-bolder text-h4"> / </span>
                </div>

                <div class="col-xs-11 col-sm-4 col-md-2 q-px-md q-py-sm">
                  <q-select
                    outlined
                    :value="[]"
                    :options="getMenuItemOptions"
                    label="Select Menu Items"
                    color="positive"
                    dense
                    dark
                    multiple
                    use-chips
                    @input="option => selectGetItemOption(option)"
                    @filter="filterFnGetMenuItems"
                    use-input
                    option-value="_id"
                    option-label="name"
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

                <div class="col-xs-11 col-sm-4 col-md-2 q-px-md q-py-sm">
                  <q-select
                    outlined
                    v-model="ruleObject.getItems"
                    :options="getMenuItemOptions"
                    label="Selected Menu Items"
                    color="positive"
                    @remove="option => removeGetItemOption(option)"
                    dense
                    dark
                    multiple
                    use-chips
                    option-value="_id"
                    option-label="name"
                    lazy-rules
                    :rules="[
                      val =>
                        (val != null && val.length > 0) ||
                        ruleObject.getCategories.length > 0 ||
                        'Please select a few menu items!'
                    ]"
                  >
                  </q-select>
                </div>

                <div class="col-xs-2 text-center">
                  <span class="text-weight-bolder text-h6">
                    {{
                      ruleObject.ruleStructure === "FR01"
                        ? "FREE"
                        : "HALF PRICE"
                    }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="row justify-center">
            <div class="col-xs-12 text-center q-px-md">
              <div
                class="constrain-more q-pa-md"
                v-if="loadedImage && isEditing"
              >
                <div class="camera-frame q-pa-md">
                  <q-img :src="ruleObject.campaignImage" />
                </div>
              </div>
              <image-uploader
                :preview="true"
                :className="['fileinput', { 'fileinput--loaded': hasImage }]"
                capture="environment"
                :debug="1"
                accept="image/*"
                doNotResize="gif"
                :autoRotate="true"
                outputFormat="verbose"
                @input="setImage"
              >
                <label for="fileInput" slot="upload-label">
                  <div class="row justify-center">
                    <q-icon size="19px" name="fas fa-camera" />
                  </div>
                  <div class="row justify-center">
                    <span class="upload-caption">{{
                      hasImage ? "Replace" : "Click to upload"
                    }}</span>
                  </div>
                </label>
              </image-uploader>
            </div>
          </div>
          <div class="row justify-center">
            <div
              class="col-xs-11 col-sm-3 col-md-3 col-lg-2 q-pa-md text-color text-weight-bold"
            >
              <q-checkbox
                left-label
                v-model="ruleObject.disabled"
                label="Disable Rule"
                color="positive"
                dark
              />
            </div>
            <div
              class="col-xs-11 col-sm-3 col-md-3 col-lg-2 q-pa-md text-color text-weight-bold"
            >
              <q-checkbox
                left-label
                v-model="ruleObject.repetitive"
                label="Repetitive Rule"
                color="positive"
                dark
              />
              <q-select
                v-if="ruleObject.repetitive"
                v-model="ruleObject.repeatDays"
                :options="DayOptions"
                label="Week Days"
                color="positive"
                dense
                dark
                outlined
                multiple
                use-chips
                input-debounce="0"
                lazy-rules
                :rules="[
                  val =>
                    (val != null && val.length > 0) ||
                    'Please select a few days!'
                ]"
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
              class="col-xs-11 col-sm-3 col-md-3 col-lg-2 q-pa-md text-color text-weight-bold"
            >
              <q-checkbox
                left-label
                v-model="ruleObject.specificRange"
                label="Run Specific Date Range"
                color="positive"
                dark
              />
              <div
                v-if="
                  isEditing &&
                    ruleObject.dateRange &&
                    ruleObject.dateRange.from &&
                    ruleObject.dateRange.to
                "
              >
                {{ `Current Date Range:` }}
              </div>
              <div
                v-if="
                  isEditing &&
                    ruleObject.dateRange &&
                    ruleObject.dateRange.from &&
                    ruleObject.dateRange.to
                "
              >
                {{
                  `From: ${ruleObject.dateRange.from} - To: ${ruleObject.dateRange.to}`
                }}
              </div>
              <q-date
                :range="true"
                v-if="ruleObject.specificRange"
                color="positive"
                v-model="ruleObject.dateRange"
                dark
              />
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
import sortBy from "lodash/sortBy";
import { helperStandardDateOnlyFormat } from "../../../utils/dateUtil.js";
import ImageUploader from "vue-image-upload-resize";
export default {
  components: {
    ImageUploader
  },
  mixins: [],
  props: {
    selectedRule: {
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
      DayOptions: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      options: [
        {
          label:
            "Buy X (Catagories / Items) and get X (Catagories / Items) FREE",
          value: "FR01"
        },
        {
          label:
            "Buy X (Catagories / Items) and get X (Catagories / Items) Half Price",
          value: "HP01"
        }
      ],
      buyMenuItemOptions: [],
      getMenuItemOptions: [],
      ruleObject: {
        campaignImage: null,
        ruleStructure: null,
        buyCategories: [],
        getCategories: [],
        buyItems: [],
        getItems: [],
        disabled: false,
        repetitive: false,
        repeatDays: [],
        specificRange: false,
        dateRange: {
          from: helperStandardDateOnlyFormat(new Date()),
          to: helperStandardDateOnlyFormat(new Date())
        }
      },
      dataLoaded: false,
      hasImage: null,
      loadedImage: false,
      image: null
    };
  },
  computed: {
    getMenuCategories() {
      return sortBy(this.$store.getters.getMenuCategories, function(item) {
        return item.name.toLowerCase();
      });
    }
  },
  watch: {
    "ruleObject.specificRange"() {
      if (!this.ruleObject.specificRange) {
        this.ruleObject.dateRange = null;
      }
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {
    this.$store.dispatch("retrieveMenuCategories");
    this.$store.dispatch("retrieveAdminMenuItems");
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
    setImage: function(file) {
      this.loadedImage = false;
      this.hasImage = true;
      this.ruleObject.campaignImage = file.dataUrl;
    },
    removeBuyItemOption(option) {
      this.buyMenuItemOptions.splice(option.index, 1);
    },
    removeGetItemOption(option) {
      this.getMenuItemOptions.splice(option.index, 1);
    },
    selectBuyCatOption(option) {
      this.ruleObject.buyCategories.push(option);
    },
    selectGetCatOption(option) {
      this.ruleObject.getCategories.push(option);
    },
    selectBuyItemOption(option) {
      this.ruleObject.buyItems.push(option[0]);
    },
    selectGetItemOption(option) {
      this.ruleObject.getItems.push(option[0]);
    },
    closeDialog() {
      this.$emit("closeUpdateDialog");
    },
    async assignData() {
      this.ruleObject = JSON.parse(JSON.stringify(this.selectedRule));
      if (this.ruleObject.campaignImage != null) {
        this.loadedImage = true;
      }
    },
    filterFnBuyMenuItems(val, update) {
      if (val === "") {
        update(() => {
          this.buyMenuItemOptions = sortBy(
            this.$store.getters.getAdminMenuItems,
            function(item) {
              return item.name.toLowerCase();
            }
          );
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.buyMenuItemOptions = sortBy(
          this.$store.getters.getAdminMenuItems,
          function(item) {
            return item.name.toLowerCase();
          }
        ).filter(v => v.name.toLowerCase().indexOf(needle) > -1);
      });
    },
    filterFnGetMenuItems(val, update) {
      if (val === "") {
        update(() => {
          this.getMenuItemOptions = sortBy(
            this.$store.getters.getAdminMenuItems,
            function(item) {
              return item.name.toLowerCase();
            }
          );
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.getMenuItemOptions = sortBy(
          this.$store.getters.getAdminMenuItems,
          function(item) {
            return item.name.toLowerCase();
          }
        ).filter(v => v.name.toLowerCase().indexOf(needle) > -1);
      });
    },
    async onSubmit() {
      const method = this.isEditing
        ? "updateSpecialCampaignRule"
        : "createSpecialCampaignRule";
      this.createUpdateBtnLoading = true;
      const result = await this.$store.dispatch(method, this.ruleObject);
      if (result && result.status === 200) {
        this.$q.notify({
          type: "positive",
          message: "Campaign Rule created successfully.",
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
    async onReset() {
      await this.$refs.myForm.reset();
      this.ruleObject = {
        campaignImage: null,
        ruleStructure: null,
        buyCategories: [],
        getCategories: [],
        buyItems: [],
        getItems: [],
        disabled: false,
        repetitive: false,
        repeatDays: [],
        specificRange: false,
        dateRange: {
          from: helperStandardDateOnlyFormat(new Date()),
          to: helperStandardDateOnlyFormat(new Date())
        }
      };
    }
  }
};
</script>
<style lang="scss">
#fileInput {
  display: none;
}
</style>
