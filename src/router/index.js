import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const commonPageRouter = [
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: 'home' */ '@/views/home'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/activity',
    name: 'Activity',
    component: () => import(/* webpackChunkName: 'activity' */ '@/views/activity/actOne'),
    meta: {
      title: '活动页'
    }
  },
  {
    path: '/listPage',
    name: 'ListPage',
    component: () => import(/* webpackChunkName: 'listPage' */ '@/views/listPage'),
    meta: {
      title: '列表页'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login'),
    meta: {
      title: '登录页'
    }
  },
  {
    path: '/userAgreement',
    name: 'UserAgreement',
    component: () => import(/* webpackChunkName: 'userAgreement' */ '@/views/userAgreement'),
    meta: {
      title: '用户协议'
    }
  }
]

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import(/* webpackChunkName: 'index' */ '@/views/index'),
    meta: {
      title: 'index页'
    }
  },
  ...commonPageRouter // 没有用上可以直接删除掉
]

const errorPage = [
  {
    path: '/errorPage',
    name: 'ErrorPage',
    component: () => import(/* webpackChunkName: 'errorPage' */ '@/views/errorPage/404')
  }
]
console.log('-router-', routes)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes.concat(errorPage)
})
export default router
