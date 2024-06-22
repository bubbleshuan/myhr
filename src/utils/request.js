import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
})

service.interceptors.request.use((config) => {
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

service.interceptors.response.use((response) => {
  const { data, success, message } = response.data
  if (success) {
    return data
  } else {
    Message({ type: 'error', message })
    return Promise.reject(new Error(message))
  }
}, async(error) => {
  console.log(222)
  if (error.response.status === 401) {
    Message({
      type: 'warning',
      message: 'token失效'
    })
    await store.dispatch('user/logout')
    router.push('/login')
    return Promise.reject(error)
  }
  Message({
    type: 'error',
    message: error.message
  })

  return Promise.reject(error)
})
export default service
