const getters = {
  // state是根状态
  sidebar: (state) => state.app.sidebar, // 取app模块属性
  device: (state) => state.app.device,
  token: (state) => state.user.token, // 取user模块属性
  avatar: (state) => state.user.userInfo.staffPhoto,
  name: (state) => state.user.userInfo.username,
  userId: (state) => state.user.userInfo.userId
}
// getters便捷访问，便捷的访问了模块属性
export default getters
