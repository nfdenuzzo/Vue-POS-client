<template>
  <div class="text-color">
    <q-card>
      <div
        class="text-weight-bolder q-pb-xs  q-pt-md text-center text-subtitle1"
      >
        Create Special Campagin Rule
      </div>
      <div class="row justify-center">
        <div class="q-pa-md">
          <q-option-group
            :options="options"
            label="Rule Structure"
            type="radio"
            v-model="ruleStructure"
          />
        </div>
      </div>
      <div clas="q-pa-md" v-if="dataLoaded" :key="rerenderKey">
        <q-form ref="myForm" @submit="onSubmit" v-if="ruleStructure">
          <div class="row justify-center q-pb-md">
            <div class="col-xs-12 col-sm-12 col-md-10 col-lg-8">
              <div class="row justify-center">
                <div class="col-xs-1">
                  <span class="text-weight-bolder text-h6"> BUY </span>
                </div>

                <div class="col-xs-11 col-sm-4 col-md-4 col-lg-4 q-px-md">
                  <q-select
                    outlined
                    v-model="ruleObject.buyCategories"
                    :options="getMenuCategories"
                    label="Menu Categories"
                    color="positive"
                    dense
                    multiple
                    use-chips
                    input-debounce="0"
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

                <div class="col-xs-1 text-center">
                  <span class="text-weight-bolder text-h4"> / </span>
                </div>
                <div class="col-xs-11 col-sm-4 col-md-4 col-lg-4 q-px-md">
                  <q-select
                    outlined
                    v-model="ruleObject.buyItems"
                    :options="buyMenuItemOptions"
                    label="Select Menu Items"
                    color="positive"
                    dense
                    multiple
                    use-chips
                    @filter="filterFnBuyMenuItems"
                    use-input
                    input-debounce="0"
                    option-value="_id"
                    option-label="name"
                    lazy-rules
                    :rules="[
                      val =>
                        (val != null && val.length > 0) ||
                        'Please select a few menu items!'
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
              </div>
            </div>
          </div>
          <div class="row justify-center q-pb-md">
            <div class="col-xs-12 col-sm-12 col-md-10 col-lg-8">
              <div class="row justify-center">
                <div class="col-xs-1">
                  <span class="text-weight-bolder text-h6"> GET </span>
                </div>

                <div class="col-xs-11 col-sm-4 col-md-4 col-lg-4 q-px-md">
                  <q-select
                    outlined
                    v-model="ruleObject.buyCategories"
                    :options="getMenuCategories"
                    label="Menu Categories"
                    color="positive"
                    dense
                    multiple
                    use-chips
                    input-debounce="0"
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

                <div class="col-xs-1 text-center">
                  <span class="text-weight-bolder text-h4"> / </span>
                </div>
                <div class="col-xs-11 col-sm-4 col-md-4 col-lg-4 q-px-md">
                  <q-select
                    outlined
                    v-model="ruleObject.buyItems"
                    :options="buyMenuItemOptions"
                    label="Select Menu Items"
                    color="positive"
                    dense
                    multiple
                    use-chips
                    input-debounce="0"
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

                <div class="col-xs-2 text-center">
                  <span class="text-weight-bolder text-h6">
                    {{ ruleStructure === "FR01" ? "FREE" : "HALF PRICE" }}
                  </span>
                </div>
              </div>
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
              />
            </div>
          </div>

          <div class="row justify-center q-pb-md q-pt-lg">
            <q-btn
              label="Reset"
              @click="onReset"
              color="logoRed"
              class="q-mr-lg text-capitalize"
            />
            <q-btn
              label="Create"
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
export default {
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      rerenderKey: 0,
      createUpdateBtnLoading: false,
      ruleStructure: null,
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
        buyCategories: [],
        getCategories: [],
        buyItems: [],
        getItems: [],
        validDate: null,
        disabled: false
      },
      dataLoaded: false
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
    this.$store.dispatch("retrieveAdminMenuItems");
  },
  async mounted() {
    this.dataLoaded = true;
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  methods: {
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
    async onSubmit() {
      this.createUpdateBtnLoading = true;
      const result = await this.$store.dispatch(
        "createAddonCatOption",
        this.ruleObject
      );
      if (result && result.status === 200) {
        this.$q.notify({
          type: "positive",
          message: "Campaign created successfully.",
          color: "positive"
        });
        this.onReset();
      }
      this.createUpdateBtnLoading = false;
    },
    onReset() {
      this.ruleObject = {
        buyCategories: [],
        getCategories: [],
        buyItems: [],
        getItems: [],
        validDate: null
      };
      this.$refs.myForm.reset();
    }
  }
};
</script>
<style lang="scss"></style>
