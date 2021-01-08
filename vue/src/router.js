// router.js
import Vue from 'vue';
import Router from 'vue-router';
import ProductView from "./components/ProductView";
import CartView from "./components/CartView";
import AdminView from "./components/AdminView";

Vue.use(Router);

const RouterVue = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: ProductView
        },
        {
            path: '/cart',
            name: 'cart',
            component: CartView
        },
        {
            path: '/admin',
            name: 'admin',
            component: AdminView
        }
    ]
});

export default RouterVue;
