<template>
  <!--label简略菜单-->
  <el-row v-loading="fullscreenLoading" element-loading-background="#dfdfdf" class="label-simple-container">
    <el-button v-for="item in labelShow.slice(0,6)" :key="item.labelId" type="text" size="small" @click="switchLabel(item.labelId)">{{ item.name }}</el-button>
    <el-button v-if="showMore" class="label-menu" type="text" size="small" @click="showLabels">
      <i class="el-icon-menu" />
      <span>更多</span>
    </el-button>
    <el-dialog
      title="选择标签"
      :visible.sync="showAllLabel"
      width="600"
    >
      <el-cascader-panel
        v-model="labelSearch"
        v-loading="labelLoading"
        style="width: 362px; float: left; margin-left: 20px"
        :options="labels"
        :props="panelSetting"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
import store from '@/store'
import { showAllLabel, showHotLabel } from '@/api/label'

export default {
  name: 'LabelBar',
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      panelSetting: {
        expandTrigger: 'hover',
        emitPath: false,
        label: 'name',
        value: 'labelId'
      },
      showAllLabel: false,
      showMore: false,
      labelLoading: false,
      fullscreenLoading: false,
      labels: [],
      labelShow: [],
      labelSearch: []
    }
  },
  mounted() {
    this.fullscreenLoading = true
    showHotLabel().then(res => {
      this.labelShow = res.data
      this.showMore = true
      this.fullscreenLoading = false
    }).catch(() => {
      this.error()
      this.labelShow = [
        { labelId: 1, name: 'java' },
        { labelId: 2, name: 'php' },
        { labelId: 3, name: '高并发' },
        { labelId: 4, name: '微服务' },
        { labelId: 5, name: '大数据' },
        { labelId: 6, name: '云计算' }
      ]
      this.showMore = true
      this.fullscreenLoading = false
    })
  },
  methods: {
    error() {
      this.$notify.error({
        title: '请求失败',
        message: '请检查网络或联系管理员'
      })
    },
    switchLabel(labelId) {
      // 根据label筛选
      this.$router.push({ path: '/' + this.type + '/label/' + labelId + '/hot' })
    },
    showLabels() {
      this.showAllLabel = true
      this.labelLoading = true
      // 获取所有label
      showAllLabel().then(res => {
        this.labels = res.data
        this.labelLoading = false
      }).catch(() => {
        this.error()
        this.labels = [
          {
            labelId: 1,
            name: '军事',
            children: [
              { labelId: 11, name: '一战' },
              { labelId: 12, name: '二战' }
            ]
          }
        ]
        this.labelLoading = false
      })
    },
    handleClose() {
      this.showAllLabel = false
      this.labelSearch = []
    },
    handleSubmit() {
      this.showAllLabel = false
      store.dispatch('label/saveArticleLabel', this.labelChoose.slice(0, 6))
      this.labelShow = this.labelChoose.slice(0, 6)
      this.labelChoose = []
      this.labelSearch = []
    }
  }
}
</script>

<style lang="scss" scoped>
.label-simple-container {
  position: relative;
  height: 75px;
  padding: 20px 30px 20px 30px;
  overflow: hidden;
  border: #ececec solid 1px;
  .el-button {
    width: 80px;
    margin: 0 19px 0 0;
    background-color: cadetblue;
    color: #454545;
    overflow: hidden;
  }
  .label-menu {
    margin-right: 0;
  }
  .el-button:hover {
    background-color: #999999;
  }
}
</style>
