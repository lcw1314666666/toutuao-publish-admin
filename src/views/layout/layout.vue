<template>
  <el-container class="layout-content">
    <el-aside width="auto">
      <Aside class="aside" :isCollapse="isCollapse"></Aside>
    </el-aside>
    <el-container>
      <el-header class="layout-header">
        <div class="header-left">
          <i class="el-icon-s-unfold" @click="handleChangeCollapse" :class="{'el-icon-s-fold': !isCollapse, 'el-icon-s-unfold': isCollapse}"></i>
          <span>奶牛管理欢迎你</span>
        </div>
        <el-dropdown @command="handleCommand">
          <img class="avater-image" :src="user.photo">
          <span class="el-dropdown-link">
            {{ user.name }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">设置</el-dropdown-item>
            <el-dropdown-item command="b" @click.native="handleLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from './aside.vue'
export default {
  name: 'Layout',
  data () {
    return {
      isCollapse: false,
      user: null
    }
  },
  components: {
    Aside
  },
  methods: {
    handleCommand (command) {
      this.$message('click on item ' + command)
    },
    handleChangeCollapse () {
      this.isCollapse = !this.isCollapse
    },
    handleLogout () {
      console.log('退出')
      // 用户点击退出
      // 弹窗警告是否退出账号
      // 如果通过弹窗确认退出，跳转到login页面
      this.$confirm('是否退出当前账号?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('user')
        this.$router.push({
          name: 'Login'
        })
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  },
  created () {
    this.user = JSON.parse(window.localStorage.getItem('user'))
    // console.log(this.user)
  }
}
</script>

<style lang="scss" scoped>
.el-dropdown {
  display: flex;
  justify-content: center;
  align-items: center;
  .el-dropdown-link {
    color: #333;
  }
}
.avater-image {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}
.layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.aside {
  //width: 100%;
  height: 100%;
}
.layout-content {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
