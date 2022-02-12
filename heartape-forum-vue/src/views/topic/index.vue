<template>
  <div class="topic-container">
    <head-menu resource-name="话题" title="话题 . 表达" slogan="千万话题，畅所欲言" @searchResource="searchTopic" />
    <resource-tabs :menu="menu" />
    <topic-list @getTopic="getTopic" />
  </div>
</template>

<script>
import ResourceTabs from '@/views/components/ResourceTabs'
import HeadMenu from '@/views/components/HeadMenu'
import TopicList from '@/views/topic/topicList'
import { topicFollow, topicHot, topicRecommend } from '@/api/topic'
import { error } from '@/utils'

export default {
  components: {
    HeadMenu,
    ResourceTabs,
    TopicList
  },
  data() {
    return {
      menu: [
        { index: '1', path: '/topic/recommend', name: '推荐' },
        { index: '2', path: '/topic/hot', name: '热点' },
        { index: '3', path: '/topic/follow', name: '关注' }
      ]
    }
  },
  methods: {
    chooseTopicType(path, page) {
      if (path.endsWith('recommend')) {
        return topicRecommend(page)
      } else if (path.endsWith('hot')) {
        return topicHot(page)
      } else if (path.endsWith('follow')) {
        return topicFollow(page)
      }
    },
    getTopic(page, callback) {
      const path = this.$route.path
      this.chooseTopicType(path, page).then(res => {
        callback(res.data)
      }).catch(res => {
        error(res)
        // todo:对接后删除
        callback({
          current: 2,
          pages: 10,
          list: [
            { tid: 1, title: 'title', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', nickname: '灰太狼', profile: '羊村死敌', cover: false, coverUrl: '', description: 'description description description description description description description description description description description', hot: 256, publishTime: '2021-11-22' },
            { tid: 2, title: 'title', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', nickname: '灰太狼', profile: '羊村死敌', cover: true, coverUrl: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', description: 'description', hot: 256, publishTime: '2021-11-22' },
            { tid: 3, title: 'title', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', nickname: '灰太狼', profile: '羊村死敌', cover: false, coverUrl: '', description: 'description', hot: 256, publishTime: '2021-11-22' },
            { tid: 4, title: 'title', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', nickname: '灰太狼', profile: '羊村死敌', cover: false, coverUrl: '', description: 'description', hot: 256, publishTime: '2021-11-22' },
            { tid: 5, title: 'title', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', nickname: '灰太狼', profile: '羊村死敌', cover: false, coverUrl: '', description: 'description', hot: 256, publishTime: '2021-11-22' }
          ]
        })
      })
    },
    searchTopic(keyword) {
      this.$router.push({ path: '/topic/search', query: { keyword }})
    }
  }
}
</script>

<style lang="scss" scoped>
.topic-container {
  padding: 10px;
}
</style>
