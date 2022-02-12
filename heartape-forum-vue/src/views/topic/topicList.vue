<template>
  <div class="topic-container-body">
    <el-row v-for="item in topic.list" :key="item.tid" @click.native="topicDetail(item.tid)">
      <el-card v-if="item.cover === false" class="box-card" shadow="hover" :body-style="{ padding: '0px' }">
        <div class="introduce">
          <span class="author-container">
            <el-image
              :src="item.avatar"
              :alt="item.nickname"
              style="float: left;width: 30px; height: 30px; margin-right: 10px"
              fit="cover"
            />
            <span class="author-info-container">
              <span>{{ item.nickname }}</span>
              <i style="font-size: 14px; margin-left: 20px">{{ item.profile }}</i>
            </span>
          </span>
          <h3 class="title">{{ item.title }}</h3>
          <span class="content">{{ item.description }}</span>
          <div class="bottom clearfix" style="width: 680px">
            <span class="hot">热度:{{ item.hot }}</span>
            <time class="time">{{ item.publishTime }}</time>
          </div>
        </div>
      </el-card>
      <el-card v-else class="box-card image-box-card" shadow="hover" :body-style="{ padding: '0px' }">
        <div class="introduce image-introduce">
          <span class="author-container">
            <el-image
              :src="item.avatar"
              :alt="item.nickname"
              style="float: left;width: 30px; height: 30px; margin-right: 10px"
              fit="cover"
            />
            <span class="author-info-container">
              <span>{{ item.nickname }}</span>
              <i style="font-size: 14px; margin-left: 20px">{{ item.profile }}</i>
            </span>
          </span>
          <h3 class="title">{{ item.title }}</h3>
          <span class="content">
            <el-image
              :src="item.coverUrl"
              :alt="item.title + '的封面'"
              style="float: left;width: 160px; height: 120px; margin-right: 10px"
              fit="cover"
            />
            {{ item.description }}
          </span>
          <div class="bottom clearfix" style="width: 680px">
            <span class="hot">热度:{{ item.hot }}</span>
            <time class="time">{{ item.publishTime }}</time>
          </div>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'TopicList',
  data() {
    return {
      topic: {
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
      this.topic.current = 0
      this.getTopic()
    },
    // 滚动触发加载时机
    handleScroll() {
      if (this.scrollLoading || this.none) {
        return
      }
      const scrollTop = document.documentElement.scrollTop
      const clientHeight = document.documentElement.clientHeight
      const scrollHeight = document.documentElement.scrollHeight
      if (scrollTop + clientHeight >= scrollHeight - 500) {
        this.getTopic()
      }
    },
    getTopic() {
      this.showStatus = true
      this.scrollLoading = true
      const page = this.topic.current + 1
      // if (page > this.topic.pages) {
      //   return
      // }
      const beforeList = this.topic.list
      this.$emit('getTopic', page, val => {
        if (val.current > 1) {
          val.list = [...beforeList, ...val.list]
        }
        this.$set(this, 'topic', val)
        this.scrollLoading = false
        setTimeout(() => {
          this.showStatus = false
        }, 1000)
      })
    },
    topicDetail(topicId) {
      this.$router.push('/topic/' + topicId)
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  width: 740px;
  height: 160px;
  background-color: #ffffff;

  .introduce {
    float: right;
    height: 100px;
    width: 100%!important;
    padding: 10px;
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
      margin-bottom: 3px;

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
        background-color: cadetblue;
        text-align: center;
        color: #454545;
      }
    }
  }
}

.image-box-card {
  width: 740px;
  height: 240px;
  background-color: #ffffff;
  .image-introduce {
    height: 180px;
    .content {
      height: 130px;
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
