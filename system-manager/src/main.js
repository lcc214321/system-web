import 'element-ui/lib/theme-chalk/index.css';
import '@smallwei/avue/lib/index.css';
import '@/assets/css/index.css';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import Avue from '@smallwei/avue';
import config from '@/config';
import axios from 'axios';
import '@/service/Axios';
import {areaTree} from 'basic-assets';
import Cache from 'cache-base';
import System from '@/service/System';

//配置
window.config = config;

//缓存
const cache = new Cache();
window.cache = cache;
cache.set('area', areaTree);

//axios默认配置
axios.defaults.baseURL = config.baseUrl;

//系统服务
const system = new System(config.sysId);
window.system = system;

Vue.use(ElementUI);
Vue.use(Avue);
Vue.prototype.$axios = axios;
Vue.prototype.$cache = cache;
Vue.prototype.$system = system;
Vue.prototype.$config = config;

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
