<template>
  <div
    id="q-app"
    :style="
      $q.platform.is.mobile
        ? 'min-width: 320px !important;'
        : 'min-width: 360px !important;'
    "
  >
    <transition name="component-fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
