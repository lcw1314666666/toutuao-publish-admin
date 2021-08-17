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
      width="950px"
      append-to-body
      :before-close="handleUploadDialogClose"
    >
      <el-tabs type="border-card"  v-model="activeName">
        <el-tab-pane name="first">
          <span slot="label"><i class="el-icon-date"></i>收藏图片</span>
          <ImageComponent
            :isShowAdd="false"
            :isShowcollect="false"
            :isSelected="true"
            ref="imageList"
          ></ImageComponent>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          <span slot="label"><i class="el-icon-date"></i>上传图片</span>
          <input
            type="file"
            ref="file"
            @change="onFileChange"
          />
          <img src="" ref="dialogImage" class="dialog-image">
        </el-tab-pane>
        <el-button @click="handleUploadDialogClose()">取消</el-button>
        <el-button type="primary" @click="handleUploadClick">确定</el-button>
      </el-tabs>
    </el-dialog>

  </div>
</template>

<script>
import { uploadImage } from '@/api/image.js'
import ImageComponent from '@/components/Images/index.vue'
export default {
  name: 'uploadImage',
  components: {
    ImageComponent
  },
  props: ['value'],
  data () {
    return {
      uploadImageDialog: false,
      activeName: 'first'
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
      if (this.activeName === 'second') {
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
      } else if (this.activeName === 'first') {
        const ImageList = this.$refs.imageList
        const Selected = ImageList.Selected
        if (Selected === null) {
          this.$message({
            message: '请选择照片'
          })
        }
        // console.log(ImageList.images[Selected])
        this.$emit('input', ImageList.images[Selected].url)
        this.uploadImageDialog = false
      }
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
