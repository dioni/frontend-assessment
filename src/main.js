import Vue from 'vue'
import Router from "vue-router";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueTheMask from 'vue-the-mask'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import RealStateList from './components/RealStateList.vue'
import RealStateDetails from './components/RealStateDetails.vue'

const routes = [
  { path: '/', component: RealStateList },
  { path: '/realstate/:id', component: RealStateDetails },  
]

const router = new Router({
  routes: routes,
});

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueTheMask)
Vue.use(Router);
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
