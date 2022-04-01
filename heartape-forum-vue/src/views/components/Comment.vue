<template>
  <transition name="el-fade-in-linear">
    <div v-show="show" class="comment-container">
      <el-input v-model="publishParentContent" class="publish-parent" placeholder="请输入评论">
        <template slot="append">
          <el-button @click="handPublishParent">发布</el-button>
        </template>
      </el-input>
      <div v-show="comment.total > 0" class="comment-show-container">
        <h3 class="comment-number-container">{{ comment.total }} 条评论</h3>
        <div v-for="(commentItem, index) in comment.list" :key="commentItem.commentId" class="comment-container-item">
          <el-image
            :src="commentItem.avatar"
            :alt="commentItem.nickname"
            style="float: left;width: 30px; height: 30px; margin-right: 10px"
            fit="cover"
          />
          <el-button class="username" type="text" @click="showCreator(commentItem.uid)">{{ commentItem.nickname }}</el-button>
          <p class="comment-content">{{ commentItem.content }}</p>
          <div class="parent-btn">
            <el-button type="primary" plain size="mini" @click="handLikeComment(commentItem)">赞同 {{ commentItem.like }}</el-button>
            <el-button type="primary" plain size="mini" @click="handDisLikeComment(commentItem)">踩 {{ commentItem.dislike }}</el-button>
            <el-button class="discuss-comment-count" type="primary" plain size="mini" :disabled="!(commentItem.total > 0)" @click="showCommentDetail(commentItem, index)">全部 {{ commentItem.total }} 个评论</el-button>
            <el-button type="text" size="mini" icon="el-icon-chat-dot-round" @click="commentItem.showInput = !commentItem.showInput">回复</el-button>
            <el-button v-if="commentItem.uid === $store.getters.uid" class="remove-comment-btn" type="text" size="mini" @click="removeComment(commentItem.commentId)">删除</el-button>
            <transition name="el-fade-in-linear">
              <el-input v-show="commentItem.showInput" v-model="commentItem.publishContent" class="publish-children-to-parent" placeholder="请输入评论">
                <template slot="append">
                  <el-button @click="handlePublishChildrenToParent(commentItem.commentId, commentItem.publishContent)">发布</el-button>
                </template>
              </el-input>
            </transition>
          </div>
          <transition name="el-fade-in-linear">
            <div class="comment-children-container">
              <div v-for="childrenItem in commentItem.simpleChildren.list" :key="childrenItem.commentId" class="children-item-container">
                <el-image
                  :src="childrenItem.avatar"
                  :alt="childrenItem.nickname"
                  style="float: left;width: 30px; height: 30px; margin-right: 10px"
                  fit="cover"
                />
                <el-button class="username" type="text" @click="showCreator(childrenItem.uid)">{{ childrenItem.nickname }}</el-button>
                <p class="comment-content" v-text="childrenItem.content" />
                <el-button type="primary" plain size="mini" @click="handLikeCommentChild(childrenItem)">赞同 {{ childrenItem.like }}</el-button>
                <el-button type="primary" plain size="mini" @click="handDisLikeCommentChild(childrenItem)">踩 {{ childrenItem.dislike }}</el-button>
                <el-button type="text" size="mini" icon="el-icon-chat-dot-round" @click="childrenItem.showInput = !childrenItem.showInput">回复</el-button>
                <el-button v-if="childrenItem.uid === $store.getters.uid" class="remove-comment-btn" type="text" size="mini" @click="removeCommentChild(childrenItem.commentId)">删除</el-button>
                <transition name="el-fade-in-linear">
                  <el-input v-show="childrenItem.showInput" v-model="childrenItem.publishContent" class="publish-children-to-children" placeholder="请输入评论">
                    <template slot="append">
                      <el-button @click="handlePublishChildrenToChildren(commentItem.commentId, childrenItem.commentId, childrenItem.publishContent)">发布</el-button>
                    </template>
                  </el-input>
                </transition>
              </div>
              <el-dialog
                title="全部评论"
                :visible="commentChoose === commentItem.commentId"
                width="600px"
                @close="commentChoose = ''"
              >
                <comment-detail
                  ref="commentDetail"
                  :comment="commentItem"
                  @handCommentDetailPage="handCommentDetailPage"
                  @handlePublishChildrenToChildren="handlePublishChildrenToChildren"
                  @handLikeComment="handLikeComment"
                  @handDisLikeComment="handDisLikeComment"
                  @handLikeCommentChild="handLikeCommentChild"
                  @handDisLikeCommentChild="handDisLikeCommentChild"
                  @removeCommentChild="removeCommentChild"
                />
              </el-dialog>
            </div>
          </transition>
        </div>
        <el-pagination
          class="comment-pagination"
          background
          layout="prev, pager, next"
          :total="comment.total"
          :page-size="comment.pageSize"
          :current-page.sync="comment.pageNum"
          @current-change="handCommentPage"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import CommentDetail from '@/views/components/CommentDetail'
