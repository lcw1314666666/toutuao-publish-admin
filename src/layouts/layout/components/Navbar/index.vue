<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img v-if="userInfo && userInfo.institutionUserAvatar" :src="userInfo.institutionUserAvatar" class="user-avatar">
          <span class="user-name">{{ userInfo && userInfo.institutionUserNickName || '' }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>控制台</el-dropdown-item>
          </router-link>
          <a target="_blank" :href="VUE_APP_OSS_BUILD === 'production' ? '' : 'http://192.168.1.125:12605'">
            <el-dropdown-item>每氪检测</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Breadcrumb from '@/components/BreadCrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      VUE_APP_OSS_BUILD: process.env.VUE_APP_OSS_BUILD
    }
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar
    }),
    ...mapGetters([
      'userInfo'
    ])
  },
  created() {
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
  .navbar {
    height: 50px;
    position: relative;
    background: #fff;
    z-index: 1;
    box-shadow: 0 1px 6px #d8dbe1;

    .hamburger-container {
      line-height: 50px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color:transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

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
          .user-avatar {
            display: inline-block;
            margin-top: 5px;
            vertical-align: top;
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          span.user-name {
            display: inline-block;
            margin-left: 10px;
            font-size: 16px;
            color: #333333;
            vertical-align: top;
            font-weight: bold;
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

  @media (max-width: 485px) {
    /deep/ .user-role {
      display: none!important;
    }

    /deep/ .user-avatar {
      margin-left: 0!important;
    }

    /deep/ .el-breadcrumb__separator {
      margin: 0 5px;
    }

    /deep/ .hamburger-container {
      padding: 0 10px!important;
    }
  }

  @media (max-width: 350px) {
    /deep/.el-breadcrumb {
      font-size: 12px!important;
    }
  }
</style>
