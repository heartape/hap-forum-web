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
        // 注意formData里append添加的键的大小写
        formData.append('name', item.file.name)
        formData.append('key', key) // 存储在oss的文件路径
        formData.append('OSSAccessKeyId', ossTokenData.accessKeyId) // accessKeyId
        formData.append('policy', ossTokenData.policy) // policy
        formData.append('signature', ossTokenData.signature) // 签名
        formData.append('callback', ossTokenData.callback) // 签名
        // 如果是base64文件，那么直接把base64字符串转成blob对象进行上传就可以了
        formData.append('file', item.file)
        formData.append('success_action_status', '200') // 成功后返回的操作码
        // const formData1 = {
        //   'name': item.file.name,
        //   'key': key,
        //   'OSSAccessKeyId': ossTokenData.accessKeyId,
        //   'policy': ossTokenData.policy,
        //   'signature': ossTokenData.signature,
        //   'callback': ossTokenData.callback,
        //   'file': item.file,
        //   'success_action_status': '200'
        // }
        const url = ossTokenData.host
        // const fileUrl = ossTokenData.host + '/' + ossTokenData.dir + filename
        console.log(key)
        console.log(url)
        console.log(11111)
        uploadFile(url, formData).then(res => {
          console.log(22222)
          console.log(res)
          resolve(res)
        }).catch(error => {
          console.log(333333)
          reject(error)
        })
      }
    })
  })
}
// 获取上传通行证
function getOssToken(params) {
  return request({
    url: '/front/upload/picture',
    method: 'get',
    params
  })
}

// 获取文件
function uploadFile(url, formData) {
  return request({
    url: url,
    method: 'post',
    contentType: false, // 必须false才会自动加上正确的Content-Type
    formData
  })
}
