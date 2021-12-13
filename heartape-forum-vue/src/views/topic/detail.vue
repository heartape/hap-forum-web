<template>
  <div class="topic-container">
    <div class="topic-description-container">
      <el-row>
        <el-button v-for="sortItem in topic.sort" :key="sortItem.sortId" class="topic-sort-item" round @click="toSortTopic(sortItem.sortId)">{{ sortItem.name }}</el-button>
      </el-row>
      <el-card>
        <h1>{{ topic.title }}</h1>
        <p>{{ topic.description }}</p>
        <el-button class="button" @click="likeTopic(topic.tid)">点赞:{{ topic.like }}</el-button>
      </el-card>
    </div>
    <h2>{{ topic.discuss.total }} 个回答</h2>
    <div class="topic-discuss-container">
      <div v-for="discussItem in topic.discuss.list" :key="discussItem.did">
        <div class="only-discuss-container">
          <div class="discuss-creator-container">
            <img src="#">
            <span>username</span>
            <p>introduce</p>
          </div>
          <p>{{ discussItem.content }}</p>
          <div class="discuss-menu">
            <el-button @click="likeDiscuss(discussItem.did)">赞同 {{ discussItem.like }}</el-button>
            <el-button @click="disLikeDiscuss(discussItem.did)">踩</el-button>
            <el-button class="discuss-comment-count" @click="handleParentShow(discussItem.did)">{{ discussItem.comment.total }} 个评论</el-button>
          </div>
        </div>
        <div v-show="parentShow[discussItem.did]" class="comment-container">
          <div v-for="commentItem in discussItem.comment.list" :key="commentItem.cid" class="comment-container-item">
            <img src="#">
            <span>username</span>
            <p>{{ commentItem.content }}</p>
            <el-button @click="likeComment(commentItem.cid)">赞同 {{ commentItem.like }}</el-button>
            <el-button @click="disLikeComment(commentItem.cid)">踩</el-button>
            <el-button class="discuss-comment-count" @click="handleChildrenShow(commentItem.cid)">{{ commentItem.children.total }} 个评论</el-button>
            <div v-show="childrenShow[commentItem.cid]" class="comment-children-container">
              <div v-for="childrenItem in commentItem.children.list" :key="childrenItem.cid" class="children-item-container">
                <img src="#">
                <span>username</span>
                <p>{{ childrenItem.content }}</p>
                <el-button @click="likeComment(childrenItem.cid)">赞同 {{ childrenItem.like }}</el-button>
                <el-button @click="disLikeComment(childrenItem.cid)">踩</el-button>
              </div>
              <el-button
                v-if="commentItem.children.page * commentItem.children.size < commentItem.children.total"
                @click="loadChildren(commentItem.cid)"
              >加载更多</el-button>
            </div>
          </div>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="discussItem.comment.totalParent"
            :page-size="discussItem.comment.size"
            :current-page="discussItem.comment.page"
            @current-change="handlePageChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      topic: {
        tid: 1,
        title: 'title',
        description: 'description',
        sort: [
          { sortId: 1, name: '编程' },
          { sortId: 2, name: '计算机' }
        ],
        publishTime: '2021-12-11 19:10',
        like: 100,
        discuss: {
          total: 14,
          page: 1,
          size: 10,
          list: [
            { did: 1, uid: 1, content: 'discuss', like: 100, publishTime: '2021-12-11 19:10',
              comment: {
                total: 374,
                totalParent: 112,
                page: 2,
                size: 10,
                list: [
                  { cid: 1, uid: 1, content: 'comment', like: 100, publishTime: '2021-12-11 19:10',
                    children: {
                      total: 32,
                      page: 1,
                      size: 10,
                      list: [
                        { cid: 2, uid: 1, content: 'comment', like: 100, publishTime: '2021-12-11 19:10' }
                      ]
                    }
                  },
                  { cid: 3, uid: 1, content: 'comment', like: 100, publishTime: '2021-12-11 19:10',
                    children: {
                      total: 32,
                      page: 1,
                      size: 10,
                      list: [
                        { cid: 4, uid: 1, content: 'comment', like: 100, publishTime: '2021-12-11 19:10' }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      discussShow: { 1: false },
      parentShow: {},
      childrenShow: {}
    }
  },
  created() {
    // 获取topic数据
    // 创建父评论与子评论的展示状态对象
    const discussList = this.topic.discuss.list
    discussList.forEach(item => {
      const did = item.did
      // 动态新增
      this.$set(this.parentShow, did, false)
      const commentList = item.comment.list
      commentList.forEach(item => {
        const cid = item.cid
        this.$set(this.childrenShow, cid, false)
      })
    })
  },
  methods: {
    toSortTopic(sortId) {
      // 跳转目标sort的topic列表
      alert('跳转sort')
    },
    likeTopic(tid) {
      // 当前话题点赞加一,后台对比是否有点赞记录
      alert('点赞Topic:' + tid)
    },
    likeDiscuss(cid) {
      // 讨论点赞加一,后台对比是否有点赞记录
      alert('点赞Discuss:' + cid)
    },
    disLikeDiscuss(cid) {
      // 讨论踩加一,后台对比是否有踩记录
      alert('踩Discuss:' + cid)
    },
    likeComment(cid) {
      // 评论点赞加一,后台对比是否有点赞记录
      alert('点赞Comment:' + cid)
    },
    disLikeComment(cid) {
      // 评论踩加一,后台对比是否有踩记录
      alert('踩Comment:' + cid)
    },
    handlePageChange(page) {
      // 跳转页码
      alert('跳转到第' + page + '页')
    },
    loadChildren(cid) {
      alert('加载更多')
    },
    handleDiscussShow(did) {
      // 展开discuss
    },
    handleParentShow(did) {
      this.parentShow[did] = !this.parentShow[did]
    },
    handleChildrenShow(cid) {
      this.childrenShow[cid] = !this.childrenShow[cid]
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
      margin-bottom: 10px;
      border: #5a5e66 solid 2px;
    }

    .children-item-container {
      margin: 10px;
      width: 90%;
      border: #5a5e66 solid 2px;
    }
  }
}
</style>

