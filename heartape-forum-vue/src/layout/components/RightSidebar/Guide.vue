<template>
  <div class="guide-container">
    <el-table class="right-sidebar-guide-container" :data="guide" style="width: 100%" cell-class-name="guide" @row-click="rowClick">
      <el-table-column
        type="index"
        width="40"
      />
      <el-table-column
        prop="title"
        label="导航"
        width="230"
        highlight-current-row="true"
      />
    </el-table>
  </div>
</template>

<script>
import { guideHot } from '@/api/guide'
import { error } from '@/utils'

export default {
  name: 'Guide',
  data() {
    return {
      guide: []
    }
  },
  mounted() {
    this.guideInfo()
  },
  methods: {
    rowClick(column) {
      window.open(column.path)
    },
    guideInfo() {
      const pageNum = 1
      const pageSize = 10
      guideHot(pageNum, pageSize).then(res => {
        this.guide = res.data
      }).catch(err => {
        error(err)
        this.guide = [{
          title: 'file',
          path: 'https://file.heartape.com'
        }, {
          title: 'ppt',
          path: 'https://ppt.heartape.com'
        }]
      })
    }
  }
}
</script>

<style scoped>
/*单元格内属性*/
.guide {
  padding: 8px 0 !important;
}
.guide .cell {
  height: 16px;
  font-size: 12px;
  line-height: 16px;
}
</style>
