<template>
  <el-collapse-transition>
    <div v-show="show" class="comment-container">
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
          <el-button type="primary" plain @click="likeComment(commentItem.commentId, commentItem)">赞同 {{ commentItem.like }}</el-button>
          <el-button type="primary" plain @click="disLikeComment(commentItem.commentId, commentItem)">踩 {{ commentItem.dislike }}</el-button>
          <el-button class="discuss-comment-count" type="primary" plain @click="handleChildrenShow(commentItem.commentId)">{{ commentItem.children.total }} 个评论</el-button>
        </div>
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
            <el-button type="primary" plain @click="likeComment(childrenItem.commentId)">赞同 {{ childrenItem.like }}</el-button>
            <el-button type="primary" plain @click="disLikeComment(childrenItem.commentId)">踩 {{ childrenItem.dislike }}</el-button>
          </div>
          <el-button
            v-if="commentItem.children.page * commentItem.children.size < commentItem.children.total"
            v-loading="childrenLoading"
            :disabled="childrenLoading"
            style="margin-left: 30px; padding: 0; font-size: 16px"
            type="text"
            @click="loadChildren(commentItem.commentId, commentItem.children.page, commentItem.children)"
          >加载更多</el-button>
        </div>
      </div>
      <el-pagination
        class="comment-pagination"
        background
        layout="prev, pager, next"
        :total="comment.total"
        :page-size="comment.size"
        :current-page="comment.page"
        @current-change="handlePageChange"
      />
    </div>
  </el-collapse-transition>
</template>

<script>
import { disLikeComment, likeComment, showChildren } from '@/api/topic'

export default {
  name: 'Comment',
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
      childrenShow: {},
      childrenLoading: false
    }
  },
  mounted() {
    const commentList = this.comment.list
    commentList.forEach(item => {
      const commentId = item.commentId
      this.$set(this.childrenShow, commentId, false)
    })
  },
  methods: {
    error(message) {
      this.$notify.error({
        title: '请求失败',
        message: message
      })
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
    handlePageChange(page) {
      // 跳转页码
      this.$emit('commentPage', page)
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
    handleParentShow() {
      this.show = !this.show
    },
    handleChildrenShow(commentId) {
      this.childrenShow[commentId] = !this.childrenShow[commentId]
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-container {
  border: #b5ccf3 solid 1px;
  margin: 0 10px;
  width: 740px;
  .comment-number-container {
    margin: 0;
    padding: 10px;
    border-bottom: #b5ccf3 solid 1px;
  }
  .comment-container-item {
    padding: 10px;
    border-bottom: #b5ccf3 solid 1px;
  }
  .children-item-container {
    padding: 10px 10px 10px 30px;
    margin-top: 10px;
    width: 100%;
    border-top: #b5ccf3 solid 1px;
  }
  .comment-pagination {
    margin: 10px;
  }
}
</style>
