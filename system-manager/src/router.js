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
        }, {
            path: 'org',
            component: () => import('@/views/module/org/Index')
        }, {
            path: 'user',
            component: () => import('@/views/module/user/Index')
        }, {
            path: 'role',
            component: () => import('@/views/module/role/Index')
        }, {
            path: 'menu',
            component: () => import('@/views/module/menu/Index')
        }, {
            path: 'area',
            component: () => import('@/views/module/area/Index')
        }, {
            path: 'dict',
            component: () => import('@/views/module/dict/Index')
        }, {
            path: 'param',
            component: () => import('@/views/module/param/Index')
        }, {
            path: 'log',
            component: () => import('@/views/module/log/Index')
        }, {
            path: 'attach',
            children: [{
                path: 'attach',
                component: () => import('@/views/module/attach/attach/Index'),
            }, {
                path: 'bucket',
                component: () => import('@/views/module/attach/bucket/Index'),
            }]
        }, {
            path: 'appVersion',
            component: () => import('@/views/module/appVersion/Index')
        }]
    }]
});
