<template>
  <div class="topic-in-label-container">
    <label-introduce />
    <topic-list :topic-hot="topicHot" />
  </div>
</template>

<script>
import LabelIntroduce from '@/views/components/LabelIntroduce'
import TopicList from '@/views/topic/topicList'
import { topicLabelHot } from '@/api/topic'

export default {
  name: 'Topic',
  components: {
    TopicList,
    LabelIntroduce
  },
  data() {
    return {
      topicHot: []
    }
  },
  created() {
    const labelId = this.$route.params.labelId
    topicLabelHot(labelId).then(res => {
      this.topicHot = res.data
    }).catch(() => {
      this.topicHot = [
        { tid: 1, title: 'title', description: 'description', like: 256, publishTime: '2021-11-22' },
        { tid: 2, title: 'title', description: 'description', like: 256, publishTime: '2021-11-22' },
        { tid: 3, title: 'title', description: 'description', like: 256, publishTime: '2021-11-22' },
        { tid: 4, title: 'title', description: 'description', like: 256, publishTime: '2021-11-22' },
        { tid: 5, title: 'title', description: 'description', like: 256, publishTime: '2021-11-22' }
      ]
    })
  }
}
</script>

<style scoped>

</style>
