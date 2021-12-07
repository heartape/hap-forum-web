<template>
  <div class="app-wrapper">
    <div class="head-container">
      <navbar />
    </div>
    <div class="main-container">
      <sidebar class="sidebar-container" />
      <app-main class="in-main-container" />
      <right-sidebar class="right-sidebar-container" />
    </div>
    <div class="footer-container">
      <footer-bar />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, RightSidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import FooterBar from '@/layout/components/FooterBar'

export default {
  name: 'Layout',
  components: {
    FooterBar,
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
