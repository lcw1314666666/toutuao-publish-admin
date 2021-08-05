<template>
  <div class="setting">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!--    面包屑-->
        <el-breadcrumb separator="/" class="article-breadcrumb">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row>
        <el-col :span="15">
          <el-form ref="form" :model="userForm" label-width="80px">
            <el-form-item label="编号">
              <el-input v-model="userForm.id" disabled></el-input>
            </el-form-item>
            <el-form-item label="手机">
              <el-input v-model="userForm.photo" disabled></el-input>
            </el-form-item>
            <el-form-item label="媒体名称">
              <el-input v-model="userForm.mobile"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍">
              <el-input type="textarea" v-model="userForm.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :offset="2" :span="4">
          <label for="file">
            <el-avatar
              shape="square"
              :size="200"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              fit="fill"
            ></el-avatar>
            <p>点击修改头像</p>
            <input
              id="file"
              type="file"
              hidden
              ref="file"
              @change="handleAvatarChange()"
            />
          </label>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      :append-to-body="true"
    >
      <el-image
        style="width: 100px; height: 100px"
        :src="avatarUrl"
        fit="cover"
      ></el-image>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
export default {
  name: 'Setting',
  data () {
    return {
      userForm: {
        id: '',
        photo: '',
        mobile: '',
        intro: '',
        email: ''
      },
      // 是否显示头像修改弹窗
      dialogVisible: false,
      avatarUrl: ''
    }
  },
  methods: {
    getUserInfo () {
      getUserProfile().then(res => {
        const data = res.data.data
        // { ...this.userForm } = data
        this.userForm = data
      })
    },
    onSubmit () {
      console.log('保存数据')
    },
    // 修改头像
    handleAvatarChange () {
      // 打开弹窗
      this.dialogVisible = true
      // 获取上传图片的url
      const file = this.$refs.file.files[0]
      this.avatarUrl = window.URL.createObjectURL(file)
      console.log(this.avatarUrl)
      // 当选择同一张图片时change事件也能触发
      this.$refs.file.value = ''
    },
    handleClose () {
      this.dialogVisible = false
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="scss" scoped>
</style>
