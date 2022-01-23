<template>
  <div class="article-menu-container">
    <el-button type="primary" plain @click="likeArticle">赞同 {{ like }}</el-button>
    <el-button type="primary" plain @click="disLikeArticle">踩 {{ dislike }}</el-button>
    <el-button class="discuss-comment-count" type="primary" plain @click="showComment">{{ commentNumber }} 个评论</el-button>
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
    },
    commentNumber: {
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
    },
    showComment() {
      this.$emit('showComment')
    }
  }
}
</script>

<style lang="scss" scoped>
.article-menu-container {
  margin: 10px;
}
</style>
