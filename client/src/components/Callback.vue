<script>
import { setIdToken, setAccessToken, isLoggedIn } from "../utils/auth.js";

export default {
  name: "CallBack",
  computed: {},
  mounted() {
    this.$nextTick(() => {
      setAccessToken();
      setIdToken();
      this.$router.push({ name: "HomePage", params: { checkDetails: true } });
    });
  }
};
</script>

<template>
  <div>
    <p class="text-subtitle1 text-weight-bolder q-pt-md text-center text-color">
      Loading your profile...
    </p>
  </div>
</template>

<style scoped>
div > p {
  margin: 0 auto;
  text-align: center;
  font-size: 22px;
}
</style>
