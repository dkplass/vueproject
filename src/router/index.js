import Vue from 'vue';
import VueRouter from 'vue-router';

import Dashboard from '@/components/Dashboard';
import Login from '@/components/pages/Login';
import Products from '@/components/pages/Products';
import Coupons from '@/components/pages/Coupons';
import Orders from '@/components/pages/Orders';

import CustomerOrder from '@/components/pages/CustomerOrder';
import CustomerCheckout from '@/components/pages/CustomerCheckout';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '*',
            redirect: '/home'
        },
        {
            name: 'Site',
            path: '/home',
            component: () => import('../components/Site.vue'),            
            children: [
                {
                    path: '/home',
                    name: 'Home',
                    component: () => import('../components/pages/Home.vue'),                     
                    meta: {
                        title: 'Trend',
                    }
                },
                {
                    path: '/shop',
                    name: 'Shop',
                    component: () => import('../components/pages/Shop.vue'),
                    meta: {
                        title: 'Trend - 商店',
                        breadcrumb: [{
                            name: '首頁',
                            link: '/home'
                        },
                        {
                            name: '線上商店',
                            link: '/shop'
                        }]
                    }
                },
                {
                    path: '/shop/:productId',
                    name: 'Product',
                    component: () => import('../components/pages/Product.vue'),
                    meta: {
                        title: '商品頁面',
                        breadcrumb: [{
                            name: '首頁',
                            link: '/home'
                        },
                        {
                            name: '線上商店',
                            link: '/shop'
                        }]
                    }
                },
                {
                    path: '/pay',
                    name: 'Pay',
                    component: () => import('../components/pages/Pay.vue'),
                    meta: {
                        title: '結帳頁面',                        
                    }
                }
            ]           
        },
        {
            name: 'Login',
            path: '/login',
            component: Login,
        },
        {
            name: 'Dashboard',
            path: '/admin',
            component: Dashboard,            
            children: [
                {
                    path: 'products',
                    name: 'Products',
                    component: Products,
                    meta: { requiresAuth: true },
                },
                {
                    path: 'coupons',
                    name: 'Coupons',
                    component: Coupons,
                    meta: { requiresAuth: true },
                },
                {
                    path: 'orders',
                    name: 'Orders',
                    component: Orders,
                    meta: { requiresAuth: true },
                }
            ],
        },
        {
            name: 'Dashboard_CustomerOrder',
            path: '/customer',
            component: Dashboard,            
            children: [
                {
                    path: 'customer_order',
                    name: 'CustomerOrder',
                    component: CustomerOrder,
                },
                {
                    path: 'customer_checkout/:orderId',
                    name: 'CustomerCheckout',
                    component: CustomerCheckout,
                }
            ],
        }
    ],
});