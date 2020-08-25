<template>
  <div>
    <div
      class="text-subtitle1 text-weight-bolder q-pt-md text-center text-color"
    >
      Select Menu Option
    </div>
    <div class="row justify-center q-pb-md">
      <div class="col-xs-12 col-sm-12 col-md-10 col-lg-6 col-xl-3">
        <div class="row justify-center">
          <div
            v-for="(option, index) in menuOptions"
            :key="index"
            class="q-pt-md q-px-md"
          >
            <q-btn
              push
              class="text-capitalize"
              color="positive"
              :label="option.name"
              style="min-width: 250px;"
              size="md"
              @click="handler(option.path)"
            />
          </div>
        </div>
      </div>
    </div>
    <q-footer v-if="$q.screen.height > 740" class="bg-transparent q-pb-xl">
      <cooking-time-info />
    </q-footer>
  </div>
</template>
<script>
export default {
  components: {
    "cooking-time-info": () => import("../components/cookingTimeInfo.vue")
  },
  mixins: [],
  props: {},
  data() {
    return {
      menuOptions: [
        { name: "Starters", path: "/menu-option-starters" },
        { name: "Pizza", path: "/menu-option-pizza" },
        { name: "Pasta", path: "/menu-option-pasta" },
        { name: "Chef Specials", path: "/menu-option-chef-specials" },
        { name: "Seafood", path: "/menu-option-seafood" },
        { name: "Kids Menu", path: "/menu-option-kids-menu" },
        { name: "Desserts", path: "/menu-option-desserts" },
        { name: "Extras", path: "/menu-option-extras" }
      ]
    };
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  methods: {
    handler(path) {
      this.$router.push(path);
    }
  }
};
</script>
<style></style>
