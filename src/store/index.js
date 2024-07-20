import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)
// Vuex向外暴漏了2个属性。一个是modules（模块），一个是getters。getters是Vuex里面的计算属性。
const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user
  },
  getters
})
// 模板中的Vuex的设计思想

// 页面交互状态（折叠侧边栏-固定头部）使用全局状态Vuex
//  根据功能拆分成不同的模块（modules）进行状态管理
//  通过getters建立对于模块中属性的快捷访问

export default store
