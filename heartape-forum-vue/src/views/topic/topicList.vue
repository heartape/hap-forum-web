<template>
  <div class="topic-container-body">
    <el-row v-for="item in topic.list" :key="item.tid">
      <el-card v-if="item.isPicture === false" class="box-card" shadow="hover" :body-style="{ padding: '0px' }">
        <div class="introduce">
          <h3 class="title" style="cursor : pointer" @click="topicDetail(item.topicId)">{{ item.title }}</h3>
          <span class="content">{{ item.simpleDescription }}</span>
          <div class="bottom clearfix" style="width: 680px">
            <span class="hot">热度:{{ item.hot }}</span>
            <time class="time">{{ item.createdTime }}</time>
          </div>
        </div>
      </el-card>
      <el-card v-else class="box-card image-box-card" shadow="hover" :body-style="{ padding: '0px' }">
        <div class="introduce image-introduce">
          <h3 class="title" style="cursor : pointer" @click="topicDetail(item.topicId)">{{ item.title }}</h3>
          <span class="content">
            <el-image
              :src="item.mainPicture"
              :alt="item.title"
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
      this.topic.pageNum = 1
      this.topic.pageSize = 10
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
      if (scrollTop + clientHeight >= scrollHeight - 200) {
        this.getTopic()
      }
    },
    getTopic() {
      this.showStatus = true
      this.scrollLoading = true
      const pageNum = this.topic.pageNum
      const pageSize = this.topic.pageSize
      if (pageNum !== 1 && pageNum > this.topic.pages || this.topic.pages === 1) {
        return
      }
      const beforeList = this.topic.list
      this.$emit('getTopic', pageNum, pageSize, val => {
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
  padding: 10px;
  width: 740px;
  min-height: 130px;
  background-color: #ffffff;

  .introduce {
    height: 100%;
    width: 100%;

    .title {
      display: block;
      margin-bottom: 5px;
      width: 100%;
      height: 18px;
      font-size: 16px;
      line-height: 18px;
      overflow: hidden;
    }

    .content {
      display: block;
      padding-top: 5px;
      width: 100%;
      font-size: 14px;
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

.image-box-card {
  width: 740px;
  background-color: #ffffff;
  .image-introduce {
    height: 180px;
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
