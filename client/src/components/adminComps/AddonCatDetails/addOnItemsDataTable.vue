<template>
  <div class="text-color">
    <div clas="q-pa-md">
      <div class="row justify-center q-pt-lg text-subtitle1 text-weight-bolder">
        Current Add-on Categories
      </div>
      <div class="q-pa-md row justify-center">
        <div class="col-xs-12 col-sm-12 col-md-7 text-color">
          <q-table
            dense
            separator="cell"
            :grid="$q.screen.lt.md"
            :wrap-cells="true"
            :loading="loading"
            :data="currentAddonCategoryOptions"
            :columns="columns"
            :filter="filter"
            row-key="_id"
            no-data-label="No current sides available"
            no-results-label="The filter didn't uncover any results"
            :visible-columns="visibleColumns"
            :rows-per-page-options="[10, 20]"
          >
            <template v-slot:loading>
              <q-inner-loading showing color="logoRed" />
            </template>

            <template v-slot:top>
              <div class="col-xs-12">
                <div class="row justify-between q-pa-sm">
                  <div class="col-xs-5 col-md-4 col-lg-2">
                    <q-input
                      outlined
                      dense
                      color="positive"
                      debounce="300"
                      v-model="filter"
                      placeholder="Search"
                    >
                      <q-icon slot="append" name="search" />
                    </q-input>
                  </div>
                  <div class="col-xs-5 col-md-4 col-lg-2">
                    <q-select
                      color="positive"
                      v-model="visibleColumns"
                      multiple
                      outlined
                      dense
                      options-dense
                      :display-value="$q.lang.table.columns"
                      emit-value
                      map-options
                      :options="columnsOptions"
                      option-value="value"
                    />
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
                              v-if="col.name !== 'actions' && col.id !== 2"
                            >
                              {{ col.value }}
                            </div>
                            <div v-else-if="col.id === 2">
                              <q-badge
                                outline
                                :color="col.value ? 'logoRed' : 'positive'"
                                :label="col.value.toString()"
                                class="text-capitalize"
                              />
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
                    <div class="text-color row justify-center no-wrap">
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
                    <div class="row no-wrap text-color" v-if="col.id != 2">
                      {{ col.value }}
                    </div>
                    <div v-else>
                      <q-badge
                        outline
                        :color="col.value ? 'logoRed' : 'positive'"
                        :label="col.value.toString()"
                        class="text-capitalize"
                      />
                    </div>
                  </template>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
    </div>

    <q-dialog
      v-model="viewUpdateDialog"
      transition-show="slide-up"
      transition-hide="slide-down"
      persistent
    >
      <update-addon-categories
        :isEditing="true"
        :selectedAddOnItem="selectedAddOnItem"
        @closeUpdateDialog="closeUpdateDialog"
      />
    </q-dialog>

    <q-dialog
      v-model="viewDeleteDialog"
      transition-show="slide-up"
      transition-hide="slide-down"
      persistent
    >
      <query-delete-request
        :selectedItem="selectedAddOnItem"
        :deleteFunction="deleteFunction"
        @closeDeleteDialog="closeDeleteDialog"
      />
    </q-dialog>
  </div>
</template>
<script>
import sortBy from "lodash/sortBy";
export default {
  components: {
    "update-addon-categories": () =>
      import("../AddonCatDetails/createUpdateAddonCatItem.vue"),
    "query-delete-request": () =>
      import("../../adminComps/queryDeleteRequest.vue")
  },
  mixins: [],
  props: {
    viewUpdateDialog: {
      type: Boolean,
      required: false,
      default: false
    },
    viewDeleteDialog: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      filter: "",
      deleteFunction: "deleteAddonCatOption",
      selectedAddOnItem: {},
      visibleColumns: ["name", "disabled"],
      columnsOptions: [
        { label: "Name", value: "name" },
        { label: "Disabled", value: "disabled" }
      ],
      loading: false,
      columns: [
        {
          id: 1,
          name: "name",
          required: false,
          label: "Name",
          align: "left",
          field: row => {
            return row.name;
          },
          sortable: true,
          headerStyle: "font-size:14px;"
        },
        {
          id: 2,
          name: "disabled",
          required: false,
          label: "Disabled",
          align: "left",
          field: row => {
            return row.disabled;
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
    currentAddonCategoryOptions() {
      return sortBy(
        this.$store.getters.getAdminAddonCategories.map(item => {
          return {
            _id: item._id,
            name: item.name,
            disabled: item.disabled
          };
        }),
        function(x) {
          return x.name.toLowerCase();
        }
      );
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
    closeDeleteDialog() {
      this.viewDeleteDialog = false;
      this.selectedAddOnItem = {};
    },
    closeUpdateDialog() {
      this.$emit("update:viewUpdateDialog", false);
    },
    handler(type, selectedItem) {
      let data = [selectedItem].map(item => {
        return {
          _id: item._id,
          name: item.name,
          disabled: item.disabled
        };
      });
      this.selectedAddOnItem = data[0];
      switch (type) {
        case "edit":
          this.$emit("update:viewUpdateDialog", true);
          break;
        case "delete":
          this.$emit("update:viewDeleteDialog", true);
          break;
        default:
          break;
      }
    }
  }
};
</script>
<style lang="scss">
.q-table__title {
  color: $goldBrown;
  font-weight: bold;
}
.q-table--dense .q-table__top {
  padding-left: 0px;
  padding-right: 0px;
}
</style>
