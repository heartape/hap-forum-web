<template>
  <div class="upload-container">
    <el-button :style="{background:color,borderColor:color}" icon="el-icon-upload" size="mini" type="primary" @click=" dialogVisible=true">
      upload
    </el-button>
    <el-dialog :visible.sync="dialogVisible">
      <el-upload
        :multiple="true"
        :file-list="fileList"
        :show-file-list="true"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        class="editor-slide-upload"
        :http-request="httpRequest"
        action=""
        list-type="picture-card"
      >
        <el-button size="small" type="primary">
          Click upload
        </el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">
        Cancel
      </el-button>
      <el-button type="primary" @click="handleSubmit">
        Confirm
      </el-button>
    </el-dialog>
  </div>
</template>

<script>
import { upload } from '@/api/upload'
// import axios from 'axios'
// const UUID = require('uuid')

export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: []
    }
  },
  methods: {
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message('Please wait for all images to be uploaded successfully. If there is a network problem, please refresh the page and upload again!')
        return
      }
      this.$emit('successCBK', arr)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
    handleSuccess(response, file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url = response.files.file
          this.listObj[objKeyArr[i]].hasSuccess = true
          return
        }
      }
    },
    handleRemove(file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    beforeUpload(file) {
      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      this.listObj[fileName] = {}
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = function() {
          _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
        }
        resolve(true)
      })
    },
    // 覆盖elemen的上传函数
    async httpRequest(item) {
      const result = await upload(item)
      console.log(result)
    }
    // Uploadfile(param) {
    //   let file = param.file; // 得到文件的内容
    //   console.log(file);
    //   //填写获取签名的地址
    //   const getPolicyApiUrl = 'http://localhost/front/upload/picture'; //获取oss签名的地址
    //   // 获取oss签名
    //   axios({
    //     method: 'get',
    //     url: getPolicyApiUrl
    //   }).then((response) => {
    //     if (response.status === 200) {
    //       let policyData = response.data.data;
    //       console.log(policyData);
    //       /**
    //        ossUrl 换成自己的Bucket的外网地址，
    //        例如 https://human-resource-manage.oss-cn-shenzhen.aliyuncs.com
    //        */
    //       let ossUrl = 'https://heartape-forum.oss-cn-shanghai.aliyuncs.com';//填写自己OSS服务器的地址
    //       const uuid = UUID.v4().toString().replace(/-/g, '')
    //       let accessUrl = policyData.dir + '/' + uuid + file.name;//设置上传的访问路径
    //       let sendData = new FormData();// 上传文件的data参数
    //       sendData.append('OSSAccessKeyId', policyData.accessid);
    //       sendData.append('policy', policyData.policy);
    //       sendData.append('Signature', policyData.signature);
    //       sendData.append('keys', policyData.dir);
    //       sendData.append('key', accessUrl);//上传的文件路径
    //       sendData.append('success_action_status', 200); // 指定返回的状态码
    //       sendData.append('type', 'image/jpeg');
    //       sendData.append('file', file);
    //       console.log(sendData);
    //       axios.post(
    //         ossUrl,
    //         sendData
    //       ).then((res) => {
    //         this.pictureUrl = ossUrl + '/' + accessUrl;//获得到的url需要将其存数据库中
    //         console.log('上传到阿里云的图片地址：' + ossUrl + '/' + accessUrl)
    //       })
    //     }
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  ::v-deep .el-upload--picture-card {
    width: 100%;
  }
}
</style>
