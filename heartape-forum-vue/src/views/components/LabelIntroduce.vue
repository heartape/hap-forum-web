<template>
  <div class="label-introduce-container">
    <el-empty v-if="labelIsEmpty" description="暂无数据" style="padding: 0" />
    <el-row v-else v-loading="loadingLabelInfo" class="label-introduce-container-able">
      <el-image
        :src="label.picture"
        :alt="label.name"
        style="position: relative;width: 210px; height: 210px; margin: 10px"
        fit="cover"
      />
      <div class="mid-info-container">
        <h2>{{ label.name }}</h2>
        <span>
          <div v-if="label.type === 'long'">
            <span>{{ label.introduce }}...</span>
            <el-button type="text" class="show-all-btn" @click="showAll">查看全部</el-button>
            <el-dialog
              :title="label.name"
              :visible.sync="showLong"
              width="400px"
            >
              <span>{{ label.longIntroduce }}</span>
            </el-dialog>
          </div>
          <span v-else>{{ label.introduce }}</span>
        </span>
        <div class="foot-menu-container">
          <el-button v-if="label.follow" class="label-follow-btn" type="primary" size="small" plain style="width: 80px" @click="cancelFollowLabel">已关注</el-button>
          <el-button v-else class="label-follow-btn" type="primary" size="small" plain disabled @click="followLabel">关注标签</el-button>
          <el-button class="label-log-btn" type="primary" size="small" plain disabled @click="labelOperateLog">标签记录</el-button>
        </div>
      </div>
      <div class="right-label-relative-container">
        <el-button class="label-relation-btn" type="text" size="small" disabled @click="showLabelRelation">全部标签关系</el-button>
        <div class="parent-label-container">
          <h5>父标签</h5>
          <el-button
            v-for="labelParent in label.labelParent.slice(0,5)"
            :key="labelParent.labelId"
            type="primary"
            plain
            round
            size="mini"
            style="margin: 0 5px 5px 0"
            @click="handleShowLabel(labelParent.labelId)"
          >{{ labelParent.value }}</el-button>
        </div>
        <div class="children-label-container">
          <h5>子标签</h5>
          <el-button
            v-for="labelChildren in label.labelChildren.slice(0,5)"
            :key="labelChildren.labelId"
            type="primary"
            plain
            round
            size="mini"
            style="margin: 0 5px 5px 0;"
            @click="handleShowLabel(labelChildren.labelId)"
          >{{ labelChildren.value }}</el-button>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
import { showLabel, showLabelOperateLog, showLabelRelation, followLabel, cancelFollowLabel } from '@/api/label'
import { error } from '@/utils'

export default {
  name: 'LabelIntroduce',
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      label: {
        type: '',
        name: '',
        introduce: '',
        longIntroduce: '',
        picture: '',
        follow: false,
        labelParent: [],
        labelChildren: [],
        labelLog: [],
        relation: {}
      },
      loadingLabelInfo: false,
      labelIsEmpty: false,
      showLong: false
    }
  },
  mounted() {
    this.showLabelInfo()
  },
  methods: {
    showLabelInfo() {
      const labelId = this.$route.params.labelId
      this.loadingLabelInfo = true
      showLabel(labelId).then(res => {
        this.label = res.data
        this.loadingLabelInfo = false
      }).catch(err => {
        error(err)
        this.loadingLabelInfo = false
        // todo:对接后端时打开注解
        // this.labelIsEmpty = true
        this.label = {
          labelId: 100,
          // todo:属性改为overlength
          type: 'long',
          name: 'name',
          introduce: 'introduce https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg',
          longIntroduce: 'longIntroduce',
          follow: false,
          picture: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg',
          labelParent: [
            { labelId: 1, value: '计算机' },
            { labelId: 3, value: '云计算' },
            { labelId: 4, value: '人工智能' },
            { labelId: 2, value: '数学' },
            { labelId: 5, value: '微服务' }
          ],
          labelChildren: [
            { labelId: 6, value: '计算机' },
            { labelId: 7, value: '云计算' },
            { labelId: 8, value: '人工智能' },
            { labelId: 9, value: '数学' },
            { labelId: 10, value: '微服务' }
          ]
        }
      })
    },
    showAll() {
      this.showLong = true
    },
    followLabel() {
      console.log('followLabel')
      const labelId = this.label.labelId
      followLabel(labelId).then(() => {
        this.label.follow = true
      }).catch(err => {
        error(err)
        // todo:后端对接后删除
        this.label.follow = true
      })
    },
    cancelFollowLabel() {
      console.log('cancelFollowLabel')
      const labelId = this.label.labelId
      cancelFollowLabel(labelId).then(() => {
        this.label.follow = false
      }).catch(err => {
        error(err)
        // todo:后端对接后删除
        this.label.follow = false
      })
    },
    labelOperateLog() {
      const labelId = this.label.labelId
      showLabelOperateLog(labelId).then(res => {
        this.label.labelLog = res.data
        // todo:dialog展示数据
      }).catch(err => error(err))
    },
    showLabelRelation() {
      const labelId = this.label.labelId
      showLabelRelation(labelId).then(res => {
        this.label.relation = res.data
        // todo:dialog展示数据
      }).catch(err => error(err))
    },
    handleShowLabel(labelId) {
      this.$router.push({ path: '/' + this.type + '/label/' + labelId + '/hot' })
    }
  }
}
</script>

<style lang="scss" scoped>
.label-introduce-container {
  position: relative;
  height: 232px;
  width: 740px;
  border: #c9cdd9 1px solid;
  background-color: #ffffff;
  overflow: hidden;
  .label-introduce-container-able {
    height: 230px;
  }
  .mid-info-container {
    display: inline-block;
    position: relative;
    top: -105px;
    height: 210px;
    width: 300px;
    .show-all-btn {
      padding: 0;
    }
    h2 {
      margin: 0;
    }
    .foot-menu-container {
      position: absolute;
      bottom: 0;
    }
  }
  .right-label-relative-container {
    position: absolute;
    top: 17px;
    right: 10px;
    height: 210px;
    .label-relation-btn {
      position: absolute;
      top: -10px;
      right: 5px;
      padding: 0;
    }
    h5{
      margin: 0 0 5px 0;
    }
    .parent-label-container {
      width: 190px;
      height: 85px;
      margin-bottom: 5px;
      overflow: hidden;
    }
    .children-label-container {
      width: 190px;
      height: 120px;
      overflow: hidden;
    }
  }
}
</style>
