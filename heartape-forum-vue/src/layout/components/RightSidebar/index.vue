<template>
  <div class="rightSidebar">
    <produce-center />
    <el-table class="right-sidebar-guide-container" :data="guide" style="width: 100%" :cell-class-name="guideCell" @row-click="rowClick">
      <el-table-column
        prop="title"
        label="导航"
        width="270"
        highlight-current-row="true"
      />
    </el-table>
    <calendar-app />
    <!--  todo:标签列表  -->
  </div>
</template>

<script>
import CalendarApp from '@/layout/components/RightSidebar/CalendarApp'
import { getHot } from '@/api/hot'
import ProduceCenter from '@/layout/components/RightSidebar/ProduceCenter'

export default {
  components: { ProduceCenter, CalendarApp },
  data() {
    return {
      guide: []
    }
  },
  mounted() {
    this.guideInfo().then(guide => {
      this.guide = guide
    })
  },
  methods: {
    rowClick(column) {
      if (column.source === 'in') {
        const path = column.path
        this.$router.push({ path: path })
      } else {
        window.open(column.path)
      }
    },
    guideInfo() {
      this.loading = true
      return new Promise((resolve, reject) => {
        getHot().then(response => {
          const { data } = response.data
          resolve(data.hot)
          this.loading = false
        }).catch(error => {
          // todo:右边栏目数据,source:来源(out,in)
          const guide = [{
            title: '美军入侵阿富汗',
            source: 'out',
            path: 'https://www.baidu.com'
          }, {
            title: '美军撤离阿富汗',
            source: 'in',
            // 此时的url就是文章id
            path: '/article/1'
          }]
          resolve(guide)
          reject(error)
          this.loading = false
        })
      })
    },
    guideCell() {
      return 'guide'
    }
  }
}
</script>

<style>
  .rightSidebar {
    float: right;
    width: 270px;
  }

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
