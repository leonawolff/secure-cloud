import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/Login'
import Register from '../components/Register'
import Dashboard from '../components/Dashboard'
import Groups from '../components/Groups'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: '',
    routes: [
        {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/groups',
        name: 'Groups',
        component: Groups
    }
]
});

export default router