import request from '@/utils/request'

export function articleDetail(id) {
  return request({
    url: '/vue-admin-template/host',
    method: 'get'
  })
}

export function publishArticle(body) {
  return request({
    url: '/front/article/',
    method: 'post',
    body
  })
}
