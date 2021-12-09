<template>
  <div class="produce-center-container">
    <i class="el-icon-s-custom produce-center-title" style="color: cornflowerblue">创作中心</i>
    <div class="produce-center-list">
      <el-button class="produce-center-item" @click="createEdit(url.article)">
        <p class="el-icon-edit produce-center-item-icon" style="background-color: darkkhaki" />
        <p>写文章</p>
      </el-button>
      <el-button class="produce-center-item" @click="createEdit(url.topic)">
        <p class="el-icon-chat-dot-round produce-center-item-icon" style="background-color: #e17272" />
        <p>聊人生</p>
      </el-button>
      <el-button class="produce-center-item" @click="createEdit(url.knowledge)">
        <p class="el-icon-notebook-1 produce-center-item-icon" style="background-color: cadetblue" />
        <p>授知识</p>
      </el-button>
      <el-button class="produce-center-item" @click="createEdit(url.news)">
        <p class="el-icon-news produce-center-item-icon" style="background-color: darkseagreen" />
        <p>谈新闻</p>
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProduceCenter',
  data() {
    return {
      url: {
        'article': '/article/publish',
        'topic': '/topic/publish',
        'knowledge': '/knowledge/publish',
        'news': '/news/publish'
      }
    }
  },
  methods: {
    createEdit(url) {
      this.$router.push(url)
    }
  }
}
</script>

<style scoped>
.produce-center-container {
  height: 180px;
  width: 100%;
  padding: 15px;
}
.produce-center-title {
  width: 100%;
  margin-bottom: 22px;
  font-size: 18px;
  text-align: left;
  color: #2b2f3a;
}
.produce-center-list {
  height: 80px;
  width: 100%;
}
.produce-center-item {
  height: 70px;
  width: 52px;
  background-color: transparent;
}
.produce-center-item:hover {
  background-color: #bbbbbb;
}
p {
  width: 40px;
  font-size: 12px;
  text-align: center;
  margin: 0 auto;
}
.produce-center-item-icon {
  height: 40px;
  border-radius: 20px;
  font-size: 30px;
  line-height: 40px;
  margin-bottom: 10px;
}
</style>
