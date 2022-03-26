import request from '@/utils/request'

export function topicRecommend(page) {
  return request({
    url: '/business/topic/recommend',
    method: 'get',
    params: { page }
  })
}

export function topicHot(page) {
  return request({
    url: '/business/topic/hot',
    method: 'get',
    params: { page }
  })
}

export function topicFollow(page) {
  return request({
    url: '/business/topic/follow',
    method: 'get',
    params: { page }
  })
}

export function topicInLabelRecommend(labelId, page) {
  return request({
    url: '/business/topic/label/' + labelId + '/recommend',
    method: 'get',
    params: { page }
  })
}

export function topicInLabelHot(labelId, page) {
  return request({
    url: '/business/topic/label/' + labelId + '/hot',
    method: 'get',
    params: { page }
  })
}

export function topicInLabelFollow(labelId, page) {
  return request({
    url: '/business/topic/label/' + labelId + '/follow',
    method: 'get',
    params: { page }
  })
}

export function SearchTopic(keyword, page) {
  return request({
    url: '/business/topic/search',
    method: 'get',
    params: { keyword: keyword, page }
  })
}

export function topicDetail(topicId) {
  return request({
    url: '/business/topic/' + topicId,
    method: 'get'
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
    url: '/business/topic/' + topicId + '/like',
    method: 'put'
  })
}

export function loadDiscussPage(topicId, pageNum, pageSize) {
  return request({
    url: '/business/topic/discuss',
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
    url: '/business/topic/discuss/' + discussId + '/like',
    method: 'put'
  })
}

export function dislikeDiscuss(discussId) {
  return request({
    url: '/business/topic/discuss/' + discussId + '/dislike',
    method: 'put'
  })
}

export function likeComment(commentId) {
  return request({
    url: '/business/topic/discuss/comment/' + commentId + '/like',
    method: 'put'
  })
}

export function disLikeComment(commentId) {
  return request({
    url: '/business/topic/discuss/comment/' + commentId + '/dislike',
    method: 'put'
  })
}

export function showComment(discussId, pageNum, pageSize) {
  return request({
    url: '/business/topic/discuss/' + discussId,
    method: 'get',
    params: { pageNum, pageSize }
  })
}

export function loadChildren(commentId, pageNum, pageSize) {
  return request({
    url: '/business/topic/discuss/comment/' + commentId,
    method: 'get',
    params: { pageNum, pageSize }
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
