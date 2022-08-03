import { login, getUserInfo, getUserDetail } from '@/api/user'
import { setTokentime } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: {}
  },
  mutations: {
    setToken(state, payLoad) {
      state.token = payLoad
    },
    setuserInfo(state, payLoad) {
      state.userInfo = payLoad
    }
  },
  actions: {
    // 登录token
    async gitToken({ commit }, payLoad) {
      const data = await login(payLoad)
      commit('setToken', data)
      setTokentime()
    },
    // 获取用户信息
    async gituserInfo({ commit }) {
      const userBaseInfo = await getUserInfo()
      console.log(userBaseInfo.userId)
      const userInfo = await getUserDetail(userBaseInfo.userId)
      commit('setuserInfo', { ...userBaseInfo, ...userInfo })
    },
    // 退出
    logout(context) {
      context.commit('setToken', '')
      context.commit('setuserInfo', {})
    }
  },
  getters: {}
}
