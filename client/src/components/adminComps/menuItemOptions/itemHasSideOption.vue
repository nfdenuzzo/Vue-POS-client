<template>
  <div class="row justify-center">
    <q-form ref="myForm" v-if="updateMenuItemObj">
      <div class="col-xs-11 col-md-5 q-pa-md text-color text-weight-bold">
        <q-checkbox
          left-label
          v-model="updateMenuItemObj.hasSideOptions"
          label="Product has side options?"
          color="positive"
          dark
        />
      </div>

      <div
        class="col-xs-11 col-md-5 q-pa-md"
        v-if="updateMenuItemObj.hasSideOptions"
      >
        <q-select
          outlined
          v-model="updateMenuItemObj.chosenSideOptions"
          :options="sideOptionOptions"
          label="Select Side Options"
          color="positive"
          dark
          dense
          multiple
          use-chips
          @filter="filterFnSideOptions"
          use-input
          input-debounce="0"
          option-value="_id"
          option-label="name"
          lazy-rules
          :rules="[
            val =>
              (val != null && val.length > 0) || 'Please select a few Sides!'
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
    </q-form>
  </div>
</template>
<script>
import sortBy from "lodash/sortBy";
export default {
  components: {},
  mixins: [],
  props: {
    menuItemObj: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      sideOptionOptions: [],
      updateMenuItemObj: null
    };
  },
  computed: {},
  watch: {
    "updateMenuItemObj.hasSideOptions"() {
      if (!this.updateMenuItemObj.hasSideOptions) {
        this.updateMenuItemObj.chosenSideOptions = [];
      }
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.updateMenuItemObj = this.menuItemObj;
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  methods: {
    resetFields() {
      this.updateMenuItemObj.chosenSideOptions = [];
      this.updateMenuItemObj.hasSideOptions = false;
      this.$refs.myForm.reset();
      this.$emit("update:menuItemObj", this.updateMenuItemObj);
    },
    filterFnSideOptions(val, update) {
      if (val === "") {
        update(() => {
          this.sideOptionOptions = sortBy(
            this.$store.getters.getAdminSideItems.filter(item =>
              item.addonCategory.name.includes("side-options")
            ),
            function(x) {
              return x.name.toLowerCase();
            }
          );
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.sideOptionOptions = sortBy(
          this.$store.getters.getAdminSideItems.filter(item =>
            item.addonCategory.name.includes("side-options")
          ),
          function(x) {
            return x.name.toLowerCase();
          }
        ).filter(v => v.name.toLowerCase().indexOf(needle) > -1);
      });
    },
    updateMenuItemObject() {
      this.$refs.myForm.validate().then(success => {
        if (success) {
          this.$emit("update:menuItemObj", this.updateMenuItemObj);
        }
      });
    }
  }
};
</script>
<style></style>
