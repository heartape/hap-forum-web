<template>
  <div class="content-list-container">
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
        <span class="content">{{ item.content }}</span>
        <div class="function-menu">
          <span class="data">{{ item.readerNumber }} 阅读</span>
          <span class="data">{{ item.likeNumber }} 点赞</span>
          <span class="data">{{ item.commentNumber }} 评论</span>
          <time class="data">{{ item.createdTime }}</time>
          <el-button class="function-menu-button" size="mini" type="danger" @click="removeContent(item)">删除</el-button>
        </div>
      </el-card>
    </el-row>
    <el-row class="page-container">
      <el-pagination
        :current-page.sync="content.pageNum"
        :page-size="content.pageSize"
        :total="content.total"
        background
        style="text-align: center; margin-top: 20px"
        layout="total, prev, pager, next"
        @current-change="handleLoadList"
      />
    </el-row>
  </div>
</template>

<script>
import { contentAll, contentArticle, contentDiscuss, contentTopic } from '@/api/manage'
import { error, formatDate } from '@/utils'
import { removeArticle } from '@/api/article'
import { removeDiscuss, removeTopic } from '@/api/topic'

export default {
  name: 'ContentList',
  data() {
    return {
      content: {
        pageNum: 0,
        pageSize: 10,
        list: [],
        isActive: true
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
        request = contentAll(params)
      } else if (tab === 'article') {
        request = contentArticle(params)
      } else if (tab === 'topic') {
        request = contentTopic(params)
      } else if (tab === 'discuss') {
        request = contentDiscuss(params)
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
              id: '710859085800538112',
              mainId: '710859085800538112',
              title: '关于俄乌冲突的分析',
              content: '2022年2月23日，乌克兰议会批准在全国实施紧急状态。2月24日，俄罗斯总统普京已决定在顿巴斯地区进行特别军事行动；当日，俄军已登陆乌克兰敖德萨。俄罗斯总统普京已决定在顿巴斯地区进行特别军事行动；当日，俄军已登陆乌克兰敖德萨',
              createdTime: '2022-03-16 22:20:12',
              mainType: 'article',
              type: 'article',
              readerNumber: 1,
              likeNumber: 1,
              commentNumber: 1
            },
            {
              id: '710859085800538112',
              mainId: '710859085800538112',
              title: '关于俄乌冲突的分析',
              content: '2022年2月23日，乌克兰议会批准在全国实施紧急状态。2月24日，俄罗斯总统普京已决定在顿巴斯地区进行特别军事行动；当日，俄军已登陆乌克兰敖德萨。',
              createdTime: '2022-03-16 22:20:12',
              mainType: 'article',
              type: 'article',
              readerNumber: 1,
              likeNumber: 1,
              commentNumber: 1
            }
          ]
        }
      })
    },
    contentDetail(item) {
      const mainType = item.mainType
      const id = item.mainId
      this.$router.push('/' + mainType + '/' + id)
    },
    removeContent(item) {
      const type = item.type
      const id = item.id
      let request
      if (type === 'article') {
        request = removeArticle(id)
      } else if (type === 'topic') {
        request = removeTopic(id)
      } else if (type === 'discuss') {
        request = removeDiscuss(id)
      }
      request.then(() => this.handleLoadList).catch(err => {
        error(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
    height: 20px;
    font-size: 16px;
    line-height: 20px;
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
      font-size: 14px;
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
</style>
