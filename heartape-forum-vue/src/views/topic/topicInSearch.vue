<template>
  <!-- todo:后期删除该模块，创建综合搜索模块 -->
  <div class="topic-in-search">
    <head-menu resource-name="话题" title="话题 . 表达" slogan="千万话题，畅所欲言" :before-keyword="keyword" @searchResource="goSearch" />
    <topic-list :topic-hot="topicHot" />
  </div>
</template>

<script>
import HeadMenu from '@/views/components/HeadMenu'
import TopicList from '@/views/topic/topicList'
import { searchArticle } from '@/api/article'
import { error } from '@/utils'

export default {
  name: 'ArticleInLabel',
  components: {
    HeadMenu,
    TopicList
  },
  data() {
    return {
      type: {
        name: '话题 ',
        path: 'topic'
      },
      keyword: ''
    }
  },
  created() {
    this.keyword = this.$route.query.keyword
  },
  methods: {
    goSearch(keyword) {
      const path = this.$route.path
      if (path !== '/topic/search') {
        this.$router.push({ path: '/topic/search', query: { keyword }})
      } else {
        // 解决只改变query参数时,不触发生命周期钩子的问题,直接调用子组件初始化方法
        this.$refs.SearchArticle.init()
      }
    },
    searchArticle(page, callback) {
      const keyword = this.keyword
      searchArticle(keyword, page).then(res => {
        callback(res.data)
      }).catch(res => {
        error(res)
        // todo:对接后删除
        callback({
          current: 2,
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
