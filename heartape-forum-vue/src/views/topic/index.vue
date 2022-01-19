<template>
  <div class="topic-container">
    <label-bar type="topic" />
    <topic-list :topic-hot="topicHot" />
  </div>
</template>

<script>
import LabelBar from '@/views/components/LabelBar'
import TopicList from '@/views/topic/topicList'

export default {
  components: {
    LabelBar,
    TopicList
  },
  data() {
    return {
      // name不要大于6个字，否则会溢出按钮
      // 最多11个sort，多的会被隐藏
      topicSortHot: [
        { sortId: 1, name: '编程' },
        { sortId: 2, name: '编程' },
        { sortId: 3, name: '编程' },
        { sortId: 4, name: '编程' },
        { sortId: 5, name: '编程' },
        { sortId: 6, name: '编程' },
        { sortId: 7, name: '编程' },
        { sortId: 8, name: '编程' },
        { sortId: 9, name: '编程' },
        { sortId: 10, name: '编程' },
        { sortId: 11, name: '编程' }
      ],
      topicHot: [
        { tid: 1, title: 'title', description: 'description', like: 256, publishTime: '2021-11-22' },
        { tid: 2, title: 'title', description: 'description', like: 256, publishTime: '2021-11-22' },
        { tid: 3, title: 'title', description: 'description', like: 256, publishTime: '2021-11-22' },
        { tid: 4, title: 'title', description: 'description', like: 256, publishTime: '2021-11-22' },
        { tid: 5, title: 'title', description: 'description', like: 256, publishTime: '2021-11-22' }
      ]
    }
  },
  created() {
    // todo:请求topicSortHot,topicHot
  }
}
</script>

<style lang="scss" scoped>

</style>
