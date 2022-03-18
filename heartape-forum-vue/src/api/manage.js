import request from '@/utils/request'

export function contentAll(page) {
  return request({
    url: '/personal/manage/content/all',
    method: 'get',
    params: { page }
  })
}
