<template>
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
</template>

<script>
export default {
  name: 'TopicList',
  props: {
    topicHot: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    topicDetail(aid) {
      this.$router.push('/topic/' + aid)
    }
  }
}
</script>

<style lang="scss" scoped>
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