import { error } from '@/utils'

export default {
  name: 'Comment',
  components: {
    CommentDetail
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    allComment: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      comment: {
        pageNum: 1,
        pageSize: 10
      },
      parentShow: {},
      publishParentContent: '',
      childrenLoading: false,
      commentChoose: ''
    }
  },
  mounted() {
    if (this.show) {
      this.handCommentPage()
    }
    this.$on('handCommentInit', this.handCommentInit)
  },
  methods: {
    // 对于不想一进父组件就加载评论的情况，提供手动初始化方法
    handCommentInit() {
      if (this.comment.pageNum === 1 && this.comment.total === undefined) {
        this.handCommentPage()
      }
    },
    // 父评论翻页
    handCommentPage() {
      const pageNum = this.comment.pageNum
      const pageSize = this.comment.pageSize
      this.$emit('handCommentPage', pageNum, pageSize, val => {
        val.list.map(parent => {
          this.$set(parent, 'showInput', false)
          this.$set(parent, 'publishContent', '')
          // 为了子组件在创建时不报total不存在的错误
          this.$set(parent, 'children', { total: 0 })
          if (parent.simpleChildren !== undefined && parent.simpleChildren.length !== 0) {
            parent.simpleChildren.map(child => {
              this.$set(child, 'showInput', false)
              this.$set(child, 'publishContent', '')
            })
          }
        })
        this.comment = val
      })
    },
    handPublishParent() {
      if (this.publishParentContent.trim() === '') {
        error('内容为空')
        return
      }
      this.$emit('handPublishParent', this.publishParentContent)
      this.publishParentContent = ''
    },
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
    handlePublishChildrenToParent(commentId, content) {
      if (content.trim() === '') {
        error('内容为空')
        return
      }
      // 对父评论进行评论
      this.$emit('handlePublishChildrenToParent', commentId, content)
    },
    showCommentDetail(comment, index) {
      this.commentChoose = comment.commentId
      // total === 0的情况下
      if (comment.total !== 0) {
        // 因为el-dialog窗口并未渲染完成，所以无法获取子组件,this.$nextTick等待渲染完成
        this.$nextTick(() => this.$refs.commentDetail[index].reloadChildren())
      }
    },
    handlePublishChildrenToChildren(parentId, childTarget, content, callback) {
      if (content.trim() === '') {
        error('内容为空')
        return
      }
      // 对子评论进行评论
      this.$emit('handlePublishChildrenToChildren', parentId, childTarget, content, () => {
        callback()
      })
    },
    handCommentDetailPage(commentId, pageNum, pageSize, callback) {
      this.$emit('handCommentDetailPage', commentId, pageNum, pageSize, value => {
        callback(value)
      })
    },
    removeComment(commentId) {
      this.$emit('removeComment', commentId)
    },
    removeCommentChild(commentId, callback) {
      this.$emit('removeCommentChild', commentId, () => {
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
.comment-container {
  padding-top: 10px;
  .publish-parent {
    margin-bottom: 10px;
  }
  .comment-show-container {
    border: #b5ccf3 solid 1px;
    width: 720px;
    .comment-number-container {
      margin: 0;
      padding: 10px;
      border-bottom: #b5ccf3 solid 1px;
    }
    .comment-container-item {
      padding: 10px 10px 0 10px;
      border-bottom: #b5ccf3 solid 1px;
      .username {
        font-size: 16px;
        line-height: 8px;
      }
      .comment-content {
        padding: 5px 40px 15px 40px;
        line-height: 22px;
        font-size: 14px;
      }
      .parent-btn {
        margin-bottom: 10px;
        .publish-children-to-parent {
          margin-top: 10px;
        }
      }
    }
    .children-item-container {
      padding: 10px 10px 10px 30px;
      width: 100%;
      border-top: #b5ccf3 solid 1px;
      .publish-children-to-children {
        margin-top: 10px;
      }
    }
    .comment-pagination {
      text-align: center;
      margin: 10px;
    }
    .el-button {
      font-size: 14px;
    }
  }
  .remove-comment-btn{
    margin-left: 40px;
  }
}
</style>

<style scoped>
.el-dialog__wrapper /deep/ .el-dialog {
  display: flex;
  flex-direction: column;
  margin:0 !important;
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  height:600px;
}
.el-dialog__wrapper /deep/ .el-dialog__body {
  padding: 0;
  overflow: auto;
}
.el-dialog__wrapper /deep/ .el-dialog__header {
  padding: 10px 20px;
}
</style>
