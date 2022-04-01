<template>
  <div class="article-detail-container">
    <el-row class="article-label-container">
      <el-button v-for="labelItem in article.label" :key="labelItem.labelId" class="article-label-item" type="primary" plain round size="mini" @click="toLabelArticle(labelItem.labelId)">{{ labelItem.name }}</el-button>
    </el-row>
    <div class="editor-title" v-html="article.title" />
    <div class="creator-container">
      <span>
        <el-image
          :src="article.avatar"
          :alt="article.nickname"
          style="float: left; margin-right: 10px; width: 40px; height: 40px;"
          fit="cover"
        />
        <span class="username-profile-container">
          <el-button class="username" type="text" @click="showCreator(article.uid)">{{ article.nickname }}</el-button>
          <span class="profile">{{ article.profile }}</span>
        </span>
      </span>
    </div>
    <div class="editor-content" v-html="article.content" />
    <div class="publish-time">发布于: {{ article.createdTime }}</div>
    <article-menu
      :like="article.like"
      :dislike="article.dislike"
      @likeArticle="likeArticle"
      @disLikeArticle="disLikeArticle"
    />
    <comment
      ref="comment"
      :comment="article.comment"
      :show="true"
      @handCommentDetailPage="handCommentDetailPage"
      @handCommentPage="handCommentPage"
      @handPublishParent="handPublishParent"
      @handlePublishChildrenToParent="handlePublishChildrenToParent"
      @handlePublishChildrenToChildren="handlePublishChildrenToChildren"
      @handLikeComment="handLikeComment"
      @handDisLikeComment="handDisLikeComment"
      @removeComment="removeComment"
      @removeCommentChild="removeCommentChild"
    />
  </div>
</template>

<script>
import {
  articleDetail,
  dislikeArticle,
  likeArticle,
  showComment,
  publishParent,
  loadChildren,
  disLikeComment,
  likeComment,
  likeCommentChild,
  disLikeCommentChild,
  publishChild,
  publishChildToChild,
  removeArticleComment,
  removeArticleCommentChild
} from '@/api/article'
import Comment from '@/views/components/Comment'
import ArticleMenu from '@/views/article/ArticleMenu'
import { error } from '@/utils'

export default {
  name: 'ArticleDetail',
  components: { ArticleMenu, Comment },
  data() {
    return {
      article: {}
    }
  },
  mounted() {
    const articleId = this.$route.params.articleId
    this.articleDetail(articleId)
  },
  methods: {
    toLabelArticle(labelId) {
      // 跳转目标label的article列表
      this.$router.push({ path: '/article/label/' + labelId + '/recommend' })
    },
    articleDetail(articleId) {
      articleDetail(articleId).then(res => {
        this.article = res.data
      }).catch(err => error(err))
    },
    handPublishParent(content) {
      const articleId = this.article.articleId
      const data = {
        articleId: articleId,
        content: content
      }
      publishParent(data).then(() => {
        this.$refs.comment.handCommentPage()
      }).catch(err => error(err))
    },
    handCommentPage(pageNum, pageSize, callback) {
      const articleId = this.$route.params.articleId
      showComment(articleId, pageNum, pageSize).then(res => {
        callback(res.data)
      }).catch(err => error(err))
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
    handLikeCommentChild(comment) {
      // 评论点赞加一,后台对比是否有点赞记录
      likeCommentChild(comment.commentId).then(() => {
        comment.like++
      }).catch(err => error(err))
    },
    handDisLikeCommentChild(comment) {
      // 评论踩加一,后台对比是否有踩记录
      disLikeCommentChild(comment.commentId).then(() => {
        comment.dislike++
      }).catch(err => error(err))
    },
    handlePublishChildrenToParent(parentId, content) {
      const articleId = this.$route.params.articleId
      const data = {
        articleId: articleId,
        parentId: parentId,
        content: content
      }
      publishChild(data).then(() => {
        this.$refs.comment.handCommentPage()
      }).catch(err => error(err))
    },
    handlePublishChildrenToChildren(parentId, childTarget, content, callback) {
      const articleId = this.$route.params.articleId
      const data = {
        articleId: articleId,
        parentId: parentId,
        childTarget: childTarget,
        content: content
      }
      publishChildToChild(data).then(() => {
        this.$refs.comment.handCommentPage()
        callback()
      }).catch(err => error(err))
    },
    // 评论详细页面分页
    handCommentDetailPage(commentId, pageNum, pageSize, callback) {
      loadChildren(commentId, pageNum, pageSize).then(res => {
        callback(res.data)
      }).catch(err => error(err))
    },
    removeComment(commentId) {
      removeArticleComment(commentId).then(() => {
        this.$refs.comment.handCommentPage()
      })
    },
    removeCommentChild(commentId, callback) {
      removeArticleCommentChild(commentId).then(() => {
        this.$refs.comment.handCommentPage()
        callback()
      })
    },
    // 用户主页
    showCreator(creatorId) {
      console.log(creatorId)
    }
  }
}
</script>

<style lang="scss" scoped>
.article-detail-container {
  padding: 20px;
  .article-label-container {
    //margin-bottom: 20px;
  }
  .editor-title {
    padding: 20px 0;
    font-size: 16px;
    font-weight: bold;
  }
  .creator-container {
    .username-profile-container {
      .username {
        font-size: 16px;
        line-height: 16px;
      }
      .profile {
        margin-left: 20px;
        font-size: 14px;
        line-height: 8px;
      }
    }
  }
  .editor-content{
    margin-top: 10px;
    line-height: 26px;
    font-size: 14px;
  }
  .publish-time {
    margin: 20px 0;
    color: #74787f;
  }
}
</style>
