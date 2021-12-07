<template>
  <div class="calendar-container">
    <div class="flex">
      <calendar :range="calendar.range" :lunar="calendar.lunar" :value="calendar.value" :begin="calendar.begin" :end="calendar.end" @select="calendar.select" />
    </div>
  </div>
</template>

<script>
import calendar from '@/components/Calendar'

export default {
  name: 'CalendarApp',
  components: {
    calendar
  },
  data() {
    return {
      calendar: {
        range: true,
        value: [], // 默认日期
        lunar: true, // 显示农历
        begin: [2000, 1, 1], // 可选开始日期
        end: [2100, 1, 1], // 可选结束日期
        select(begin, end) {
          console.log(begin.toString(), end.toString())
        }
      }
    }
  },
  mounted: function() {
    this.calendar.value = this.getCalendarValue()
  },
  methods: {
    getCalendarValue() {
      const today = new Date()
      const year = today.getFullYear()
      const month = today.getMonth() + 1
      const day = today.getDate()
      return [[year, month, day], [year, month, day]]
    }
  }
}
</script>

<style scoped>
.flex{
  box-sizing: border-box;

  display: -webkit-box;
  -webkit-box-pack: start;
  -webkit-box-align: start;

  display: -webkit-flex;
  -webkit-justify-content: space-between;
  /*-webkit-align-items: top;*/

  display: flex;
  justify-content: space-between;
  /*align-items: top;*/
  flex-flow:row wrap
}
.flex>div{
  width:100%;
  min-width:260px;
  border-radius: 2px;
  position: relative;
}
.flex>div>span{
  position: absolute;
  left:0;
  top:0;
  padding:2px 8px;
  font-size:7px;
  border-radius:0 0 2px 0;
  background:#ea6151;
  color:#fff;
}
</style>
