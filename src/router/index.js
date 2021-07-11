import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/views/layout/layout.vue'),
    childer: {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/home/home.vue')
    }
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
