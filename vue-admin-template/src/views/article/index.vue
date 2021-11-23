<template>
  <div class="article-container">
    文章
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Article'
}
</script>

<style lang="scss" scoped>
.article {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
