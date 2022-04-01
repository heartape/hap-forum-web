<template>
  <div class="content-manage-container">
    <resource-tabs :menu="menu" />
    <content-list />
  </div>
</template>

<script>
import ResourceTabs from '@/views/components/ResourceTabs'
import ContentList from '@/views/personalCenter/ContentList'
export default {
  name: 'ContentManage',
  components: { ContentList, ResourceTabs },
  data() {
    return {
      menu: [
        { index: '1', path: '/personal-center/manage/content/all', name: '全部' },
        { index: '2', path: '/personal-center/manage/content/article', name: '文章' },
        { index: '3', path: '/personal-center/manage/content/topic', name: '话题' },
        { index: '4', path: '/personal-center/manage/content/discuss', name: '讨论' }
      ]
    }
  }
}
</script>

<style scoped>

</style>
