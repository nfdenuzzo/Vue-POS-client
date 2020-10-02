<template>
  <div>
    <div
      class="row q-px-lg q-pt-sm"
      v-if="getSimplifiedDiscountPromo && getSimplifiedDiscountPromo.length > 0"
    >
      <div class="col-xs-12 text-center text-weight-bolder text-body2">
        Current Promos Applied:
      </div>
    </div>
    <div
      class="row q-px-lg"
      v-if="getSimplifiedDiscountPromo && getSimplifiedDiscountPromo.length > 0"
    >
      <div
        class="col-xs-12 text-center text-weight-bolder text-caption"
        v-for="(promo, index) in getSimplifiedDiscountPromo"
        :key="index"
      >
        {{ promo.name }}: R - {{ promo.discountPrice }}
      </div>
    </div>
    <div
      class="q-py-xs"
      v-if="getSimplifiedDiscountPromo && getSimplifiedDiscountPromo.length > 0"
    />
  </div>
</template>

<script>
export default {
  props: {
    getSimplifiedDiscountPromo: {
      type: Array,
      default: () => [],
      required: false
    }
  }
};
</script>

<style></style>
