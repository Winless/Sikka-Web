import Vue from 'vue'
import App from './App.vue'
import Ant from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import './style/modal.scss';
import router from "./router";
import store from "./store";
import VueBus from 'vue-bus';
import VueClipboard from 'vue-clipboard2'
import countTo from 'vue-count-to';
import * as echarts from "echarts"

// import Vconsole from 'vconsole';
//
// let vConsole = new Vconsole();
//
// export default vConsole
Vue.use(VueClipboard)
Vue.use(VueBus);
Vue.use(countTo)


Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false
Vue.use(Ant)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
