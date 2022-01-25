<template>
  <div class="head-menu-container">
    <div class="resource-info-container">
      <span>文库 . 发现</span>
      <span>随心写作，自由表达</span>
    </div>
    <el-input v-model="keyword" class="search-input" :placeholder="'请输入' + type.name + '搜索关键词'">
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
    type: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      keyword: ''
    }
  },
  methods: {
    handSearchResource() {
      console.log(this.keyword)
      console.log(this.type.path)
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
    width: 298px;
    padding: 15px;
    overflow: hidden;
  }
  .search-input {
    float: right;
    width: 400px;
    margin: 20px;
  }
}
</style>
