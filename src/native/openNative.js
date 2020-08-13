/**
 * js与原生交互方法集合
 * */
import platform from '@/native/platform'
import iosBridge from '@/native/bridge'

/**
 * 原生调用js
 * @param {String} jsFnName js方法名
 * @params {Object} obj vue实例this
 * @param {Function} callback 回调
 */
const nativeCallJs = (jsFnName, obj, callback) => {
  console.log('原生调用了js')
  let vm = obj
  console.log('-jsFnName-', jsFnName, vm)
  if (platform.isIos) {
    iosBridge.registerIosBridge(jsFnName, data => {
      callback(data)
    })
    return
  }
  if (platform.isAndroid) {
    // 将vue组件的方法绑定到window上，提供给android调用
    window[`${jsFnName}`] = vm[`${jsFnName}`]
    return
  }
  console.log('-platform-', platform)
}

/**
 * 关闭webview
 */
const closeWebview = () => {
  if (platform.isIos) {
    iosBridge.callNativeBridge('navigateBack', '1', null)
    return
  }
  if (platform.isAndroid) {
    console.log(window.bridge)
    window.bridge && window.bridge.close()
    return
  }
  console.log('-platform-', platform)
}

/**
 * 设置顶部状态栏的颜色显示
 * @param {String} params 1亮色背景、2暗色背景
 *
 */
const setStatusBarColor = params => {
  params = params || 1
  if (platform.isAndroid) {
    // 设置安卓顶部标题栏,0使用h5标题栏，1使用安卓标题栏
    //   params = params || 0
    console.log('-android-', window.bridge)
    console.log('-android-params-', params)
    window.bridge && window.bridge.setStatusBarColor(params)
    return
  }
}

/**
 * 设置顶部标题栏
 */
const setHeaderBar = () => {
  if (platform.isIos) {
    console.log('-ios-', iosBridge)
    // 设置ios顶部标题栏,0使用h5标题栏，1使用ios标题栏
    iosBridge.callNativeBridge('showNavigationBar', '0', null)
    iosBridge.callNativeBridge('showBackButton', '0', null)
    return
  }
  if (platform.isAndroid) {
    // 设置安卓顶部标题栏,0使用h5标题栏，1使用安卓标题栏
    //   params = params || '0'
    console.log('-android-', window.bridge)
    window.bridge && window.bridge.showNavigationBar('0')
    return
  }
  console.log('-platform-', platform)
}

/**
 * js调用客户端 扫码
 */
const scanCode = () => {
  console.log('扫码')
  if (platform.isIos) {
    iosBridge.callNativeBridge('scan', '', null)
    return
  }
  if (platform.isAndroid) {
    window.bridge && window.bridge.scanPaymentCode()
    return
  }
  console.log('-platform-', platform)
}

/**
 * js调用客户端 分享
 */
const openShare = params => {
  params = {
    path: '点击分享卡片跳转的路径',
    title: '标题',
    desc: '分享描述',
    pic: '图片地址'
  }
  console.log('分享-params-', params)
  // 调用方法还未定义,方法名需要客户端提供(此处openShare仅供参考)
  if (platform.isIos) {
    iosBridge.callNativeBridge('openShare', params, null)
    return
  }
  if (platform.isAndroid) {
    window.bridge && window.bridge.openShare(params)
    return
  }
  console.log('-platform-', platform)
}

// 新开一个通用的webview
const openNativeWebView = () => {}

export default {
  // 原生调用js
  nativeCallJs,
  // 关闭webview
  closeWebview,
  // 新开一个通用的webview
  openNativeWebView,
  // 设置顶部状态栏颜色
  setStatusBarColor,
  // 设置原生标题栏的隐藏
  setHeaderBar,
  // 扫码
  scanCode,
  // 分享
  openShare
}
