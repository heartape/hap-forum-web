import request from '@/utils/request'

export function guideHot(pageNum, pageSize) {
  return request({
    url: '/business/link-guide',
    method: 'get',
    params: { pageNum, pageSize }
  })
}
