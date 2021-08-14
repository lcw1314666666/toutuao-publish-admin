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
              <el-button
                type="primary"
                :loading="upDataMessageLoading"
                @click="onSubmit"
              >保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :offset="2" :span="4">
          <label for="file">
            <el-avatar
              shape="square"
              :size="200"
              :src="this.userForm.photo"
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
      @opened="onDialogOpened"
      @closed="handleDialogClosed"
    >
      <div>
        <img
          style="width: 100px; height: 100px"
          :src="avatarUrl"
          fit="cover"
          class="cropper-image-avatar"
          ref="image"
        >
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :loading="upDataPhotoLoading"
          @click="upDataPhoto"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserProfile, updateUserPhoto, updateUserProfile } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import globalBus from '@/utils/global-bus.js'
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
      avatarUrl: '',
      cropper: null,
      upDataPhotoLoading: false,
      upDataMessageLoading: false
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
    // 保存用户信息
    onSubmit () {
      this.upDataMessageLoading = true
      const { name, intro, email } = this.userForm
      updateUserProfile({
        name,
        intro,
        email
      }).then(res => {
        // 保存信息完毕之后触发时间总线
        this.upDataMessageLoading = false
        globalBus.$emit('userMessageChange', this.userForm)
        console.log(res)
        this.$message({
          message: '保存信息成功',
          type: 'success'
        })
      })
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
    },
    onDialogOpened () {
      // dialog弹窗完全打开之后
      const image = this.$refs.image
      if (this.cropper) {
        this.cropper.replace(this.avatarUrl)
        // 如果有这个cropper对象就不要再创建了
        return
      }
      this.cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 1,
        dragMode: 'none',
        cropBoxResizeble: false,
        movable: true
        // crop (event) {
        //   console.log(event.detail.x)
        //   console.log(event.detail.y)
        //   console.log(event.detail.width)
        //   console.log(event.detail.height)
        //   console.log(event.detail.rotate)
        //   console.log(event.detail.scaleX)
        //   console.log(event.detail.scaleY)
        // }
      })
    },
    handleDialogClosed () {
      // dialog弹窗完全关闭时
      this.cropper.destroy()
    },
    upDataPhoto () {
      this.upDataPhotoLoading = true
      // 弹窗关闭
      this.dialogVisible = false
      // 点击确定时拿到裁剪好的图片对象，然后添加成form对象，发送请求
      this.cropper.getCroppedCanvas().toBlob(blob => {
        const formData = new FormData()
        formData.append('photo', blob)
        updateUserPhoto(formData).then(res => {
          this.$message({
            message: '修改头像成功',
            type: 'success'
          })
          this.userForm.photo = window.URL.createObjectURL(blob)
          this.upDataPhotoLoading = false
          globalBus.$emit('userMessageChange', this.userForm)
        })
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="scss" scoped>
.cropper-image-avatar{
  display: block;
  max-width: 100%;
  min-height: 200px;
}
</style>
