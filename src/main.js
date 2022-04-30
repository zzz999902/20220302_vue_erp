import 'ant-design-vue/dist/antd.css';
import '@/assets/css/reset.less';
import Antd from 'ant-design-vue';
import VCharts from 'v-charts';
import Vue from 'vue';
import store from './store';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
Vue.use(Antd);
Vue.use(VCharts);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
