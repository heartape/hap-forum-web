import request from '@/utils/request'

export function guide() {
  return request({
    url: '/guide',
    method: 'get'
  })
}
