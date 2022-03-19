import request from '@/utils/request'

export function contentAll(params) {
  return request({
    url: '/personal/manage/content/all',
    method: 'get',
    params: params
  })
}

export function contentArticle(params) {
  return request({
    url: '/personal/manage/content/article',
    method: 'get',
    params: params
  })
}

export function contentTopic(params) {
  return request({
    url: '/personal/manage/content/topic',
    method: 'get',
    params: params
  })
}

export function contentDiscuss(params) {
  return request({
    url: '/personal/manage/content/discuss',
    method: 'get',
    params: params
  })
}

export function contentComment(params) {
  return request({
    url: '/personal/manage/content/comment',
    method: 'get',
    params: params
  })
}

export function commentAll(params) {
  return request({
    url: '/personal/manage/comment/all',
    method: 'get',
    params: params
  })
}

export function commentArticle(params) {
  return request({
    url: '/personal/manage/comment/article',
    method: 'get',
    params: params
  })
}

export function commentDiscuss(params) {
  return request({
    url: '/personal/manage/comment/discuss',
    method: 'get',
    params: params
  })
}

export function commentComment(params) {
  return request({
    url: '/personal/manage/comment/comment',
    method: 'get',
    params: params
  })
}
