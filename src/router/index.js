import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import HomeLayout from '../views/Home/components/HomeLayout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    component: HomeLayout,
    meta: { 
      requiresAuth: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    children:[
      {
        path: '',
        name: 'index',
        meta: {
          title: '首页'
        },
        component: () => import('../views/Home/examList.vue')
      },
      {
        path: '/pay',
        name: 'payList',
        meta: {
          title: '付费列表'
        },
        component: () => import('../views/Home/payList.vue')
      },
      {
        path: '/msg',
        name: 'msgList',
        meta: {
          title: '付费列表'
        },
        component: () => import('../views/Home/msgList.vue')
      },
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/ErrorPage.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
