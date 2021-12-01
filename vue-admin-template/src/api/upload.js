const UUID = require('uuid')
import request from '@/utils/request'

// upload
export const upload = (item) => {
  return new Promise((resolve, reject) => {
    let ossTokenData = {}
    getOssToken().then(res => {
      if (res.code === 20000) {
        // oss返回数据
        ossTokenData = res.data
        console.log(ossTokenData)
        // 上传文件名称
        // const filename = item.file.uid + item.file.name
        const formData = new FormData()
        const key = ossTokenData.dir + UUID.v4().toString().replace(/-/g, '') + '.png'
        const keys = ossTokenData.dir
        const OSSAccessKeyId = ossTokenData.accessid
        const policy = ossTokenData.policy
        const signature = ossTokenData.signature
        const callback = ossTokenData.callback
        const file = item.file
        console.log(888888)
        console.log(key)
        console.log(keys)
        console.log(OSSAccessKeyId)
        console.log(policy)
        console.log(signature)
        console.log(callback)
        console.log(file)
        console.log(888888)
        const fileUrl = ossTokenData.host + '/' + key
        console.log(fileUrl)
        // 注意formData里append添加的键的大小写
        // formData.append('name', item.file.name)
        formData.append('key', key) // 存储在oss的文件路径
        formData.append('keys', ossTokenData.dir) // 存储在oss的文件路径
        formData.append('OSSAccessKeyId', ossTokenData.accessid) // accessKeyId
        formData.append('policy', ossTokenData.policy) // policy
        formData.append('signature', ossTokenData.signature) // 签名
        formData.append('callback', ossTokenData.callback) // 签名
        // 如果是base64文件，那么直接把base64字符串转成blob对象进行上传就可以了
        formData.append('file', item.file)
        formData.append('type', 'image/jpeg')
        formData.append('success_action_status', '200') // 成功后返回的操作码
        const url = ossTokenData.host + '/'

        console.log(key)
        console.log(url)
        console.log(11111)
        uploadFile(url, formData).then(res => {
          console.log(res)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      }
    })
  })
}
// 获取上传通行证
export function getOssToken() {
  return request({
    url: '/front/upload/picture',
    method: 'get'
  })
}

// 获取文件
function uploadFile(url, formData) {
  return request({
    url: url,
    method: 'post',
    // contentType: false, // 必须false才会自动加上正确的Content-Type
    formData
  })
}
