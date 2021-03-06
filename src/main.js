import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from "./routes/index";
import store from "./store";
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");