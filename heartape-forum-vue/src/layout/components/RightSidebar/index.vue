<template>
  <div class="rightSidebar">
    <produce-center />
    <guide />
    <calendar-app />
  </div>
</template>

<script>
import CalendarApp from '@/layout/components/RightSidebar/CalendarApp'
import ProduceCenter from '@/layout/components/RightSidebar/ProduceCenter'
import Guide from '@/layout/components/RightSidebar/Guide'

export default {
  components: { Guide, ProduceCenter, CalendarApp }
}
</script>

<style>
  .rightSidebar {
    float: right;
    width: 270px;
  }
</style>
