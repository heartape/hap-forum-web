<template>
  <!-- todo:后期删除该模块，创建综合搜索模块 -->
  <div class="topic-in-search">
    <head-menu resource-name="话题" title="话题 . 表达" slogan="千万话题，畅所欲言" :before-keyword="keyword" @searchResource="goSearch" />
    <topic-list ref="SearchTopic" @getTopic="SearchTopic" />
  </div>
</template>

<script>
import HeadMenu from '@/views/components/HeadMenu'
import TopicList from '@/views/topic/topicList'
import { SearchTopic } from '@/api/topic'
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
    SearchTopic(page, callback) {
      const keyword = this.keyword
      SearchTopic(keyword, page).then(res => {
        callback(res.data)
      }).catch(res => {
        error(res)
        // todo:对接后删除
        callback({
          current: 2,
          list: [
            { tid: 1, title: 'title', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', nickname: '灰太狼', profile: '羊村死敌', cover: false, coverUrl: '', description: 'description description description description description description description description description description description', hot: 256, publishTime: '2021-11-22' },
            { tid: 2, title: 'title', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', nickname: '灰太狼', profile: '羊村死敌', cover: true, coverUrl: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', description: 'description', hot: 256, publishTime: '2021-11-22' },
            { tid: 3, title: 'title', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', nickname: '灰太狼', profile: '羊村死敌', cover: false, coverUrl: '', description: 'description', hot: 256, publishTime: '2021-11-22' },
            { tid: 4, title: 'title', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', nickname: '灰太狼', profile: '羊村死敌', cover: false, coverUrl: '', description: 'description', hot: 256, publishTime: '2021-11-22' },
            { tid: 5, title: 'title', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', nickname: '灰太狼', profile: '羊村死敌', cover: false, coverUrl: '', description: 'description', hot: 256, publishTime: '2021-11-22' }
          ]
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.topic-in-search {
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
