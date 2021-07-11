<template>
  <el-container class="layout-content">
    <el-aside width="200px">
      <Aside class="aside"></Aside>
    </el-aside>
    <el-container>
      <el-header>
        Header
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
  }
}
</script>

<style lang="scss" scoped>
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
</style>
