<template>
  <div class="h100 flex-col user-aside">
    <router-link to="/" class="aside-image">
      <el-image :src="require('@/assets/images/user/logo.png')" class="logo-image"></el-image>
    </router-link>
    <header class="flex-xy-center">
      <el-image :src="require('@/assets/images/user/default_avatar.png')"></el-image>
    </header>
    <el-menu
      router
      default-active="dashboard"
      background-color="#3A97FF"
      text-color="#fff"
      active-text-color="#fff"
    >
      <template v-for="(group, index) in menuList">
        <el-submenu v-if="group.children" :key="'group'+index" :index="group.name">
          <template slot="title">
            <div class="aside-icon">
              <i :class="group.meta.icon"></i>
            </div>
            <span>{{ group.meta.title }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="(item, path ,i) in group.children" :key="i" :index="item.path" style="margin-left: 10px">
              {{ item.meta.title }}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item :key="index" :index="group.path">
          <div class="aside-icon">
            <i :class="group.meta.icon"></i>
          </div>
          <span slot="title">{{ group.meta.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { userRouter } from '@/router/modules/usercenter'

function filterAsyncRoutes(routes) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (!tmp.meta.hidden) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children)
      }
      res.push(tmp)
    }
  })
  return res
}

export default {
  name: 'Aside',
  data() {
    return {
      menuList: filterAsyncRoutes(userRouter.children)
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .user-aside {
    .aside-image {
      height: 60px;
      box-sizing: border-box;
      padding: 19px 0;
      background-color: #0579FB;
      .logo-image {
        display: block;
        margin: 0 auto;
        width: 82px;
        height: 18px;
      }
    }
    > header {
      height: 86px;
      background-color: #3A97FF;
      > .el-image {
        width: 34px;
        height: 34px;
      }
    }
    >.el-menu {
      flex: 1;
      border-right: none;
      >.el-menu-item {
        height: 66px;
        font-size: 16px;
        line-height: 66px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        &:hover {
          background-color: #6CB0FC!important;
        }
        &.is-active {
          background-color: #6CB0FC!important;
        }
        i {
          color: #fff;
          font-size: 18px;
        }
        .aside-icon {
          display: inline-block;
          width: 27px;
          margin-right: 5px;
          text-align: center;
        }
      }
    }
  }
</style>
