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
      <div class="sort-container">
        <span class="sort-title">标签</span>
        <el-tag
          v-for="item in sortChoose"
          :key="item.sortId"
          closable
          @close="handleClose(item)"
        >{{ item.name }}</el-tag>
        <div v-if="sortChoose.length < maxSortNumber" class="sort-add-container">
          <el-autocomplete
            v-if="inputVisible"
            ref="saveTagInput"
            v-model="sortInput.value"
            class="input-new-sort"
            size="small"
            :fetch-suggestions="querySearch"
            @select="handleSelect"
            @keyup.enter.native="handleInputConfirm"
          />
          <el-button v-if="inputVisible" class="button-add-sort" size="small" @click="handleInputConfirm">添加</el-button>
          <el-button v-if="inputVisible" class="button-leave-sort" size="small" @click="leaveInputConfirm">取消</el-button>
          <el-button v-else class="button-new-sort" size="small" @click="showInput">+ 标签</el-button>
        </div>
      </div>
      <tinymce v-model="article.content" :width="1000" @imagesUpload="imagesUpload(arguments)" />
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
  name: 'Publish',
  components: { Navbar, Tinymce },
  data() {
    return {
      article: {
        title: `无敌`,
        content: `<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1>`
      },
      // todo:标签选择
      inputVisible: false,
      sortInput: {},
      sort: [],
      sortChoose: [
        { sortId: 1, name: '计算机' }
      ],
      maxSortNumber: 5
    }
  },
  created() {
    this.sort = [
      { sortId: 1, value: '计算机' },
      { sortId: 2, value: '数学' },
      { sortId: 3, value: '云计算' },
      { sortId: 4, value: '微服务' }
    ]
  },
  methods: {
    handleClose(sort) {
      this.sortChoose.splice(this.sortChoose.indexOf(sort), 1)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // sort模糊搜索
    querySearch(queryString, cb) {
      const sort = this.sort
      const result = queryString ? sort.filter(item => item.value.match(queryString)) : sort
      // const result = queryString ? sort.filter(item => item.value.match('/^.*' + queryString + '.*$/')) : sort
      cb(result)
    },
    // 选择
    handleSelect(item) {
      this.sortInput = item
    },
    // 执行添加
    handleInputConfirm() {
      const sortId = this.sortInput.sortId
      if (sortId) {
        // 存入sort
        this.sortInput.name = this.sortInput.value
        this.sortChoose.push(this.sortInput)
      }
      this.inputVisible = false
      this.sortInput = {}
    },
    leaveInputConfirm() {
      this.inputVisible = false
      this.sortInput = {}
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

.sort-container {
  margin-bottom: 10px;
  background-color: #ffffff;
  .sort-title {
    padding: 8px 20px;
    background-color: #F5F7FA;
    color: #909399;
    font-size: 14px;
    margin-right: 10px;
    border: #DCDFE6 solid 1px;
  }
  .el-tag {
    margin-right: 10px;
  }
  .sort-add-container {
    display: inline-block;
    .button-new-sort {
      margin-left: 10px;
      height: 32px;
      width: 74px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
    }
    .input-new-sort {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
    }
    .el-button {
      margin: 0;
    }
  }
}

</style>
