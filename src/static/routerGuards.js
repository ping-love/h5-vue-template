// 路由守卫
import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import glg from './globalGuards'

NProgress.configure({ showSpinner: false }) // 禁用进度环

router.beforeEach((to, from, next) => {
  // console.log(to, from)
  // first progress bar
  NProgress.start()
  // 收集路由跳转的name值
  // glg.setRouteNames(to, from)
  // 设置顶部状态栏高度
  glg.setStatusBarHeight(to, from)
  // 存储登录状态(setLoginStatus)
  glg.setLoginStatus(to, from)
  // 判断用户是否需要登录访问(jumpNeedLogin)
  glg.jumpNeedLogin(to, from, next) // 根据实际情况来确定时否需要判断用户的登录与否
  // 路由改变修改页面title(setDocumentTitle)
  glg.setDocumentTitle(to, from)

  next()
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
