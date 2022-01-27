<template>
  <div class="topic-container">
    <div class="topic-header-container">
      <el-card class="topic-description-container" :body-style="{ 'background-color': '#ffffff' }">
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
    <h2>{{ topic.discuss.total }} 个回答</h2>
    <div class="topic-discuss-container">
      <div v-for="discussItem in topic.discuss.list" :key="discussItem.discussId">
        <div class="only-discuss-container">
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
            <el-button class="discuss-comment-count" type="primary" plain size="small" @click="handleParentShow(discussItem.discussId)">{{ discussItem.comment.allComment }} 个评论</el-button>
          </div>
        </div>
        <div v-show="parentShow[discussItem.discussId]" class="comment-container">
          <div v-for="commentItem in discussItem.comment.list" :key="commentItem.commentId" class="comment-container-item">
            <el-image
              :src="commentItem.avatar"
              :alt="commentItem.nickname"
              style="float: left;width: 30px; height: 30px; margin-right: 10px"
              fit="cover"
            />
            <span class="comment-username">{{ commentItem.nickname }}</span>
            <p>{{ commentItem.content }}</p>
            <el-button type="primary" plain size="small" @click="likeComment(commentItem.commentId, commentItem)">赞同 {{ commentItem.like }}</el-button>
            <el-button type="primary" plain size="small" @click="disLikeComment(commentItem.commentId, commentItem)">踩 {{ commentItem.dislike }}</el-button>
            <el-button class="discuss-comment-count" type="primary" plain size="small" @click="handleChildrenShow(commentItem.commentId)">{{ commentItem.children.total }} 个评论</el-button>
            <div v-show="childrenShow[commentItem.commentId]" class="comment-children-container">
              <div v-for="childrenItem in commentItem.children.list" :key="childrenItem.commentId" class="children-item-container">
                <el-image
                  :src="childrenItem.avatar"
                  :alt="childrenItem.nickname"
                  style="float: left;width: 30px; height: 30px; margin-right: 10px"
                  fit="cover"
                />
                <span class="children-username">{{ childrenItem.nickname }}</span>
                <p>{{ childrenItem.content }}</p>
                <el-button type="primary" plain size="small" @click="likeComment(childrenItem.commentId)">赞同 {{ childrenItem.like }}</el-button>
                <el-button type="primary" plain size="small" @click="disLikeComment(childrenItem.commentId)">踩 {{ childrenItem.dislike }}</el-button>
              </div>
              <el-button
                v-if="commentItem.children.page * commentItem.children.size < commentItem.children.total"
                v-loading="childrenLoading"
                :disabled="childrenLoading"
                type="primary"
                plain
                @click="loadChildren(commentItem.commentId, commentItem.children.page, commentItem.children)"
              >加载更多</el-button>
            </div>
          </div>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="discussItem.comment.total"
            :page-size="discussItem.comment.size"
            :current-page="discussItem.comment.page"
            @current-change="handlePageChange(discussItem.discussId, $event, discussItem.comment)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { topicDetail, likeTopic, likeDiscuss, dislikeDiscuss, likeComment, disLikeComment, showComment, showChildren } from '@/api/topic'

export default {
  data() {
    return {
      topic: {},
      showLong: false,
      discussShow: { 1: false },
      parentShow: {},
      childrenShow: {},
      childrenLoading: false
    }
  },
  created() {
    const topicId = this.$route.params.topicId
    // 获取topic数据
    topicDetail(topicId).then(res => {
      this.topic = res.data
    }).catch(error => this.error(error))
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
      const discussId = item.discussId
      // 动态新增
      this.$set(this.parentShow, discussId, false)
      const commentList = item.comment.list
      commentList.forEach(item => {
        const commentId = item.commentId
        this.$set(this.childrenShow, commentId, false)
      })
    })
  },
  methods: {
    error(message) {
      this.$notify.error({
        title: '请求失败',
        message: message
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
      }).catch(error => this.error(error))
    },
    likeDiscuss(discussId, discuss) {
      // 讨论点赞加一,后台对比是否有点赞记录
      likeDiscuss(discussId).then(() => {
        discuss.like++
      }).catch(error => this.error(error))
    },
    disLikeDiscuss(discussId, discuss) {
      // 讨论踩加一,后台对比是否有踩记录
      dislikeDiscuss(discussId).then(() => {
        discuss.dislike++
      }).catch(error => this.error(error))
    },
    likeComment(commentId, comment) {
      // 评论点赞加一,后台对比是否有点赞记录
      likeComment(commentId).then(() => {
        comment.like++
      }).catch(error => this.error(error))
    },
    disLikeComment(commentId, comment) {
      // 评论踩加一,后台对比是否有踩记录
      disLikeComment(commentId).then(() => {
        comment.dislike++
      }).catch(error => this.error(error))
    },
    handlePageChange(discussId, page, comment) {
      // 跳转页码
      showComment(discussId, page).then(res => {
        comment = res.data
      }).catch(error => this.error(error))
    },
    loadChildren(commentId, page, children) {
      this.childrenLoading = true
      showChildren(commentId, page + 1).then(res => {
        children = res.data
        this.childrenLoading = false
      }).catch(error => {
        this.error(error)
        this.childrenLoading = false
      })
    },
    handleParentShow(discussId) {
      this.parentShow[discussId] = !this.parentShow[discussId]
    },
    handleChildrenShow(commentId) {
      this.childrenShow[commentId] = !this.childrenShow[commentId]
    }
  }
}
</script>

<style lang="scss" scoped>
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
.topic-discuss-container {
  background-color: #ffffff;

  .only-discuss-container {
    width: 740px;
    padding: 10px;
    .discuss-creator-container {
      .discuss-username {
        position: relative;
        top: 5px;
      }
    }
  }

  .comment-container {
    margin: 0 10px;
    width: 90%;

    .comment-container-item {
      padding: 10px;
      margin-bottom: 10px;
      border: #b7babf solid 1px;
    }

    .children-item-container {
      padding: 10px 10px 10px 30px;
      width: 100%;
      border-top: #b7babf solid 1px;
      border-bottom: #b7babf solid 1px;
    }
  }
}
</style>

