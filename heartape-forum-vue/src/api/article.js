import request from '@/utils/request'

export function articleHot() {
  return request({
    url: '/article/hot',
    method: 'get'
  })
}

export function articleLabelHot(labelId) {
  return request({
    url: '/article/label/' + labelId + '/hot',
    method: 'get'
  })
}

export function articleDetail(articleId) {
  return request({
    url: '/article/' + articleId,
    method: 'get'
  })
}
