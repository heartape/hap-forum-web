<template>
  <!-- 富文本 -->
  <div class="article-publish-container">
    <div>
      <tinymce v-model="content" :height="600" />
    </div>
    <div class="editor-content" v-html="content" />
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'

export default {
  name: 'ArticleDetail',
  components: { Tinymce },
  data() {
    return {
      content: `<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1>`
    }
  }
}
</script>

<style scoped>
.article-publish-container {
  width: 770px;
  margin: 20px auto;
  /*border: #2b2f3a solid 1px;*/
}
.editor-content{
  margin-top: 20px;
}
</style>
