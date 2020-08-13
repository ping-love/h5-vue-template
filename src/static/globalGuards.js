// 全局守卫
import store from '@/store'
import storage from '@/utils/storage'
import { Toast } from 'vant'

/**
 * 设置顶部状态栏高度
 */
function setStatusBarHeight(to, from) {
  if (to.query.statusBarHeight) {
    let statusBH = to.query.statusBarHeight
    // console.log('-statusBarHeight-', statusBH)
    store.commit('globalStatus/setStatusBarHeight', statusBH)
  }
}

/**
 * 存储登录状态
 */
function setLoginStatus(to, from) {
  //   console.log(to,from)
  // 这里key就是token
  if (to.query && to.query.key !== undefined) {
    let key = to.query.key
    // console.log('-key-', key)
    // 通知store更改状态
    store.commit('globalStatus/setKey', key)
    storage.setItem('key', key)
    storage.setItem('locationSearch', window.location.search)
  }
}

/**
 * 修改页面title
 */
function setDocumentTitle(to, from) {
  document.title = '' // TODO 根据具体的项目自行更改
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
    console.log(document.title)
  }
}

/**
 * 跳转登录页(需要地址栏有need_login参数)
 */
function jumpNeedLogin(to, from, next) {
  if (to.query && to.query.need_login) {
    if (store.getters && !store.getters['globalStatus/key']) {
      Toast({
        message: '去登录页',
        duration: '1500'
      })
      // Toast({
      //   message: '去登录页',
      //   duration: '1500',
      //   onClose: () => {
      //     console.log('回调')
      //     next('/login')
      //   }
      // })
    }
  }
}

/**
 * 设置路由跳转的name
 */
function setRouteNames(to, from) {
  let names = [to.name, from.name]
  console.log(names)
  store.commit('globalStatus/setToFromRouteNames', names)
  storage.setItem('routeNames', names)
  return
}

export default {
  setStatusBarHeight,
  setLoginStatus,
  setDocumentTitle,
  jumpNeedLogin,
  setRouteNames
}
