<template>
  <el-col
    v-loading="commentLoading"
    v-infinite-scroll="loadChildrenPage"
    infinite-scroll-distance="50px"
    class="comment-detail-container"
    style="overflow:auto"
  >
    <div class="comment-parent-container">
      <el-image
        :src="comment.avatar"
        :alt="comment.nickname"
        style="float: left;width: 30px; height: 30px; margin-right: 10px"
        fit="cover"
      />
      <span class="comment-username">{{ comment.nickname }}</span>
      <div class="comment-content">{{ comment.content }}</div>
      <div class="parent-btn">
        <el-button type="primary" plain size="small" @click="likeComment(comment.commentId, comment)">赞同 {{ comment.like }}</el-button>
        <el-button type="primary" plain size="small" @click="disLikeComment(comment.commentId, comment)">踩 {{ comment.dislike }}</el-button>
        <el-button type="text" size="small" icon="el-icon-chat-dot-round" @click="comment.showInput = !comment.showInput">回复</el-button>
        <el-input v-show="comment.showInput" v-model="comment.publishContent" class="publish-commit-input" placeholder="请输入评论">
          <template slot="append">
            <el-button @click="handlePublishChildrenToParent(comment.commentId, comment.publishContent)">发布</el-button>
          </template>
        </el-input>
      </div>
    </div>
    <div class="comment-children-number-container">{{ comment.children.total }} 条回复</div>
    <div class="comment-children-container">
      <div v-for="childrenItem in comment.children.list" :key="childrenItem.commentId" class="children-item-container">
        <el-image
          :src="childrenItem.avatar"
          :alt="childrenItem.nickname"
          style="float: left;width: 30px; height: 30px; margin-right: 10px"
          fit="cover"
        />
        <span class="comment-username">{{ childrenItem.nickname }}</span>
        <div class="comment-content" v-text="childrenItem.content" />
        <el-button type="primary" plain size="small" @click="likeComment(childrenItem.commentId)">赞同 {{ childrenItem.like }}</el-button>
        <el-button type="primary" plain size="small" @click="disLikeComment(childrenItem.commentId)">踩 {{ childrenItem.dislike }}</el-button>
        <el-button type="text" size="small" icon="el-icon-chat-dot-round" @click="childrenItem.showInput = !childrenItem.showInput">回复</el-button>
        <el-input v-show="childrenItem.showInput" v-model="childrenItem.publishContent" class="publish-commit-input" placeholder="请输入评论">
          <template slot="append">
            <el-button @click="handlePublishChildrenToChildren(childrenItem.commentId, childrenItem.publishContent)">发布</el-button>
          </template>
        </el-input>
      </div>
    </div>
  </el-col>
</template>

<script>
import { disLikeComment, likeComment, showChildren } from '@/api/topic'
import { error } from '@/utils'

export default {
  name: 'CommentDetail',
  props: {
    commentId: {
      type: String,
      default: ''
    },
    comment: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      commentLoading: false
    }
  },
  created() {
    // const mf = Date.now()
    // console.log('created:' + mf)
    // console.log(this.comment)
  },
  methods: {
    likeComment(commentId, comment) {
      // 评论点赞加一,后台对比是否有点赞记录
      likeComment(commentId).then(() => {
        comment.like++
      }).catch(err => error(err))
    },
    disLikeComment(commentId, comment) {
      // 评论踩加一,后台对比是否有踩记录
      disLikeComment(commentId).then(() => {
        comment.dislike++
      }).catch(err => error(err))
    },
    loadCommentInit() {
      // this.commentLoading = true
      this.$emit('handCommentDetailInit', this.commentId)
    },
    loadChildrenPage() {
      const commentId = this.comment.commentId
      const current = this.comment.children.current
      const oldList = this.comment.children.list
      if (current >= this.comment.children.pages) {
        return
      }
      showChildren(commentId, current + 1).then(res => {
        this.comment.children = res.data
        this.comment.children.list = oldList.concat(this.comment.children.list)
      }).catch(err => {
        this.comment.children = {
          total: 4, current: 2, size: 2, pages: 2,
          list: [
            { commentId: 6, uid: 1, nickname: '灰太狼1', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: 'comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10' },
            { commentId: 7, uid: 1, nickname: '灰太狼1', avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg', content: 'comment', like: 100, dislike: 100, publishTime: '2021-12-11 19:10' }
          ]
        }
        this.comment.children.list = oldList.concat(this.comment.children.list)
        // this.$set(children, 'list', childrenOld.concat(children.list))
        error(err)
      })
    },
    handlePublishChildrenToParent(commentId, publishContent) {
      // 对父评论进行评论
      this.$emit('handlePublishChildrenToParent', commentId, publishContent)
    },
    handlePublishChildrenToChildren(commentId, publishContent) {
      // 对子评论进行评论
      this.$emit('handlePublishChildrenToChildren', commentId, publishContent)
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-detail-container {
  height: 556px;
  .comment-parent-container {
    padding: 0 20px;
    .parent-btn {
      margin-bottom: 10px;
    }
  }
  .comment-children-number-container {
    padding: 20px 20px;
    border-top: #ececec 10px solid;
    //border-bottom: #dbddde 1px solid;
  }
  .comment-children-container {
    padding: 0 20px 10px 20px;
    .children-item-container {
      padding: 10px 0;
      border-top: #dbddde 1px solid;
    }
  }
}
.comment-username {
  font-size: 18px;
  line-height: 30px;
}
.comment-content {
  padding: 10px 0;
  font-size: 15px;
  line-height: 24px;
}
.publish-commit-input {
  margin-top: 10px;
}
</style>
