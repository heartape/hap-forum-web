<template>
  <div class="topic-container">
    <div class="topic-header-container">
      <el-card shadow="hover" class="topic-description-container" :body-style="{ 'background-color': '#ffffff' }">
        <el-row class="topic-label-container">
          <el-button v-for="labelItem in topic.label" :key="labelItem.labelId" class="topic-label-item" type="primary" plain round size="mini" @click="toLabelTopic(labelItem.labelId)">{{ labelItem.name }}</el-button>
        </el-row>
        <h2>{{ topic.title }}</h2>
        <p>{{ topic.simpleDescription }}
          <el-button v-if="topic.isLong === true" type="text" class="show-description-btn" @click="showLong = !showLong">... 查看全部</el-button>
          <el-dialog
            :title="topic.name"
            :visible.sync="showLong"
            width="30%"
          >
            <span>{{ topic.description }}</span>
          </el-dialog>
        </p>
        <el-button class="button" type="primary" plain size="small" @click="likeTopic(topic.topicId, topic)">点赞:{{ topic.like }}</el-button>
      </el-card>
    </div>
    <div class="discuss-comment-number-container">{{ discuss.total }} 个回答</div>
    <div class="topic-discuss-container">
      <div v-for="(discussItem, index) in discuss.list" :key="discussItem.discussId" class="discuss-item-container">
        <div class="discuss-item-content-container">
          <div class="discuss-creator-container">
            <el-image
              :src="discussItem.avatar"
              :alt="discussItem.nickname"
              style="float: left;width: 30px; height: 30px; margin-right: 10px"
              fit="cover"
            />
            <span class="discuss-username">
              {{ discussItem.nickname }}
              <span style="margin-left: 20px; font-size: 14px">{{ discussItem.profile }}</span>
            </span>
          </div>
          <p>{{ discussItem.content }}</p>
          <div class="discuss-menu">
            <el-button type="primary" plain size="small" @click="likeDiscuss(discussItem.discussId, discussItem)">赞同 {{ discussItem.like }}</el-button>
            <el-button type="primary" plain size="small" @click="disLikeDiscuss(discussItem.discussId, discussItem)">踩 {{ discussItem.dislike }}</el-button>
            <el-button class="discuss-comment-count" type="primary" plain size="small" @click="handleCommentShow(discussItem, index)">{{ discussItem.allComment }} 个评论</el-button>
          </div>
        </div>
        <comment
          ref="comment"
          :all-comment="discussItem.allComment"
          :show="discussItem.parentShow"
          @handCommentDetailPage="handCommentDetailPage"
          @handCommentPage="handCommentPage(arguments, discussItem.discussId)"
          @handPublishParent="handPublishParent"
          @handlePublishChildrenToParent="handlePublishChildrenToParent"
          @handlePublishChildrenToChildren="handlePublishChildrenToChildren"
          @handLikeComment="handLikeComment"
          @handDisLikeComment="handDisLikeComment"
        />
      </div>
      <el-pagination
        class="comment-pagination"
        background
        layout="prev, pager, next"
        :total="discuss.total"
        :page-size="discuss.pageSize"
        :current-page="discuss.pageNum"
        @current-change="handleDiscussPage"
      />
    </div>
  </div>
</template>

<script>
import { topicDetail, likeTopic, loadDiscussPage, likeDiscuss, dislikeDiscuss, likeComment, disLikeComment, showComment, loadChildren } from '@/api/topic'
import Comment from '@/views/components/Comment'
import { error } from '@/utils'

