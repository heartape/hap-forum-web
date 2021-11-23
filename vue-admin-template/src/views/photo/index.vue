<template>
  <div class="photo-container">
    文章
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Photo'
}
</script>

<style lang="scss" scoped>
.photo {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
