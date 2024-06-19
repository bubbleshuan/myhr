import { getToken, setToken, removeToken } from '@/utils/auth'
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
  login(context, data) {
    console.log('context---------' + context)
    console.log('data---------' + data)
    // 假设调过接口，返回token123456
    context.commit('setToken', '123456')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
