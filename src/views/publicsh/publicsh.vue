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
      <el-form ref="form" :rules="rule" :model="article" label-width="80px" size="mini" class="publich-form-box">
        <el-form-item label="标题" prop="title">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-tiptap
            v-model="article.content"
            :extensions="extensions"
            placeholder="请输入内容 …"
            width="100%"
            height="500"
          ></el-tiptap>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单张</el-radio>
            <el-radio :label="3">三张</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="article.channel_id" placeholder="请选择频道">
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="(item, index) in channels"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="publicshArticle(false)">发表</el-button>
          <el-button @click="publicshArticle(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getArticleChannels, addArticle, getArticle, updateArticle } from '../../api/article'
import {
  // 需要的 extensions
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  Image,
  CodeBlock,
  TodoItem,
  TodoList,
  Fullscreen,
  Preview,
  TextColor,
  HorizontalRule
} from 'element-tiptap'

export default {
  name: 'Publicsh',
  components: {
  },
  data () {
    return {
      article: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      },
      channels: [],
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 3 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Image(),
        new Underline(), // 下划线
        new Italic(), // 斜体
        new Strike(), // 删除线
        new HorizontalRule(), // 华丽的分割线
        new ListItem(),
        new BulletList(), // 无序列表
        new OrderedList(), // 有序列表
        new TodoItem(),
        new TodoList(),
        new Fullscreen(),
        new Preview(),
        new CodeBlock(),
        new TextColor()
      ],
      rule: {
        title: [
          { requried: true, message: '请输入标题', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ],
        content: [{ requried: true, message: '请输入内容', trigger: 'blur' }]
      },
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    // 发布文章
    publicshArticle (draft) {
      if (this.$route.query.id) {
        // 如果有文章id则为编辑文章
        updateArticle(this.$route.query.id, this.article, draft).then(res => {
          if (res.data.message === 'OK') {
            this.$router.push({
              name: 'Article'
            })
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          }
        })
      } else {
        // 没有文章id则为发布文章
        addArticle(this.article, draft).then(res => {
          if (res.data.message === 'OK') {
            // 发布成功后，弹出消息提示，跳转页面
            this.$message({
              message: `${draft === false ? '发布' : '存入草稿'}成功`,
              type: 'success'
            })
            // 清空输入框数据，
            this.article = {
              title: '',
              content: '',
              cover: {
                type: 0,
                images: []
              },
              channel_id: null
            }
            this.$router.push({
              name: 'Article'
            })
          }
        })
      }
    },
    // 获取频道列表
    getArticleChannels () {
      getArticleChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    getArticleData (id) {
      // 根据文章id获取文章信息
      getArticle(id).then(res => {
        if (res.data.message === 'OK') {
          console.log(res.data.data)
          this.article = res.data.data
        }
      }).catch(err => {
        this.$message({
          message: `请求失败，失败原因为${err}`,
          type: 'error'
        })
      })
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  },
  created () {
    this.getArticleChannels()
    // 如果url中有query参数，就根据query参数获取文章信息
    if (this.$route.query.id) {
      const id = this.$route.query.id
      this.getArticleData(id)
    }
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
