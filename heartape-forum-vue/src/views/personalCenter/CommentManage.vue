<template>
  <div class="comment-manage-container">
    <resource-tabs :menu="menu" />
    <comment-list />
  </div>
</template>

<script>
import ResourceTabs from '@/views/components/ResourceTabs'
import CommentList from '@/views/personalCenter/CommentList'
export default {
  name: 'CommentManage',
  components: { CommentList, ResourceTabs },
  data() {
    return {
      menu: [
        { index: '1', path: '/personal-center/manage/comment/all', name: '全部' },
        { index: '2', path: '/personal-center/manage/comment/article', name: '文章' },
        { index: '3', path: '/personal-center/manage/comment/discuss', name: '讨论' }
      ]
    }
  }
}
</script>

<style scoped>

</style>
