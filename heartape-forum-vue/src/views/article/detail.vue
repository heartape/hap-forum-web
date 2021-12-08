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
    this.articleDetailLoad()
  },
  methods: {
    articleDetailLoad() {
      articleDetail(this.aid).then(res => {
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
