<template>
  <div class="layout-login">
    <div class="header-content">
      <div class="center clearfix">
        <router-link to="/" class="logo fl">
          <el-image :src="require('@/assets/images/login/logo.png')" alt="每氪检测"></el-image>
        </router-link>
        <ul class="nav-list fr clearfix">
          <li class="nav-item">
            <el-image :src="require('@/assets/images/login/tel.png')" alt="tel" class="telephone"></el-image>
            <span class="nav-link">400-661-6061</span>
          </li>
          <li class="nav-item">
            <span class="welcome">欢迎登录</span>
            <router-link to="/" class="returnHome">返回首页>></router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="login-wrapper flex-col flex-x-center">
      <div class="center flex-grow-0">
        <div class="layout-content clearfix">
          <div class="form-wrap fr">
            <div class="login-jiance">
              <span>欢迎登录每氪检测</span>
            </div>
            <div class="content">
              <slot></slot>
            </div>
          </div>
        </div>
        <div class="btm-nav-box">
          Power By 每氪信息技术有限公司 © 2016-2021 All rights Reserved
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutLogin',
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-login {
  padding-top: 100px;
  .header-content {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: 100px;
    background-color: #FFFFFF;
    z-index: 1800;
    .logo{
      .el-image {
        width: 124px;
        height: 50px;
        margin-top: 25px;
      }
    }
    .nav-list {
      list-style: none;
      margin-top: 40px;
      .nav-item {
        position: relative;
        float: left;
        padding: 0 15px;
        height: 30px;
        line-height: 30px;
        &:last-of-type {
          padding-right: 0;
        }
        .telephone{
          display: inline-block;
          vertical-align: top;
          width: 26px;
          height: 26px;
          margin-right: 10px;
        }
        .nav-link {
          font-size: 22px;
          color: #666666;
        }
        .welcome{
          color: #666666;
          font-size: 16px;
        }
        .returnHome{
          color: #01A0EB;
          font-size: 16px;
          margin-left: 15px;
        }
      }
    }
  }
  .login-wrapper{
    position: relative;
    padding: 50px 0;
    width: 100%;
    min-height: calc(100vh - 100px);
    background: url('~@/assets/images/login/login_bg.png') no-repeat center center;
    box-sizing: border-box;
    .layout-content {
      padding: 30px 0;
      box-sizing: border-box;
      min-height: 630px;
      background: url('~@/assets/images/login/login_form_bg.png') no-repeat left center;
    }
    .form-wrap {
      .login-jiance {
        margin-bottom: 20px;
        line-height: 30px;
        color: #FFFFFF;
        font-size: 24px;
        text-align: center;
      }
      .content {
        width: 470px;
        min-height: 500px;
        background-color: #fff;
        box-sizing: border-box;
        padding: 30px 55px;
      }
    }
    .btm-nav-box {
      margin-top: 30px;
      text-align: center;
      font-size: 14px;
      color: #fff;
      line-height: 15px;
      opacity: 0.7;
    }
  }
}
</style>
