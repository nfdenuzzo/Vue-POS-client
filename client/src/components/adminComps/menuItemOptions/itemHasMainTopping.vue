<template>
  <div class="row justify-center">
    <q-form ref="myForm" v-if="updateMenuItemObj">
      <div class="col-xs-11 col-md-5 q-pa-md text-color text-weight-bold">
        <q-checkbox
          left-label
          v-model="updateMenuItemObj.hasMainToppings"
          label="Product has main toppings?"
          color="positive"
          dark
        />
      </div>

      <div
        class="col-xs-11 col-md-5 q-pa-md"
        v-if="updateMenuItemObj.hasMainToppings"
      >
        <q-select
          outlined
          v-model="updateMenuItemObj.chosenMainToppings"
          :options="mainToppingOptions"
          label="Select Main Toppings"
          color="positive"
          dense
          dark
          multiple
          use-chips
          @filter="filterFnToppings"
          use-input
          input-debounce="0"
          option-value="_id"
          option-label="name"
          lazy-rules
          :rules="[
            val =>
              (val != null && val.length > 0) || 'Please select a few toppings!'
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
      mainToppingOptions: [],
      updateMenuItemObj: null
    };
  },
  computed: {},
  watch: {
    "updateMenuItemObj.hasMainToppings"() {
      if (!this.updateMenuItemObj.hasMainToppings) {
        this.updateMenuItemObj.chosenMainToppings = [];
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
      this.updateMenuItemObj.chosenMainToppings = [];
      this.updateMenuItemObj.hasMainToppings = false;
      this.$refs.myForm.reset();
      this.$emit("update:menuItemObj", this.updateMenuItemObj);
    },
    filterFnToppings(val, update) {
      if (val === "") {
        update(() => {
          this.mainToppingOptions = sortBy(
            this.$store.getters.getAdminSideItems.filter(item =>
              item.addonCategory.name.includes("main-toppings")
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
        this.mainToppingOptions = sortBy(
          this.$store.getters.getAdminSideItems.filter(item =>
            item.addonCategory.name.includes("main-toppings")
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
