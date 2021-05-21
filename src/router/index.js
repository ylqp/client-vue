import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import HomeLayout from '../views/Home/components/HomeLayout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
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
        path: 'examlist/:id',
        name: 'examList',
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
    path: '/check',
    name: 'checkExam',
    meta: {
      title: '考前检测页'
    },
    component: () => import('../views/Exam/CheckExam.vue')
  },
  {
    path: '/startexam',
    name: 'startExam',
    meta: {
      title: '考前人脸识别'
    },
    component: () => import('../views/Exam/StartExam.vue')
  },
  {
    path: '/exam',
    name: 'exam',
    meta: {
      title: '考试页'
    },
    component: () => import('../views/Exam/Exam.vue')
  },
  {
    path: '/examda',
    name: 'examDa',
    meta: {
      title: '吉大大作业考试页'
    },
    component: () => import('../views/Exam/ExamDa.vue')
  },
  {
    path: '/endexam',
    name: 'endExam',
    meta: {
      title: '结束考试页'
    },
    component: () => import('../views/Exam/EndExam.vue')
  },
  {
    path: '/examdetail',
    name: 'examDetail',
    meta: {
      title: '详情页'
    },
    component: () => import('../views/Detail/ExamDetail.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/Test.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/ErrorPage.vue')
  }
]
// 解决选择当前路由报错
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes
})



export default router
