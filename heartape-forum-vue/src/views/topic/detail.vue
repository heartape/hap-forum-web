<template>
  <div class="topic-container">
    <div class="topic-description-container">
      <el-row>
        <el-button v-for="labelItem in topic.label" :key="labelItem.labelId" class="topic-label-item" round @click="toLabelTopic(labelItem.labelId)">{{ labelItem.name }}</el-button>
      </el-row>
      <el-card>
        <h1>{{ topic.title }}</h1>
        <p>{{ topic.description }}</p>
        <el-button class="button" type="primary" plain @click="likeTopic(topic.topicId, topic)">点赞:{{ topic.like }}</el-button>
      </el-card>
    </div>
    <h2>{{ topic.discuss.total }} 个回答</h2>
    <div class="topic-discuss-container">
      <div v-for="discussItem in topic.discuss.list" :key="discussItem.discussId">
        <div class="only-discuss-container">
          <div class="discuss-creator-container">
            <el-image src="#" />
            <span>username</span>
            <p>introduce</p>
          </div>
          <p>{{ discussItem.content }}</p>
          <div class="discuss-menu">
            <el-button type="primary" plain @click="likeDiscuss(discussItem.discussId, discussItem)">赞同 {{ discussItem.like }}</el-button>
            <el-button type="primary" plain @click="disLikeDiscuss(discussItem.discussId, discussItem)">踩 {{ discussItem.dislike }}</el-button>
            <el-button class="discuss-comment-count" type="primary" plain @click="handleParentShow(discussItem.discussId)">{{ discussItem.comment.allComment }} 个评论</el-button>
          </div>
        </div>
        <div v-show="parentShow[discussItem.discussId]" class="comment-container">
          <div v-for="commentItem in discussItem.comment.list" :key="commentItem.commentId" class="comment-container-item">
            <img src="#">
            <span>username</span>
            <p>{{ commentItem.content }}</p>
            <el-button type="primary" plain @click="likeComment(commentItem.commentId, commentItem)">赞同 {{ commentItem.like }}</el-button>
            <el-button type="primary" plain @click="disLikeComment(commentItem.commentId, commentItem)">踩 {{ commentItem.dislike }}</el-button>
            <el-button class="discuss-comment-count" type="primary" plain @click="handleChildrenShow(commentItem.commentId)">{{ commentItem.children.total }} 个评论</el-button>
            <div v-show="childrenShow[commentItem.commentId]" class="comment-children-container">
              <div v-for="childrenItem in commentItem.children.list" :key="childrenItem.commentId" class="children-item-container">
                <img src="#">
                <span>username</span>
                <p>{{ childrenItem.content }}</p>
                <el-button type="primary" plain @click="likeComment(childrenItem.commentId)">赞同 {{ childrenItem.like }}</el-button>
                <el-button type="primary" plain @click="disLikeComment(childrenItem.commentId)">踩 {{ childrenItem.dislike }}</el-button>
              </div>
              <el-button
                v-if="commentItem.children.page * commentItem.children.size < commentItem.children.total"
                v-loading="childrenLoading"
                type="primary"
                plain
                @click="loadChildren(commentItem.commentId, ++commentItem.children.page, commentItem.children)"
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
    }).catch(() => {})
    // todo:后端联调后删除
    this.topic = {
      topicId: 1,
      title: 'title',
      description: 'description',
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
          { discussId: 1, uid: 1, content: 'discuss', like: 100, dislike: 100, publishTime: '2021-12-11 19:10',
            comment: {
              allComment: 374,
              total: 112,
              page: 2,
              size: 10,
              list: [
                { commentId: 1, uid: 1, content: 'comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10',
                  children: {
                    total: 32,
                    page: 1,
                    size: 10,
                    list: [
                      { commentId: 2, uid: 1, content: 'comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10' },
                      { commentId: 5, uid: 1, content: 'comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10' }
                    ]
                  }
                },
                { commentId: 3, uid: 1, content: 'comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10',
                  children: {
                    total: 32,
                    page: 1,
                    size: 10,
                    list: [
                      { commentId: 4, uid: 1, content: 'comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10' }
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
      // 跳转目标sort的topic列表
      this.$router.push({ path: '/topic/label/' + labelId + '/hot' })
    },
    likeTopic(topicId, topic) {
      // 当前话题点赞加一,后台对比是否有点赞记录
      likeTopic(topicId).then(res => {
        topic.like++
      }).catch(error => {
        console.log(error)
        // todo:将error的提示作为参数
        this.error()
      })
    },
    likeDiscuss(discussId, discuss) {
      // 讨论点赞加一,后台对比是否有点赞记录
      likeDiscuss(discussId).then(() => {
        discuss.like++
      }).catch(() => {
        this.error()
      })
    },
    disLikeDiscuss(discussId, discuss) {
      // 讨论踩加一,后台对比是否有踩记录
      dislikeDiscuss(discussId).then(() => {
        discuss.dislike++
      }).catch(() => {
        this.error()
      })
    },
    likeComment(commentId, comment) {
      // 评论点赞加一,后台对比是否有点赞记录
      likeComment(commentId).then(() => {
        comment.like++
      }).catch(() => {
        this.error()
      })
    },
    disLikeComment(commentId, comment) {
      // 评论踩加一,后台对比是否有踩记录
      disLikeComment(commentId).then(() => {
        comment.dislike++
      }).catch(() => {
        this.error()
      })
    },
    handlePageChange(discussId, page, comment) {
      // 跳转页码
      showComment(discussId, page).then(res => {
        comment = res.data
      }).catch(() => {
        this.error()
      })
    },
    loadChildren(commentId, page, children) {
      this.childrenLoading = true
      showChildren(commentId, page).then(res => {
        children = res.data
        this.childrenLoading = false
      }).catch(() => {
        this.error()
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
.topic-discuss-container {
  background-color: #ececec;

  .only-discuss-container {
    position: relative;
    left: 10px;
  }

  .comment-container {
    margin: 10px;
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

