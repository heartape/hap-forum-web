import { getFileUrl, getOssToken } from '@/api/upload'
import axios from 'axios'
import { error } from '@/utils/index'
const UUID = require('uuid')
const moment = require('moment')

/**
 * 文章话题上传封面
 */
export function coverUpload(param, upload) {
  // 得到文件的内容
  const file = param.file
  // 获取oss签名
  getOssToken().then((response) => {
    if (response.code === 1) {
      const policyData = response.data
      /**
       ossUrl 换成自己的Bucket的外网地址，
       例如 https://heartape-test.oss-cn-shenzhen.aliyuncs.com
       */
      const ossUrl = policyData.host
      const uuid = UUID.v4().toString().replace(/-/g, '')
      // 设置上传的访问路径
      const type = file.name.substring(file.name.indexOf('.')).toLowerCase()
      const fileName = uuid + type
      const data = moment().format('YYYY-MM-DD')
      /**
       * 在oos内部路径
       * 例如 front/article/2021-12-30/dog.png
       */
      const accessUrl = policyData.dir + data + '/' + fileName
      // 上传文件的data参数
      const sendData = new FormData()
      sendData.append('OSSAccessKeyId', policyData.accessid)
      sendData.append('policy', policyData.policy)
      sendData.append('Signature', policyData.signature)
      sendData.append('keys', policyData.dir)
      sendData.append('key', accessUrl) // 上传的文件路径
      sendData.append('success_action_status', 200) // 指定返回的状态码
      sendData.append('type', 'image/jpeg')
      sendData.append('file', file)
      axios.post(
        ossUrl,
        sendData
      ).then(() => {
        getFileUrl(accessUrl).then(res => {
          const url = res.data.url.thumbnailUrl
          upload.fileItem.name = fileName
          upload.fileItem.accessUrl = accessUrl
          upload.fileItem.url = url
          upload.fileItem.success = true
          upload.fileList.push(upload.fileItem)
          console.log(upload)
          upload.fileItem = {}
        }).catch(err => {
          // 如果有上传失败的就舍弃并提示
          error(err)
        })
      }).catch(err => {
        // 如果有上传失败的就舍弃并提示
        error(err)
      })
    }
  }).catch(err => {
    // 如果有上传失败的就舍弃并提示
    error(err)
    upload.fileItem = {}
  })
}

/**
 * 富文本oss上传图片
 * @param params
 */
export function imagesUpload(params) {
  const blobInfo = params.file
  const success = params.onSuccess
  const failure = params.onError
  const progress = params.onProgress
  progress(0)
  // 获取oss签名
  // todo:根据不同的图片发送到不同的Bucket
  getOssToken().then((response) => {
    if (response.code === 1) {
      const policyData = response.data
      /**
       ossUrl 换成自己的Bucket的外网地址，
       例如 https://heartape-test.oss-cn-shenzhen.aliyuncs.com
       */
      const ossUrl = policyData.host
      const uuid = UUID.v4().toString().replace(/-/g, '')
      // 设置上传的访问路径
      const fileName = uuid + blobInfo.filename()
      /**
       * 在oos内部路径
       * 例如 front/article/dog.png
       */
      const accessUrl = policyData.dir + fileName
      // 上传文件的data参数
      const sendData = new FormData()
      sendData.append('OSSAccessKeyId', policyData.accessid)
      sendData.append('policy', policyData.policy)
      sendData.append('Signature', policyData.signature)
      // sendData.append('callback', policyData.callback)
      sendData.append('keys', policyData.dir)
      sendData.append('key', accessUrl) // 上传的文件路径
      sendData.append('success_action_status', 200) // 指定返回的状态码
      sendData.append('type', 'image/jpeg')
      sendData.append('file', blobInfo.blob(), fileName)
      axios.post(
        ossUrl,
        sendData
      ).then(() => {
        getFileUrl(accessUrl).then(res => {
          const temporaryUrl = res.data.url
          success(temporaryUrl)
          progress(100)
          // const pictureUrl = ossUrl + '/' + accessUrl
          // console.log(temporaryUrl)
          // console.log('上传到阿里云的图片地址:' + pictureUrl)
        })
      }).catch(err => failure(err))
    }
  }).catch(err => failure(err))
}
