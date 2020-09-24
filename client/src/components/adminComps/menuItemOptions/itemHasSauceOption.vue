<template>
  <div class="row justify-center">
    <q-form ref="myForm" v-if="updateMenuItemObj">
      <div class="col-xs-11 col-md-5 q-pa-md text-color text-weight-bold">
        <q-checkbox
          left-label
          v-model="updateMenuItemObj.hasSauceOptions"
          label="Product has Sauce Options?"
          color="positive"
        />
      </div>

      <div
        class="col-xs-11 col-md-5 q-pa-md"
        v-if="updateMenuItemObj.hasSauceOptions"
      >
        <q-select
          outlined
          v-model="updateMenuItemObj.chosenSauceOptions"
          :options="sauceOptionOptions"
          label="Select Sauce Options"
          color="positive"
          dense
          multiple
          use-chips
          @filter="filterFnSauceOptions"
          use-input
          input-debounce="0"
          option-value="_id"
          option-label="name"
          lazy-rules
          :rules="[
            val =>
              (val != null && val.length > 0) || 'Please select a few Sauces!'
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
      sauceOptionOptions: [],
      updateMenuItemObj: null
    };
  },
  computed: {},
  watch: {
    "updateMenuItemObj.hasSauceOptions"() {
      if (!this.updateMenuItemObj.hasSauceOptions) {
        this.updateMenuItemObj.chosenSauceOptions = [];
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
      this.updateMenuItemObj.chosenSauceOptions = [];
      this.updateMenuItemObj.hasSauceOptions = false;
      this.$refs.myForm.reset();
      this.$emit("update:menuItemObj", this.updateMenuItemObj);
    },
    filterFnSauceOptions(val, update) {
      if (val === "") {
        update(() => {
          this.sauceOptionOptions = sortBy(
            this.$store.getters.getAdminSideItems.filter(item =>
              item.addonCategory.name.includes("sauce-options")
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
        this.sauceOptionOptions = sortBy(
          this.$store.getters.getAdminSideItems.filter(item =>
            item.addonCategory.name.includes("sauce-options")
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
