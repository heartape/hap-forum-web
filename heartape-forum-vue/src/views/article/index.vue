<template>
  <div class="app-container">
    <!--sort简略菜单-->
    <div class="sort-simple-container">
      <div class="left-sort-simple-container">
        <el-button v-for="item in articleSortHot" :key="item.sortId" type="text" size="small" disabled @click="switchSort(item.sortId)">{{ item.name }}</el-button>
      </div>
      <el-button class="all-sort-button" type="text" disabled @click="toSortPage">
        <p>更多</p>
        <i class="el-icon-menu" style="font-size: 22px" />
      </el-button>
    </div>
    <!--文章列表-->
    <div class="article-container">
      <el-row v-for="item in articleHot" :key="item.aid" @click.native="articleDetail(item.aid)">
        <el-card v-if="item.type === 'picture'" class="box-card" :body-style="{ padding: '0px', backgroundColor: '#ccc' }">
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
        <el-card v-else class="box-card" :body-style="{ padding: '0px' }">
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
  </div>
</template>

<script>

export default {
  data() {
    return {
      // name不要大于6个字，否则会溢出按钮
      // 最多11个sort，多的会被隐藏
      articleSortHot: [
        { sortId: 1, name: '编程' },
        { sortId: 2, name: '编程' },
        { sortId: 3, name: '编程' },
        { sortId: 4, name: '编程' },
        { sortId: 5, name: '编程' },
        { sortId: 6, name: '编程' },
        { sortId: 7, name: '编程' },
        { sortId: 8, name: '编程' },
        { sortId: 9, name: '编程' },
        { sortId: 10, name: '编程' },
        { sortId: 11, name: '编程' }
      ],
      articleHot: [
        { aid: 1, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'picture', url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png' },
        { aid: 2, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'picture', url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png' },
        { aid: 3, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'picture', url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png' },
        { aid: 4, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'text', url: null },
        { aid: 5, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'text', url: null },
        { aid: 6, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'text', url: null },
        { aid: 7, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'text', url: null },
        { aid: 8, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'text', url: null },
        { aid: 9, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'text', url: null },
        { aid: 10, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'text', url: null },
        { aid: 11, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'text', url: null },
        { aid: 12, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'text', url: null },
        { aid: 13, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'text', url: null },
        { aid: 14, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'text', url: null },
        { aid: 15, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'text', url: null },
        { aid: 16, title: '好吃的汉堡', content: '好吃的汉堡啊', like: 256, publishTime: '2021-11-22', type: 'text', url: null }
      ]
    }
  },
  created() {
    // todo:请求articleSortHot,article-hot
  },
  methods: {
    articleDetail(aid) {
      this.$router.push('/article/' + aid)
    },
    switchSort(sortId) {
      this.$router.push('/article/sort/' + sortId + '/hot')
    },
    toSortPage() {
      this.$router.push('/sort')
    }
  }
}
</script>

<style lang="scss" scoped>
.sort-simple-container {
  position: relative;
  height: 117px;
  width: 100%;
  padding: 20px 30px 10px 30px;
  margin-bottom: 20px;
  overflow: hidden;
  border: #ececec solid 1px;

  .left-sort-simple-container {
    //width: 600px;
    height: 100%;

    .el-button {
      width: 80px;
      margin: 0 20px 20px 0;
      background-color: cadetblue;
      color: #454545;
    }
  }

  .all-sort-button {
    position: absolute;
    right: 30px;
    top: 20px;
    height: 85px;
    width: 60px;
    background-color: cadetblue;
    color: #454545;
  }

  .el-button:hover {
    background-color: #999999;
  }
}
.box-card {
  width: 740px;
  max-height: 160px;
  background-color: #ccc;

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

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>

