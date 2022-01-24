<template>
  <!--label简略菜单-->
  <el-row v-loading="fullscreenLoading" element-loading-background="#ffffff" class="label-simple-container">
    <el-button v-for="item in labelShow.slice(0,6)" :key="item.labelId" type="text" size="small" @click="switchLabel(item.labelId)">{{ item.name }}</el-button>
    <el-button v-if="showMore" class="label-menu" type="text" size="small" @click="showAllLabel = true">
      <i class="el-icon-menu" />
      <span>更多</span>
    </el-button>
    <el-dialog
      title="选择标签"
      :visible.sync="showAllLabel"
      width="720px"
    >
      <el-select v-model="labels.one.levelValue" class="label-select one-level-select" filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="oneLevelMethod" :loading="labels.one.levelLoading">
        <el-option v-for="label in labels.one.levelLabels" :key="label.labelId" :label="label.name" :value="label.labelId" />
      </el-select>
      <el-select v-model="labels.two.levelValue" class="label-select two-level-select" filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="twoLevelMethod" :loading="labels.two.levelLoading">
        <el-option v-for="label in labels.two.levelLabels" :key="label.labelId" :label="label.name" :value="label.labelId" />
      </el-select>
      <el-select v-model="labels.three.levelValue" class="label-select three-level-select" filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="threeLevelMethod" :loading="labels.three.levelLoading">
        <el-option v-for="label in labels.three.levelLabels" :key="label.labelId" :label="label.name" :value="label.labelId" />
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
import { showHotLabel, showOneLevelLabel, showTwoLevelLabel, showThreeLevelLabel } from '@/api/label'

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
      showAllLabel: false,
      showMore: false,
      labelLoading: false,
      fullscreenLoading: false,
      labelShow: [],
      labelSearch: '',
      labels: {
        one: {
          levelValue: '',
          levelPage: '',
          levelLabels: [],
          levelLoading: false
        },
        two: {
          levelValue: '',
          levelPage: '',
          levelLabels: [],
          levelLoading: false
        },
        three: {
          levelValue: '',
          levelPage: '',
          levelLabels: [],
          levelLoading: false
        }
      }
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
    oneLevelMethod() {
      const page = this.labels.one.levelPage + 1
      showOneLevelLabel(page).then(res => {
        const data = res.data
        this.labels.one.levelPage = data.current
        this.labels.one.levelLabels = data.list
      }).catch(error => this.error(error))
    },
    twoLevelMethod() {
      const page = this.labels.two.levelPage + 1
      showTwoLevelLabel(page).then(res => {
        const data = res.data
        this.labels.two.levelPage = data.current
        this.labels.two.levelLabels = data.list
      }).catch(error => this.error(error))
    },
    threeLevelMethod() {
      const page = this.labels.three.levelPage + 1
      showThreeLevelLabel(page).then(res => {
        const data = res.data
        this.labels.three.levelPage = data.current
        this.labels.three.levelLabels = data.list
      }).catch(error => this.error(error))
    },
    handleClose() {
      this.showAllLabel = false
      this.labelSearch = ''
    },
    handleSubmit() {
      this.showAllLabel = false
      const labelId = this.labelSearch
      this.$router.push({ path: '/' + this.type + '/label/' + labelId + '/hot' })
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
  .label-select {
    margin-right: 30px;
  }
}
</style>
