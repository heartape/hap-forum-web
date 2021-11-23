<template>
  <div class="news-container">
    新闻，敬请期待
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'News'
}
</script>

<style lang="scss" scoped>
.news {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
