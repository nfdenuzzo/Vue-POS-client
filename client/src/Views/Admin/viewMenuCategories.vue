<template>
  <div class="text-color">
    <div class="text-weight-bolder q-pb-xs  q-pt-md text-center text-subtitle1">
      Current Menu Categories
    </div>
    <div class="q-pa-md row justify-center">
      <div class="col-xs-11 col-sm-11 col-md-7 text-color">
        <q-table
          dense
          separator="cell"
          :grid="$q.screen.lt.md"
          :wrap-cells="true"
          :loading="loading"
          :data="currentMenuCategories"
          :columns="columns"
          row-key="_id"
          :pagination="pagination"
          no-data-label="No current menu categories available"
          :rows-per-page-options="[10, 20]"
        >
          <template v-slot:loading>
            <q-inner-loading showing color="logoRed" />
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
                          <div class="text-color">
                            {{ col.value }}
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
                class="text-color"
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
                  <div class="row no-wrap text-color">
                    {{ col.value }}
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
import sortBy from "lodash/sortBy";
export default {
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      pagination: {
        sortBy: "asc",
        descending: false,
        page: 1
      },
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
          headerStyle: "font-size:14px; font-weight: bold;"
        }
      ]
    };
  },
  computed: {
    currentMenuCategories() {
      return sortBy(this.$store.getters.getMenuCategories, function(item) {
        return item.name.toLowerCase();
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
  methods: {}
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
