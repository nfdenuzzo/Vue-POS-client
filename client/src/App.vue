<template>
  <div
    id="q-app"
    :style="
      $q.platform.is.mobile
        ? 'min-width: 320px !important;'
        : 'min-width: 360px !important;'
    "
    class="fit"
  >
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
