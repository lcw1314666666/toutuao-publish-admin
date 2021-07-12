import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    // name: 'Layout',
    component: () => import('@/views/layout/layout.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/home.vue')
      },
      {
        path: '/article',
        name: 'Article',
        component: () => import('@/views/article/article.vue')
      },
      {
        path: '/image',
        name: 'Image',
        component: () => import('@/views/image/image.vue')
      },
      {
        path: '/publicsh',
        name: 'Publicsh',
        component: () => import('@/views/publicsh/publicsh.vue')
      },
      {
        path: '/comment',
        name: 'Comment',
        component: () => import('@/views/comment/comment.vue')
      },
      {
        path: '/fans',
        name: 'Fans',
        component: () => import('@/views/fans/fans.vue')
      },
      {
        path: '/setting',
        name: 'Setting',
        component: () => import('@/views/setting/setting.vue')
      }
    ]
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 添加路由守卫
// 判断是否跳转到登录页面
// 如果不是跳转到登录页面，查看用户是否登录

router.beforeEach((to, from, next) => {
  const user = JSON.parse(window.localStorage.getItem('user'))
  if (to.path === '/login') {
    next()
  } else {
    if (user) {
      // 如果没有登录，跳转到登录页面，如果有登录，next()
      next()
    } else {
      next('/login')
    }
  }
})

export default router
