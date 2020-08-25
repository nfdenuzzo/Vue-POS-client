<template>
  <div class="text-color">
    <div clas="q-pa-md">
      <div class="row justify-center q-pt-lg text-subtitle1 text-weight-bolder">
        Current menu items
      </div>
      <div class="q-pa-md row justify-center">
        <div class="col-xs-11 col-sm-11 col-md-7 text-color">
          <q-table
            dense
            separator="cell"
            :grid="$q.screen.lt.md"
            :wrap-cells="true"
            :loading="loading"
            :data="getMenuItems"
            :columns="columns"
            :filter="filter"
            row-key="_id"
            no-data-label="No current sides available"
            no-results-label="The filter didn't uncover any results"
            :visible-columns="visibleColumns"
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
                      debounce="300"
                      v-model="filter"
                      placeholder="Search"
                    >
                      <q-icon slot="append" name="search" />
                    </q-input>
                  </div>
                  <div class="col-xs-5 col-md-4 col-lg-2">
                    <q-select
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
                      options-cover
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
                              v-if="col.name !== 'actions' && col.id !== 4"
                            >
                              {{ col.value }}
                            </div>
                            <div v-else-if="col.id === 4">
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
                    <div class="row no-wrap text-color" v-if="col.id != 4">
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
      persistent
      :full-height="true"
      :full-width="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <update-menu-item
        :isEditing="true"
        :selectedMenuItem="selectedMenuItemObj"
        :viewUpdateDialog.sync="viewUpdateDialog"
      />
    </q-dialog>
    <q-dialog
      v-model="viewDeleteDialog"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <query-delete-request
        :selectedItem="selectedMenuItemObj"
        :deleteFunction="deleteFunction"
        @closeDeleteDialog="closeDeleteDialog"
      />
    </q-dialog>
  </div>
</template>
<script>
import _ from "lodash";
export default {
  components: {
    "update-menu-item": () => import("./createUpdateMenuItem.vue"),
    "query-delete-request": () =>
      import("../../adminComps/queryDeleteRequest.vue")
  },
  mixins: [],
  props: {},
  data() {
    return {
      filter: "",
      deleteFunction: "deleteMenuItem",
      selectedMenuItemObj: {},
      viewUpdateDialog: false,
      viewDeleteDialog: false,
      visibleColumns: [
        "name",
        "description",
        "price",
        "disabled",
        "menuCategory"
      ],
      columnsOptions: [
        { label: "Name", value: "name" },
        { label: "Description", value: "description" },
        { label: "Price", value: "price" },
        { label: "Disabled", value: "disabled" },
        { label: "Menu Category", value: "menuCategory" }
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
          name: "description",
          required: false,
          label: "Description",
          align: "left",
          field: row => {
            return row.description;
          },
          sortable: true,
          headerStyle: "font-size:14px;"
        },
        {
          id: 3,
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
          id: 4,
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
          id: 5,
          name: "menuCategory",
          required: false,
          label: "Menu Category",
          align: "left",
          field: row => {
            return row.menuCategory.name;
          },
          sortable: true,
          headerStyle: "font-size:14px;"
        },
        {
          id: 6,
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
    getMenuItems() {
      return this.$store.getters.getAdminMenuItems;
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
      this.selectedMenuItemObj = {};
    },
    handler(type, selectedItem) {
      this.selectedMenuItemObj = selectedItem;
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
