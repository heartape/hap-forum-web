<template>
  <!--文章列表-->
  <div class="article-container">
    <el-menu
      default-active="1"
      class="article-menu-container"
      mode="horizontal"
      text-color="#121212"
      active-text-color="#06f"
      @select="handleSelect"
    >
      <el-menu-item index="1">推荐</el-menu-item>
      <el-menu-item index="2">热点</el-menu-item>
      <el-menu-item index="3">关注</el-menu-item>
    </el-menu>
    <el-row v-for="item in articleHot" :key="item.aid" @click.native="articleDetail(item.aid)">
      <el-card v-if="item.type === 'picture'" class="box-card" :body-style="{ padding: '0px', backgroundColor: '#ffffff' }">
        <el-image
          style="width: 200px; height: 140px; margin: 10px"
          :src="item.url"
          :fit="'cover'"
        />
        <div class="introduce">
          <span class="title">{{ item.title }}</span>
          <span class="content">{{ item.content }}</span>
          <div class="bottom clearfix">
            <time class="time">{{ item.publishTime }}</time>
            <span class="article-hot">热度:{{ item.like }}</span>
          </div>
        </div>
      </el-card>
      <el-card v-else class="box-card" :body-style="{ padding: '0px', backgroundColor: '#ffffff' }">
        <div class="introduce" style="width: 700px">
          <span class="title">{{ item.title }}</span>
          <span class="content">{{ item.content }}</span>
          <div class="bottom clearfix" style="width: 680px">
            <time class="time">{{ item.publishTime }}</time>
            <span class="article-hot">热度:{{ item.like }}</span>
          </div>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ArticleList',
  props: {
    articleHot: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
    articleDetail(aid) {
      this.$router.push('/article/' + aid)
    },
    handleSelect(key) {
      // todo:根据key获取文章列表,将文章列表和菜单选项抽取出来,方便添加不同样式
      console.log(key)
    }
  }
}
</script>

<style lang="scss" scoped>
.article-container {
  padding: 10px;
  .article-menu-container {
    border: #eeeeee 1px solid;
    .el-menu-item {
      width: 100px;
      text-align: center;
      font-size: 18px;
    }
  }
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
        line-height: 25px;
        margin-bottom: 10px;

        .time {
          font-size: 13px;
          color: #999;
          line-height: 15px;
        }

        span {
          position: absolute;
          right: 50px;
          height: 30px;
          width: 100px;
          padding-left: 10px;
          background-color: cadetblue;
          color: #454545;
        }
      }
    }
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
