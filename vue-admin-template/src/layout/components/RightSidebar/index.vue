<template>
  <div class="rightSidebar">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="250"
        highlight-current-row="true"
      />
    </el-table>
    <calendar-app />
  </div>
</template>

<script>
import CalendarApp from '@/layout/components/RightSidebar/CalendarApp'

export default {
  components: { CalendarApp },
  data() {
    return {
      tableData: [{
        date: '2016-05-022016-05-022016-05-022016-05-02'
      }, {
        date: '2016-05-04'
      }, {
        date: '2016-05-01'
      }, {
        date: '2016-05-03'
      }]
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
