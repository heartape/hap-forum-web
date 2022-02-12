<template>
  <div class="topic-container">
    <div class="topic-header-container">
      <el-card shadow="hover" class="topic-description-container" :body-style="{ 'background-color': '#ffffff' }">
        <el-row class="topic-label-container">
          <el-button v-for="labelItem in topic.label" :key="labelItem.labelId" class="topic-label-item" type="primary" plain round size="mini" @click="toLabelTopic(labelItem.labelId)">{{ labelItem.name }}</el-button>
        </el-row>
        <h2>{{ topic.title }}</h2>
        <p>{{ topic.simpleDescription }}
          <el-button v-if="topic.length === 'long'" type="text" class="show-description-btn" @click="showLong = !showLong">... 查看全部</el-button>
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
    <div class="discuss-comment-number-container">{{ topic.discuss.total }} 个回答</div>
    <div class="topic-discuss-container">
      <div v-for="discussItem in topic.discuss.list" :key="discussItem.discussId" class="discuss-item-container">
        <div class="discuss-item-content-container">
          <div class="discuss-creator-container">
            <el-image
              :src="discussItem.avatar"
              :alt="discussItem.nickname"
              style="float: left;width: 30px; height: 30px; margin-right: 10px"
              fit="cover"
            />
            <span class="discuss-username">{{ discussItem.nickname }}</span>
            <p>introduce</p>
          </div>
          <p>{{ discussItem.content }}</p>
          <div class="discuss-menu">
            <el-button type="primary" plain size="small" @click="likeDiscuss(discussItem.discussId, discussItem)">赞同 {{ discussItem.like }}</el-button>
            <el-button type="primary" plain size="small" @click="disLikeDiscuss(discussItem.discussId, discussItem)">踩 {{ discussItem.dislike }}</el-button>
            <el-button class="discuss-comment-count" type="primary" plain size="small" @click="discussItem.parentShow = !discussItem.parentShow">{{ discussItem.comment.allComment }} 个评论</el-button>
          </div>
        </div>
        <comment
          :comment="discussItem.comment"
          :show="discussItem.parentShow"
          @handCommentDetailInit="handCommentDetailInit"
          @handCommentDetailPage="handCommentDetailPage"
          @handCommentPage="handCommentPage"
          @handPublishParent="handPublishParent"
          @handlePublishChildrenToParent="handlePublishChildrenToParent"
          @handlePublishChildrenToChildren="handlePublishChildrenToChildren"
          @handLikeComment="handLikeComment"
          @handDisLikeComment="handDisLikeComment"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { topicDetail, likeTopic, likeDiscuss, dislikeDiscuss, likeComment, disLikeComment, showComment } from '@/api/topic'
import Comment from '@/views/components/Comment'
import { error } from '@/utils'
import { initCommentDetail, loadChildren } from '@/api/article'

