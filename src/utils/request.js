/*
 * @Author: wangshengxian
 * @Date: 2020-05-08 13:50:46
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-07-30 15:15:17
 * @Desc: 请求拦截
 */

import axios from 'axios'
import { Toast, Dialog } from 'vant'
import store from '@/store'
import router from '@/router'

console.log('-http-domain-', process.env.VUE_APP_SERVER_URL)

const service = axios.create()

// 定义额外配置
let configMore

function request(config) {
  const { isSelf } = config
  configMore = {
    isSelf
  }
  return service(config)
}

// 请求拦截
service.interceptors.request.use(
  config => {
    // baseURL
    config.baseURL = config.baseURL || process.env.VUE_APP_SERVER_URL
    // 超时
    config.timeout = config.timeout || 100000
    // header
    if (store.state.globalStatus.key) {
      config.headers['key'] = store.state.globalStatus.key // 让每个请求携带token-- ['Admin-Token']为自定义key 请根据实际情况自行修改
    }
    // if (!config.baseURL.match(/^http/)) {
    //   if (process.env.NODE_ENV === 'development') {
    //     config.baseURL = `${process.env.VUE_APP_PROXY_CODE}/${process.env.VUE_APP_SERVER_ENV}${config.baseURL}`
    //   }
    // }
    // 设置语言类型 0中文，2英文
    config.headers['language'] = 0
    // 请求方法(默认为post)
    config.method = config.method || 'post'
    // 参数
    if (config.method === 'get') {
      config.params = config.data || config.params
    } else {
      config.data = config.data || {}
    }
    // console.log('-config-', config)
    return config
  },
  error => {
    console.log('__REQ_ERROR__', error)
    Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    const res = response.data
    // isSelf为true，直接返回数据
    if (configMore.isSelf) {
      return res
    }
    // code为200,正常返回数据
    if (+res.code === 200) {
      return res
    }
    // 其它情况，不符合预期，抛出错误信息
    return handleErrorCode(res)
  },
  error => {
    console.log('__RES_ERROR__', error, error.message)
    Toast({
      message: 'error：' + error.message,
      duration: 2000
    })
    Promise.reject(error)
  }
)
/**
 * 处理错误code
 */
function handleErrorCode(res) {
  // console.log('-handle-code-', res)
  // res.code = 1000
  if (res.code === 300) {
    Toast({
      message: 'error：' + res.msg,
      duration: '2000'
      // onClose: () => {
      //   router.push('/index')
      // }
    })
    return
  }
  if (res.code === 1000) {
    console.log('未登录')
    // Dialog.alert({
    //   title: '未登录',
    //   message: '系统内部错误，请联系管理员维护'
    // }).then(() => {
    //   console.log('去登录页')
    //   // window.location.href = '/h5/getCode'
    // })
    return Promise.reject(new Error('error'))
  }
  if (res.code === 1004) {
    console.log('请求业务目前不支持')
    // Dialog.alert({
    //   title: '未登录',
    //   message: '请求业务目前未支持'
    // }).then(() => {
    //   console.log('去登录页')
    //   // window.location.href = '/h5/getCode'
    // })
    return Promise.reject(new Error('error'))
  }
  if (res.code === 5000) {
    Toast({
      message: '服务器开小差了!',
      duration: '2000'
    })
    return Promise.reject(new Error('error'))
  }
  // console.log('-service-', res)
  return res
}

// 重新加载
function reloadFunc(error) {
  // console.log('-count-', store.state.globalStatus.loadErrorCount)
  // 超时/响应失败，系统故障
  console.log('-res-error-', error, error.message)
  let routeNames = store.state.globalStatus.toFromRouteNames
  console.log('-names-', routeNames)
  console.log(routeNames.indexOf(null))
  if (routeNames.indexOf(null) > -1) {
    // 返回到客户端环境
    Dialog.confirm({
      title: '服务器开小差了!',
      message: error.message,
      cancelButtonText: '返回',
      confirmButtonText: '重新加载'
    })
      .then(() => {
        console.log('-confirm-')
        // store.commit('setLoadErrorCount', 1)
        // console.log(store.state)
        window.location.reload()
      })
      .catch(() => {
        console.log('-cancel-')
        // console.log(openNative)
        // openNative.closeWebview()
      })
  }
}

// 请求实例
export default request
