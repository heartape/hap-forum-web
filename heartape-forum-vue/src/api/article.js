import request from '@/utils/request'

/**
 * 由于没有集成推荐模块，所以目前为全量查询
 */

export function articleRecommend(pageNum, pageSize) {
  return articleHot(pageNum, pageSize)
  // return request({
  //   url: '/business/article/list/recommend',
  //   method: 'get',
  //   params: { pageNum, pageSize }
  // })
}

export function articleHot(pageNum, pageSize) {
  return request({
    url: '/business/article/list/hot',
    method: 'get',
    params: { pageNum, pageSize }
  })
}

export function articleFollow(pageNum, pageSize) {
  return articleHot(pageNum, pageSize)
  // return request({
  //   url: '/business/article/list/follow',
  //   method: 'get',
  //   params: { pageNum, pageSize }
  // })
}

export function articleInLabelRecommend(labelId, pageNum, pageSize) {
  return request({
    url: '/business/article/label/recommend',
    method: 'get',
    params: { labelId, pageNum, pageSize }
  })
}

export function articleInLabelHot(labelId, pageNum, pageSize) {
  return request({
    url: '/business/article/label/hot',
    method: 'get',
    params: { labelId, pageNum, pageSize }
  })
}

export function articleInLabelFollow(labelId, pageNum, pageSize) {
  return request({
    url: '/business/article/label/follow',
    method: 'get',
    params: { labelId, pageNum, pageSize }
  })
}

export function searchArticle(keyword, pageNum, pageSize) {
  return request({
    url: '/business/article/search',
    method: 'get',
    params: { keyword, pageNum, pageSize }
  })
}

export function articleDetail(articleId) {
  return request({
    url: '/business/article',
    method: 'get',
    params: { articleId }
  })
}

export function publishArticle(data) {
  return request({
    url: '/business/article',
    method: 'post',
    data
  })
}

export function removeArticle(articleId) {
  return request({
    url: '/business/article',
    method: 'delete',
    params: { articleId }
  })
}

export function likeArticle(articleId) {
  return request({
    url: '/business/article/like',
    method: 'put',
    params: { articleId }
  })
}

export function dislikeArticle(articleId) {
  return request({
    url: '/business/article/dislike',
    method: 'put',
    params: { articleId }
  })
}

export function showComment(articleId, pageNum, pageSize) {
  return request({
    url: '/business/article/comment/list',
    method: 'get',
    params: { articleId, pageNum, pageSize }
  })
}

export function publishParent(data) {
  return request({
    url: '/business/article/comment',
    method: 'post',
    data
  })
}

export function publishChild(data) {
  return request({
    url: '/business/article/comment/child',
    method: 'post',
    data
  })
}

export function publishChildToChild(data) {
  return request({
    url: '/business/article/comment/child/to-child',
    method: 'post',
    data
  })
}

// 评论详情页面
export function loadChildren(commentId, pageNum, pageSize) {
  return request({
    url: '/business/article/comment/child/list',
    method: 'get',
    params: { commentId, pageNum, pageSize }
  })
}

export function likeComment(commentId) {
  return request({
    url: '/business/article/comment/like',
    method: 'put',
    params: { commentId }
  })
}

export function disLikeComment(commentId) {
  return request({
    url: '/business/article/comment/dislike',
    method: 'put',
    params: { commentId }
  })
}

export function likeCommentChild(commentId) {
  return request({
    url: '/business/article/comment/child/like',
    method: 'put',
    params: { commentId }
  })
}

export function disLikeCommentChild(commentId) {
  return request({
    url: '/business/article/comment/child/dislike',
    method: 'put',
    params: { commentId }
  })
}

export function removeArticleComment(commentId) {
  return request({
    url: '/business/article/comment',
    method: 'delete',
    params: { commentId }
  })
}

export function removeArticleCommentChild(commentId) {
  return request({
    url: '/business/article/comment/child',
    method: 'delete',
    params: { commentId }
  })
}
