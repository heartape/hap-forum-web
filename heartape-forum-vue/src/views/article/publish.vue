<template>
  <div>
    <navbar />
    <div class="article-publish-container">
      <el-row style="background-color: white;padding: 10px">
        <el-col :span="15" style="min-height: 134px">
          <el-input
            v-model="article.title"
            class="title-input"
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
                v-model="labelInput"
                class="input-new-label"
                size="small"
                :highlight-first-item="true"
                popper-class="el-autocomplete-suggestion"
                :fetch-suggestions="querySearch"
                @select="handleSelect"
                @blur="handInputClose"
              />
              <el-button v-else class="button-new-label" size="small" :disabled="labelChoose.length >= maxLabelNumber" @click="showInput">+ 标签</el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="7">
          <el-button type="primary" plain disabled>添加封面</el-button>
          <!--          <el-upload-->
          <!--            class="editor-slide-upload"-->
          <!--            action="https://jsonplaceholder.typicode.com/posts"-->
          <!--            list-type="picture-card"-->
          <!--            :limit="1"-->
          <!--            :file-list="upload.fileList"-->
          <!--            :on-exceed="onExceed"-->
          <!--            :before-upload="beforeUpload"-->
          <!--            :http-request="coverUpload"-->
          <!--          >-->
          <!--            <i slot="default" class="el-icon-plus" />-->
          <!--          </el-upload>-->
        </el-col>
        <el-col :span="2">
          <el-button type="primary" plain @click="contentUpload">发布</el-button>
        </el-col>
      </el-row>
      <tinymce ref="tinymce" v-model="article.content" :width="1000" @imagesUpload="imagesUpload(arguments)" />
    </div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { publishArticle } from '@/api/article'
import { imagesUpload } from '@/utils/upload-picture'
import Navbar from '@/layout/components/Navbar'
import { checkImgExists, error } from '@/utils'
import { searchLabel } from '@/api/label'

export default {
  name: 'Publish',
  components: { Navbar, Tinymce },
  data() {
    return {
      article: {
        title: ``,
        labelId: [],
        isPicture: false,
        mainPicture: undefined,
        content: ``
      },
      upload: {
        fileItem: {},
        fileList: []
      },
      inputVisible: false,
      labelInput: '',
      labelChoose: [],
      maxLabelNumber: 5
    }
  },
  methods: {
    handleClose(label) {
      const labelId = label.labelId
      this.labelChoose.splice(this.labelChoose.indexOf(label), 1)
      this.article.labelId.splice(this.article.labelId.indexOf(labelId), 1)
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
      if (this.article.labelId.includes(labelId)) {
        error('标签已存在，请勿重复添加')
        return
      }
      this.labelChoose.push(item)
      this.article.labelId.push(labelId)
      this.inputVisible = false
      this.labelInput = ''
    },
    handInputClose() {
      setTimeout(() => {
        this.inputVisible = false
        this.labelInput = ''
      }, 300)
    },
    // onExceed() {
    //   this.$notify.error({
    //     title: '添加失败',
    //     message: '最多可以上传1张封面'
    //   })
    // },
    //
    // beforeUpload(file) {
    //   const _URL = window.URL || window.webkitURL
    //   const fileItem = this.upload.fileItem
    //   return new Promise((resolve) => {
    //     const img = new Image()
    //     img.src = _URL.createObjectURL(file)
    //     img.onload = function() {
    //       fileItem.uid = file.uid
    //       fileItem.height = this.height
    //       fileItem.width = this.width
    //       fileItem.success = false
    //     }
    //     resolve(true)
    //   })
    // },
    // coverUpload(params) {
    //   coverUpload(params, this.upload)
    // },
    imagesUpload(params) {
      imagesUpload(params)
    },
    contentUpload() {
      // todo:暂时不加入封面
      if (this.article.title.trim() === `` || this.article.content.trim() === ``) {
        error('内容为空')
        return
      }
      if (this.$refs.tinymce.getCount() < 100) {
        error('字数太少,最少100字')
        return
      }
      const url = this.article.mainPicture
      if (url === undefined || url === '') {
        this.publishArticle()
        return
      }
      checkImgExists(url).then(() => {
        this.article.isPicture = true
        this.publishArticle()
      }).catch(() => this.publishArticle())
    },
    publishArticle() {
      publishArticle(this.article).then(() => {
        this.article = {
          title: ``,
          labelId: [],
          isPicture: false,
          mainPicture: undefined,
          content: ``
        }
        this.$refs.tinymce.setContent(``)
        this.labelChoose = []
      }).catch(err => error(err))
    }
  }
}
</script>

<style lang="scss" scoped>
.article-publish-container {
  width: 1000px;
  margin: 20px auto;
  /*border: #2b2f3a solid 1px;*/
  .editor-slide-upload {
    .el-upload--picture-card {
      width: 160px;
      height: 120px;
    }
  }
}
.title-input {
  width: 590px;
}
.article-publish-container >>> .el-input > input{
  height: 60px;
  font-size: 25px;
}
.el-input {
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
</style>
