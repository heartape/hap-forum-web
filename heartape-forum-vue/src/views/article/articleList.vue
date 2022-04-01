<template>
  <!--文章列表-->
  <div class="article-list-container">
    <el-row v-for="item in article.list" :key="item.articleId">
      <el-card v-if="item.isPicture === true" class="box-card" :body-style="{ padding: '0px', backgroundColor: '#ffffff' }">
        <el-image
          style="width: 200px; height: 140px; margin: 10px"
          :src="item.mainPicture"
          :fit="'cover'"
        />
        <div class="introduce">
          <span class="title" style="cursor : pointer" @click="articleDetail(item.articleId)">{{ item.title }}</span>
          <span class="content">{{ item.simpleContent }}</span>
          <div class="bottom clearfix">
            <time class="time">{{ item.publishTime }}</time>
            <span class="article-hot">热度:{{ item.like }}</span>
          </div>
        </div>
      </el-card>
      <el-card v-else class="box-card" :body-style="{ padding: '0px', backgroundColor: '#ffffff' }">
        <div class="introduce" style="width: 700px">
          <span class="title" style="cursor : pointer" @click="articleDetail(item.articleId)">{{ item.title }}</span>
          <span class="content">{{ item.simpleContent }}</span>
          <div class="bottom clearfix" style="width: 680px">
            <time class="time">{{ item.publishTime }}</time>
            <span class="article-hot">热度:{{ item.like }}</span>
          </div>
        </div>
      </el-card>
    </el-row>
    <el-row v-show="showStatus" v-loading="scrollLoading" class="status-container">
      <el-result v-if="none" icon="info" title="没有更多了" />
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'ArticleList',
  data() {
    return {
      article: {
        list: []
      },
      showStatus: false,
      scrollLoading: false,
      none: false
    }
  },
  mounted() {
    this.init()
    window.addEventListener('scroll', this.handleScroll, true)
  },
  beforeDestroy() {
    // 与addEventListener选项一致才可以销毁监听
    window.removeEventListener('scroll', this.handleScroll, true)
  },
  methods: {
    init() {
      this.article.pageNum = 0
      this.getArticle()
    },
    // 滚动触发加载时机
    handleScroll() {
      if (this.scrollLoading || this.none) {
        return
      }
      const scrollTop = document.documentElement.scrollTop
      const clientHeight = document.documentElement.clientHeight
      const scrollHeight = document.documentElement.scrollHeight
      // console.log(scrollTop + clientHeight >= scrollHeight - 200)
      if (scrollTop + clientHeight >= scrollHeight - 200) {
        this.getArticle()
      }
    },
    getArticle() {
      this.showStatus = true
      const pageNum = this.article.pageNum + 1
      const pageSize = 10
      if (pageNum !== 1 && pageNum > this.article.pages) {
        return
      }
      const beforeList = this.article.list
      this.$emit('getArticle', pageNum, pageSize, val => {
        if (val.pageNum > 1) {
          val.list = [...beforeList, ...val.list]
        }
        this.$set(this, 'article', val)
      })
    },
    articleDetail(articleId) {
      this.$router.push('/article/' + articleId)
    }
  }
}
</script>

<style lang="scss" scoped>
.article-list-container {
  .box-card {
    width: 740px;
    margin: 0 auto;
    max-height: 160px;
    background-color: #ffffff;

    .introduce {
      float: right;
      height: 140px;
      width: 495px;
      margin: 10px;

      .title {
        display: block;
        margin: 10px 0;
        width: 100%;
        height: 25px;
        line-height: 25px;
        font-weight: bold;
        overflow: hidden;
      }

      .content {
        display: block;
        width: 100%;
        height: 65px;
        font-size: 14px;
        line-height: 22px;
        overflow: hidden;
      }

      .bottom {
        position: absolute;
        bottom: 0;
        width: 480px;
        height: 30px;
        line-height: 28px;
        margin-bottom: 10px;

        .time {
          font-size: 13px;
          color: #999;
          line-height: 15px;
        }

        .article-hot {
          position: absolute;
          right: 50px;
          height: 30px;
          width: 100px;
          padding-left: 10px;
          background-color: #ecf5ff;
          color: #409EFF;
          border: #b3d8ff 1px solid;
          border-radius: 3px;
        }
      }
    }
  }
  .status-container {
    height:100px;
  }
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>
