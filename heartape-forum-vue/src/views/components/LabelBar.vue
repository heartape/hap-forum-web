<template>
  <!--label简略菜单-->
  <div class="label-simple-container">
    <el-button v-for="item in labelShow.slice(0,6)" :key="item.labelId" type="text" size="small" @click="switchLabel(item.labelId)">{{ item.name }}</el-button>
    <el-button class="label-menu" type="text" size="small" @click="showLabels">
      <i class="el-icon-menu" />
      <span>更多</span>
    </el-button>
    <el-dialog
      title="选择标签"
      :visible.sync="showAllLabel"
      width="40%"
    >
      <el-row>
        <el-cascader-panel
          v-model="labelSearch"
          style="width: 50%; float: left; margin-left: 40px"
          :options="labels"
          :props="panelSetting"
          @change="handChange"
        />
        <el-table
          :data="labelChoose"
          height="250"
          border
          style="width: 30%; float: left; margin-left: 40px"
        >
          <el-table-column
            prop="name"
            label="已选择标签"
          />
        </el-table>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'

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
        multiple: true,
        expandTrigger: 'hover',
        emitPath: false,
        label: 'name',
        value: 'labelId'
      },
      showAllLabel: false,
      labels: [],
      labelShow: [],
      labelSearch: [],
      labelChoose: []
    }
  },
  mounted() {
    // 如果labelShow为空跳到首页
    this.labelShow = store.getters.articleLabel
    if (this.labelShow.length === 0) {
      console.log(this.type)
      this.$router.push('/' + this.type + '/hot')
    }
  },
  methods: {
    switchLabel(labelId) {
      // 根据label筛选
      this.$router.push({ path: '/' + this.type + '/label/' + labelId + '/hot' })
    },
    showLabels() {
      // 展示所有label
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
      this.showAllLabel = true
    },
    handChange() {
      // 更新labelChoose数组
      this.labelChoose = this.labelSearch.map(search => {
        let choose
        this.labels.forEach(label => {
          const children = label.children
          children.forEach(child => {
            if (child.labelId === search) {
              choose = child
            }
          })
        })
        return choose
      })
    },
    handleClose() {
      this.showAllLabel = false
      this.labelChoose = []
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
