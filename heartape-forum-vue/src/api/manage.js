import request from '@/utils/request'

/**
 * 个人中心 => 管理
 * 所有的params参数均一致:pageNum,pageSize,startTime,endTime
 */

export function contentAll(params) {
  return request({
    url: '/business/personal/manage/content/all',
    method: 'get',
    params: params
  })
}

export function contentArticle(params) {
  return request({
    url: '/business/personal/manage/content/article',
    method: 'get',
    params: params
  })
}

export function contentTopic(params) {
  return request({
    url: '/business/personal/manage/content/topic',
    method: 'get',
    params: params
  })
}

export function contentDiscuss(params) {
  return request({
    url: '/business/personal/manage/content/discuss',
    method: 'get',
    params: params
  })
}

export function commentAll(params) {
  return request({
    url: '/business/personal/manage/comment/all',
    method: 'get',
    params: params
  })
}

export function commentArticle(params) {
  return request({
    url: '/business/personal/manage/comment/article',
    method: 'get',
    params: params
  })
}

export function commentDiscuss(params) {
  return request({
    url: '/business/personal/manage/comment/discuss',
    method: 'get',
    params: params
  })
}
