<template>
  <div class="article-detail-container">
    <div class="editor-content" v-html="article.title" />
    <div class="editor-content" v-html="article.content" />
  </div>
</template>

<script>
import { articleDetail } from '@/api/article'

export default {
  name: 'ArticleDetail',
  data() {
    return {
      article: {
        title: `<h1 style="text-align: center;">this is title!</h1>`,
        content: `<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1>`
      }

    }
  },
  created() {
    // const aid = this.$route.params.aid
    // this.articleDetailLoad(aid)
  },
  methods: {
    articleDetailLoad(aid) {
      articleDetail(aid).then(res => {
        const data = res.data.data
        console.log(data)
      }).catch(() => {
        alert('获取失败')
      })
    }
  }
}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>