export default {
  components: { Comment },
  data() {
    return {
      topic: {},
      showLong: false,
      discussShow: { 1: false },
      childrenLoading: false
    }
  },
  created() {
    const topicId = this.$route.params.topicId
    // 获取topic数据
    topicDetail(topicId).then(res => {
      this.topic = res.data
    }).catch(err => error(err))
    // todo:后端联调后删除
    this.topic = {
      topicId: 1,
      title: 'title',
      // 长度分为long和short
      length: 'long',
      simpleDescription: 'description',
      description: 'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description',
      label: [
        { labelId: 1, name: '编程' },
        { labelId: 2, name: '计算机' }
      ],
      publishTime: '2021-12-11 19:10',
      like: 100,
      dislike: 100,
      discuss: {
        total: 14,
        page: 1,
        size: 10,
        list: [
          { discussId: 1, uid: 1, nickname: '灰太狼', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: 'discuss', like: 100, dislike: 100, publishTime: '2021-12-11 19:10',
            comment: {
              allComment: 374,
              total: 112,
              page: 2,
              size: 10,
              list: [
                { commentId: 1, uid: 1, nickname: '灰太狼', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: 'comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10',
                  children: {
                    total: 32,
                    page: 1,
                    size: 10,
                    list: [
                      { commentId: 2, uid: 1, nickname: '灰太狼', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: 'comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10' },
                      { commentId: 5, uid: 1, nickname: '灰太狼', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: 'comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10' }
                    ]
                  }
                },
                { commentId: 3, uid: 1, nickname: '灰太狼', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: 'comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10',
                  children: {
                    total: 32,
                    page: 1,
                    size: 10,
                    list: [
                      { commentId: 4, uid: 1, nickname: '灰太狼', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: 'comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10' }
                    ]
                  }
                }
              ]
            }
          },
          { discussId: 1, uid: 1, nickname: '灰太狼', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: 'discuss', like: 100, dislike: 100, publishTime: '2021-12-11 19:10',
            comment: {
              allComment: 374,
              total: 112,
              page: 2,
              size: 10,
              list: [
                { commentId: 1, uid: 1, nickname: '灰太狼', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: 'comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10',
                  children: {
                    total: 32,
                    page: 1,
                    size: 10,
                    list: [
                      { commentId: 2, uid: 1, nickname: '灰太狼', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: 'comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10' },
                      { commentId: 5, uid: 1, nickname: '灰太狼', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: 'comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10' }
                    ]
                  }
                },
                { commentId: 3, uid: 1, nickname: '灰太狼', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: 'comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10',
                  children: {
                    total: 32,
                    page: 1,
                    size: 10,
                    list: [
                      { commentId: 4, uid: 1, nickname: '灰太狼', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: 'comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10' }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  },
  mounted() {
    // todo:后端联调后并入到topicDetail的then
    // 创建父评论与子评论的展示状态对象
    const discussList = this.topic.discuss.list
    discussList.forEach(item => {
      // 动态新增
      this.$set(item, 'parentShow', false)
      const commentList = item.comment.list
      commentList.forEach(item => {
        this.$set(item, 'childrenShow', false)
      })
    })
  },
  methods: {
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
    handCommentPage(discussId, page, comment) {
      // 跳转页码
      showComment(discussId, page).then(res => {
        comment = res.data
      }).catch(err => error(err))
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
    handCommentDetailInit(commentId, callback) {
      initCommentDetail(commentId).then(res => {
        this.$set(res.data, 'childrenShow', false)
        this.$set(res.data, 'showInput', false)
        this.$set(res.data, 'publishContent', '')
        res.data.children.list.map(child => {
          this.$set(child, 'showInput', false)
          this.$set(child, 'publishContent', '')
        })
        callback(res.data)
      }).catch(err => {
        error(err)
        // todo:前后端对接后删除
        const data = { commentId: 1, uid: 1, nickname: '灰太狼', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: 'comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10',
          children: {
            total: 4, current: 1, size: 2, pages: 2,
            list: [
              { commentId: 2, uid: 1, nickname: '灰太狼', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: 'comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10' },
              { commentId: 5, uid: 1, nickname: '灰太狼', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: 'comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10' }
            ]
          }
        }
        this.$set(data, 'childrenShow', false)
        this.$set(data, 'showInput', false)
        this.$set(data, 'publishContent', '')
        data.children.list.map(child => {
          this.$set(child, 'showInput', false)
          this.$set(child, 'publishContent', '')
        })
        callback(data)
      })
    },
    handCommentDetailPage(commentId, page, callback) {
      loadChildren(commentId, page).then(res => {
        res.data.list.map(child => {
          this.$set(child, 'showInput', false)
          this.$set(child, 'publishContent', '')
        })
        callback(res.data)
      }).catch(err => {
        error(err)
        // todo:前后端对接后删除
        const data = {
          total: 4, current: 2, size: 2, pages: 2,
          list: [
            { commentId: 12, uid: 1, nickname: '灰太狼', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: 'comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10' },
            { commentId: 15, uid: 1, nickname: '灰太狼', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: 'comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10' }
          ]
        }
        data.list.map(child => {
          this.$set(child, 'showInput', false)
          this.$set(child, 'publishContent', '')
        })
        callback(data)
      })
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

