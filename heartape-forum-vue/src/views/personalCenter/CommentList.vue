<template>
  <div class="comment-list-container">
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
          <time class="data">{{ item.createdTime }}</time>
          <el-button class="function-menu-button" size="mini" type="danger" @click="removeContentComment(item)">删除</el-button>
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
import { commentAll, commentArticle, commentComment, commentDiscuss } from '@/api/manage'
import { error } from '@/utils'
import { removeArticleComment, removeArticleCommentChild } from '@/api/article'
import { removeDiscussComment, removeDiscussCommentChild } from '@/api/topic'

export default {
  name: 'CommentList',
  data() {
    return {
      content: {
        pageNum: 0,
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
      const tab = this.tab
      let request
      // 根据
      if (tab === 'all') {
        request = commentAll(params)
      } else if (tab === 'article') {
        request = commentArticle(params)
      } else if (tab === 'discuss') {
        request = commentDiscuss(params)
      } else if (tab === 'comment') {
        request = commentComment(params)
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
              content: '一定要消灭亚速营',
              createdTime: '2022-03-16 22:20:12',
              mainType: 'article',
              targetType: 'article',
              targetId: '710859085800538114',
              reader: 1
            },
            {
              articleId: '710859085800538113',
              title: '关于俄乌冲突的分析',
              content: '一定要消灭亚速营',
              createdTime: '2022-03-16 22:20:12',
              mainType: 'article',
              targetType: 'article',
              targetId: '710859085800538115',
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
      const targetType = item.targetType
      const targetId = item.targetId
      let request
      if (targetType === 'article') {
        request = removeArticleComment(targetId)
      } else if (targetType === 'discuss') {
        request = removeDiscussComment(targetId)
      } else if (targetType === 'articleComment') {
        request = removeArticleCommentChild(targetId)
      } else if (targetType === 'discussComment') {
        request = removeDiscussCommentChild(targetId)
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
  height: 140px;
  background-color: #ffffff;
  .title {
    display: block;
    margin: 0 10px 10px;
    width: 100%;
    height: 18px;
    font-size: 16px;
    line-height: 18px;
    overflow: hidden;
  }

  .content {
    display: block;
    margin-left: 10px;
    width: 100%;
    height: 30px;
    font-size: 16px;
    line-height: 30px;
    overflow: hidden;
  }

  .function-menu {
    width: 100%;
    height: 30px;
    padding-right: 60px;
    margin-top: 10px;
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
