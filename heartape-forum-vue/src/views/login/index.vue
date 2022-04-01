<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">Hap</h3>
      </div>
      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="邮箱"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          suffix-icon=""
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        >
          <template slot="suffix">
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </template>
        </el-input>
      </el-form-item>
      <el-button class="login-button" :loading="loading" type="primary" @click.native.prevent="handleLogin">登录</el-button>
      <div class="other-login-way">
        <span>or</span>
        <p>其他方式</p>
      </div>
      <el-form-item>
        <el-button class="other-login-button" type="primary" style="background-color: #2b2f3a">验证码登录</el-button>
        <el-button class="other-login-button" type="primary" style="background-color: #e27b36">手机登录</el-button>
      </el-form-item>
      <el-form-item>
        <span style="margin: 0 20px">社交账号登录:</span>
        <el-image
          class="oauth-login-button"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAAPFBMVEVHcEw7r/88rf89rf89rf88rP89rf89rf88rf9Ar/9An/88rf89rf////9Rtv96x//t+P+74v+d1v/T7P8M5RPBAAAADHRSTlMAI7+QgEbv3msQEK8MGrFWAAACDElEQVRYw71Y2XKDMAzEBnwEWz74/38tSZqmBUlY1O2+MczsSKvL0jDQ8MqNi7Vhg7V6dPNwBd5pE/bQTolZAgHtBDSTCQzspHrQPKkaeGYbGmDPhPdjaMR443iUDc2wjFKzCQIY0j0XhCAyYQpiTF3sIWyawyUcdFLmGpHZxc4zcQcALgt+5hOVh1DXHGPMJdGZ2SAQ1PiFnFpkwh1LOX7HCqfO4RmU4g4ZTrIJr7ADD8lkbpxBEBEQ3k2cQhkjipUzCa2NGnEkplJ0q2MP5/CJ8JAa+1MoIsKkG+VZJokK6ZtuCz2fAnffZJ4Rvm1xm2WeUb4pVCJgeIi4ObSBJI4oE81EC7LxCVTtBa2PC0QWJSosUcKJMK1zlKs9iA0iTBrEBhEmDcLgk3IjYq+nRLUtavmUqGBEi6g+yOTWxxI5lyhGrEQcRsTIlDNK5I6dFu7Ni2ZK2/xdsbntD++ZWoHxDwJgLwqi1dI5UAM5RlwI7S2JGv/35u/R+ZhFvT8oYkBWYclqYmSDMK0/R/YxbtIpYslnjXBAvp41iEnwbm7bQ/SdC7kCt95gLy1Itayl1AT7D2aR8ILtilboF/sDskWM13nG5hXixDH/N0tNvzWr3+LXbxXttxz3W9f7HRBEJw3/P0eWR/ROqczkmy5IiqdqpXlmAnMa87Izm0K4jJjlJbwb9et8uIxOcSwfa+jEaqwnVyoAAAAASUVORK5CYII="
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的邮件'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码应大于等于6个字符'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'heartape@163.com',
        password: '123456'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$dark_gray:#889aa4;
$light_gray: #274a6d;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: #8fc2f6;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 50px 35px 20px;
    margin: 50px auto 20px;
    overflow: hidden;
    background-color: white;

    .el-input {
      display: inline-block;
      height: 40px;
      width: 100%;
    }

    .el-form-item {
      border-radius: 5px;
      color: #454545;
    }
    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      margin: 0 10px;
      font-size: 18px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .login-button {
      width: 130px;
      height: 40px;
      margin: 0 160px 20px;
      border-radius: 20px;
      text-align: center;
    }
    .other-login-way {
      position: relative;
      width: 100%;
      border-top: #a0a1a3 1px solid;
      span {
        position: absolute;
        top: -10px;
        right: 205px;
        width: 40px;
        text-align: center;
        background-color: white;
        color: #a0a1a3;
      }
      p {
        margin: 25px auto;
        text-align: center;
        color: #74787f;
      }
    }
    .other-login-button {
      width: 130px;
      height: 40px;
      margin: 10px 46px;
      border-radius: 20px;
      text-align: center;
    }
    .oauth-login-button {
      position: relative;
      top: 10px;
      height: 30px;
      width: 30px;
      margin-right: 20px;
    }
  }
}
</style>
