import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '@/pages/HomePage.vue'
import Users from '@/pages/Users.vue'
import EditUser from '@/pages/EditUser.vue'
import AddUser from '@/pages/AddUser.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  routes: [
    {
      path: '/',
      component: HomePage
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/edit/:id',
      name: 'edituser',
      component: EditUser
    },
    {
      path: '/add',
      name: 'adduser',
      component: AddUser
    }
  ]
})

export default router
