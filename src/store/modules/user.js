import api from '@/api'
export default {
  // 开启命名空间
  namespaced: true,
  state: {
    accessToken: '',
    userId: '',
    userInfo: {}
  },
  getters: {
    accessToken(state) {
      return state.accessToken
    },
    userId(state) {
      return state.userId
    },
    userInfo(state) {
      return state.userInfo
    }
  },
  mutations: {
    setAccessToken(state, accessToken) {
      console.log('-accessToken-', accessToken)
      state.accessToken = accessToken
    },
    setUserId(state, userId) {
      console.log('-userId-', userId)
      state.userId = userId
    },
    setUserInfo(state, userInfo) {
      console.log('-userInfo-', userInfo)
      state.userInfo = userInfo
    }
  },
  actions: {}
}
