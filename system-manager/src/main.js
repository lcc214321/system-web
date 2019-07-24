import 'element-ui/lib/theme-chalk/index.css';
import '@smallwei/avue/lib/index.css';
import '@/assets/css/index.css';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import Avue from '@smallwei/avue';
import axios from 'axios';
import '@/service/Axios';
import {areaTree, Common} from 'basic-assets';
import Cache from 'cache-base';
import System from '@/service/System';

//缓存
const cache = new Cache();
window.cache = cache;
cache.set('area', areaTree);

//axios默认配置
axios.defaults.baseURL = 'http://localhost:10000';

//系统服务
const system = new System("system");
window.system = system;

Vue.use(ElementUI);
Vue.use(Avue);
Vue.prototype.$axios = axios;
Vue.prototype.$cache = cache;
Vue.prototype.$system = system;

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
