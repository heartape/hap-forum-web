<template>
  <div class="topic-container">
    <!--sort简略菜单-->
    <div class="sort-simple-container">
      <div class="left-sort-simple-container">
        <el-button v-for="item in topicSortHot" :key="item.sortId" type="text" size="small" disabled @click="switchSort(item.sortId)">{{ item.name }}</el-button>
      </div>
      <el-button class="all-sort-button" type="text" disabled @click="toSortPage">
        <p>更多</p>
        <i class="el-icon-menu" style="font-size: 22px" />
      </el-button>
    </div>
    <!--话题列表-->
    <div class="topic-container-body">
      <el-row v-for="item in topicHot" :key="item.tid" @click.native="topicDetail(item.tid)">
        <el-card class="box-card" :body-style="{ padding: '0px' }">
          <div class="introduce" style="width: 700px">
            <span class="title">{{ item.title }}</span>
            <span class="content">{{ item.description }}</span>
            <div class="bottom clearfix" style="width: 680px">
              <time class="time">{{ item.publishTime }}</time>
              <span class="button">热度:{{ item.like }}</span>
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
      topicSortHot: [
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
      topicHot: [
        { tid: 1, title: 'title', description: 'description', like: 256, publishTime: '2021-11-22' },
        { tid: 2, title: 'title', description: 'description', like: 256, publishTime: '2021-11-22' },
        { tid: 3, title: 'title', description: 'description', like: 256, publishTime: '2021-11-22' },
        { tid: 4, title: 'title', description: 'description', like: 256, publishTime: '2021-11-22' },
        { tid: 5, title: 'title', description: 'description', like: 256, publishTime: '2021-11-22' }
      ]
    }
  },
  created() {
    // todo:请求topicSortHot,topicHot
  },
  methods: {
    topicDetail(aid) {
      this.$router.push('/topic/' + aid)
    },
    switchSort(sortId) {
      this.$router.push('/topic/sort/' + sortId + '/hot')
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
  height: 120px;
  background-color: #ccc;

  .introduce {
    float: right;
    height: 100%;
    width: 100%!important;
    padding: 10px;

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
      margin-bottom: 3px;

      .time {
        font-size: 13px;
        color: #999;
        line-height: 15px;
      }

      span {
        position: absolute;
        right: 0;
        padding-left: 10px;
        height: 30px;
        width: 100px;
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
