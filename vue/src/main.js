import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import RouterVue from "./router";
import VueFormulate from '@braid/vue-formulate'

Vue.use(VueFormulate);
Vue.config.productionTip = false;

new Vue({
  router: RouterVue,
  render: h => h(App),
}).$mount('#app');
