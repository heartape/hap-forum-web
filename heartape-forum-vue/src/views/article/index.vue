<template>
  <div class="article-container">
    <head-menu :type="type" />
    <resource-tabs :menu="menu" @handClassifySelect="handClassifySelect" />
    <article-list :article="article" />
  </div>
</template>

<script>
import ResourceTabs from '@/views/components/ResourceTabs'
import ArticleList from '@/views/article/articleList'
import { article } from '@/api/article'
import HeadMenu from '@/views/components/HeadMenu'
import { error } from '@/utils'

export default {
  components: {
    HeadMenu,
    ResourceTabs,
    ArticleList
  },
  data() {
    return {
      type: {
        name: '文章',
        path: 'article'
      },
      menu: [
        { index: '1', path: 'recommend', name: '推荐' },
        { index: '2', path: 'hot', name: '热点' },
        { index: '3', path: 'follow', name: '关注' }
      ],
      article: []
    }
  },
  created() {
    this.getArticle(this.menu[0].path, 1)
  },
  methods: {
    handClassifySelect(path) {
      this.getArticle(path)
    },
    getArticle(path, page) {
      article(path, page).then(res => {
        this.article = res.data
      }).catch(res => {
        error(res)
        const articles = [
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
        if (path === 'recommend') {
          this.article = articles.slice(0, 7)
        } else if (path === 'hot') {
          this.article = articles.slice(5, 7)
        } else if (path === 'follow') {
          this.article = articles.slice(2, 7)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.article-container {
  padding: 10px;
}
</style>
<style>
/*子组件样式*/
.head-menu-container {
  margin-bottom: 10px;
}
</style>
