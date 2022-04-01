import request from '@/utils/request'

export function searchLabel(name, pageNum, pageSize) {
  return request({
    url: '/business/label/list',
    method: 'get',
    params: { name, pageNum, pageSize }
  })
}

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

export function showOneLevelLabel(page) {
  return request({
    url: '/label/level/1',
    method: 'get',
    params: { page }
  })
}

export function showTwoLevelLabel(page) {
  return request({
    url: '/label/level/2',
    method: 'get',
    params: { page }
  })
}

export function showThreeLevelLabel(page) {
  return request({
    url: '/label/level/3',
    method: 'get',
    params: { page }
  })
}

export function showLabelOperateLog(labelId) {
  return request({
    url: '/label/' + labelId,
    method: 'get'
  })
}

export function showLabelRelation(labelId) {
  return request({
    url: '/label/' + labelId + '/relation',
    method: 'get'
  })
}

export function followLabel(labelId) {
  return request({
    url: '/label/' + labelId + '/follow',
    method: 'post'
  })
}

export function cancelFollowLabel(labelId) {
  return request({
    url: '/label/' + labelId + '/follow',
    method: 'delete'
  })
}
