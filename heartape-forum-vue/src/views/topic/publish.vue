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
      v-model="topic.description"
      class="description-container"
      type="textarea"
      resize="none"
      :autosize="{ minRows: 4, maxRows: 8}"
      placeholder="请输入话题描述 ( 选填 )"
    />
    <div class="foot-container">
      <!--      <el-upload-->
      <!--        v-if="fileList.length === 0"-->
      <!--        class="mainPicture-upload"-->
      <!--        action="https://jsonplaceholder.typicode.com/posts/"-->
      <!--        :limit="1"-->
      <!--        :on-success="handleSuccess"-->
      <!--        :on-error="handleError"-->
      <!--        :on-preview="handlePreview"-->
      <!--        :on-remove="handleRemove"-->
      <!--        :file-list="fileList"-->
      <!--        disabled-->
      <!--      >-->
      <!--        <el-button type="primary">添加封面</el-button>-->
      <!--      </el-upload>-->
      <!--      <el-button v-else class="mainPicture-upload-preview-btn" type="primary" @click="dialogVisible = false">预 览</el-button>-->
      <el-button class="topic-publish-btn" type="primary" @click="checkAndPublishTopic">发 布</el-button>
    </div>
  </div>
</template>

<script>
import { publish } from '@/api/topic'
import { searchLabel } from '@/api/label'
import { checkImgExists, error } from '@/utils'

export default {
  name: 'Publish',
  data() {
    return {
      topic: {
        title: `如何看待「流调中最辛苦的中国人」？`,
        description: `1月19日，在北京市召开的第269场新冠疫情防控新闻发布会上`,
        isPicture: false,
        mainPicture: undefined,
        labelId: []
      },
      inputVisible: false,
      labelInput: {},
      labelChoose: [],
      maxLabelNumber: 5,
      fileList: []
    }
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
      this.topic.labelId.splice(this.topic.labelId.indexOf(labelId), 1)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // label模糊搜索
    querySearch(name, cb) {
      const pageNum = 1
      const pageSize = 10
      searchLabel(name, pageNum, pageSize).then(res => {
        res.data.list.forEach(label => {
          label.value = label.name
        })
        cb(res.data.list)
      }).catch(err => error(err))
    },
    // 选择
    handleSelect(item) {
      // 判断重复
      const labelId = item.labelId
      if (this.topic.labelId.includes(labelId)) {
        this.error('标签已存在，请勿重复添加')
        return
      }
      this.labelChoose.push(item)
      this.topic.labelId.push(labelId)
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
    checkAndPublishTopic() {
      if (this.topic.title.trim() === `` || this.topic.description.trim() === ``) {
        error('内容为空')
        return
      }
      const url = this.topic.mainPicture
      if (url === undefined || url === '') {
        this.publishTopic()
        return
      }
      checkImgExists(url).then(() => {
        this.topic.isPicture = true
        this.publishTopic()
      }).catch(() => this.publishTopic())
    },
    publishTopic() {
      publish(this.topic).then(() => {
        this.topic = {
          title: ``,
          description: ``,
          isPicture: false,
          mainPicture: undefined,
          labelId: []
        }
        this.labelChoose = []
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
    margin: 0 10px 10px 0;
  }
  .label-add-container {
    float: left;
    margin: 0 !important;
  }
  .button-new-label, .input-new-label {
    margin-bottom: 10px;
  }
}
.foot-container {
  height: 40px;
  margin-top: 20px;
  .mainPicture-upload {
    float: left;
  }
  .mainPicture-upload-preview-btn {
    float: left;
  }
  .topic-publish-btn {
    float: right;
  }
}
</style>
<style scoped>
.mainPicture-upload /deep/ .el-upload-list__item {
  margin-top: 0;
}
</style>
