<template>
  <!-- 富文本 -->
  <div>
    <div class="head-container">
      <navbar />
    </div>
    <div class="article-publish-container">
      <tinymce v-model="article.content" :height="600" @imagesUpload="imagesUpload(arguments)" />
    </div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { getFileUrl, getOssToken } from '@/api/upload'
import axios from 'axios'
import Navbar from '@/layout/components/Navbar'
const UUID = require('uuid')

export default {
  name: 'ArticleDetail',
  components: { Navbar, Tinymce },
  data() {
    return {
      article: {
        title: `无敌`,
        content: `<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1>`
      }
    }
  },
  methods: {
    // 整合oss上传
    imagesUpload: function(params) {
      const blobInfo = params[0]
      const success = params[1]
      const failure = params[2]
      const progress = params[3]
      progress(0)
      // 获取oss签名
      getOssToken().then((response) => {
        if (response.code === 20000) {
          const policyData = response.data
          /**
           ossUrl 换成自己的Bucket的外网地址，
           例如 https://heartape-test.oss-cn-shenzhen.aliyuncs.com
           */
          const ossUrl = policyData.host
          const uuid = UUID.v4().toString().replace(/-/g, '')
          // 设置上传的访问路径
          const fileName = uuid + blobInfo.filename()
          console.log(fileName)
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
              const pictureUrl = ossUrl + '/' + accessUrl
              console.log(temporaryUrl)
              console.log('上传到阿里云的图片地址:' + pictureUrl)
            })
          })
        }
      }).catch(() => {
        failure('出现未知问题，请刷新页面')
      })
    }
  }
}
</script>

<style scoped>
.article-publish-container {
  width: 770px;
  margin: 20px auto;
  /*border: #2b2f3a solid 1px;*/
}
</style>
