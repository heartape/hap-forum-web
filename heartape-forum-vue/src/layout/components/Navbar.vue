<template>
  <div class="navbar-container">
    <div class="navbar-main-container">
      <div class="head-title" style="cursor : pointer" @click="toIndex">Hap</div>
      <div class="head-content">heart like a ape, mind like a horse</div>
      <div class="right-menu">
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link to="/personal-center">
              <el-dropdown-item>个人中心</el-dropdown-item>
            </router-link>
            <a target="_blank" href="#">
              <el-dropdown-item disabled>偏好设置</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click.native="logout">
              <span style="display:block;">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'avatar'
    ])
  },
  methods: {
    toIndex() {
      this.$router.push(`/`)
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar-container {
  height: 64px;
  width: 100%;
  overflow: hidden;
  position: relative;
  font-family: jetBrains Mono;

  .navbar-main-container {
    width: 90%;
    margin: 0 auto;
  }

  .head-title, .head-content {
    float: left;
    margin-left: 24%;
    height: 100%;
    width: 6%;
    line-height:65px;
    text-align: center
  }

  .head-content {
    width: 15%;
    min-width: 300px;
    margin-left: 6%;
  }

  .right-menu {
    float: right;
    height: 100%;
    margin-top: 6px;
    line-height: 65px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
