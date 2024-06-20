import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'  
const state = {
  token: getToken()
}

const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken(state) {
    state.token = null
    removeToken()
  }
}

const actions = {
  async login(context, data) {
    console.log('context---------' + context)
    console.log('data---------' + data)
    // 假设调过接口，返回token123456密码是hm#qd@23!
    const token = await login(data)
    context.commit('setToken', token)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
