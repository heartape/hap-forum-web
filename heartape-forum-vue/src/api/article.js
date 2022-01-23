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

export function likeArticle(articleId) {
  return request({
    url: '/article/' + articleId + '/like',
    method: 'put'
  })
}

export function dislikeArticle(articleId) {
  return request({
    url: '/article/' + articleId + '/dislike',
    method: 'put'
  })
}

export function showComment(articleId, page) {
  return request({
    url: '/article/' + articleId,
    method: 'get',
    params: { page }
  })
}

export function publishParent(articleId, comment) {
  return request({
    url: '/article/comment/parent' + articleId,
    method: 'post',
    params: { comment }
  })
}
