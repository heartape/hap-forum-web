<template>
  <div class="topic-container">
    <div class="topic-header-container">
      <el-card shadow="hover" class="topic-description-container" :body-style="{ 'background-color': '#ffffff' }">
        <el-row class="topic-label-container">
          <el-button v-for="labelItem in topic.label" :key="labelItem.labelId" class="topic-label-item" type="primary" plain round size="mini" @click="toLabelTopic(labelItem.labelId)">{{ labelItem.name }}</el-button>
        </el-row>
        <h2 class="topic-title-container">{{ topic.title }}</h2>
        <p v-if="topic.description !== undefined && topic.description.length <= 100" class="topic-content-container">{{ topic.description }}</p>
        <p v-else-if="topic.description !== undefined && topic.description.length > 100" class="topic-content-container">
          {{ topic.description.substring(0, 100) }}
          <el-button type="text" class="show-description-btn" @click="showLong = !showLong">... 查看全部</el-button>
          <el-dialog
            :title="topic.name"
            :visible.sync="showLong"
            width="500px"
          >
            <span>{{ topic.description }}</span>
          </el-dialog>
        </p>
        <el-button class="button" type="primary" plain size="small" @click="likeTopic(topic.topicId, topic)">点赞:{{ topic.like }}</el-button>
        <el-button class="button" type="primary" plain size="small" @click="dislikeTopic(topic.topicId, topic)">踩:{{ topic.dislike }}</el-button>
        <el-button class="button" type="primary" plain size="small" @click="publish.show = !publish.show">写回答</el-button>
      </el-card>
    </div>
    <transition name="el-fade-in-linear">
      <div v-show="publish.show">
        <tinymce ref="tinymce" v-model="publish.content" :width="760" :height="200" @imagesUpload="imagesUpload(arguments)" />
        <el-row style="padding: 10px; border-bottom: #99a9bf 1px solid">
          <el-button class="button" type="primary" plain size="small" style="float: right" @click="contentUpload">发布</el-button>
        </el-row>
      </div>
    </transition>
    <div class="discuss-comment-number-container">{{ discuss.total }} 个回答</div>
    <div class="topic-discuss-container">
      <div v-for="(discussItem, index) in discuss.list" :key="discussItem.discussId" class="discuss-list-item">
        <div class="discuss-item-container">
          <div class="discuss-creator-container">
            <el-image
              :src="discussItem.avatar"
              :alt="discussItem.nickname"
              style="float: left;width: 30px; height: 30px; margin-right: 10px"
              fit="cover"
            />
            <span class="discuss-username">
              <el-button class="username" type="text" @click="showCreator(discussItem.uid)">{{ discussItem.nickname }}</el-button>
              <span style="margin-left: 20px; font-size: 14px">{{ discussItem.profile }}</span>
            </span>
          </div>
          <p class="discuss-content-container" v-html="discussItem.content" />
          <div class="discuss-menu">
            <el-button type="primary" plain size="small" @click="likeDiscuss(discussItem.discussId, discussItem)">赞同 {{ discussItem.like }}</el-button>
            <el-button type="primary" plain size="small" @click="dislikeDiscuss(discussItem.discussId, discussItem)">踩 {{ discussItem.dislike }}</el-button>
            <el-button class="discuss-comment-count" type="primary" plain size="small" @click="handleCommentShow(discussItem, index)">{{ discussItem.total }} 个评论</el-button>
          </div>
        </div>
        <comment
          ref="comment"
          :all-comment="discussItem.allComment"
          :show="discussItem.parentShow"
          @handCommentDetailPage="handCommentDetailPage"
          @handCommentPage="handCommentPage(arguments, discussItem.discussId)"
          @handPublishParent="handPublishParent(discussItem, $event, index)"
          @handlePublishChildrenToParent="handlePublishChildrenToParent(discussItem.discussId, arguments, index)"
          @handlePublishChildrenToChildren="handlePublishChildrenToChildren(discussItem.discussId, arguments, index)"
          @handLikeComment="handLikeComment"
          @handDisLikeComment="handDisLikeComment"
          @removeComment="removeComment($event, index)"
          @removeCommentChild="removeCommentChild(arguments, index)"
        />
      </div>
      <div class="el-page-container">
        <el-pagination
          class="comment-pagination"
          background
          layout="prev, pager, next"
          :total="discuss.total"
          :page-size="discuss.pageSize"
          :current-page.sync="discuss.pageNum"
          style="padding-top: 10px; text-align: center; border-top: #d4dae0 1px solid;"
          @current-change="handleDiscussPage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  topicDetail,
  likeTopic,
  dislikeTopic,
  loadDiscussPage,
  likeDiscuss,
  dislikeDiscuss,
  likeComment,
  disLikeComment,
  showComment,
  loadChildren,
  removeDiscussComment,
  removeDiscussCommentChild,
  publishDiscussComment,
  publishDiscussCommentChild,
  publishDiscussCommentChildToChild
} from '@/api/topic'
import Comment from '@/views/components/Comment'
import { error } from '@/utils'
import Tinymce from '@/components/Tinymce'
import { imagesUpload } from '@/utils/upload-picture'
import { publishDiscuss } from '@/api/topic'

