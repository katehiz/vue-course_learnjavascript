import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact-active',
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/pages/HomePage.vue')
        },
        {
            path: '/users',
            name: 'users',
            component: () => import('@/pages/Users.vue')
        },
        {
            path: '/edit/:id',
            name: 'edituser',
            component: () => import('@/pages/EditUser.vue')
        },
        {
            path: '/add',
            name: 'adduser',
            component: () => import('@/pages/AddUser.vue')
        }
    ]
})

export default router
