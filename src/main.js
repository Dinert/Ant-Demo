import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/index'
import _ from 'lodash';

import './assets/style/css/index.css';
import './assets/style/less/index.less';
import 'ant-design-vue/dist/antd.less'

import tools from '@/utils/tools.js';

  
Vue.config.productionTip = false
Vue.prototype._ = _;
Vue.prototype.$tools = tools;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
