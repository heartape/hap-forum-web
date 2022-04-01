import request from '@/utils/request'

// 获取上传签名
export function getOssToken() {
  return request({
    url: '/front/file/article/picture/autograph',
    method: 'get'
  })
}

// 获取经过后台处理的文件临时url
export function getFileUrl(fileName) {
  return request({
    url: '/front/file/article/picture/url',
    method: 'get',
    params: { fileName }
  })
}
