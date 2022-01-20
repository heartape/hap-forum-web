<template>
  <div class="article-in-label-container">
    <label-introduce />
    <article-list :article-hot="articleHot" />
  </div>
</template>

<script>
import LabelIntroduce from '@/views/components/LabelIntroduce'
import ArticleList from '@/views/article/articleList'
import { articleLabelHot } from '@/api/article'

export default {
  name: 'ArticleInLabel',
  components: {
    LabelIntroduce,
    ArticleList
  },
  data() {
    return {
      articleHot: []
    }
  },
  created() {
    const labelId = this.$route.params.labelId
    articleLabelHot(labelId).then(res => {
      this.articleHot = res.data
    }).catch(() => {
      this.articleHot = [
        { aid: 1, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'picture', url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png' },
        { aid: 2, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'picture', url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png' },
        { aid: 3, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'picture', url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png' },
        { aid: 4, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'text', url: null },
        { aid: 5, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'text', url: null },
        { aid: 6, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'text', url: null },
        { aid: 7, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'text', url: null },
        { aid: 8, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'text', url: null },
        { aid: 9, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'text', url: null },
        { aid: 10, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'text', url: null },
        { aid: 11, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'text', url: null },
        { aid: 12, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'text', url: null },
        { aid: 13, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'text', url: null },
        { aid: 14, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'text', url: null },
        { aid: 15, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'text', url: null },
        { aid: 16, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'text', url: null }
      ]
    })
  }
}
</script>

<style scoped>

</style>
