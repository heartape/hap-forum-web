<template>
  <!-- 富文本 -->
  <div>
    <div class="head-container">
      <navbar />
    </div>
    <div class="article-publish-container">
      <el-input
        v-model="article.title"
        :clearable="true"
        maxlength="30"
        show-word-limit
        size="30px"
      >
        <template slot="prepend">标题</template>
      </el-input>
      <div class="label-container">
        <el-tag
          v-for="item in labelChoose"
          :key="item.labelId"
          class="label-choose-tag"
          closable
          @close="handleClose(item)"
        >{{ item.value }}</el-tag>
        <div class="label-add-container">
          <el-autocomplete
            v-if="inputVisible"
            ref="saveTagInput"
            v-model="labelInput.value"
            class="input-new-label"
            size="small"
            :highlight-first-item="true"
            popper-class="el-autocomplete-suggestion"
            :fetch-suggestions="querySearch"
            @select="handleSelect"
            @blur="handInputClose"
          />
          <el-button v-else class="button-new-label" size="small" :disabled="!(labelChoose.length < maxLabelNumber)" @click="showInput">+ 标签</el-button>
        </div>
      </div>
      <tinymce v-model="article.content" :width="1000" @imagesUpload="imagesUpload(arguments)" @contentUpload="contentUpload" />
    </div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { getFileUrl, getOssToken, publishArticle } from '@/api/upload'
import axios from 'axios'
import Navbar from '@/layout/components/Navbar'
const UUID = require('uuid')

export default {
  name: 'Publish',
  components: { Navbar, Tinymce },
  data() {
    return {
      article: {
        title: ``,
        label: [],
        content: `<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1>`
      },
      inputVisible: false,
      labelInput: {},
      label: [],
      labelChoose: [],
      maxLabelNumber: 5
    }
  },
  created() {
    this.label = [
      { labelId: 1, value: '计算机' },
      { labelId: 2, value: '数学' },
      { labelId: 3, value: '云计算' },
      { labelId: 4, value: '人工智能' },
      { labelId: 5, value: '微服务' }
    ]
  },
  methods: {
    error(message) {
      this.$notify.error({
        title: '请求失败',
        message: message,
        position: 'top-left'
      })
    },
    handleClose(label) {
      const labelId = label.labelId
      this.labelChoose.splice(this.labelChoose.indexOf(label), 1)
      this.article.label.splice(this.article.label.indexOf(labelId), 1)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // label模糊搜索
    querySearch(queryString, cb) {
      const label = this.label
      const result = queryString ? label.filter(item => item.value.match(queryString)) : label
      // const result = queryString ? label.filter(item => item.value.match('/^.*' + queryString + '.*$/')) : label
      cb(result)
    },
    // 选择
    handleSelect(item) {
      // 判断重复
      const labelId = item.labelId
      if (this.article.label.includes(labelId)) {
        this.error('标签已存在，请勿重复添加')
        return
      }
      this.labelChoose.push(item)
      this.article.label.push(labelId)
      this.inputVisible = false
      this.labelInput = {}
    },
    handInputClose() {
      setTimeout(() => {
        this.inputVisible = false
        this.labelInput = {}
      }, 300)
    },
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
    },
    contentUpload() {
      this.fullscreenLoading = true
      publishArticle(this.article).then(() => {
        this.fullscreenLoading = false
        alert('发布成功')
      }).catch(() => {
        this.fullscreenLoading = false
        alert('发布失败')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.article-publish-container {
  width: 1000px;
  margin: 20px auto;
  /*border: #2b2f3a solid 1px;*/
}
.article-publish-container >>> .el-input > input{
  height: 60px;
  font-size: 25px;
}
.el-input {
  margin-bottom: 10px;
}

.label-container {
  height: 32px;
  margin-bottom: 10px;
  background-color: #ffffff;
  border-radius: 4px;
  .label-choose-tag {
    min-width: 100px;
    float: left;
    margin-right: 10px;
    line-height: 33px;
    text-align: center;
  }
  .label-add-container {
    float: left;
    .button-new-label {
      margin-left: 10px;
      height: 32px;
      width: 100px;
      line-height: 32px;
      padding-top: 0;
      padding-bottom: 0;
    }
    .input-new-label {
      width: 100px;
      vertical-align: bottom;
      .el-autocomplete-suggestion {
        width: 300px !important;
        div {
          width: 300px !important;
        }
      }
    }
    .el-button {
      margin: 0;
    }
  }
}
</style>
