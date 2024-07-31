import request from '@/utils/request'

export function getDepartmentList() {
  // 返回promise
  return request({
    url: '/company/department',
    method: 'get'
  })
}

export function getManagerList() {
  return request({
    url: '/sys/user/simple'
  })
}

export function addDepartment(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}

export function getDepartmentDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}

export function updateDepartment(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}

export function delDepartment(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
