<template>
  <div class="image">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!--    面包屑-->
        <el-breadcrumb separator="/" class="article-breadcrumb">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">素材管理</a></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="image-buttom-box">
        <el-radio-group v-model="collect" @change="loadImages(currentPage, collect)">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button type="success" @click="uploadImage">上传素材</el-button>
      </div>
      <el-row :gutter="20" justify="space-between" class="image-list-box">
        <el-col
          :lg="4"
          :md="6"
          :sm="6"
          :xs="12"
          align="middle"
          v-for="(item, index) in images"
          :key="index"
          class="image-item"
        >
          <el-image
            style="width: 150px; height: 100px"
            :src="item.url"
            fit="cover"
            :preview-src-list="[item.url]"
          ></el-image>
          <div class="image-func">
            <i class="el-icon-star-off"></i>
            <i class="el-icon-delete"></i>
          </div>
        </el-col>
      </el-row>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-card>
    <!--    上传图片弹框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogImage"
      width="30%"
      center
      :append-to-body="true"
    >
      <el-upload
        class="upload-demo"
        drag
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        multiple
        :headers="uploadHeaders"
        :on-success="uploadSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { getImages } from '@/api/image.js'
export default {
  name: 'Images',
  data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      collect: false,
      images: [],
      dialogImage: false,
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      },
      currentPage: 1,
      total: 0,
      pageSize: 0
    }
  },
  methods: {
    loadImages (page, collect = false) {
      getImages({
        collect,
        page
      }).then(res => {
        this.currentPage = res.data.data.page
        this.pageSize = res.data.data.per_page
        this.total = res.data.data.total_count
        this.images = res.data.data.results
      })
    },
    uploadImage () {
      this.dialogImage = true
    },
    uploadSuccess () {
      this.dialogImage = false
      this.loadImages(1, false)
    },
    handleCurrentChange (page) {
      this.loadImages(page, this.collect)
    }
  },
  created () {
    this.loadImages(1, false)
  }
}
</script>

<style lang="scss" scoped>
.box-card{
  .image-buttom-box{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .image-list-box{
    .image-item{
      position: relative;
      .image-func{
        height: 20px;
        background: #000000;
        color: #1f2d3d;
        opacity: 0.1;
        display: flex;
        justify-content: space-around;
        position: absolute;
        left: 0;
        left: 0;
        bottom: 0;
      }
    }
  }
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
