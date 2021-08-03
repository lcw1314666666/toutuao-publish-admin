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
      <el-row :gutter="20" class="image-list-box">
        <el-col
          :span="6"
          :lg="4"
          :md="6"
          :sm="6"
          :xs="12"
          v-for="(item, index) in images"
          :key="index"
          class="image-item"
        >
          <el-image
            style="width: 100%; height: 200px;"
            :src="item.url"
            fit="cover"
          >
          </el-image>
          <div v-if="item.url" class="image-func">
<!--            <i class="el-icon-star-off" @click="handleCollectClick(item.id, item.is_collected)"></i>-->
<!--            <i class="el-icon-delete" @click="handleDelectClick(item.id)"></i>-->
            <el-button
              type="warning"
              :icon="item['is_collected'] ? 'el-icon-star-on' : 'el-icon-star-off' "
              size="mini"
              :loading="item.isloading"
              circle @click="handleCollectClick(item)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              :loading="item.isloading"
              @click="handleDelectClick(item)"
            ></el-button>
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
import { getImages, collectImage, deleteImage } from '@/api/image.js'
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
        // 给照片数组的每个对象都加一个loading属性
        const results = res.data.data.results
        results.forEach(item => {
          item.isloading = false
        })
        this.currentPage = res.data.data.page
        this.pageSize = res.data.data.per_page
        this.total = res.data.data.total_count
        this.images = results
        console.log(results)
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
    },
    handleCollectClick (img) {
      // 收藏或取消收藏
      img.isloading = true
      collectImage(img.id, !img.is_collected).then(res => {
        if (res.data.message === 'OK' && res.data.data.collect === true) {
          // 收藏成功,跳转到收藏页面
          // this.loadImages(1, true)
          this.$message({
            message: '收藏成功',
            type: 'success'
          })
        } else if (res.data.message === 'OK' && res.data.data.collect === false) {
          // 取消收藏成功
          this.loadImages(1, true)
          this.$message({
            message: '取消收藏成功',
            type: 'success'
          })
        }
        img.isloading = false
      })
    },
    handleDelectClick (img) {
      img.isloading = true
      // 删除
      deleteImage(img.id).then(res => {
        if (res.status === 204) {
          // 删除成功
          this.loadImages(this.currentPage, this.collect)
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          img.isloading = false
        }
      })
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
    flex-wrap: wrap;
    .el-col{
      height: 200px;
    }
    .image-item{
      position: relative;
      //height: 130px;
      .image-func{
        height: 40px;
        width: 90%;
        background-color: rgba(201, 201, 201, 0.5);
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        color: pink;
        margin: 0 12px;
        font-size: 23px;
        .el-button{
          width: 30px;
          height: 30px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
