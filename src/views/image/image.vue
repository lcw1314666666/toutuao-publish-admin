<template>
  <div class="image">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!--    面包屑-->
        <el-breadcrumb separator="/" class="article-breadcrumb">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <ImageComponent></ImageComponent>
    </el-card>
  </div>
</template>

<script>
import ImageComponent from '@/components/Images/index.vue'
export default {
  name: 'Images',
  components: {
    ImageComponent
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
</style>
