<template>
  <div class="resource-tabs-container">
    <el-menu
      default-active="1"
      class="tabs-menu"
      mode="horizontal"
      text-color="#121212"
      active-text-color="#06f"
      @select="handleSelect"
    >
      <el-menu-item v-for="item in menu" :key="item.index" :index="item.index">{{ item.name }}</el-menu-item>
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
  methods: {
    handleSelect(key) {
      const path = this.menu.find(item => item.index === key).path
      this.$emit('handClassifySelect', path)
    }
  }
}
</script>

<style lang="scss" scoped>
.resource-tabs-container {
  .tabs-menu {
    border: #eeeeee 1px solid;
    .el-menu-item {
      width: 100px;
      text-align: center;
      font-size: 18px;
    }
  }
}
</style>
