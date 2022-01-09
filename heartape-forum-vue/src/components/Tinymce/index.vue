<template>
  <div :class="{fullscreen:fullscreen}" class="tinymce-container" :style="{width:containerWidth}">
    <textarea :id="tinymceId" class="tinymce-textarea" />
    <el-button
      class="cover-upload-button"
      type="info"
      icon="el-icon-picture-outline"
      @click="dialogOut = true"
    >
      上传封面
    </el-button>
    <el-dialog title="上传封面" :visible.sync="dialogOut">
      <el-upload
        class="editor-slide-upload"
        action="#"
        list-type="picture-card"
        :limit="1"
        :on-exceed="onExceed"
        :before-upload="beforeUpload"
        :http-request="uploadFile"
      >
        <i class="el-icon-plus" />
      </el-upload>
      <el-dialog v-model="dialogIn">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </el-dialog>
    <el-button
      v-loading.fullscreen.lock="fullscreenLoading"
      class="publish-button"
      type="info"
      icon="el-icon-finished"
      @click="contentUpload"
    >发布</el-button>
  </div>
</template>

<script>
/**
 * docs:
 * https://panjiachen.github.io/vue-element-admin-site/feature/component/rich-editor.html#tinymce
 */
import plugins from './plugins'
import toolbar from './toolbar'
import load from './dynamicLoadScript'
import { getFileUrl, getOssToken } from '@/api/upload'
import axios from 'axios'
const UUID = require('uuid')
const moment = require('moment')

// why use this cdn, detail see https://github.com/PanJiaChen/tinymce-all-in-one
// const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js'
const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce@5.10.2/tinymce.min.js'

export default {
  name: 'Tinymce',
  props: {
    id: {
      type: String,
      default: function() {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    menubar: {
      type: String,
      default: 'file edit insert view format table'
    },
    height: {
      type: [Number, String],
      required: false,
      default: 360
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto'
    },
    imagesUpload: {
      type: Function,
      default: function() {}
    },
    coverUpload: {
      type: Function,
      default: function() {}
    },
    contentUpload: {
      type: Function,
      default: function() {}
    }
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      languageTypeList: {
        'en': 'en',
        'zh': 'zh_CN'
      },
      // 发布后加载动画
      fullscreenLoading: false,
      // 封面
      fileItem: {
        name: '',
        url: '',
        success: false,
        accessUrl: '',
        height: 0,
        width: 0
      },
      dialogImageUrl: '',
      dialogOut: false,
      dialogIn: false
    }
  },
  computed: {
    containerWidth() {
      const width = this.width
      if (/^[\d]+(\.[\d]+)?$/.test(width)) { // matches `100`, `'100'`
        return `${width}px`
      }
      return width
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || ''))
      }
    }
  },
  mounted() {
    this.init()
  },
  activated() {
    if (window.tinymce) {
      this.initTinymce()
    }
  },
  deactivated() {
    this.destroyTinymce()
  },
  destroyed() {
    this.destroyTinymce()
  },
  methods: {
    init() {
      // dynamic load tinymce from cdn
      load(tinymceCDN, (err) => {
        if (err) {
          this.$message.error(err.message)
          return
        }
        this.initTinymce()
      })
    },
    initTinymce() {
      const _this = this
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        min_height: 800,
        language: this.languageTypeList['zh'],
        language_url: require('./plugins/languages/zh_CN.js'),
        fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
        height: this.height,
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        plugins: plugins,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        // imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        image_dimensions: false,
        paste_data_images: true, // 设置为“true”将允许粘贴图像，而将其设置为“false”将不允许粘贴图像。
        default_link_target: '_blank',
        link_title: false,
        nonbreaking_force_tab: true,
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent())
          })
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })
        },
        // it will try to keep these URLs intact
        // https://www.tiny.cloud/docs-3x/reference/configuration/Configuration3x@convert_urls/
        // https://stackoverflow.com/questions/5196205/disable-tinymce-absolute-to-relative-url-conversions
        convert_urls: false,
        // 整合oss上传
        images_dataimg_filter: function(img) {
          return img.hasAttribute('internal-blob')
        },
        images_upload_handler: (blobInfo, success, failure, progress) => {
          this.$emit('imagesUpload', blobInfo, success, failure, progress)
        }
      })
    },
    destroyTinymce() {
      const tinymce = window.tinymce.get(this.tinymceId)
      if (this.fullscreen) {
        tinymce.execCommand('mceFullScreen')
      }

      if (tinymce) {
        tinymce.destroy()
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent()
    },
    error() {
      this.$notify.error({
        title: '请求失败',
        message: '请检查网络或联系管理员'
      })
    },

    onExceed() {
      this.$notify.error({
        title: '添加失败',
        message: '最多可以上传1张封面'
      })
    },

    beforeUpload(file) {
      const _URL = window.URL || window.webkitURL
      const _fileItem = this.fileItem
      return new Promise((resolve) => {
        const img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = function() {
          _fileItem.uid = file.uid
          _fileItem.height = this.height
          _fileItem.width = this.width
          _fileItem.success = false
        }
        resolve(true)
      })
    },

    // 覆盖elemen的上传函数
    // todo:将方法抽离出来
    uploadFile(param) {
      // 得到文件的内容
      const file = param.file
      // 获取oss签名
      getOssToken().then((response) => {
        if (response.code === 200) {
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
              this.fileItem.name = fileName
              this.fileItem.accessUrl = accessUrl
              this.fileItem.url = url
              this.fileItem.success = true
              // 传输给父组件
              this.$emit('fileItem', this.fileItem)
            }).catch(() => { this.error() })
          }).catch(() => { this.error() })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tinymce-container {
  position: relative;
  line-height: normal;
}

.tinymce-container {
  ::v-deep {
    .mce-fullscreen {
      z-index: 10000;
    }
  }
}

.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}

.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
}

.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}

.publish-button, .cover-upload-button {
  position: absolute;
  right: 0;
  top: 0;
  height: 40px;
  border-color: transparent;
  border-radius: 0;
  padding: 10px;
  z-index: 1000;
}
.cover-upload-button {
  right: 80px;
}
</style>
