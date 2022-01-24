<template>
  <div class="topic-publish-container">
    <el-input
      v-model="topic.title"
      class="title-container"
      placeholder="请输入话题"
    />
    <div class="label-container">
      <el-tag
        v-for="label in labelChoose"
        :key="label.labelId"
        class="label-choose-tag"
        closable
        @close="handleClose(label)"
      >{{ label.value }}</el-tag>
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
        <el-button v-else class="button-new-label" type="text" size="small" :disabled="!(labelChoose.length < maxLabelNumber)" @click="showInput">+ 标签</el-button>
      </div>
    </div>
    <el-input
      v-model="topic.describe"
      class="describe-container"
      type="textarea"
      resize="none"
      :autosize="{ minRows: 4, maxRows: 8}"
      placeholder="请输入话题描述 ( 选填 )"
    />
    <div class="foot-container">
      <el-upload
        v-if="fileList.length === 0"
        class="cover-upload"
        action="https://jsonplaceholder.typicode.com/posts/"
        :limit="1"
        :on-success="handleSuccess"
        :on-error="handleError"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
      >
        <el-button type="primary">添加封面</el-button>
      </el-upload>
      <el-button v-else class="cover-upload-preview-btn" type="primary" @click="dialogVisible = false">预 览</el-button>
      <el-button class="topic-publish-btn" type="primary" @click="publishTopic">发 布</el-button>
    </div>
  </div>
</template>

<script>
import { publish } from '@/api/topic'

export default {
  name: 'Publish',
  data() {
    return {
      topic: {
        title: `如何看待「流调中最辛苦的中国人」？`,
        describe: `1月19日，在北京市召开的第269场新冠疫情防控新闻发布会上`,
        cover: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg',
        label: []
      },
      inputVisible: false,
      labelInput: {},
      labelChoose: [],
      labelSearch: [],
      maxLabelNumber: 5,
      fileList: []
    }
  },
  created() {
    // todo:改为接口获取
    this.labelSearch = [
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
        message: message
      })
    },
    // todo:将label选择抽离出一个组件
    handleClose(label) {
      const labelId = label.labelId
      this.labelChoose.splice(this.labelChoose.indexOf(label), 1)
      this.topic.label.splice(this.topic.label.indexOf(labelId), 1)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // label模糊搜索
    querySearch(queryString, cb) {
      const label = this.labelSearch
      const result = queryString ? label.filter(item => item.value.match(queryString)) : label
      // const result = queryString ? label.filter(item => item.value.match('/^.*' + queryString + '.*$/')) : label
      cb(result)
    },
    // 选择
    handleSelect(item) {
      // 判断重复
      const labelId = item.labelId
      if (this.topic.label.includes(labelId)) {
        this.error('标签已存在，请勿重复添加')
        return
      }
      this.labelChoose.push(item)
      this.topic.label.push(labelId)
      this.inputVisible = false
      this.labelInput = {}
    },
    handInputClose() {
      setTimeout(() => {
        this.inputVisible = false
        this.labelInput = {}
      }, 300)
    },
    handleSuccess(file, fileList) {
      // todo:图片上传整合,结果样式修改
      console.log('handleSuccess')
      console.log(file)
      console.log(fileList)
    },
    handleError(file, fileList) {
      // todo:图片上传整合,结果样式修改
      console.log('handleError')
      console.log(file)
      console.log(fileList)
    },
    handleRemove(file, fileList) {
      console.log('handleRemove')
      console.log(file)
      console.log(fileList)
    },
    handlePreview(file) {
      console.log('handlePreview')
      console.log(file)
    },
    publishTopic() {
      const topic = this.topic
      console.log(topic)
      publish(topic).then(res => {
        const topicId = res.data
        this.$router.push('/topic/' + topicId)
      }).catch(error => this.error(error))
    }
  }
}
</script>

<style lang="scss" scoped>
.topic-publish-container {
  width: 500px;
}
.title-container {
  margin-bottom: 10px;
}
.label-container {
  .label-choose-tag {
    float: left;
    margin-right: 10px;
  }
  .label-add-container {
    float: left;
    margin: 0 !important;
  }
}
.describe-container {
  margin-top: 10px;
}
.foot-container {
  height: 40px;
  margin-top: 20px;
  .cover-upload {
    float: left;
  }
  .cover-upload-preview-btn {
    float: left;
  }
  .topic-publish-btn {
    float: right;
  }
}
</style>
<style scoped>
.cover-upload /deep/ .el-upload-list__item {
  margin-top: 0;
}
</style>
