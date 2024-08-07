import request from '@/utils/request'

export function getUserList(params) {
  return request({
    url: '/sys/user',
    params
  })
}

// 导出所有员工的接口
export function exportEmployee() {
  return request({
    url: '/sys/user/export',
    // 使用一个npm包  直接将blob下载到本地 file-saver
    // 改变接收数据的类型，不是json
    // 使用blob接收二进制文件流
    responseType: 'blob'
  })
}

// 批量-下载导入员工模板
export function importTemplate() {
  return request({
    url: '/sys/user/import/template',
    responseType: 'blob'
  })
}

export function uploadExcel(data) {
  return request({
    url: '/sys/user/import',
    method: 'post',
    data // form-data类型 因为要上传文件类型
  })
}

export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

export function addEmployee(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}
