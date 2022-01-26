<template>
  <div class="article-container">
    <head-menu resource-name="文章" title="文库 . 发现" slogan="随心写作，自由表达" @searchResource="searchArticle" />
    <resource-tabs :menu="menu" />
    <article-list @getArticle="getArticle" />
  </div>
</template>

<script>
import ResourceTabs from '@/views/components/ResourceTabs'
import HeadMenu from '@/views/components/HeadMenu'
import ArticleList from '@/views/article/articleList'
import { articleFollow, articleHot, articleRecommend } from '@/api/article'
import { error } from '@/utils'

export default {
  components: {
    HeadMenu,
    ResourceTabs,
    ArticleList
  },
  data() {
    return {
      labelId: 0,
      menu: [
        { index: '1', path: '/article/recommend', name: '推荐' },
        { index: '2', path: '/article/hot', name: '热点' },
        { index: '3', path: '/article/follow', name: '关注' }
      ],
      article: {}
    }
  },
  created() {
    this.article.current = 0
  },
  methods: {
    searchArticle(keyword) {
      this.$router.push({ path: '/article/search', query: { keyword }})
    },
    chooseArticleType(path, page) {
      const labelId = this.labelId
      if (path.endsWith('recommend')) {
        return articleRecommend(labelId, page)
      } else if (path.endsWith('hot')) {
        return articleHot(labelId, page)
      } else if (path.endsWith('follow')) {
        return articleFollow(labelId, page)
      }
    },
    getArticle(path, page, callback) {
      this.chooseArticleType(path, page).then(res => {
        callback(res.data)
      }).catch(res => {
        error(res)
        // todo:对接后删除
        callback({
          current: 1,
          list: [
            { articleId: 1, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'picture', url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png' },
            { articleId: 2, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'picture', url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png' },
            { articleId: 3, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'picture', url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png' },
            { articleId: 4, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'text', url: null },
            { articleId: 5, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'text', url: null },
            { articleId: 6, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'text', url: null },
            { articleId: 7, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'text', url: null },
            { articleId: 8, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'text', url: null },
            { articleId: 9, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'text', url: null },
            { articleId: 10, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'text', url: null },
            { articleId: 11, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'text', url: null }
          ]
        })
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
