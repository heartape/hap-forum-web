<template>
  <div class="article-menu-container">
    <el-button type="primary" plain size="small" @click="likeArticle">赞同 {{ like }}</el-button>
    <el-button type="primary" plain size="small" @click="disLikeArticle">踩 {{ dislike }}</el-button>
  </div>
</template>

<script>
export default {
  name: 'ArticleMenu',
  props: {
    like: {
      type: Number,
      default: 0
    },
    dislike: {
      type: Number,
      default: 0
    }
  },
  methods: {
    likeArticle() {
      this.$emit('likeArticle')
    },
    disLikeArticle() {
      this.$emit('disLikeArticle')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
