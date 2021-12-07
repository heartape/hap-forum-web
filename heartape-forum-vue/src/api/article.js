import request from '@/utils/request'

export function articleDetail(id) {
  return request({
    url: '/vue-admin-template/host',
    method: 'get'
  })
}
