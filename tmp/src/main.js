import Vue from "vue";
import App from "./App.vue";
import cytoscape from "cytoscape";
Vue.config.productionTip = false;
Vue.use(cytoscape);

new Vue({
  render: h => h(App)
}).$mount("#app");
