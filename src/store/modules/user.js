import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api/user'
const state = {
  token: getToken(),
  userInfo: {}

}

const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken(state) {
    state.token = null
    removeToken()
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  }
}

const actions = {
  async login(context, data) {
    // 假设调过接口，返回token123456密码是hm#qd@23!
    const token = await login(data)
    context.commit('setToken', token)
  },
  async getUserInfo(context) {
    console.log('1111')
    const data = await getUserInfo()
    console.log(data)
    context.commit('setUserInfo', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
