<template>
  <div class="article-detail-container">
    <el-row class="article-label-container">
      <el-button v-for="labelItem in article.label" :key="labelItem.labelId" class="article-label-item" type="primary" plain round size="mini" @click="toLabelArticle(labelItem.labelId)">{{ labelItem.name }}</el-button>
    </el-row>
    <div class="editor-content" v-html="article.title" />
    <div class="creator-container">
      <span>
        <el-image
          :src="article.avatar"
          :alt="article.nickname"
          style="width: 40px; height: 40px;"
          fit="cover"
        />
        <span style="position: relative; bottom: 15px; left: 10px">
          {{ article.nickname }}
          <span style="margin-left: 20px; font-size: 14px">{{ article.profile }}</span>
        </span>
      </span>
    </div>
    <div class="editor-content" v-html="article.content" />
    <div class="publish-time">发布于: {{ article.publishTime }}</div>
    <article-menu
      :like="article.like"
      :dislike="article.dislike"
      @likeArticle="likeArticle"
      @disLikeArticle="disLikeArticle"
    />
    <comment
      :comment="article.comment"
      :show="true"
      @handCommentDetailPage="handCommentDetailPage"
      @handCommentPage="handCommentPage"
      @handPublishParent="handPublishParent"
      @handlePublishChildrenToParent="handlePublishChildrenToParent"
      @handlePublishChildrenToChildren="handlePublishChildrenToChildren"
      @handLikeComment="handLikeComment"
      @handDisLikeComment="handDisLikeComment"
    />
  </div>
</template>

<script>
import { articleDetail, dislikeArticle, likeArticle, showComment, publishParent, loadChildren, disLikeComment, likeComment } from '@/api/article'
import Comment from '@/views/components/Comment'
import ArticleMenu from '@/views/article/ArticleMenu'
import { error } from '@/utils'

export default {
  name: 'ArticleDetail',
  components: { ArticleMenu, Comment },
  data() {
    return {
      article: {
        articleId: 1, like: 100, dislike: 100, publishTime: '2021-12-11 19:10',
        title: `<h1 style="text-align: center;">this is title!</h1>`,
        content: `<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1>`,
        uid: 1, nickname: '灰太狼', profile: '羊村死敌', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg',
        label: [
          { labelId: 1, name: '编程' },
          { labelId: 2, name: '计算机' }
        ]
      }
    }
  },
  mounted() {
    const articleId = this.$route.params.aid
    this.articleDetail(articleId)
  },
  methods: {
    toLabelArticle(labelId) {
      // 跳转目标label的article列表
      this.$router.push({ path: '/article/label/' + labelId + '/recommend' })
    },
    success(message) {
      this.$notify.success({
        title: '成功',
        message: message
      })
    },
    articleDetail(articleId) {
      articleDetail(articleId).then(res => {
        this.article = res.data
      }).catch(err => error(err))
    },
    handPublishParent(publishParentContent) {
      const articleId = this.article.articleId
      publishParent(articleId, publishParentContent).then(() => {
        this.articleDetail(articleId)
      }).catch(err => error(err))
    },
    handCommentPage(pageNum, pageSize, callback) {
      const articleId = this.article.articleId
      showComment(articleId, pageNum, pageSize).then(res => {
        callback(res.data)
      }).catch(err => {
        error(err)
        const comment = {
          allComment: 26,
          total: 2, pageNum: 1, pageSize: 10, pages: 1,
          list: [
            { commentId: 1, uid: 1, nickname: '灰太狼', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: '万剑归宗', like: 100, dislike: 100, publishTime: '2021-12-11 19:10',
              simpleChildren: {
                total: 12,
                list: [
                  { commentId: 2, uid: 1, nickname: '灰太狼', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: '万剑归宗', like: 100, dislike: 100, publishTime: '2021-12-11 19:10' },
                  { commentId: 5, uid: 1, nickname: '灰太狼', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: 'comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10' }
                ]
              }
            },
            { commentId: 3, uid: 1, nickname: '灰太狼', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: 'comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10',
              simpleChildren: {
                total: 12,
                list: [
                  { commentId: 6, uid: 1, nickname: '灰太狼', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: '万剑归宗', like: 100, dislike: 100, publishTime: '2021-12-11 19:10' },
                  { commentId: 4, uid: 1, nickname: '灰太狼', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', target: `@<a ref="https://www.baidu.com">百度</a>: `, content: 'comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10' }
                ]
              }
            }
          ]
        }
        callback(comment)
      })
    },
    likeArticle() {
      likeArticle().then(() => {
        this.article.like++
      }).catch(err => error(err))
    },
    disLikeArticle() {
      dislikeArticle().then(() => {
        this.article.dislike++
      }).catch(err => error(err))
    },
    handLikeComment(comment) {
      // 评论点赞加一,后台对比是否有点赞记录
      likeComment(comment.commentId).then(() => {
        comment.like++
      }).catch(err => error(err))
    },
    handDisLikeComment(comment) {
      // 评论踩加一,后台对比是否有踩记录
      disLikeComment(comment.commentId).then(() => {
        comment.dislike++
      }).catch(err => error(err))
    },
    handlePublishChildrenToParent(commentId, publishContent) {
      console.log(publishContent)
    },
    handlePublishChildrenToChildren(commentId, publishContent) {
      console.log(publishContent)
    },
    // 评论详细页面分页
    handCommentDetailPage(commentId, pageNum, pageSize, callback) {
      loadChildren(commentId, pageNum, pageSize).then(res => {
        callback(res.data)
      }).catch(err => {
        error(err)
        // todo:前后端对接后删除
        const children = {
          total: 14, pageNum: 1, pageSize: 10, pages: 2,
          list: [
            { commentId: 1, uid: 1, nickname: '灰太狼1', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: 'comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10' },
            { commentId: 2, uid: 1, nickname: '灰太狼2', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: 'comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10' },
            { commentId: 3, uid: 1, nickname: '灰太狼3', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: 'comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10' },
            { commentId: 4, uid: 1, nickname: '灰太狼4', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: 'comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10' },
            { commentId: 5, uid: 1, nickname: '灰太狼5', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: 'comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10' }
          ]
        }
        callback(children)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.article-detail-container {
  padding: 20px;
  .article-label-container {
    margin-bottom: 20px;
  }
  .editor-content{
    margin-top: 20px;
  }
  .publish-time {
    margin: 20px 0;
    color: #74787f;
  }
}
</style>
