<template>
  <div class="head-menu-container">
    <div class="resource-info-container">
      <span style="font-size: 24px;line-height: 50px;margin-left: 10px">{{ title }}</span>
      <span style="font-size: 18px;margin-left: 30px">{{ slogan }}</span>
    </div>
    <el-input v-model="keyword" class="search-input" :placeholder="'请输入' + resourceName + '搜索关键词'">
      <template slot="append">
        <el-button icon="el-icon-search" @click="handSearchResource" />
      </template>
    </el-input>
  </div>
</template>

<script>

export default {
  name: 'HeadMenu',
  props: {
    resourceName: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    slogan: {
      type: String,
      default: ''
    },
    beforeKeyword: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      keyword: ''
    }
  },
  created() {
    this.keyword = this.beforeKeyword
  },
  methods: {
    handSearchResource() {
      this.$emit('searchResource', this.keyword)
    }
  }
}
</script>

<style lang="scss" scoped>
.head-menu-container {
  width: 740px;
  height: 80px;
  border: #eeeeee 1px solid;
  .resource-info-container {
    float: left;
    height: 80px;
    width: 348px;
    padding: 15px;
    overflow: hidden;
  }
  .search-input {
    float: right;
    width: 350px;
    margin: 20px;
  }
}
</style>
