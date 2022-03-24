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

export function removeArticle(articleId) {
  return request({
    url: '/article/' + articleId,
    method: 'delete',
    params: { articleId }
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

// 评论详情页面
export function loadChildren(commentId, pageNum, pageSize) {
  return request({
    url: '/article/comment/parent/' + commentId + '/load/',
    method: 'get',
    params: { pageNum, pageSize }
  })
}

export function likeComment(commentId) {
  return request({
    url: '/article/comment/' + commentId + '/like',
    method: 'put'
  })
}

export function disLikeComment(commentId) {
  return request({
    url: '/article/comment/' + commentId + '/dislike',
    method: 'put'
  })
}

export function removeArticleComment(commentId) {
  return request({
    url: '/article/comment',
    method: 'delete',
    params: { commentId }
  })
}

export function removeArticleCommentChild(commentId) {
  return request({
    url: '/article/comment/child',
    method: 'delete',
    params: { commentId }
  })
}
