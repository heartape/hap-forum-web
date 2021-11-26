import request from '@/utils/request'

export function getArticleDetailRoute(id) {
  return request({
    url: '/vue-admin-template/host',
    method: 'get'
  })
}
