import request from '@/utils/request'

export function articleRecommend(page) {
  return request({
    url: '/article/recommend',
    method: 'get',
    params: { page }
  })
}

export function articleHot(page) {
  return request({
    url: '/article/hot',
    method: 'get',
    params: { page }
  })
}

export function articleFollow(page) {
  return request({
    url: '/article/follow',
    method: 'get',
    params: { page }
  })
}

export function articleInLabelRecommend(labelId, page) {
  return request({
    url: '/article/label/' + labelId + '/recommend',
    method: 'get',
    params: { page }
  })
}

export function articleInLabelHot(labelId, page) {
  return request({
    url: '/article/label/' + labelId + '/hot',
    method: 'get',
    params: { page }
  })
}

export function articleInLabelFollow(labelId, page) {
  return request({
    url: '/article/label/' + labelId + '/follow',
    method: 'get',
    params: { page }
  })
}

export function searchArticle(keyword, page) {
  return request({
    url: '/article/search',
    method: 'get',
    params: { keyword: keyword, page }
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
    url: '/article/comment/parent/' + articleId,
    method: 'post',
    params: { comment }
  })
}
// init方法需要父评论信息
export function initCommentDetail(commentId) {
  return request({
    url: '/article/comment/parent/' + commentId + '/init/',
    method: 'get'
  })
}
// load方法只需要子评论
export function loadChildren(commentId, page) {
  return request({
    url: '/article/comment/parent/' + commentId + '/load/',
    method: 'get',
    params: { page }
  })
}
