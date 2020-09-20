<template>
  <div class="text-color">
    <div class="text-weight-bolder q-pb-xs  q-pt-md text-center text-subtitle1">
      Current Users
    </div>
    <div class="q-pa-md row justify-center">
      <div class="col-xs-11 col-sm-11 col-md-7 text-color">
        <q-table
          dense
          separator="cell"
          :grid="$q.screen.lt.md"
          :wrap-cells="true"
          :loading="loading"
          :data="currentUsers"
          :columns="columns"
          :filter="filter"
          row-key="_id"
          no-data-label="No current users"
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
                          <div class="text-color" v-if="col.id != 5">
                            {{ col.value }}
                          </div>
                          <div v-else>
                            <q-badge
                              outline
                              :color="col.value ? 'positive' : 'logoRed'"
                              :label="col.value.toString()"
                              class="text-capitalize"
                            />
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
                <template>
                  <div class="row no-wrap text-color" v-if="col.id != 5">
                    {{ col.value }}
                  </div>
                  <div v-else>
                    <q-badge
                      outline
                      :color="col.value ? 'positive' : 'logoRed'"
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
</template>
<script>
import _ from "lodash";
import { helperStandardDateTimeFormat } from "../../utils/dateUtil.js"
export default {
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      filter: "",
      visibleColumns: [
        "name",
        "email",
        "lastLoginDate",
        "created",
        "emailVerified"
      ],
      columnsOptions: [
        { label: "Name", value: "name" },
        { label: "Email", value: "email" },
        { label: "Last Login Date", value: "lastLoginDate" },
        { label: "Created", value: "created" },
        { label: "Email Verified", value: "emailVerified" }
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
          name: "email",
          required: false,
          label: "Email",
          align: "left",
          field: row => {
            return row.userEmail;
          },
          sortable: true,
          headerStyle: "font-size:14px;"
        },
        {
          id: 3,
          name: "lastLoginDate",
          required: false,
          label: "Last Login Date",
          align: "left",
          field: row => {
            return row.lastLoginDate;
          },
          sortable: true,
          headerStyle: "font-size:14px;"
        },
        {
          id: 4,
          name: "created",
          required: false,
          label: "Created",
          align: "left",
          field: row => {
            return row.createdAt
          },
          sortable: true,
          headerStyle: "font-size:14px;"
        },
        {
          id: 5,
          name: "emailVerified",
          required: false,
          label: "Email Verified",
          align: "left",
          field: row => {
            return row.emailVerified;
          },
          sortable: true,
          headerStyle: "font-size:14px;"
        }
      ]
    };
  },
  computed: {
    currentUsers() {
      return _.sortBy(this.$store.getters.getUserList, function(user) {
        return user.name.toLowerCase();
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
