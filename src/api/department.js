import request from '@/utils/request'

export function getDepartmentList() {
  // 返回promise
  return request({
    url: '/company/department',
    method: 'get'
  })
}
