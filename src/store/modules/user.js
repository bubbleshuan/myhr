import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api/user'
// state用于存放数据
const state = {
  // 从缓存中读token  如果设置成null，那么页面初始化的时候，token就为null了
  token: getToken(),
  userInfo: {}

}
// vuex想要修改state中的数据，必须使用mutations, mutations 用于修改数据
const mutations = {
  setToken(state, token) {
    state.token = token
    // 同步到缓存
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

// actions做异步操作
const actions = {
  // context上下文 data：传过来的参数
  async login(context, data) {
    // 假设调过接口，返回token123456密码是hm#qd@23!
    const token = await login(data)
    // context的commit方法。提交mutation
    context.commit('setToken', token)
  },
  async getUserInfo(context) {
    const data = await getUserInfo()
    context.commit('setUserInfo', data)
  },
  logout(context) {
    context.commit('removeToken')
    context.commit('setUserInfo', {})
  }
}

export default {
  // 开启命名空间，调用必须加模块名
  namespaced: true,
  state,
  mutations,
  actions
}
