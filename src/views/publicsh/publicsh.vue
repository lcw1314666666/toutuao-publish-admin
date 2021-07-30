<template>
  <div class="publicsh">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!--    面包屑-->
        <el-breadcrumb separator="/" class="article-breadcrumb">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">发布文章</a></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!--        form表单-->
      <el-form ref="form" :model="articleData" label-width="80px" size="mini" class="publich-form-box">
        <el-form-item label="标题">
          <el-input v-model="articleData.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="articleData.content"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="articleData.cover.type">
            <el-radio label="0">单张</el-radio>
            <el-radio label="1">三张</el-radio>
            <el-radio label="2">自动</el-radio>
            <el-radio label="3">无</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="articleData.channel" placeholder="请选择频道">
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="(item, index) in channels"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="publicshArticle(true)">发表</el-button>
          <el-button @click="publicshArticle(false)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getArticleChannels } from '../../api/article'

export default {
  name: 'Publicsh',
  data () {
    return {
      articleData: {
        title: '',
        content: '',
        cover: {
          type: 0,
          url: ''
        },
        channel: ''
      },
      channels: null
    }
  },
  methods: {
    publicshArticle () {
      console.log('submit!')
    },
    getArticleChannels () {
      getArticleChannels().then(res => {
        this.channels = res.data.data.channels
        console.log(this.channels)
      })
    }
  },
  created () {
    this.getArticleChannels()
  }
}
</script>

<style lang="scss" scoped>
.article-breadcrumb{
  padding-bottom: 10px;
}
.publich-form-box{
  text-align: left;
  width: 50%;
}
</style>
