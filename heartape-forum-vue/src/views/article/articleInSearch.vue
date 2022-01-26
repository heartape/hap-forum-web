<template>
  <!-- todo:后期删除该模块，创建综合搜索模块 -->
  <div class="article-in-search">
    <head-menu resource-name="文章" title="文库 . 发现" slogan="随心写作，自由表达" @searchResource="searchArticle" />
    <article-list @getArticle="searchArticle" />
  </div>
</template>

<script>
import ArticleList from '@/views/article/articleList'
import HeadMenu from '@/views/components/HeadMenu'
import { searchArticle } from '@/api/article'
import { error } from '@/utils'

export default {
  name: 'ArticleInLabel',
  components: {
    HeadMenu,
    ArticleList
  },
  data() {
    return {
      type: {
        name: '文章',
        path: 'article'
      },
      keyword: '',
      menu: [
        { index: '1', path: '/article/label/' + this.getLabelId() + '/recommend', name: '推荐' },
        { index: '2', path: '/article/label/' + this.getLabelId() + '/hot', name: '热点' },
        { index: '3', path: '/article/label/' + this.getLabelId() + '/follow', name: '关注' }
      ]
    }
  },
  created() {
    this.keyword = this.$route.query.keyword
    this.searchArticle()
  },
  methods: {
    getLabelId() {
      return this.$route.params.labelId
    },
    searchArticle(path, page, callback) {
      const keyword = this.keyword
      searchArticle(keyword, page).then(res => {
        callback(res.data)
      }).catch(res => {
        error(res)
        // todo:对接后删除
        return {
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
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.article-in-search {
  padding: 10px;
}
</style>
<style>
/*子组件样式*/
.label-introduce-container {
  margin-bottom: 10px;
}
.head-menu-container {
  margin-bottom: 10px;
}
</style>
