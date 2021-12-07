<template>
  <div class="editor-content" v-html="content" />
</template>

<script>
import { articleDetail } from '@/api/article'

export default {
  name: 'ArticleDetail',
  data() {
    return {
      aid: 0,
      content:
        `<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1>`
    }
  },
  created() {
    this.aid = this.$route.params.aid
    articleDetail(this.aid).then(res => {
      alert('发布成功')
    }).catch(() => {
      alert('发布失败')
    })
  },
  methods: {
    articleDetailLoad() {

    }
  }
}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>
