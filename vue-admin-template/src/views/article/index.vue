<template>
  <div class="app-container">
    <!--轮播图-->
    <el-carousel trigger="click" height="250px">
      <el-carousel-item v-for="item in articleCarousel" :key="item">
        <el-image
          style="width: 100%; height: 250px"
          :src="item"
          :fit="'cover'"
        />
      </el-carousel-item>
    </el-carousel>
    <!--文章头部通知栏-->
    <list-header />
    <!--文章list-->
    <list :article="article" @loadmore="loadMoreArticles" />
  </div>
</template>

<script>
import List from "@/components/article/list";
import ListHeader from "@/components/article/header";

export default {
  components: {
    List,
    ListHeader
  },
  data() {
    return {
      articleCarousel: [
        require('../article/cartoon.jpg'),
        require('../article/cartoon.jpg'),
        require('../article/cartoon.jpg'),
        require('../article/cartoon.jpg')
      ],
      article: []
    }
  },
  methods: {
    loadMoreArticles() {
      this.$store.dispatch('article/fetchList', this.nextPageParams)
    }
  }
}
</script>

<style scoped>

</style>

