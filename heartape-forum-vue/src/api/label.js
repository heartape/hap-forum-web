import request from '@/utils/request'

export function showLabel(labelId) {
  return request({
    url: '/label/' + labelId,
    method: 'get'
  })
}

export function showHotLabel() {
  return request({
    url: '/label/hot',
    method: 'get'
  })
}

export function showAllLabel() {
  return request({
    url: '/label',
    method: 'get'
  })
}
