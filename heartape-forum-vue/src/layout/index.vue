<template>
  <div class="app-wrapper">
    <navbar />
    <div class="main-container">
      <sidebar class="sidebar-container" />
      <app-main class="in-main-container" />
      <right-sidebar class="right-sidebar-container" />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, RightSidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    RightSidebar,
    AppMain
  },
  mixins: [ResizeMixin]
}
</script>

<style lang="scss" scoped>

  .app-wrapper {
    height: 100%;
    width: 100%;
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