export default {
  components: { Comment },
  data() {
    return {
      topic: {},
      discuss: {},
      showLong: false,
      discussShow: { 1: false },
      childrenLoading: false
    }
  },
  created() {
    this.handleTopicDetail()
    this.discuss.pageNum = 0
    this.discuss.pageSize = 10
    this.handleDiscussPage()
  },
  methods: {
    handleTopicDetail() {
      const topicId = this.$route.params.topicId
      // 获取topic数据
      topicDetail(topicId).then(res => {
        this.topic = res.data
      }).catch(err => error(err))
      // todo:后端联调后删除
      this.topic = {
        topicId: 1,
        title: 'title',
        isLong: true,
        simpleDescription: 'description',
        description: 'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description',
        label: [
          { labelId: 1, name: '编程' },
          { labelId: 2, name: '计算机' }
        ],
        publishTime: '2021-12-11 19:10',
        like: 100,
        dislike: 100
      }
    },
    handleDiscussPage() {
      const topicId = this.$route.params.topicId
      const pageNum = this.discuss.pageNum
      const pageSize = this.discuss.pageSize
      loadDiscussPage(topicId, pageNum + 1, pageSize).then(res => {
        res.list.forEach(item => {
          // 动态新增
          this.$set(item, 'parentShow', false)
        })
        this.discuss = res
      }).catch(err => {
        error(err)
        const discuss = {
          total: 14, pageNum: 1, pageSize: 10, allComment: 32,
          list: [
            { discussId: 1, uid: 1, nickname: '灰太狼', profile: '羊村死敌', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: '喝了编程', like: 100, dislike: 100, publishTime: '2021-12-11 19:10', allComment: 26 },
            { discussId: 2, uid: 1, nickname: '灰太狼', profile: '羊村死敌', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: 'discuss', like: 100, dislike: 100, publishTime: '2021-12-11 19:10', allComment: 26 },
            { discussId: 3, uid: 1, nickname: '灰太狼', profile: '羊村死敌', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: 'discuss', like: 100, dislike: 100, publishTime: '2021-12-11 19:10', allComment: 26 },
            { discussId: 4, uid: 1, nickname: '灰太狼', profile: '羊村死敌', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: 'discuss', like: 100, dislike: 100, publishTime: '2021-12-11 19:10', allComment: 26 },
            { discussId: 5, uid: 1, nickname: '灰太狼', profile: '羊村死敌', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: 'discuss', like: 100, dislike: 100, publishTime: '2021-12-11 19:10', allComment: 26 }
          ]
        }
        discuss.list.forEach(item => {
          // 动态新增
          this.$set(item, 'parentShow', false)
        })
        this.discuss = discuss
      })
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
    likeDiscuss(discussId, discuss) {
      // 讨论点赞加一,后台对比是否有点赞记录
      likeDiscuss(discussId).then(() => {
        discuss.like++
      }).catch(err => error(err))
    },
    disLikeDiscuss(discussId, discuss) {
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
      }).catch(err => {
        error(err)
        const comment = {
          total: 3, pageNum: 1, pageSize: 10, pages: 1,
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
            { commentId: 7, uid: 1, nickname: '灰太狼', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: '万剑归宗', like: 100, dislike: 100, publishTime: '2021-12-11 19:10',
              simpleChildren: {
                total: 12,
                list: [
                  { commentId: 9, uid: 1, nickname: '灰太狼', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: '万剑归宗', like: 100, dislike: 100, publishTime: '2021-12-11 19:10' },
                  { commentId: 8, uid: 1, nickname: '灰太狼', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: 'comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10' }
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
    handPublishParent(publishParentContent) {
      console.log(publishParentContent)
    },
    handlePublishChildrenToParent(commentId, publishContent) {
      console.log(publishContent)
    },
    handlePublishChildrenToChildren(commentId, publishContent) {
      console.log(publishContent)
    },
    handCommentDetailPage(commentId, pageNum, pageSize, callback) {
      loadChildren(commentId, pageNum, pageSize).then(res => {
        callback(res.data)
      }).catch(err => {
        error(err)
        // todo:前后端对接后删除
        const children = {
          total: 14, pageNum: 1, pageSize: 10, pages: 2,
          list: [
            { commentId: 1, uid: 1, nickname: '灰太狼1', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: '借款方comment借款方comment借款方comment借款方comment借款方comment借款方comment借款方comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10' },
            { commentId: 2, uid: 1, nickname: '灰太狼2', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: 'comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10' },
            { commentId: 3, uid: 1, nickname: '灰太狼3', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: 'comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10' },
            { commentId: 4, uid: 1, nickname: '灰太狼4', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: 'comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10' },
            { commentId: 5, uid: 1, nickname: '灰太狼5', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: 'comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10' }
          ]
        }
        callback(children)
      })
    },
    handleCommentShow(discussItem, index) {
      discussItem.parentShow = !discussItem.parentShow
      this.$refs.comment[index].$emit('handCommentInit')
    }
  }
}
</script>

<style lang="scss" scoped>
.topic-container {
  .topic-header-container {
    .topic-description-container {
      .topic-label-container {
        margin-bottom: 20px;
      }
      h2 {
        margin: 0;
      }
      p {
        height: 55px;
        overflow: hidden;
        .show-description-btn {
          padding: 0;
        }
      }
    }
  }
  .discuss-comment-number-container {
    padding: 20px 20px;
    border-top: #f3f3f3 15px solid;
  }
  .topic-discuss-container {
    padding: 0 20px;
    background-color: #ffffff;
    .discuss-item-container {
      padding-bottom: 20px;
      .discuss-item-content-container {
        width: 720px;
        padding-top: 20px;
        border-top: #e3e3e3 1px solid;
        p {
          margin: 30px 0 20px 0;
          line-height: 20px;
        }
        .discuss-creator-container {
          .discuss-username {
            position: relative;
            top: 5px;
          }
        }
      }
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

