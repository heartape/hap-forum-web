<template>
  <div class="topic-container">
    <label-bar type="topic" />
    <topic-list :topic-hot="topicHot" />
  </div>
</template>

<script>
import LabelBar from '@/views/components/LabelBar'
import TopicList from '@/views/topic/topicList'
import { topicHot } from '@/api/topic'

export default {
  components: {
    LabelBar,
    TopicList
  },
  data() {
    return {
      topicHot: []
    }
  },
  created() {
    topicHot().then(res => {
      this.topicHot = res.data
    }).catch(() => {
      this.topicHot = [
        { tid: 1, title: 'title', nickname: '灰太狼', profile: '羊村死敌', cover: false, url: '', description: 'description description description description description description description description description description description', hot: 256, publishTime: '2021-11-22' },
        { tid: 2, title: 'title', nickname: '灰太狼', profile: '羊村死敌', cover: true, url: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', description: 'description', hot: 256, publishTime: '2021-11-22' },
        { tid: 3, title: 'title', nickname: '灰太狼', profile: '羊村死敌', cover: false, url: '', description: 'description', hot: 256, publishTime: '2021-11-22' },
        { tid: 4, title: 'title', nickname: '灰太狼', profile: '羊村死敌', cover: false, url: '', description: 'description', hot: 256, publishTime: '2021-11-22' },
        { tid: 5, title: 'title', nickname: '灰太狼', profile: '羊村死敌', cover: false, url: '', description: 'description', hot: 256, publishTime: '2021-11-22' }
      ]
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
