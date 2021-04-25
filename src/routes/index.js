import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/Login'
import Register from '../components/Register'
import Dashboard from '../components/Dashboard'
import Groups from '../components/Groups'
import Group from '../components/Group'

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
    },
    {
        path: '/group',
        name: 'Group',
        component: Group
    }
]
});

export default router