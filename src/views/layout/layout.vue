<template>
  <el-container class="layout-content">
    <el-aside width="200px">
      <Aside class="aside"></Aside>
    </el-aside>
    <el-container>
      <el-header class="layout-header">
        <div class="header-left">
          <i class="el-icon-s-unfold"></i>
          <span>奶牛管理欢迎你</span>
        </div>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <img src="http://img.duoziwang.com/2021/03/1623076300984136.jpg">
            用户名<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">设置</el-dropdown-item>
            <el-dropdown-item command="b">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        main
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
    return {}
  },
  components: {
    Aside
  },
  methods: {
    handleCommand (command) {
      this.$message('click on item ' + command)
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-dropdown-link{
    img{
      width: 30px;
      height: 30px;
    }
  }
}
.aside {
  width: 100%
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
  line-height: 160px;
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
