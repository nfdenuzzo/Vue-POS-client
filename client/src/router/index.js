import Vue from "vue";
import VueRouter from "vue-router";
import { isLoggedIn } from "../utils//auth.js";
import routes from "./routes";

Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function({ store } /* ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  Router.beforeEach((to, from, next) => {
    if(to.name == 'Callback') { // check if "to"-route is "callback" and allow access
      next()
    } else {
      const closestTitle = to.matched.find(r => r.meta && r.meta.title);
      const authRequired = to.meta.auth;
      const dispatchMethod = to.matched.find(
        r => r.meta && r.meta.dispatchMethod && r.meta.dispatchMethod.name
      );
      if (closestTitle) {
        document.title = closestTitle.meta.title;
      }
      if (
        dispatchMethod &&
        dispatchMethod.meta &&
        dispatchMethod.meta.dispatchMethod &&
        dispatchMethod.meta.dispatchMethod.name
      ) {
        const method = dispatchMethod.meta.dispatchMethod.name;
        const payload = dispatchMethod.meta.dispatchMethod.payload;
        if (authRequired && !isLoggedIn() && store.getters.getAuth) {
          next("/");
        } else if (
          (!authRequired && !isLoggedIn() && !store.getters.getAuth) ||
          (authRequired && isLoggedIn() && store.getters.getAuth) ||
          (!authRequired && isLoggedIn() && store.getters.getAuth)
        ) {
          store
            .dispatch(method, payload)
            .then(resp => {
              if (!resp) {
                next("false");
              } else {
                next();
              }
            })
            .catch(ex => {
              next("false");
            });
        } else {
          next("/");
        }
      } else {
        next();
      }
    }
  });

  return Router;
}
