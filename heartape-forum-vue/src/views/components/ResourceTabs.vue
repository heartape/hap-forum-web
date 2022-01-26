<template>
  <div class="resource-tabs-container">
    <el-menu
      :default-active="activeMenu"
      class="tabs-menu"
      mode="horizontal"
      text-color="#121212"
      active-text-color="#06f"
      router
    >
      <el-menu-item v-for="item in menu" :key="item.index" :index="item.path">{{ item.name }}</el-menu-item>
    </el-menu>
  </div>
</template>

<script>

export default {
  name: 'ResourceTabs',
  props: {
    menu: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    activeMenu() {
      const route = this.$route
      const { path } = route
      return path
    }
  }
}
</script>

<style lang="scss" scoped>
.resource-tabs-container {
  height: 50px;
  .tabs-menu {
    border: #eeeeee 1px solid;
    .el-menu-item {
      width: 100px;
      height: 50px;
      text-align: center;
      font-size: 18px;
      line-height: 50px;
    }
  }
}
</style>
