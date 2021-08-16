<template>
  <div class="upload-image">
    <img
      :src="value"
      class="image"
      @click="handleImageClick"
    />
    <el-dialog
      title="提示"
      :visible.sync="uploadImageDialog"
      width="50%"
      append-to-body
      :before-close="handleUploadDialogClose"
    >
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i>收藏图片</span>
          收藏图片
        </el-tab-pane>
        <el-tab-pane label="上传图片">
          <span slot="label"><i class="el-icon-date"></i>上传图片</span>
          <input
            type="file"
            ref="file"
            @change="onFileChange"
          />
          <img src="" ref="dialogImage" class="dialog-image">
          <el-button @click="handleUploadDialogClose()">取消</el-button>
          <el-button type="primary" @click="handleUploadClick">确定</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

  </div>
</template>

<script>
import { uploadImage } from '@/api/image.js'
export default {
  name: 'uploadImage',
  props: ['value'],
  data () {
    return {
      uploadImageDialog: false
    }
  },
  methods: {
    handleImageClick () {
      this.uploadImageDialog = true
    },
    handleUploadDialogClose () {
      this.uploadImageDialog = false
    },
    handleUploadClick () {
      const file = this.$refs.file.files[0]
      const formData = new FormData()
      formData.append('image', file)
      uploadImage(formData).then(res => {
        const url = res.data.data.url
        this.$emit('input', url)
        this.uploadImageDialog = false
      }).catch(error => {
        this.message({
          type: 'error',
          message: error
        })
      })
    },
    onFileChange () {
      const file = this.$refs.file.files[0]
      const url = URL.createObjectURL(file)
      this.$refs.dialogImage.src = url
    }
  }
}
</script>

<style scoped>
.image{
  width: 120px;
  height: 120px;
  border-radius: 4px;
  border: 1px dashed #ccc;
}
.dialog-image{
  display: block;
  width: 120px;
  height: 120px;
  padding: 20px 0;
}
</style>
