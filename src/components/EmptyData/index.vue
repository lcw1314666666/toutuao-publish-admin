<template>
  <div class="empty-data">
    <el-image :src="require('@/assets/images/common/empty_data.png')" alt="暂无数据"></el-image>
    <p class="empty-text">
      <slot>暂未检索到相关数据</slot>
    </p>
  </div>
</template>

<script>
export default {
  name: 'EmptyData',
  props: {
    hasButton: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.empty-data {
  padding: 200px 0;
  text-align: center;
  background-color: #fff;
  .el-image {
    width: 280px;
    height: 254px;
  }
  .empty-text {
    margin: 50px 0 20px;
    color: #999;
  }
  .empty-tips {
    margin-bottom: 40px;
  }
}
</style>
