<template>
  <div class="label-introduce-container">
    <el-empty v-if="labelIsEmpty" description="暂无数据" style="padding: 0" />
    <div v-else>
      <img :src="label.picture" :alt="label.name">
      <h2>{{ label.name }}</h2>
      <p>{{ label.introduce }}</p>
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
        name: '',
        introduce: '',
        picture: ''
      },
      labelIsEmpty: false
    }
  },
  mounted: function() {
    const labelId = this.$route.query
    showLabel(labelId).then(res => {
      this.label = res.data
    }).catch(() => {
      this.error()
      this.labelIsEmpty = true
    })
  },
  methods: {
    error() {
      this.$notify.error({
        title: '请求失败',
        message: '请检查网络或联系管理员'
      })
    }
  }
}
</script>

<style scoped>
.label-introduce-container {
  height: 230px;
  width: 740px;
  margin: 10px;
  background-color: #d5d5d5;
}
</style>
