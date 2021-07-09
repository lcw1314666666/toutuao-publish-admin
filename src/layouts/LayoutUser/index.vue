<template>
  <div class="user-wrapper h100">
    <div class="sidebar-container" width="150px">
      <Aside />
    </div>
    <div class="main-container">
      <Header class="header-fixed" />
      <div class="app-main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Header from './Header'
import Aside from './Aside'
export default {
  name: 'User',
  components: {
    Header,
    Aside
  }
}
</script>

<style lang="scss">
  .user-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    .sidebar-container {
      width: 150px;
      background-color: #061025;
      height: 100%;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 1001;
      overflow: hidden;
    }
    .main-container {
      position: relative;
      min-height: 100%;
      margin-left: 150px;
      max-height: 100%;
      overflow: hidden;
      .header-fixed {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 9;
        width: calc(100% - 150px);
      }
      .app-main {
        position: relative;
        min-height: calc(100vh - 60px);
        width: 100%;
        padding-top: 60px;
        height: 100vh;
        overflow: auto;
        overflow-x: hidden;
        background-color: #F2F3F7;
        box-sizing: border-box;
      }
    }
  }
</style>
