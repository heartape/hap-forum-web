<template>
  <div class="content-list-container">
    <el-date-picker
      v-model="dateBetween"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions"
      style="margin: 10px 0 10px calc(50vh + 300px)"
      @change="handleLoadList"
    />
    <el-row v-for="(item, index) in content.list" :key="index">
      <el-card class="box-card" shadow="hover" :body-style="{ padding: '0px' }">
        <h3 class="title" @click.native="contentDetail(item)">{{ item.title }}</h3>
        <span class="content" @click.native="contentDetail(item)">{{ item.content }}</span>
        <div class="function-menu">
          <span class="data">{{ item.reader }} 阅读</span>
          <span class="data">{{ item.reader }} 点赞</span>
          <span class="data">{{ item.reader }} 评论</span>
          <time class="data">{{ item.createdTime }}</time>
          <el-button class="function-menu-button" size="mini" type="danger" @click="removeContent(item)">删除</el-button>
        </div>
      </el-card>
    </el-row>
    <el-pagination
      :current-page.sync="content.pageNum"
      :page-size="content.pageSize"
      :total="content.total"
      background
      style="text-align: center; margin-top: 20px"
      layout="total, prev, pager, next"
      @current-change="handleLoadList"
    />
  </div>
</template>

<script>
import { contentAll, contentArticle, contentComment, contentDiscuss, contentTopic } from '@/api/manage'
import { error } from '@/utils'
import { removeArticle, removeArticleComment, removeArticleCommentChild } from '@/api/article'
import { removeDiscussComment, removeDiscuss, removeTopic, removeDiscussCommentChild } from '@/api/topic'

export default {
  name: 'ContentList',
  data() {
    return {
      content: {
        pageNum: 0,
        pageSize: 10,
        list: []
      },
      tab: '',
      dateBetween: null,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  mounted() {
    const path = this.$route.path
    const length = path.length
    const index = path.lastIndexOf('/')
    this.tab = path.substring(index + 1, length)
    this.handleLoadList()
  },
  methods: {
    getMainTypeId(item) {
      // 主体类型
      const mainType = item.mainType
      let id
      if (mainType === 'article') {
        id = item.articleId
      } else if (mainType === 'topic') {
        id = item.topicId
      }
      return id
    },
    handleLoadList() {
      const params = {}
      if (this.dateBetween !== null) {
        params.startTime = Date.parse(this.dateBetween[0])
        params.endTime = Date.parse(this.dateBetween[1])
      } else {
        params.startTime = 0
        params.endTime = 0
      }
      params.pageNum = this.content.pageNum
      params.pageSize = this.content.pageSize
      const tab = this.tab
      let request
      // 根据
      if (tab === 'all') {
        request = contentAll(params)
      } else if (tab === 'article') {
        request = contentArticle(params)
      } else if (tab === 'topic') {
        request = contentTopic(params)
      } else if (tab === 'discuss') {
        request = contentDiscuss(params)
      } else if (tab === 'comment') {
        request = contentComment(params)
      }
      request.then(res => {
        this.content = res.data
      }).catch(err => {
        error(err)
        // title代表主体的标题,content为当前用户发表内容,若当前用户发表内容为主体类型(article,topic),则content为主题的内容
        this.content = {
          pageNum: 7,
          pageSize: 10,
          total: 67,
          list: [
            {
              articleId: '710859085800538112',
              title: '关于俄乌冲突的分析',
              content: '2022年2月23日，乌克兰议会批准在全国实施紧急状态。2月24日，俄罗斯总统普京已决定在顿巴斯地区进行特别军事行动；当日，俄军已登陆乌克兰敖德萨。',
              createdTime: '2022-03-16 22:20:12',
              mainType: 'article',
              type: 'article',
              reader: 1
            },
            {
              articleId: '710859085800538113',
              title: '关于俄乌冲突的分析',
              content: '2022年2月23日，乌克兰议会批准在全国实施紧急状态。2月24日，俄罗斯总统普京已决定在顿巴斯地区进行特别军事行动；当日，俄军已登陆乌克兰敖德萨。',
              createdTime: '2022-03-16 22:20:12',
              mainType: 'article',
              type: 'article',
              reader: 1
            }
          ]
        }
      })
    },
    contentDetail(item) {
      const mainType = item.mainType
      const id = this.getMainTypeId(item)
      this.$router.push('/' + mainType + '/' + id)
    },
    removeContent(item) {
      const type = item.type
      let request
      if (type === 'article') {
        const id = item.articleId
        request = removeArticle(id)
      } else if (type === 'topic') {
        const id = item.topicId
        request = removeTopic(id)
      } else if (type === 'discuss') {
        const id = item.discussId
        request = removeDiscuss(id)
      } else if (type === 'articleComment') {
        const id = item.commentId
        request = removeArticleComment(id)
      } else if (type === 'discussComment') {
        const id = item.commentId
        request = removeDiscussComment(id)
      } else if (type === 'articleCommentChild') {
        const id = item.commentId
        request = removeArticleCommentChild(id)
      } else if (type === 'discussCommentChild') {
        const id = item.commentId
        request = removeDiscussCommentChild(id)
      }
      request.then(() => this.handleLoadList).catch(err => {
        error(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  padding: 20px 10px;
  width: 100%;
  height: 180px;
  background-color: #ffffff;
  .title {
    display: block;
    margin: 0 10px 10px;
    width: 100%;
    height: 20px;
    line-height: 20px;
    overflow: hidden;
  }

  .content {
    display: block;
    margin-left: 10px;
    width: 100%;
    height: 60px;
    font-size: 18px;
    line-height: 30px;
    overflow: hidden;
  }

  .function-menu {
    width: 100%;
    height: 30px;
    padding-right: 60px;
    margin-top: 20px;
    line-height: 30px;

    .data {
      float: left;
      padding: 0 10px;
      height: 30px;
      min-width: 60px;
      text-align: center;
    }
    .function-menu-button {
      float: right;
      margin-right: 20px;
    }
  }
}
</style>
