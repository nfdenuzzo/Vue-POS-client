<template>
  <div class="text-color">
    <div class="text-weight-bolder q-pb-xs  q-pt-md text-center text-h6">
      Delievery Areas and Rates
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-11">
        <q-card>
          <div class="col-xs-12 col-sm-12 col-md-11 text-color text-center">
            <q-form ref="myForm" @submit="onSubmit">
              <div class="row justify-center q-pb-md">
                <div class="col-xs-11 col-md-5 q-pa-md">
                  <q-input
                    outlined
                    dense
                    v-model="createDeliveryAreaObj.area"
                    label="Area"
                    lazy-rules
                    color="positive"
                    :rules="[
                      val =>
                        (val && val.length > 0 && /\S/.test(val)) ||
                        'Name of area required!'
                    ]"
                  />
                </div>

                <div class="col-xs-11 col-md-5 q-pa-md">
                  <q-input
                    outlined
                    dense
                    v-model="createDeliveryAreaObj.price"
                    v-cleave="masks.TwoDecimals"
                    @input.native="onInputCleaveFormatValue()"
                    label="Delivery charge"
                    lazy-rules
                    color="positive"
                    :rules="[
                      val => (val && val >= 0) || 'Delivery charge is required!'
                    ]"
                  />
                </div>
              </div>

              <div class="row justify-center q-pb-md">
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
                  :loading="createBtnLoading"
                />
              </div>
            </q-form>
          </div>
          <q-table
            dense
            separator="cell"
            :grid="$q.screen.lt.md"
            :wrap-cells="true"
            :data="getDeliveryCharges"
            :columns="columns"
            :filter="filter"
            row-key="_id"
            no-data-label="No current delivery areas specified"
            no-results-label="The filter didn't uncover any results"
            :rows-per-page-options="[10, 20]"
          >
            <template v-slot:loading>
              <q-inner-loading showing color="logoRed" />
            </template>

            <template v-slot:top>
              <div class="col-xs-12">
                <div class="row justify-between q-pa-sm">
                  <div class="col-xs-6 col-md-4 col-lg-3">
                    <q-input
                      outlined
                      dense
                      debounce="300"
                      v-model="filter"
                      placeholder="Search"
                    >
                      <q-icon slot="append" name="search" />
                    </q-input>
                  </div>
                </div>
              </div>
            </template>
            <template v-slot:no-data="{ message }">
              <div class="full-width row no-wrap q-gutter-sm">
                <q-icon
                  size="15px"
                  name="fas fa-exclamation-triangle"
                  color="logoRed"
                />
                <span> {{ message }} </span>
              </div>
            </template>

            <template v-if="$q.screen.lt.md" v-slot:item="props">
              <div
                class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition cursor-pointer"
              >
                <q-card>
                  <q-card-section class="relative-position">
                    <q-card-section class="q-pa-none">
                      <div
                        v-for="col in props.cols"
                        :key="col.name"
                        :props="props"
                      >
                        <div class="row">
                          <div class="col-6">
                            <!-- here to remove the label above -->
                            <q-item-label
                              lines="1"
                              caption
                              class="q-py-sm text-weight-bold text-color"
                              >{{ col.label }}</q-item-label
                            >
                          </div>
                          <div class="col-6 text-right">
                            <div
                              class="text-color"
                              v-if="col.name !== 'actions'"
                            >
                              {{ col.value }}
                            </div>
                            <div class="text-color" v-else>
                              <span class="q-pr-sm">
                                <q-btn
                                  round
                                  class="text-capitalize"
                                  color="positive"
                                  icon="edit"
                                  size="sm"
                                  @click="handler('edit', props.row)"
                                >
                                  <q-tooltip anchor="top middle">
                                    Edit Item
                                  </q-tooltip>
                                </q-btn>
                              </span>
                              <q-btn
                                round
                                class="text-capitalize"
                                color="logoRed"
                                icon="delete"
                                size="sm"
                                @click="handler('delete', props.row)"
                              >
                                <q-tooltip anchor="top middle">
                                  Delete Item
                                </q-tooltip>
                              </q-btn>
                            </div>
                          </div>
                        </div>
                      </div>
                    </q-card-section>
                  </q-card-section>
                </q-card>
              </div>
            </template>

            <!-- for table list view headers -->
            <template v-if="!$q.screen.lt.md" v-slot:header="props">
              <q-tr :props="props">
                <q-th
                  v-for="col in props.cols"
                  :key="col.name"
                  :props="props"
                  class="text-color text-weight-bold"
                >
                  {{ col.label }}
                </q-th>
              </q-tr>
            </template>

            <!-- for table list view -->
            <template v-if="!$q.screen.lt.md" v-slot:body="props">
              <q-tr :props="props" :class="'cursor-pointer'">
                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                  <template v-if="col.name === 'actions'">
                    <div class="text-color row justify-center">
                      <span class="q-pr-sm">
                        <q-btn
                          round
                          class="text-capitalize"
                          color="positive"
                          icon="edit"
                          size="md"
                          @click="handler('edit', props.row)"
                        >
                          <q-tooltip anchor="top middle">
                            Edit Item
                          </q-tooltip>
                        </q-btn>
                      </span>
                      <q-btn
                        round
                        class="text-capitalize"
                        color="logoRed"
                        icon="delete"
                        size="md"
                        @click="handler('delete', props.row)"
                      >
                        <q-tooltip anchor="top middle">
                          Delete Item
                        </q-tooltip>
                      </q-btn>
                    </div>
                  </template>
                  <template v-else>
                    <div class="row no-wrap text-color">
                      {{ col.value }}
                    </div>
                  </template>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card>
      </div>
    </div>

    <q-dialog
      v-model="viewUpdateDialog"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <update-delivery-charge
        :selectedDeliveryAreaObj="selectedDeliveryAreaObj"
        @closeViewDialog="closeUpdateDialog"
      />
    </q-dialog>

    <q-dialog
      v-model="viewDeleteDialog"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <query-delete-request
        :selectedItem="selectedDeliveryAreaObj"
        :deleteFunction="deleteFunction"
        @closeDeleteDialog="closeDeleteDialog"
      />
    </q-dialog>
  </div>
