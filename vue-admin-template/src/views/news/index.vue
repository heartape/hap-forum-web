<template>
  <div class="app-container">
    <!--轮播图-->
    <el-carousel trigger="click" height="350px">
      <el-carousel-item v-for="(item, index) in newsRecommend" :key="index">
        <el-image
          style="width: 100%; height: 350px"
          :src="item"
          :fit="'cover'"
        />
      </el-carousel-item>
    </el-carousel>
    <!--带图新闻列表-->
    <div class="news-picture" style="width: 480px; display: inline-block">
      <el-row v-for="(item) in news" :key="item.nid" style="width: 480px">
        <el-card class="box-card" :body-style="{ padding: '0px' }">
          <el-image
            style="width: 200px; height: 130px; margin: 10px"
            :src="item.url"
            :fit="'cover'"
          />
          <div class="introduce">
            <span class="title">{{ item.title }}</span>
            <span class="content">{{ item.content }}</span>
            <div class="bottom clearfix">
              <span class="time">{{ item.publishTime }}</span>
              <el-button type="text" class="source" @click="toAuthor(item.uid)">{{ item.author }}</el-button>
            </div>
          </div>
        </el-card>
      </el-row>
    </div>
    <!--不带图新闻列表-->
    <div class="news-simple" style="float: right; width: 250px; margin-top: 20px">
      <el-row v-for="(item) in newsSimple" :key="item.nid" style="width: 250px">
        <div class="news-simple">
          <span class="title">{{ item.title }}</span>
          <span class="content">{{ item.content }}</span>
          <div class="bottom clearfix">
            <span class="time">{{ item.publishTime }}</span>
            <el-button type="text" class="source" @click="toAuthor(item.uid)">{{ item.author }}</el-button>
          </div>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsRecommend: [
        'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
      ],
      news: [
        // 限制昵称8个字符
        { nid: 1, title: '好吃的汉堡', author: '灰太狼', uid: '3123', content: '好吃的汉堡啊', publishTime: '2021-11-22', url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png' },
        { nid: 2, title: '好吃的汉堡', author: '灰太狼', uid: '3123', content: '好吃的汉堡啊', publishTime: '2021-11-22', url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png' },
        { nid: 3, title: '好吃的汉堡', author: '灰太狼', uid: '3123', content: '好吃的汉堡啊', publishTime: '2021-11-22', url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png' },
        { nid: 4, title: '好吃的汉堡', author: '灰太狼', uid: '3123', content: '好吃的汉堡啊', publishTime: '2021-11-22', url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png' }
      ],
      newsSimple: [
        // 限制昵称8个字符
        { nid: 1, title: '好吃的汉堡', author: '灰太狼', uid: '3123', content: '好吃的汉堡啊好吃的汉堡啊好吃的汉堡啊好吃的汉堡啊', publishTime: '2021-11-22' },
        { nid: 2, title: '好吃的汉堡', author: '灰太狼', uid: '3123', content: '好吃的汉堡啊', publishTime: '2021-11-22' },
        { nid: 3, title: '好吃的汉堡', author: '灰太狼', uid: '3123', content: '好吃的汉堡啊', publishTime: '2021-11-22' },
        { nid: 4, title: '好吃的汉堡', author: '灰太狼', uid: '3123', content: '好吃的汉堡啊', publishTime: '2021-11-22' }
      ]
    }
  },
  methods: {
    toAuthor(uid) {
      // 跳转该用户详情
      // this.$router.push({ path: '/user', query: uid })
    }
  }
}
</script>

<style scoped>
.box-card {
  width: 480px;
  max-height: 150px;
}
.introduce {
  float: right;
  height: 130px;
  width: 235px;
  margin: 10px;
}
.title {
  display: block;
  margin: 8px 0;
  width: 100%;
  height: 25px;
  line-height: 25px;
  overflow: hidden;
}
.content {
  display: block;
  width: 100%;
  height: 62px;
  font-size: 14px;
  line-height: 20px;
  overflow: hidden;
}
.bottom {
  position: absolute;
  bottom: 0px;
  width: 210px;
  height: 20px;
  margin: 13px 0;
  line-height: 18px;
}

.time {
  font-size: 13px;
  color: #999;
  margin-left: 10px;
}

.source {
  float: right;
  font-size: 12px;
  padding: 2px;
  max-width: 100px;
  overflow: hidden;
}
.news-simple .title {
  margin-bottom: 0;
}
.news-simple .content {
  height: 20px;
  width: 90%;
  font-size: 12px;
}
.news-simple .bottom {
  position: relative;
  margin: 0;
  height: 15px;
  line-height: 16px;
}

.news-simple .source {
  position: relative;
  margin: 0;
  height: 15px;
  line-height: 10px;
  padding: 0;
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

