// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';
import App from './App'
import router from './router'
import VueDraggable from "vue-draggable";

Vue.use(VueDraggable);

Sentry.init({
  dsn: 'https://2979e20cca9444e7b57794f0ea72db54@o220784.ingest.sentry.io/5374455',
  integrations: [new VueIntegration({Vue, attachProps: true, logErrors: true})],
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
