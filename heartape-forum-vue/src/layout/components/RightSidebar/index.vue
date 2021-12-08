<template>
  <div class="rightSidebar">
    <produce-center />
    <el-table class="right-sidebar-hot-container" :data="hot" style="width: 100%" :cell-class-name="hotStyle" @row-click="rowClick">
      <el-table-column
        prop="title"
        label="热点"
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
      hot: []
    }
  },
  mounted() {
    this.getHot().then(hot => {
      this.hot = hot
    })
  },
  methods: {
    rowClick(column) {
      if (column.source === 'in') {
        const type = column.type
        const param = column.param
        let url
        if (type === 'news') {
          url = '/news/detail'
        } else if (type === 'knowledge') {
          url = '/knowledge/detail'
        } else if (type === 'article') {
          url = '/article/detail'
        } else if (type === 'topic ') {
          url = '/topic/detail'
        }
        this.$router.push({ path: url, query: param })
      } else {
        window.location.href = column.param
      }
    },
    getHot() {
      this.loading = true
      return new Promise((resolve, reject) => {
        getHot().then(response => {
          const { data } = response.data
          resolve(data.hot)
          this.loading = false
        }).catch(error => {
          // todo:右边栏目数据,source:来源(out,in),type类型(news,knowledge,article,topic等)
          const hot = [{
            title: '美军入侵阿富汗',
            source: 'out',
            // 外部来源只有网址
            type: 'website',
            param: 'https://www.baidu.com'
          }, {
            title: '美军撤离阿富汗',
            source: 'in',
            type: 'article',
            // 此时的url就是文章id
            param: '123124124235'
          }]
          resolve(hot)
          reject(error)
          this.loading = false
        })
      })
    },
    hotStyle() {
      return 'hot'
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
  .hot {
    padding: 8px 0 !important;
  }
  .hot .cell {
    height: 16px;
    font-size: 12px;
    line-height: 16px;
  }

</style>
