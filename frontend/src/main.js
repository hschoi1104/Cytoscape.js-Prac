import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import cytoscape from "cytoscape";
import axios from "axios";
Vue.config.productionTip = false;
Vue.use(cytoscape);

axios.defaults.baseURL = "/api/";
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
