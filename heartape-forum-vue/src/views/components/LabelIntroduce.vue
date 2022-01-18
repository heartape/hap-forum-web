<template>
  <div class="label-introduce-container">
    <el-empty v-if="labelIsEmpty" description="暂无数据" style="padding: 0" />
    <div v-else>
      <el-image
        :src="label.picture"
        :alt="label.name"
        style="float: left;width: 210px; height: 210px; margin: 10px"
        fit="cover"
      />
      <div class="right-info-container">
        <h2>{{ label.name }}</h2>
        <span>
          {{ label.introduce }}
          <div v-if="label.type === 'long'">
            ...<el-button type="text" class="show-all-btn" @click="showAll">查看全部</el-button>
            <el-dialog
              :title="label.name"
              :visible.sync="showLong"
              width="30%"
            >
              <span>{{ label.longIntroduce }}</span>
            </el-dialog>
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { showLabel } from '@/api/label'

export default {
  name: 'LabelIntroduce',
  data() {
    return {
      label: {
        labelId: 0,
        type: '',
        name: '',
        introduce: '',
        longIntroduce: '',
        picture: ''
      },
      labelIsEmpty: false,
      showLong: false
    }
  },
  mounted: function() {
    const labelId = this.$route.params.labelId
    showLabel(labelId).then(res => {
      this.label = res.data
    }).catch(() => {
      this.error()
      // todo:对接后端时打开注解
      // this.labelIsEmpty = true
      this.label = {
        labelId: 0,
        type: 'long',
        name: 'name',
        introduce: 'introduce',
        longIntroduce: 'longIntroduce',
        picture: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg'
      }
    })
  },
  methods: {
    error() {
      this.$notify.error({
        title: '请求失败',
        message: '请检查网络或联系管理员'
      })
    },
    showAll() {
      this.showLong = true
    }
  }
}
</script>

<style lang="scss" scoped>
.label-introduce-container {
  height: 230px;
  width: 740px;
  margin: 10px;
  background-color: #d5d5d5;
  overflow: hidden;
  .right-info-container {
    float: left;
  }
}
</style>
