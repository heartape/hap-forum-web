import request from '@/utils/request'

export function topicRecommend(pageNum, pageSize) {
  return topicHot(pageNum, pageSize)
  // return request({
  //   url: '/business/topic/recommend',
  //   method: 'get',
  //   params: { pageNum, pageSize }
  // })
}

export function topicHot(pageNum, pageSize) {
  return request({
    url: '/business/topic/list/hot',
    method: 'get',
    params: { pageNum, pageSize }
  })
}

export function topicFollow(pageNum, pageSize) {
  return topicHot(pageNum, pageSize)
  // return request({
  //   url: '/business/topic/follow',
  //   method: 'get',
  //   params: { pageNum, pageSize }
  // })
}

export function topicInLabelRecommend(labelId, pageNum, pageSize) {
  return request({
    url: '/business/topic/label/recommend',
    method: 'get',
    params: { labelId, pageNum, pageSize }
  })
}

export function topicInLabelHot(labelId, pageNum, pageSize) {
  return request({
    url: '/business/topic/label/hot',
    method: 'get',
    params: { labelId, pageNum, pageSize }
  })
}

export function topicInLabelFollow(labelId, pageNum, pageSize) {
  return request({
    url: '/business/topic/label/follow',
    method: 'get',
    params: { labelId, pageNum, pageSize }
  })
}

export function SearchTopic(keyword, pageNum, pageSize) {
  return request({
    url: '/business/topic/search',
    method: 'get',
    params: { keyword, pageNum, pageSize }
  })
}

export function topicDetail(topicId) {
  return request({
    url: '/business/topic',
    method: 'get',
    params: { topicId }
  })
}

export function removeTopic(topicId) {
  return request({
    url: '/business/topic',
    method: 'delete',
    params: { topicId }
  })
}

export function likeTopic(topicId) {
  return request({
    url: '/business/topic/like',
    method: 'put',
    params: { topicId }
  })
}

export function dislikeTopic(topicId) {
  return request({
    url: '/business/topic/dislike',
    method: 'put',
    params: { topicId }
  })
}

export function loadDiscussPage(topicId, pageNum, pageSize) {
  return request({
    url: '/business/topic/discuss/list',
    method: 'get',
    params: { topicId, pageNum, pageSize }
  })
}

export function removeDiscuss(discussId) {
  return request({
    url: '/business/topic/discuss',
    method: 'delete',
    params: { discussId }
  })
}

export function likeDiscuss(discussId) {
  return request({
    url: '/business/topic/discuss/like',
    method: 'put',
    params: { discussId }
  })
}

export function dislikeDiscuss(discussId) {
  return request({
    url: '/business/topic/discuss/dislike',
    method: 'put',
    params: { discussId }
  })
}

export function likeComment(commentId) {
  return request({
    url: '/business/topic/discuss/comment/like',
    method: 'put',
    params: { commentId }
  })
}

export function disLikeComment(commentId) {
  return request({
    url: '/business/topic/discuss/comment/dislike',
    method: 'put',
    params: { commentId }
  })
}

export function showComment(discussId, pageNum, pageSize) {
  return request({
    url: '/business/topic/discuss/comment/list',
    method: 'get',
    params: { discussId, pageNum, pageSize }
  })
}

export function loadChildren(commentId, pageNum, pageSize) {
  return request({
    url: '/business/topic/discuss/comment/child/list',
    method: 'get',
    params: { commentId, pageNum, pageSize }
  })
}

export function removeDiscussComment(commentId) {
  return request({
    url: '/business/topic/discuss/comment',
    method: 'delete',
    params: { commentId }
  })
}

export function removeDiscussCommentChild(commentId) {
  return request({
    url: '/business/topic/discuss/comment/child',
    method: 'delete',
    params: { commentId }
  })
}

export function publish(data) {
  return request({
    url: '/business/topic',
    method: 'post',
    data
  })
}

export function publishDiscuss(data) {
  return request({
    url: '/business/topic/discuss',
    method: 'post',
    data
  })
}

export function publishDiscussComment(topicId, discussId, content) {
  const data = { topicId, discussId, content }
  return request({
    url: '/business/topic/discuss/comment',
    method: 'post',
    data
  })
}

export function publishDiscussCommentChild(data) {
  return request({
    url: '/business/topic/discuss/comment/child',
    method: 'post',
    data
  })
}

export function publishDiscussCommentChildToChild(data) {
  return request({
    url: '/business/topic/discuss/comment/child/to-child',
    method: 'post',
    data
  })
}
