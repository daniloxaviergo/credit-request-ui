import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import axios from "axios";
import VueAxios from "vue-axios";
import VueCurrencyInput from "vue-currency-input";

Vue.config.productionTip = false;
const pluginOptions = {
  globalOptions: { currency: "BRL" }
};

Vue.use(Buefy);
Vue.use(VueAxios, axios);
Vue.use(VueCurrencyInput, pluginOptions);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