</template>
<script>
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
    "update-delivery-charge": () => import("./updateDeliveryCharge.vue"),
    "query-delete-request": () => import("../queryDeleteRequest.vue")
  },
  mixins: [],
  props: {},
  directives: { cleave },
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
      viewUpdateDialog: false,
      viewDeleteDialog: false,
      createBtnLoading: false,
      createDeliveryAreaObj: {
        area: null,
        price: null
      },
      deleteFunction: "deleteDeliveryCharge",
      selectedDeliveryAreaObj: {},
      filter: "",
      columns: [
        {
          id: 1,
          name: "area",
          required: false,
          label: "Area",
          align: "left",
          field: row => {
            return row.area;
          },
          sortable: true,
          headerStyle: "font-size:14px;"
        },
        {
          id: 2,
          name: "price",
          required: false,
          label: "Price",
          align: "left",
          field: row => {
            return row.price;
          },
          sortable: true,
          headerStyle: "font-size:14px;"
        },
        {
          id: 3,
          name: "actions",
          align: "center",
          label: "Actions",
          sortable: false,
          required: true,
          headerStyle: "font-size:14px;"
        }
      ]
    };
  },
  computed: {
    getDeliveryCharges() {
      return sortBy(this.$store.getters.getAdminDeliveryCharges, function(
        item
      ) {
        return item.area.toLowerCase();
      });
    }
  },
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  methods: {
    onInputCleaveFormatValue() {
      this.createDeliveryAreaObj.price = event.target._vCleave.getFormattedValue();
    },
    closeUpdateDialog() {
      this.viewUpdateDialog = false;
      this.selectedDeliveryAreaObj = {};
    },
    closeDeleteDialog() {
      this.viewDeleteDialog = false;
      this.selectedDeliveryAreaObj = {};
    },
    handler(type, selectedItem) {
      this.selectedDeliveryAreaObj = selectedItem;
      switch (type) {
        case "edit":
          this.viewUpdateDialog = true;
          break;
        case "delete":
          this.viewDeleteDialog = true;
          break;
        default:
          break;
      }
    },
    async onSubmit() {
      this.createBtnLoading = true;
      const result = await this.$store.dispatch(
        "updateDeliveryCharge",
        this.createDeliveryAreaObj
      );
      if (result && result.status === 200) {
        this.$q.notify({
          type: "positive",
          message: "Delivery area created successfully.",
          color: "positive"
        });
        this.onReset();
      }
      this.createBtnLoading = false;
    },
    onReset() {
      this.createDeliveryAreaObj = {
        area: null,
        price: false
      };
      this.$refs.myForm.reset();
    }
  }
};
</script>
<style></style>
