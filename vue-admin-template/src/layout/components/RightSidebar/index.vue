<template>
  <div class="rightSidebar">
    <el-table :data="hot" style="width: 100%" @row-click="rowClick">
      <el-table-column
        prop="date"
        label="日期"
        width="250"
        highlight-current-row="true"
        fit="false"
      />
    </el-table>
    <calendar-app />
  </div>
</template>

<script>
import CalendarApp from '@/layout/components/RightSidebar/CalendarApp'
import { getHot } from '@/api/hot'

export default {
  components: { CalendarApp },
  data() {
    return {
      hot: []
    }
  },
  mounted() {
    this.getHot().then(hot => {
      console.log(hot)
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
            date: '2016-05-022016-05-022016-05-022016-05-02',
            source: 'out',
            // 外部来源只有网址
            type: 'website',
            param: 'https://www.baidu.com'
          }, {
            date: '2016-05-04',
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
    }
  }
}
</script>

<style>
  .rightSidebar {
    float: right;
    width: 270px;
    background-color: #409EFF;
  }
</style>
