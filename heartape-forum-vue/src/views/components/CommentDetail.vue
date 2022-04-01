<template>
  <div class="comment-detail-container">
    <div class="comment-parent-container">
      <el-image
        :src="comment.avatar"
        :alt="comment.nickname"
        style="float: left;width: 30px; height: 30px; margin-right: 10px"
        fit="cover"
      />
      <el-button class="comment-username" type="text" @click="showCreator(comment.uid)">{{ comment.nickname }}</el-button>
      <div class="comment-content">{{ comment.content }}</div>
      <div class="parent-btn">
        <el-button type="primary" plain size="mini" @click="handLikeComment(comment)">赞同 {{ comment.like }}</el-button>
        <el-button type="primary" plain size="mini" @click="handDisLikeComment(comment)">踩 {{ comment.dislike }}</el-button>
        <!--父评论回复功能删除-->
        <!--        <el-button type="text" size="small" icon="el-icon-chat-dot-round" @click="comment.showInput = !comment.showInput">回复</el-button>-->
        <!--        <el-input v-show="comment.showInput" v-model="comment.publishContent" class="publish-commit-input" placeholder="请输入评论">-->
        <!--          <template slot="append">-->
        <!--            <el-button @click="handlePublishChildrenToParent(comment.commentId, comment.publishContent)">发布</el-button>-->
        <!--          </template>-->
        <!--        </el-input>-->
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
        <el-button class="comment-username" type="text" @click="showCreator(childrenItem.uid)">{{ childrenItem.nickname }}</el-button>
        <div v-if="childrenItem.childToChild === false" class="comment-content" v-text="childrenItem.content" />
        <div v-else class="comment-content">
          <span>回复 </span>
          <el-button type="text" @click="showCreator(childrenItem.childTarget)">{{ childrenItem.childTargetName }}</el-button>
          <span> : {{ childrenItem.content }}</span>
        </div>
        <el-button type="primary" plain size="mini" @click="handLikeCommentChild(childrenItem)">赞同 {{ childrenItem.like }}</el-button>
        <el-button type="primary" plain size="mini" @click="handDisLikeCommentChild(childrenItem)">踩 {{ childrenItem.dislike }}</el-button>
        <el-button type="text" size="small" icon="el-icon-chat-dot-round" @click="childrenItem.showInput = !childrenItem.showInput">回复</el-button>
        <el-button v-if="childrenItem.uid === $store.getters.uid" class="remove-comment-btn" type="text" size="mini" @click="removeCommentChild(childrenItem.commentId)">删除</el-button>
        <el-input v-show="childrenItem.showInput" v-model="childrenItem.publishContent" class="publish-commit-input" placeholder="请输入评论">
          <template slot="append">
            <el-button @click="handlePublishChildrenToChildren(comment.commentId, childrenItem.commentId, childrenItem.publishContent)">发布</el-button>
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
  mounted() {
    this.comment.children.pageNum = 1
    this.comment.children.pageSize = 10
  },
  methods: {
    handLikeComment(comment) {
      this.$emit('handLikeComment', comment)
    },
    handDisLikeComment(comment) {
      this.$emit('handDisLikeComment', comment)
    },
    handLikeCommentChild(comment) {
      this.$emit('handLikeCommentChild', comment)
    },
    handDisLikeCommentChild(comment) {
      this.$emit('handDisLikeCommentChild', comment)
    },
    reloadChildren() {
      const comment = this.comment
      if (comment.total !== comment.children.total) {
        this.loadChildrenPage()
      }
    },
    loadChildrenPage() {
      const commentId = this.comment.commentId
      const children = this.comment.children
      if (children.pageNum === undefined || children.pageSize === undefined) {
        this.comment.children.pageNum = 1
        this.comment.children.pageSize = 10
      }
      this.$emit('handCommentDetailPage', commentId, children.pageNum, children.pageSize, value => {
        value.list.map(child => {
          this.$set(child, 'showInput', false)
          this.$set(child, 'publishContent', '')
        })
        this.comment.children = value
      })
    },
    handlePublishChildrenToChildren(parentId, childTarget, content) {
      // 对子评论进行评论
      this.$emit('handlePublishChildrenToChildren', parentId, childTarget, content, () => {
        this.loadChildrenPage()
      })
    },
    // 用户主页
    showCreator(creatorId) {
      console.log(creatorId)
    },
    removeCommentChild(commentId) {
      this.$emit('removeCommentChild', commentId, () => {
        this.loadChildrenPage()
      })
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
    .remove-comment-btn{
      margin-left: 40px;
    }
  }
}
.comment-username {
  font-size: 16px;
  line-height: 8px;
}
.comment-content {
  padding: 5px 40px 10px 40px;
  font-size: 14px;
  line-height: 22px;
}
.publish-commit-input {
  margin-top: 10px;
}
</style>
