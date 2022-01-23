import request from '@/utils/request'

export function topicHot() {
  return request({
    url: '/topic/hot',
    method: 'get'
  })
}

export function topicLabelHot(labelId) {
  return request({
    url: '/topic/label/' + labelId + '/hot',
    method: 'get'
  })
}

export function topicDetail(topicId) {
  return request({
    url: '/topic/' + topicId,
    method: 'get'
  })
}

export function likeTopic(topicId) {
  return request({
    url: '/topic/' + topicId + '/like',
    method: 'put'
  })
}

export function likeDiscuss(discussId) {
  return request({
    url: '/topic/discuss/' + discussId + '/like',
    method: 'put'
  })
}

export function dislikeDiscuss(discussId) {
  return request({
    url: '/topic/discuss/' + discussId + '/dislike',
    method: 'put'
  })
}

export function likeComment(commentId) {
  return request({
    url: '/topic/discuss/comment/' + commentId + '/like',
    method: 'put'
  })
}

export function disLikeComment(commentId) {
  return request({
    url: '/topic/discuss/comment/' + commentId + '/dislike',
    method: 'put'
  })
}

export function showComment(discussId, page) {
  return request({
    url: '/topic/discuss/' + discussId,
    method: 'get',
    params: { page }
  })
}

export function showChildren(commentId, page) {
  return request({
    url: '/topic/discuss/comment/' + commentId,
    method: 'get',
    params: { page }
  })
}

export function publish(data) {
  return request({
    url: '/topic',
    method: 'post',
    data
  })
}
