<template>
  <div class="article-detail-container">
    <div class="editor-content" v-html="article.title" />
    <div class="creator-container">
      <span>
        <el-image
          :src="article.avatar"
          :alt="article.nickname"
          style="width: 40px; height: 40px; margin: 0 20px;"
          fit="cover"
        />
        <span style="position: relative; bottom: 15px">{{ article.nickname }}</span>
      </span>
      <p style="margin: 0 20px">{{ article.profile }}</p>
    </div>
    <div class="editor-content" v-html="article.content" />
    <div class="publish-time">发布于: {{ article.publishTime }}</div>
    <article-menu
      :like="article.like"
      :dislike="article.dislike"
      :comment-number="article.comment.allComment"
      @showComment="showComment = !showComment"
      @likeArticle="likeArticle"
      @disLikeArticle="disLikeArticle"
    />
    <el-input v-model="publishParent" class="publish-parent" placeholder="请输入内容">
      <template slot="append">
        <el-button @click="handPublishParent">发布</el-button>
      </template>
    </el-input>
    <comment-menu />
    <comment :comment="article.comment" :show="showComment" @commentPage="commentPage" />
  </div>
</template>

<script>
import { articleDetail, dislikeArticle, likeArticle, showComment, publishParent } from '@/api/article'
import Comment from '@/views/components/Comment'
import CommentMenu from '@/views/components/CommentMenu'
import ArticleMenu from '@/views/article/ArticleMenu'

export default {
  name: 'ArticleDetail',
  components: { ArticleMenu, CommentMenu, Comment },
  data() {
    return {
      showComment: false,
      publishParent: '',
      article: {
        articleId: 1, like: 100, dislike: 100, publishTime: '2021-12-11 19:10',
        title: `<h1 style="text-align: center;">this is title!</h1>`,
        content: `<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1>`,
        uid: 1, nickname: '灰太狼', profile: '羊村死敌', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg',
        comment: {
          allComment: 5,
          total: 2, page: 1, size: 10,
          list: [
            { commentId: 1, uid: 1, nickname: '灰太狼', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: 'comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10',
              children: {
                total: 20, page: 1, size: 10,
                list: [
                  { commentId: 2, uid: 1, nickname: '灰太狼', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: 'comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10' },
                  { commentId: 5, uid: 1, nickname: '灰太狼', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: 'comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10' }
                ]
              }
            },
            { commentId: 3, uid: 1, nickname: '灰太狼', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: 'comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10',
              children: {
                total: 1, page: 1, size: 10,
                list: [
                  { commentId: 4, uid: 1, nickname: '灰太狼', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: 'comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10' }
                ]
              }
            }
          ]
        }
      }
    }
  },
  mounted() {
    const articleId = this.$route.params.aid
    this.articleDetail(articleId)
  },
  methods: {
    error(message) {
      this.$notify.error({
        title: '请求失败',
        message: message
      })
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
      }).catch(error => this.error(error))
    },
    handPublishParent() {
      const articleId = this.article.articleId
      publishParent(articleId).then(() => {
        this.success('发布成功')
        this.articleDetail(articleId)
      }).catch(error => this.error(error))
    },
    commentPage(page) {
      const articleId = this.article.articleId
      showComment(articleId, page).then(res => {
        this.article.comment = res.data
      }).catch(error => this.error(error))
    },
    likeArticle() {
      likeArticle().then(() => {
        this.article.like++
      }).catch(error => this.error(error))
    },
    disLikeArticle() {
      dislikeArticle().then(() => {
        this.article.dislike++
      }).catch(error => this.error(error))
    }
  }
}
</script>

<style scoped>
.article-detail-container {
  min-height: 625px;
}
.editor-content{
  margin-top: 20px;
}
.publish-time {
  margin: 20px;
  color: #74787f;
}
.publish-parent {
  width: 740px;
  margin-left: 10px;
}
.publish-parent input {
  background-color: #20a0ff;
}
</style>
