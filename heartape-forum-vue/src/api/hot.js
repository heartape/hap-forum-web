import request from '@/utils/request'

export function getHot() {
  return request({
    url: '/vue-admin-template/host',
    method: 'get'
  })
}
