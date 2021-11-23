<template>
  <div class="topic-container">
    文章
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Topic'
}
</script>

<style lang="scss" scoped>
.topic {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