export default {
  components: { Comment, Tinymce },
  data() {
    return {
      topic: {},
      publish: {
        show: false,
        content: ``
      },
      discuss: {},
      showLong: false,
      discussShow: { 1: false },
      childrenLoading: false
    }
  },
  created() {
    this.handleTopicDetail()
    this.discuss.pageNum = 1
    this.discuss.pageSize = 10
    this.handleDiscussPage()
  },
  methods: {
    imagesUpload(params) {
      imagesUpload(params)
    },
    contentUpload() {
      if (this.publish.content.trim() === ``) {
        error('内容为空')
        return
      }
      if (this.$refs.tinymce.getCount() < 20) {
        error('字数太少,最少20字')
        return
      }
      const data = {
        topicId: this.$route.params.topicId,
        content: this.publish.content
      }
      publishDiscuss(data).then(() => {
        this.$refs.tinymce.setContent(``)
        this.publish.show = !this.publish.show
        this.handleDiscussPage()
      }).catch(err => error(err))
    },
    handleTopicDetail() {
      const topicId = this.$route.params.topicId
      // 获取topic数据
      topicDetail(topicId).then(res => {
        this.topic = res.data
      }).catch(err => error(err))
    },
    handleDiscussPage() {
      const topicId = this.$route.params.topicId
      const pageNum = this.discuss.pageNum
      const pageSize = this.discuss.pageSize
      loadDiscussPage(topicId, pageNum, pageSize).then(res => {
        res.data.list.forEach(item => {
          // 动态新增
          this.$set(item, 'parentShow', false)
        })
        this.discuss = res.data
      }).catch(err => error(err))
    },
    toLabelTopic(labelId) {
      // 跳转目标label的topic列表
      this.$router.push({ path: '/topic/label/' + labelId + '/hot' })
    },
    likeTopic(topicId, topic) {
      // 当前话题点赞加一,后台对比是否有点赞记录
      likeTopic(topicId).then(() => {
        topic.like++
      }).catch(err => error(err))
    },
    dislikeTopic(topicId, topic) {
      // 当前话题点赞加一,后台对比是否有点赞记录
      dislikeTopic(topicId).then(() => {
        topic.like++
      }).catch(err => error(err))
    },
    likeDiscuss(discussId, discuss) {
      // 讨论点赞加一,后台对比是否有点赞记录
      likeDiscuss(discussId).then(() => {
        discuss.like++
      }).catch(err => error(err))
    },
    dislikeDiscuss(discussId, discuss) {
      // 讨论踩加一,后台对比是否有踩记录
      dislikeDiscuss(discussId).then(() => {
        discuss.dislike++
      }).catch(err => error(err))
    },
    handLikeComment(commentId, comment) {
      // 评论点赞加一,后台对比是否有点赞记录
      likeComment(commentId).then(() => {
        comment.like++
      }).catch(err => error(err))
    },
    handDisLikeComment(commentId, comment) {
      // 评论踩加一,后台对比是否有踩记录
      disLikeComment(commentId).then(() => {
        comment.dislike++
      }).catch(err => error(err))
    },
    handCommentPage(params, discussId) {
      const pageNum = params[0]
      const pageSize = params[1]
      const callback = params[2]
      // 跳转页码
      showComment(discussId, pageNum, pageSize).then(res => {
        callback(res.data)
      }).catch(err => error(err))
    },
    handPublishParent(discussItem, content, index) {
      const discussId = discussItem.discussId
      const topicId = this.$route.params.topicId
      publishDiscussComment(topicId, discussId, content).then(() => {
        discussItem.total = discussItem.total + 1
        this.$refs.comment[index].handCommentPage()
      }).catch(err => error(err))
    },
    handlePublishChildrenToParent(discussId, params, index) {
      const topicId = this.$route.params.topicId
      const parentId = params[0]
      const content = params[1]
      const data = {
        topicId: topicId,
        discussId: discussId,
        parentId: parentId,
        content: content
      }
      publishDiscussCommentChild(data).then(() => {
        this.$refs.comment[index].handCommentPage()
      }).catch(err => error(err))
    },
    handlePublishChildrenToChildren(discussId, params, index) {
      const topicId = this.$route.params.topicId
      const parentId = params[0]
      const childTarget = params[1]
      const content = params[2]
      const callback = params[3]
      const data = {
        topicId: topicId,
        discussId: discussId,
        parentId: parentId,
        childTarget: childTarget,
        content: content
      }
      publishDiscussCommentChildToChild(data).then(() => {
        this.$refs.comment[index].handCommentPage()
        callback()
      }).catch(err => error(err))
    },
    handCommentDetailPage(commentId, pageNum, pageSize, callback) {
      loadChildren(commentId, pageNum, pageSize).then(res => {
        callback(res.data)
      }).catch(err => error(err))
    },
    handleCommentShow(discussItem, index) {
      discussItem.parentShow = !discussItem.parentShow
      this.$refs.comment[index].$emit('handCommentInit')
    },
    removeComment(commentId, index) {
      removeDiscussComment(commentId).then(() => {
        this.$refs.comment[index].handCommentPage()
      })
    },
    removeCommentChild(params, index) {
      const commentId = params[0]
      const callback = params[1]
      removeDiscussCommentChild(commentId).then(() => {
        this.$refs.comment[index].handCommentPage()
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
.topic-container {
  .topic-header-container {
    border-bottom: #f8f8f8 15px solid;
    .topic-description-container {
      .topic-title-container {
        margin: 0;
        padding: 10px;
        line-height: normal;
      }
      .topic-content-container {
        padding: 10px;
        margin-bottom: 10px;
        font-size: 14px;
        line-height: 22px;
        overflow: hidden;
        .show-description-btn {
          padding: 0;
        }
      }
    }
  }
  .discuss-comment-number-container {
    padding: 20px 20px;
  }
  .topic-discuss-container {
    padding: 0 20px;
    background-color: #ffffff;
    .discuss-list-item {
      padding-bottom: 10px;
      .discuss-item-container {
        width: 720px;
        padding-top: 10px;
        border-top: #e3e3e3 1px solid;
        .discuss-content-container {
          margin: 10px 0;
          font-size: 14px;
          line-height: 22px;
        }
        .discuss-creator-container {
          height: 30px;
          .discuss-username {
            .username {
              font-size: 16px;
              line-height: 8px;
            }
          }
        }
      }
    }
    .el-page-container {
      margin-bottom: 50px;
    }
  }
}
.publish-parent {
  width: 720px;
  margin: 10px 0;
}
.publish-parent input {
  background-color: #20a0ff;
}
</style>

