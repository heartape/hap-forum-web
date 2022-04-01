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
      menu: [
        { index: '1', path: '/article/recommend', name: '推荐' },
        { index: '2', path: '/article/hot', name: '热点' },
        { index: '3', path: '/article/follow', name: '关注' }
      ]
    }
  },
  methods: {
    searchArticle(keyword) {
      this.$router.push({ path: '/article/search', query: { keyword }})
    },
    /**
     * 这里不使用menu->path来拼接url请求后端，为了接口请求更清楚，牺牲代码量和灵活性
     */
    chooseArticleType(path, pageNum, pageSize) {
      if (path.endsWith('recommend')) {
        return articleRecommend(pageNum, pageSize)
      } else if (path.endsWith('hot')) {
        return articleHot(pageNum, pageSize)
      } else if (path.endsWith('follow')) {
        return articleFollow(pageNum, pageSize)
      }
    },
    getArticle(pageNum, pageSize, callback) {
      const path = this.$route.path
      this.chooseArticleType(path, pageNum, pageSize).then(res => {
        callback(res.data)
      }).catch(res => error(res))
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
