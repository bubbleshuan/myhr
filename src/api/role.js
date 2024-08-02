import request from '@/utils/request'
// （重点以后看看这一句）  在axios中，data作为请求体参数，params作为查询参数，也叫地址参数
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    method: 'get',
    params // 查询参数

  })
}

export function delRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}

export function addRole(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}
