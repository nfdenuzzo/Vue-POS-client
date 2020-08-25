<template>
  <div class="row justify-center">
    <q-form ref="myForm" v-if="updateMenuItemObj">
      <div class="col-xs-11 col-md-5 q-pa-md text-color text-weight-bold">
        <q-checkbox
          left-label
          v-model="updateMenuItemObj.hasMeatStyleOptions"
          label="Product has Meat Style Options?"
          color="positive"
        />
      </div>

      <div
        class="col-xs-11 col-md-5 q-pa-md"
        v-if="updateMenuItemObj.hasMeatStyleOptions"
      >
        <q-select
          outlined
          v-model="updateMenuItemObj.chosenMeatStyleOptions"
          :options="meatOptionOptions"
          label="Select Meat Style Options"
          color="positive"
          dense
          multiple
          use-chips
          @filter="filterFnMeatStyleOptions"
          use-input
          input-debounce="0"
          option-value="_id"
          option-label="name"
          lazy-rules
          :rules="[
            val =>
              (val != null && val.length > 0) ||
              'Please select a few Meat Styles!'
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
import _ from "lodash";
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
      meatOptionOptions: [],
      updateMenuItemObj: null
    };
  },
  computed: {},
  watch: {
    "updateMenuItemObj.hasMeatStyleOptions"() {
      if (!this.updateMenuItemObj.hasMeatStyleOptions) {
        this.updateMenuItemObj.chosenMeatStyleOptions = [];
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
      this.updateMenuItemObj.chosenMeatStyleOptions = [];
      this.updateMenuItemObj.hasMeatStyleOptions = false;
      this.$refs.myForm.resetValidation();
      this.$emit("update:menuItemObj", this.updateMenuItemObj);
    },
    filterFnMeatStyleOptions(val, update) {
      if (val === "") {
        update(() => {
          this.meatOptionOptions = _.sortBy(
            this.$store.getters.getAdminSideItems.filter(item =>
              item.addonCategory.name.includes("meat-style-options")
            ),
            function(user) {
              return user.name.toLowerCase();
            }
          );
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.meatOptionOptions = _.sortBy(
          this.$store.getters.getAdminSideItems.filter(item =>
            item.addonCategory.name.includes("meat-style-options")
          ),
          function(user) {
            return user.name.toLowerCase();
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
