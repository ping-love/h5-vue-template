/*
 * @Author: wangshengxian
 * @Date: 2020-05-08 13:50:46
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-08-03 15:00:21
 * @Desc: 程序入口文件
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Loading from '@/components/loading'
// 全局样式
import '@/styles/index.less' //
// 重置样式插件
import 'normalize.css/normalize.css'
// 路由守卫
import '@/static/routerGuards.js'
// vconsole调试工具
import '@/static/vconsole.js'
// rem适配
import '@/static/flexible.js'
// vant按需引入
import '@/static/importVant.js'

import '@/utils/oop/srp.js'
// import '@/utils/oop/polym.js'
import '@/utils/oop/stateModel.js'

Vue.use(Loading)

Vue.config.productionTip = false

window.addEventListener(
  'popstate',
  function(e) {
    // console.log('-main-')
    router.isBack = true
  },
  false
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
