import { login, getUserInfo, getUserDetail } from '@/api/user'
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
    async gitToken({ commit }, payLoad) {
      const data = await login(payLoad)
      commit('setToken', data)
    },
    async gituserInfo({ commit }) {
      const userBaseInfo = await getUserInfo()
      console.log(userBaseInfo.userId)
      const userInfo = await getUserDetail(userBaseInfo.userId)
      commit('setuserInfo', { ...userBaseInfo, ...userInfo })
    }
  },
  getters: {}
}
