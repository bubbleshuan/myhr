import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

export function getUserInfo() {
  console.log('222')
  return request({
    url: '/sys/profile',
    method: 'get'
  })
}

