<template>
  <div class="app-container">
    <!--轮播图-->
    <el-carousel trigger="click" height="250px">
      <el-carousel-item v-for="(item, index) in articleRecommend" :key="index">
        <el-image
          style="width: 100%; height: 250px"
          :src="item"
          :fit="'cover'"
        />
      </el-carousel-item>
    </el-carousel>
    <!--文章列表-->
    <el-row v-for="item in article" :key="item.id">
      <el-card v-if="item.type === 'picture'" class="box-card" :body-style="{ padding: '0px' }">
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
            <el-button type="text" class="button">点赞</el-button>
          </div>
        </div>
      </el-card>
      <el-card v-else class="box-card" :body-style="{ padding: '0px' }">
        <div class="introduce" style="width: 700px">
          <span class="title">{{ item.title }}</span>
          <span class="content">{{ item.content }}</span>
          <div class="bottom clearfix" style="width: 680px">
            <time class="time">{{ item.publishTime }}</time>
            <el-button type="text" class="button">点赞</el-button>
          </div>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>

export default {
  data() {
    return {
      articleRecommend: [
        'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        require('../article/cartoon.jpg'),
        'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        require('../article/cartoon.jpg')
      ],
      article: [
        { id: 1, title: '好吃的汉堡', content: '好吃的汉堡啊', publishTime: '2021-11-22', type: 'picture', url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png' },
        { id: 2, title: '好吃的汉堡', content: '好吃的汉堡啊', publishTime: '2021-11-22', type: 'picture', url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png' },
        { id: 3, title: '好吃的汉堡', content: '好吃的汉堡啊', publishTime: '2021-11-22', type: 'picture', url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png' },
        { id: 4, title: '好吃的汉堡', content: '好吃的汉堡啊', publishTime: '2021-11-22', type: 'text', url: null }
      ]
    }
  }
}
</script>

<style scoped>
.box-card {
  width: 740px;
  max-height: 160px;
}
.introduce {
  float: right;
  height: 140px;
  width: 495px;
  margin: 10px;
}
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
  bottom: 0px;
  width: 480px;
  height: 20px;
  margin: 13px 0;
  line-height: 18px;
}

.time {
  font-size: 13px;
  color: #999;
  margin-left: 20px;
}

.button {
  padding: 0;
  float: right;
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

