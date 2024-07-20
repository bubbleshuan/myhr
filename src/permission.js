// 路由导航守卫，权限拦截
// permission.js(权限)，主要负责路由导航守卫
import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

const whiteList = ['/login', '/404']
// 路由前置守卫（路由跳转之前进入这个回调函数）
// to:到哪里去，from：从哪里来。next:执行完一系列判断逻辑之后必须要调用的函数
router.beforeEach(async(to, from, next) => {
  nprogress.start()
  if (store.getters.token) {
    if (to.path === '/login') {
      // next参数里面有地址，不执行后置守卫，所以要自己关闭进度条
      next('/')
      nprogress.done()
    }
    if (!store.getters.userId) {
      await store.dispatch('user/getUserInfo')
    }
    next()
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
      nprogress.done()
    }
  }
})
// 路由后置守卫
router.afterEach(() => {
  nprogress.done()
})
