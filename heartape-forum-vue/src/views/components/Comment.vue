<template>
  <transition name="el-fade-in-linear">
    <div v-show="show" class="comment-container">
      <el-input v-model="publishParentContent" class="publish-parent" placeholder="请输入评论">
        <template slot="append">
          <el-button @click="handPublishParent">发布</el-button>
        </template>
      </el-input>
      <div class="comment-show-container">
        <h3 class="comment-number-container">{{ comment.allComment }} 条评论</h3>
        <div v-for="commentItem in comment.list" :key="commentItem.commentId" class="comment-container-item">
          <el-image
            :src="commentItem.avatar"
            :alt="commentItem.nickname"
            style="float: left;width: 30px; height: 30px; margin-right: 10px"
            fit="cover"
          />
          <span class="comment-username">{{ commentItem.nickname }}</span>
          <p>{{ commentItem.content }}</p>
          <div class="parent-btn">
            <el-button type="primary" plain size="small" @click="likeComment(commentItem.commentId, commentItem)">赞同 {{ commentItem.like }}</el-button>
            <el-button type="primary" plain size="small" @click="disLikeComment(commentItem.commentId, commentItem)">踩 {{ commentItem.dislike }}</el-button>
            <el-button class="discuss-comment-count" type="primary" plain size="small" @click="commentItem.childrenShow = !commentItem.childrenShow">{{ commentItem.children.total }} 个评论</el-button>
            <el-button type="text" size="small" icon="el-icon-chat-dot-round" @click="commentItem.showInput = !commentItem.showInput">回复</el-button>
            <el-input v-show="commentItem.showInput" v-model="commentItem.publishContent" class="publish-children-to-parent" placeholder="请输入评论">
              <template slot="append">
                <el-button @click="handlePublishChildrenToParent(commentItem.commentId, commentItem.publishContent)">发布</el-button>
              </template>
            </el-input>
          </div>
          <div v-show="commentItem.childrenShow" class="comment-children-container">
            <div v-for="childrenItem in commentItem.children.list.slice(0,2)" :key="childrenItem.commentId" class="children-item-container">
              <el-image
                :src="childrenItem.avatar"
                :alt="childrenItem.nickname"
                style="float: left;width: 30px; height: 30px; margin-right: 10px"
                fit="cover"
              />
              <span class="children-username">{{ childrenItem.nickname }}</span>
              <p v-html="childrenItem.target" />
              <p v-text="childrenItem.content" />
              <el-button type="primary" plain size="small" @click="likeComment(childrenItem.commentId)">赞同 {{ childrenItem.like }}</el-button>
              <el-button type="primary" plain size="small" @click="disLikeComment(childrenItem.commentId)">踩 {{ childrenItem.dislike }}</el-button>
              <el-button type="text" size="small" icon="el-icon-chat-dot-round" @click="childrenItem.showInput = !childrenItem.showInput">回复</el-button>
              <el-input v-show="childrenItem.showInput" v-model="childrenItem.publishContent" class="publish-children-to-children" placeholder="请输入评论">
                <template slot="append">
                  <el-button @click="handlePublishChildrenToChildren(childrenItem.commentId, childrenItem.publishContent)">发布</el-button>
                </template>
              </el-input>
            </div>
            <el-button
              v-if="commentItem.children.current < commentItem.children.pages"
              style="margin-left: 30px; padding: 0; font-size: 14px"
              type="text"
              size="small"
              @click="handCommentDetailShow(commentItem)"
            >查看全部</el-button>
            <el-dialog
              title="全部评论"
              :visible="commentChoose === commentItem.commentId"
              width="600px"
              @close="handleClose(commentItem)"
            >
              <comment-detail
                :comment="commentItem.detail"
                @handCommentDetailPage="handCommentDetailPage"
                @handlePublishChildrenToParent="handlePublishChildrenToParent"
                @handlePublishChildrenToChildren="handlePublishChildrenToChildren"
              />
            </el-dialog>
          </div>
        </div>
        <el-pagination
          class="comment-pagination"
          background
          layout="prev, pager, next"
          :total="comment.total"
          :page-size="comment.size"
          :current-page="comment.current"
          @current-change="handlePageChange"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import { disLikeComment, likeComment } from '@/api/topic'
import { error } from '@/utils'
import CommentDetail from '@/views/components/CommentDetail'

export default {
  name: 'Comment',
  components: {
    CommentDetail
  },
  props: {
    comment: {
      type: Object,
      default() {
        return {}
      }
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      parentShow: {},
      publishParentContent: '',
      childrenLoading: false,
      commentChoose: ''
    }
  },
  mounted() {
    this.comment.list.map(parent => {
      this.$set(parent, 'childrenShow', false)
      this.$set(parent, 'showInput', false)
      this.$set(parent, 'publishContent', '')
      parent.children.list.map(child => {
        this.$set(child, 'showInput', false)
        this.$set(child, 'publishContent', '')
      })
    })
  },
  methods: {
    handPublishParent() {
      // 调用父组件的发布方法，并且更新数据
      this.$emit('handPublishParent', this.publishParentContent)
    },
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
    handlePageChange(page) {
      // 跳转页码
      this.$emit('commentPage', page)
    },
    handlePublishChildrenToParent(commentId, publishContent) {
      // 对父评论进行评论
      this.$emit('handlePublishChildrenToParent', commentId, publishContent)
    },
    handlePublishChildrenToChildren(commentId, publishContent) {
      // 对子评论进行评论
      this.$emit('handlePublishChildrenToChildren', commentId, publishContent)
    },
    handCommentDetailShow(comment) {
      if (comment.detail === undefined) {
        this.$emit('commentDetailInit', comment.commentId, val => {
          this.$set(comment, 'detail', val)
          this.commentChoose = comment.commentId
        })
      } else {
        this.commentChoose = comment.commentId
      }
    },
    handCommentDetailPage(commentId, page, callback) {
      this.$emit('handCommentDetailPage', commentId, page, value => {
        callback(value)
      })
    },
    handleClose() {
      this.commentChoose = ''
    }
  }
}
</script>

<style lang="scss" scoped>
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
    margin: 10px;
  }
  .el-button {
    font-size: 14px;
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
