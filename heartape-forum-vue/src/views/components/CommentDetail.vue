<template>
  <div class="comment-detail-container">
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
        <el-button type="primary" plain size="small" @click="handLikeComment(comment)">赞同 {{ comment.like }}</el-button>
        <el-button type="primary" plain size="small" @click="handDisLikeComment(comment)">踩 {{ comment.dislike }}</el-button>
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
        <el-button type="primary" plain size="small" @click="handLikeComment(childrenItem)">赞同 {{ childrenItem.like }}</el-button>
        <el-button type="primary" plain size="small" @click="handDisLikeComment(childrenItem)">踩 {{ childrenItem.dislike }}</el-button>
        <el-button type="text" size="small" icon="el-icon-chat-dot-round" @click="childrenItem.showInput = !childrenItem.showInput">回复</el-button>
        <el-input v-show="childrenItem.showInput" v-model="childrenItem.publishContent" class="publish-commit-input" placeholder="请输入评论">
          <template slot="append">
            <el-button @click="handlePublishChildrenToChildren(childrenItem.commentId, childrenItem.publishContent)">发布</el-button>
          </template>
        </el-input>
      </div>
      <el-pagination
        :current-page.sync="comment.children.pageNum"
        :page-size="comment.children.pageSize"
        :total="comment.children.total"
        background
        style="text-align: center; margin-top: 20px"
        layout="total, prev, pager, next"
        @current-change="loadChildrenPage"
      />
    </div>
  </div>
</template>

<script>

export default {
  name: 'CommentDetail',
  props: {
    comment: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    handLikeComment(comment) {
      this.$emit('handLikeComment', comment)
    },
    handDisLikeComment(comment) {
      this.$emit('handDisLikeComment', comment)
    },
    loadChildrenPage() {
      const commentId = this.comment.commentId
      const pageNum = this.comment.children.pageNum
      const pageSize = this.comment.children.pageSize
      this.$emit('handCommentDetailPage', commentId, pageNum + 1, pageSize, value => {
        this.comment.children = value
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
