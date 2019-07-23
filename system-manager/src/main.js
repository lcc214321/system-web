import 'element-ui/lib/theme-chalk/index.css';
import '@smallwei/avue/lib/index.css';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import Avue from '@smallwei/avue';
import axios from 'axios';
import {areaTree, Common} from 'basic-assets';
import Cache from 'cache-base';
import AuthenApi from '@/api/AuthenApi';

//缓存
const cache = new Cache();
cache.set("area", areaTree);

//axios默认配置
axios.defaults.baseURL = 'http://localhost:10000';
axios.defaults.timeout = 1000 * 10;
axios.defaults.validateStatus = status => status >= 200 && status <= 500;
axios.defaults.withCredentials = true;

let loading = null;

//HTTPrequest拦截
axios.interceptors.request.use(config => {
	config.headers.token = Common.getCookie("token");
	if (loading !== false) {
		loading = ElementUI.Loading.service({background: 'rgba(255, 255, 255, 0.1)'});
	}
	return config;
}, error => Promise.reject(error));

//HTTPresponse拦截
axios.interceptors.response.use(response => {
	if (loading) {
		loading.close();
	}
	if (Number(response.status) !== 200) {
		return Promise.reject(new Error(response.statusText || '未知错误'));
	}
	const data = response.data;
	if (!data || data.code === undefined) {
		return data;
	}
	const code = Number(data.code);
	if (code !== 0) {
		const message = data.message || '未知错误';
		if (code === 2 || code === 3) {
			router.push("/login");
		} else {
			ElementUI.Message({
	            type: 'error',
	            message: message,
	        });
		}
		return Promise.reject(new Error(message));
	}
	return data.data;
}, error => {
	if (loading) {
		loading.close();
	}
	return Promise.reject(new Error(error));
})

AuthenApi.isAuthen().then(isAuthen => {
	cache.isAuthen = isAuthen;
	if (isAuthen) {
		AuthenApi.info().then(info => cache.info = info);
	} else {
		router.push("/login");
	}
});

Vue.use(ElementUI);
Vue.use(Avue);
Vue.prototype.$axios = axios;
Vue.prototype.$cache = cache;

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

