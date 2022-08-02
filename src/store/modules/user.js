import { login } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: ''
  },
  mutations: {
    setToken(atate, payLoad) {
      atate.token = payLoad
    }
  },
  actions: {
    async gitToken({ commit }, payLoad) {
      console.log(1, process.env.VUE_APP_BASE_API)
      const data = await login(payLoad)
      commit('setToken', data)
    }
  },
  getters: {}
}
