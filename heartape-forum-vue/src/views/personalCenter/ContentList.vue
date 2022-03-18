<template>
  <div class="content-list-container">
    <el-row v-for="(item, index) in content.list" :key="index">
      <el-card class="box-card" shadow="hover" :body-style="{ padding: '0px' }">
        <div class="introduce">
          <h3 class="title" @click.native="topicDetail(item)">{{ item.title }}</h3>
          <span class="content" @click.native="topicDetail(item)">{{ item.description }}</span>
          <div class="function-menu">
            <span class="hot">热度:{{ item.hot }}</span>
            <time class="time">{{ item.publishTime }}</time>
          </div>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import { contentAll } from '@/api/manage'

export default {
  name: 'ContentList',
  data() {
    return {
      content: {
        pageNum: 0,
        list: []
      },
      tab: ''
    }
  },
  mounted() {
    const path = this.$route.path
    const length = path.length
    const index = path.lastIndexOf('/')
    this.tab = path.substring(index + 1, length)
  },
  methods: {
    getContent() {
      const pageNum = this.content.pageNum + 1
      const tab = this.tab
      let request
      // 根据
      if (tab === 'all') {
        request = contentAll(pageNum)
      }
      request.then(res => {
        // todo:如果超出分页范围报错
        this.content = res.data
      })
    },
    topicDetail(item) {
      // 主体类型
      const mainType = item.mainType
      // 内容类型
      const type = item.type
      let id
      if (type === 'article') {
        id = item.articleId
      } else if (type === 'topic') {
        id = item.topicId
      } else if (type === 'discuss') {
        id = item.discussId
      } else if (type === 'comment') {
        id = item.commentId
      }
      this.$router.push('/' + mainType + '/' + id)
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  padding: 10px;
  width: 740px;
  height: 170px;
  background-color: #ffffff;

  .introduce {
    height: 100%;
    width: 100%;
    .author-info-container {
      position: relative;
      top: 5px;
    }

    .title {
      display: block;
      margin-bottom: 5px;
      width: 100%;
      height: 18px;
      line-height: 18px;
      overflow: hidden;
    }

    .content {
      display: block;
      padding-top: 5px;
      width: 100%;
      height: 50px;
      font-size: 18px;
      line-height: 22px;
      overflow: hidden;
    }

    .bottom {
      position: absolute;
      bottom: 0;
      width: 480px;
      height: 30px;
      line-height: 30px;
      margin-bottom: 10px;

      .time {
        font-size: 13px;
        color: #999;
        line-height: 15px;
      }

      .hot {
        float: left;
        margin-right: 30px;
        height: 30px;
        width: 100px;
        text-align: center;
        background-color: #ecf5ff;
        color: #409EFF;
        border: #b3d8ff 1px solid;
        border-radius: 3px;
      }
    }
  }
}
</style>
