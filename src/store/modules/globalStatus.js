// 全局状态模块
export default {
  // 开启命名空间
  namespaced: true,
  state: {
    // 客户端环境(Android/ios)
    device: '',
    // 顶部状态栏高度
    statusBarHeight: '20',
    // 用户唯一标识(相当于accessToken)
    key:
      '3ghptfDEvP0QUlRGNahu%2B21uD957EH4bpWjiBJJjtqBGEwXdLXcyMex3PLcJJuYEzkrcKFJ4RDSnH9X36uRaMo4%2B7w3KCHMd629CkXkTBZyMzjvnZzXjdmBc0qzkO9AY',
    // 路由跳转to,from name值
    toFromRouteNames: [],
    loadErrorCount: 0,
    // 缓存的组件名
    cacheModules: []
  },
  getters: {
    device(state) {
      return state.device
    },
    statusBarHeight(state) {
      return state.statusBarHeight
    },
    key(state) {
      return state.key
    },
    toFromRouteNames(state) {
      return state.toFromRouteNames
    },
    loadErrorCount(state) {
      return state.loadErrorCount
    },
    cacheModules(state) {
      return state.cacheModules
    }
  },
  mutations: {
    setDevice(state, device) {
      state.device = device
    },
    setStatusBarHeight(state, h) {
      state.statusBarHeight = h
    },
    setKey(state, key) {
      state.key = key
    },
    setToFromRouteNames(state, routeNames) {
      state.toFromRouteNames = routeNames
    },
    setLoadErrorCount(state) {
      console.log('-mutations-state-loadErrorCount')
      state.loadErrorCount++
    },
    clearLoadErrorCount(state) {
      state.loadErrorCount = 0
    },
    addCacheModule(state, moduleName) {
      console.log('-mutations-add-cache-params-', moduleName)
      state.cacheModules.push(moduleName)
    },
    clearCacheModule(state, moduleName) {
      console.log('-mutations-clear-cache-params-', moduleName)
    }
  },
  actions: {}
}
