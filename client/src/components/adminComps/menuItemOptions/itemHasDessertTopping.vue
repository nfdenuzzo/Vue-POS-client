<template>
  <div class="row justify-center">
    <q-form ref="myForm" v-if="updateMenuItemObj">
      <div class="col-xs-11 col-md-5 q-pa-md text-color text-weight-bold">
        <q-checkbox
          left-label
          v-model="updateMenuItemObj.hasDessertToppings"
          label="Product has Dessert Toppings?"
          color="positive"
        />
      </div>

      <div
        class="col-xs-11 col-md-5 q-pa-md"
        v-if="updateMenuItemObj.hasDessertToppings"
      >
        <q-select
          outlined
          v-model="updateMenuItemObj.chosenDessertToppings"
          :options="dessertToppingOptions"
          label="Select Dessert Toppings"
          color="positive"
          dense
          multiple
          use-chips
          @filter="filterFnDessertToppings"
          use-input
          input-debounce="0"
          option-value="_id"
          option-label="name"
          lazy-rules
          :rules="[
            val =>
              (val != null && val.length > 0) || 'Please select a few Toppings!'
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
      dessertToppingOptions: [],
      updateMenuItemObj: null
    };
  },
  computed: {},
  watch: {
    "updateMenuItemObj.hasDessertToppings"() {
      if (!this.updateMenuItemObj.hasDessertToppings) {
        this.updateMenuItemObj.chosenDessertToppings = [];
      }
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    let test = this.$store.getters.getAdminSideItems.filter(item =>
      item.addonCategory.name.includes("dessert-toppings")
    )
    console.log("mounted -> test", test)
    this.updateMenuItemObj = this.menuItemObj;
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  methods: {
    resetFields() {
      this.updateMenuItemObj.chosenDessertToppings = [];
      this.updateMenuItemObj.hasDessertToppings = false;
      this.$refs.myForm.reset();
      this.$emit("update:menuItemObj", this.updateMenuItemObj);
    },
    filterFnDessertToppings(val, update) {
      if (val === "") {
        update(() => {
          this.dessertToppingOptions = sortBy(
            this.$store.getters.getAdminSideItems.filter(item =>
              item.addonCategory.name.includes("dessert-toppings")
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
        this.dessertToppingOptions = sortBy(
          this.$store.getters.getAdminSideItems.filter(item =>
            item.addonCategory.name.includes("dessert-toppings")
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
