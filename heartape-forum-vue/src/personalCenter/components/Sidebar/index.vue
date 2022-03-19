<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="false"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="true"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="true"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.name" :item="route" :base-path="'/personal-center/' + route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem },
  computed: {
    routes() {
      for (const route of this.$router.options.routes) {
        if (route.path.indexOf('/personal-center') === 0) {
          return route.children
        }
      }
      return []
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      if (meta.categoryPath) {
        return path.substring(0, path.lastIndexOf('/'))
      }
      return path
    },
    variables() {
      return variables
    }
  }
}
</script>
