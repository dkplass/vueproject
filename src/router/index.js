import Vue from 'vue';
import VueRouter from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';
import Dashboard from '@/components/dashboard';
import Login from '@/components/pages/Login';
import Products from '@/components/pages/Products';

import CustomerOrder from '@/components/pages/CustomerOrder';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '*',
            redirect: '/login'
        },
        // {
        //     name: 'HelloWorld',
        //     path: '/',
        //     component: HelloWorld,
        //     meta: { requiresAuth: true },
        // },
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
                }
            ],
        },
        {
            name: 'Dashboard_CustomerOrder',
            path: '/',
            component: Dashboard,            
            children: [
                {
                    path: 'customer_order',
                    name: 'CustomerOrder',
                    component: CustomerOrder,
                }
            ],
        }
    ],
});