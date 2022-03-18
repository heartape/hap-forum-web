<template>
  <div class="personal-center">
    <div class="head-container">
      <navbar />
    </div>
    <div class="personal-center-main-container">
      <sidebar class="sidebar-container personal-center-sidebar-container" />
      <app-main class="personal-center-in-main-container" />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'

export default {
  name: 'PersonalCenter',
  components: {
    Navbar,
    Sidebar,
    AppMain
  }
}
</script>

<style lang="scss" scoped>

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
