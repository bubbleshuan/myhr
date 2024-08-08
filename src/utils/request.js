import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'

// 创建axios实例
const service = axios.create({
  // 基础地址
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
})

// 请求拦截器，2个回调函数。成功执行第一个，失败执行第二个
service.interceptors.request.use((config) => {
  // 这里不能使用this.$store.getters，因为this是当前组件实例，当前在js文件中，不能用this,要想用store，要使用引入的方式
  if (store.getters.token) {
    console.log('222' + config)
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, (error) => {
  // 失败执行reject，终止Promise
  return Promise.reject(error)
})

// 响应拦截器 主要作用：解构响应数据 和处理异常
service.interceptors.response.use((response) => {
  // 判断是不是blob
  // 返回Blob对象
  if (response.data instanceof Blob) return response.data
  // 默认json格式
  const { data, success, message } = response.data
  if (success) {
    return data
  } else {
    Message({ type: 'error', message })
    return Promise.reject(new Error(message))
  }
}, async(error) => {
  if (error.response.status === 401) {
    Message({
      type: 'warning',
      message: 'token失效'
    })
    await store.dispatch('user/logout')
    router.push('/login')
    // Promise.reject(error)终止promise执行
    return Promise.reject(error)
  }
  Message({
    type: 'error',
    message: error.message
  })

  return Promise.reject(error)
})
export default service
