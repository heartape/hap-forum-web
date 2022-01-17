import request from '@/utils/request'

export function showLabel(labelId) {
  return request({
    url: '/label/' + labelId,
    method: 'get'
  })
}
