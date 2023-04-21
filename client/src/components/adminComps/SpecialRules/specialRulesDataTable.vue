<template>
  <div class="text-color">
    <div clas="q-pa-md">
      <div class="row justify-center q-pt-lg text-subtitle1 text-weight-bolder">
        Current Special Campaign Rules
      </div>
      <div class="q-pa-md row justify-center">
        <div class="col-xs-12 col-sm-12 col-md-12 text-color">
          <q-table
            dense
            separator="cell"
            :grid="$q.screen.lt.md"
            :wrap-cells="true"
            :loading="loading"
            :data="getCampaignSpecials"
            :columns="columns"
            :filter="filter"
            row-key="_id"
            no-data-label="No current campaign specials available"
            no-results-label="The filter didn't uncover any results"
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
                      light
                      color="positive"
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
                              class="q-py-sm text-weight-bold text-color-dark"
                              >{{ col.label }}</q-item-label
                            >
                          </div>
                          <div class="col-6 text-right">
                            <div
                              class="text-color-dark"
                              v-if="
                                col.name !== 'actions' &&
                                  col.id !== 6 &&
                                  col.id !== 7 &&
                                  col.id !== 9
                              "
                            >
                              {{ col.value }}
                            </div>
                            <div
                              v-else-if="
                                col.id === 6 || col.id === 7 || col.id === 9
                              "
                            >
                              <q-badge
                                outline
                                :color="col.value ? 'logoRed' : 'positive'"
                                :label="col.value.toString()"
                                class="text-capitalize"
                              />
                            </div>
                            <div class="text-color-dark" v-else>
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
                                    Edit Rule
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
                                  Delete Rule
                                </q-tooltip>
                              </q-btn>
                              <span class="q-pl-sm">
                                <q-btn
                                  round
                                  class="text-capitalize"
                                  :loading="notifyBtnLoading"
                                  color="primary"
                                  icon="fas fa-bell"
                                  size="sm"
                                  @click="confirmNotifyUsers(props.row._id)"
                                >
                                  <q-tooltip anchor="top middle">
                                    Notify All Users
                                  </q-tooltip>
                                </q-btn>
                              </span>
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
                  class="text-color-dark text-weight-bold"
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
                    <div class="text-color-dark row justify-center no-wrap">
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
                            Edit Rule
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
                          Delete Rule
                        </q-tooltip>
                      </q-btn>
                      <span class="q-pl-sm">
                        <q-btn
                          round
                          class="text-capitalize"
                          color="primary"
                          icon="fas fa-bell"
                          size="md"
                          @click="confirmNotifyUsers(props.row._id)"
                        >
                          <q-tooltip anchor="top middle">
                            Notify All Users
                          </q-tooltip>
                        </q-btn>
                      </span>
                    </div>
                  </template>
                  <template v-else>
                    <div
                      class="row no-wrap text-color-dark"
                      v-if="col.id !== 6 && col.id !== 7 && col.id !== 9"
                    >
                      {{ col.value }}
                    </div>
                    <div v-if="col.id === 6 || col.id === 7 || col.id === 9">
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
      <update-rule
        :isEditing="true"
        :selectedRule="selectedRuleObj"
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
        :selectedItem="selectedRuleObj"
        :deleteFunction="deleteFunction"
        @closeDeleteDialog="closeDeleteDialog"
      />
    </q-dialog>
    <q-dialog
      v-model="viewNotifyUsers"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <notify-users
        :viewNotifyUsers.sync="viewNotifyUsers"
        :notifyId="notifyId"
      />
    </q-dialog>
  </div>
</template>
<script>
export default {
  components: {
    "notify-users": () => import("../../dialogs/notifyUsersDialog.vue"),
    "update-rule": () => import("./createUpdateSpecialRules.vue"),
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
      deleteFunction: "deleteSpecialCampaignRule",
      selectedRuleObj: {},
      viewNotifyUsers: false,
      notifyId: null,
      loading: false,
      columns: [
        {
          id: 1,
          name: "name",
          required: true,
          label: "Rule Name",
          align: "left",
          field: row => {
            return row.name;
          },
          sortable: true,
          headerStyle: "font-size:14px;"
        },
        {
          id: 2,
          name: "buyCategories",
          required: true,
          label: "Buy Categories",
          align: "left",
          field: row => {
            return row.buyCategories.length > 0
              ? row.buyCategories.map(x => x.name).join(", ")
              : "";
          },
          sortable: true,
          headerStyle: "font-size:14px;"
        },
        {
          id: 3,
          name: "buyItems",
          required: true,
          label: "Buy Items",
          align: "left",
          field: row => {
            return row.buyItems.length > 0
              ? row.buyItems.map(x => x.name).join(", ")
              : "";
          },
          sortable: true,
          headerStyle: "font-size:14px;"
        },
        {
          id: 4,
          name: "getCategories",
          required: true,
          label: "Get Categories",
          align: "left",
          field: row => {
            return row.getCategories.length > 0
              ? row.getCategories.map(x => x.name).join(", ")
              : "";
          },
          sortable: true,
          headerStyle: "font-size:14px;"
        },
        {
          id: 5,
          name: "getItems",
          required: true,
          label: "Get Items",
          align: "left",
          field: row => {
            return row.getItems.length > 0
              ? row.getItems.map(x => x.name).join(", ")
              : "";
          },
          sortable: true,
          headerStyle: "font-size:14px;"
        },
        {
          id: 6,
          name: "disabled",
          label: "Disabled",
          align: "left",
          field: row => {
            return row.disabled;
          },
          sortable: false,
          required: true,
          headerStyle: "font-size:14px;"
        },
        {
          id: 7,
          name: "repetitive",
          label: "Repetitive",
          align: "left",
          field: row => {
            return row.repetitive;
          },
          sortable: false,
          required: true,
          headerStyle: "font-size:14px;"
        },
        {
          id: 8,
          name: "repeatDays",
          label: "Repeat on Days",
          align: "left",
          field: row => {
            return row.repeatDays.join(", ");
          },
          sortable: false,
          required: true,
          headerStyle: "font-size:14px;"
        },
        {
          id: 9,
          name: "specificRange",
          label: "Specific Date Range Only",
          align: "left",
          field: row => {
            return row.specificRange;
          },
          sortable: false,
          required: true,
          headerStyle: "font-size:14px;"
        },
        {
          id: 10,
          name: "dateRange",
          label: "Specific Date Range",
          align: "left",
          field: row => {
            return row.specificRange
              ? `From: ${row.dateRange.from} - To: ${row.dateRange.to}`
              : "";
          },
          sortable: false,
          required: true,
          headerStyle: "font-size:14px;"
        },
        {
          id: 11,
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
    getCampaignSpecials() {
      return this.$store.getters.getRules;
    }
  },
  watch: {
    viewNotifyUsers() {
      if (!this.viewNotifyUsers) {
        this.notifyId = null;
      }
    }
  },
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
    confirmNotifyUsers(campaignId) {
      this.notifyId = campaignId;
      this.viewNotifyUsers = true;
    },
    closeDeleteDialog() {
      this.$emit("update:viewDeleteDialog", false);
      this.selectedRuleObj = {};
    },
    closeUpdateDialog() {
      this.$emit("update:viewUpdateDialog", false);
    },
    handler(type, selectedRule) {
      this.selectedRuleObj = selectedRule;
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
  color: $offwhite;
  font-weight: bold;
}
.q-table--dense .q-table__top {
  padding-left: 0px;
  padding-right: 0px;
}
</style>
