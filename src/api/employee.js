import request from '@/utils/request'

export function getUserList(params) {
  return request({
    url: '/sys/user',
    params
  })
}
