import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
		path: '/',
		redirect: '/index'
	}, {
		path: '/login',
		component: () => import('@/views/main/Login')
	}, {
		path: '/index',
		component: () => import('@/views/main/Index'),
		children: [{
			path: '',
			component: () => import('@/views/main/Welcome')
//		}, {
//			path: 'org',
//			component: () => import('@/views/module/org/')
//		}, {
//			path: 'user',
//			component: () => import('@/views/module/user/')
//		}, {
//			path: 'role',
//			component: () => import('@/views/module/role/')
//		}, {
//			path: 'menu',
//			component: () => import('@/views/module/menu/')
//		}, {
//			path: 'area',
//			component: () => import('@/views/module/area/')
//		}, {
//			path: 'dict',
//			component: () => import('@/views/module/dict/')
//		}, {
//			path: 'param',
//			component: () => import('@/views/module/param/')
//		}, {
//			path: 'log',
//			component: () => import('@/views/module/log/')
//		}, {
//			path: 'attach',
//			component: () => import('@/views/module/attach/')
//		}, {
//			path: 'appVersion',
//			component: () => import('@/views/module/appVersion/')
		}]
	}]
});
