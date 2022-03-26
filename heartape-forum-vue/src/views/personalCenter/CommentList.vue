<template>
  <div class="comment-list-container">
    <el-row class="date-picker-container">
      <el-date-picker
        v-model="dateBetween"
        type="daterange"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        @change="handleLoadList"
      />
    </el-row>
    <el-row v-for="(item, index) in content.list" :key="index">
      <el-card class="box-card" shadow="hover" :body-style="{ padding: '0px' }">
        <h3 class="title" style="cursor : pointer" @click="contentDetail(item)">{{ item.title }}</h3>
        <span class="content">
          <el-image
            :src="item.avatar"
            :alt="item.nickname"
            style="float: left;width: 20px; height: 20px; margin-right: 10px"
            fit="cover"
          />
          <el-link href="#" target="_blank">{{ item.nickname }}</el-link>
          <span> : {{ item.comment }}</span>
        </span>
        <div class="function-menu">
          <time class="data">{{ item.createdTime }}</time>
          <el-button class="function-menu-button" size="mini" type="danger" @click="removeComment(item)">删除</el-button>
        </div>
      </el-card>
    </el-row>
    <el-row class="page-container">
      <el-pagination
        :current-page.sync="content.pageNum"
        :page-size="content.pageSize"
        :total="content.total"
        background
        style="text-align: center"
        layout="total, prev, pager, next"
        @current-change="handleLoadList"
      />
    </el-row>
  </div>
</template>

<script>
import { commentAll, commentArticle, commentDiscuss } from '@/api/manage'
import { error, formatDate } from '@/utils'
import { removeArticleComment } from '@/api/article'
import { removeDiscussComment } from '@/api/topic'

export default {
  name: 'CommentList',
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
    handleLoadList() {
      const params = {}
      if (this.dateBetween !== null) {
        const startDate = new Date(this.dateBetween[0])
        const endDate = new Date(this.dateBetween[1])
        params.startTime = formatDate(startDate, 'yyyy-MM-dd')
        params.endTime = formatDate(endDate, 'yyyy-MM-dd')
      } else {
        params.startTime = undefined
        params.endTime = undefined
      }
      params.pageNum = this.content.pageNum
      params.pageSize = this.content.pageSize
      const tab = this.tab
      let request
      // 根据
      if (tab === 'all') {
        request = commentAll(params)
      } else if (tab === 'article') {
        request = commentArticle(params)
      } else if (tab === 'discuss') {
        request = commentDiscuss(params)
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
              commentId: '710859085800538112',
              targetType: 'article',
              mainType: 'article',
              mainId: '710859085800538114',
              title: '关于俄乌冲突的分析',
              uid: 1,
              avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg',
              nickname: '灰太狼',
              profile: '羊村死敌',
              comment: '一定要消灭亚速营一定要消灭亚速营一定要消灭亚速营一定要消灭亚速营一定要消灭亚速营一定要消灭亚速营一定要消灭亚速营一定要消灭亚速营一定要消灭亚速营一定要消灭亚速营一定要消灭亚速营一定要消灭亚速营一定要消灭亚速营一定要消灭亚速营一定要消灭亚速营一定要消灭亚速营',
              createdTime: '2022-03-16 22:20:12'
            },
            {
              commentId: '710859085800538113',
              targetType: 'article',
              mainType: 'article',
              mainId: '710859085800538114',
              title: '关于俄乌冲突的分析',
              uid: 1,
              avatar: 'https://gitee.com/heartape/photo-url/raw/master/avatar/1.jpeg',
              nickname: '灰太狼',
              profile: '羊村死敌',
              comment: '一定要消灭亚速营',
              createdTime: '2022-03-16 22:20:12'
            }
          ]
        }
      })
    },
    contentDetail(item) {
      const mainType = item.mainType
      const mainId = item.mainId
      this.$router.push('/' + mainType + '/' + mainId)
    },
    removeComment(item) {
      const targetType = item.targetType
      const commentId = item.commentId
      let request
      if (targetType === 'article') {
        request = removeArticleComment(commentId)
      } else if (targetType === 'discuss') {
        request = removeDiscussComment(commentId)
      }
      request.then(() => this.handleLoadList).catch(err => {
        error(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-list-container {
  .date-picker-container {
    margin: 10px 0 10px 50%;
    width: 350px;
  }
  .box-card {
    padding: 20px 10px;
    width: 100%;
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
      padding: 0 10px;
      width: 100%;
      font-size: 14px;
      line-height: 24px;
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
  .page-container {
    height: 180px;
    margin: 20px 0 40px 0;
  }
}
</style>
