<template>
  <div class="upload-image-box" :style="uploadStyle">
    <div class="upload-line">
      <image-viewer ref="imageViewer" :preview-src-list="imagePreList" :disabled-click="true" :src="previewImage" :zIndex="4000">
        <upload-image-list
          :files="imageList"
          list-type="picture-card"
          :handle-preview="handlePreview"
          @remove="handleRemove"
        >
          <template slot-scope="file">
            <el-image :src="/\.pdf$/.test(file.file.url) ? require('@/assets/images/common/pdf-icon.png') : file.file.url" alt="" fit="cover" class="el-upload-list__item-thumbnail"></el-image>
            <label class="el-upload-list__item-status-label">
              <i
                :class="{
                  'el-icon-upload-success': true,
                  'el-icon-check': true
                }"
              ></i>
            </label>
            <div v-if="file.file.status === 'uploading'" class="reupload">上传中..</div>
            <div v-if="file.file.status === 'fail'" class="reupload">上传失败</div>
            <span class="el-upload-list__item-actions">
              <span
                v-if="!/\.pdf$/.test(file.file.url)"
                class="el-upload-list__item-preview"
                @click="handlePreview(file.file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>
              <template v-if="!disabled">
                <span
                  v-if="multiple"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file.file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
                <div v-else style="display: inline-block; margin-left: 15px;">
                  <el-upload
                    action="string"
                    list-type="picture"
                    :show-file-list="false"
                    :auto-upload="false"
                    accept=".pdf,image/*"
                    :http-request="upload"
                    :on-change="reUploadImage"
                  >
                    <i class="el-icon-upload2" style="font-size: 20px; color: #fff;"></i>
                  </el-upload>
                </div>
              </template>
            </span>
          </template>
          <template #append>
            <div v-if="!disabled" :key="9999" class="upload-line">
              <el-upload
                v-if="!(!multiple && imageList.length > 0) && (!limit || (limit && imageList.length < limit))"
                action="string"
                list-type="picture-card"
                accept=".pdf,image/*"
                :show-file-list="false"
                :auto-upload="false"
                :http-request="upload"
                :on-change="consoleFL"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </template>
        </upload-image-list>
      </image-viewer>
    </div>
    <!-- 剪裁组件弹窗 -->
    <el-dialog title="图片裁剪" :visible.sync="cropperModel" append-to-body width="800px">
      <Cropper ref="vueCropper" :img-file="curCropperImg" :cropperConfig="cropperConfig" @upload="cropperUpload" @closeDialog="closeDialog"></Cropper>
    </el-dialog>
  </div>
</template>

<script>
import UploadImageList from '@/components/UploadImages/UploadImageList'
import ImageViewer from '@/components/ImageViewer'
import Cropper from '@/components/UploadImages/cropper'

import emitter from 'element-ui/src/mixins/emitter'
let tempIndex = 1

export default {
  name: 'UploadImages',
  components: {
    UploadImageList,
    ImageViewer,
    Cropper
  },
  mixins: [emitter],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [String, Array],
      default: ''
    },
    // 多图开关
    multiple: {
      type: Boolean,
      default: false
    },
    // 禁用状态
    disabled: {
      type: Boolean,
      default: false
    },
    // 大小限制 kb
    limitSize: {
      type: Number,
      default: 0
    },
    // 是否开启裁剪
    openCropper: {
      type: Boolean,
      default: false
    },
    // 裁剪框配置
    cropperConfig: {
      type: Object,
      default: () => {}
    },
    // 是否为固定尺寸
    openFixSize: {
      type: Boolean,
      default: false
    },
    // 固定尺寸宽度
    fixWidth: {
      type: Number,
      default: 0
    },
    // 固定尺寸高度
    fixHeight: {
      type: Number,
      default: 0
    },
    // 固定尺寸宽度
    containerWidth: {
      type: Number,
      default: 148
    },
    // 固定尺寸高度
    containerHeight: {
      type: Number,
      default: 148
    },
    // 最大上传个数
    limit: {
      type: Number,
      default: null
    }
  },
  data() {
    let imageList = []
    if (this.multiple) {
      imageList = (typeof this.value === 'string') ? [] : this.value.map((item) => {
        return {
          url: item.url || '',
          status: item.status || 'success',
          uid: item.uid || (Date.now() + tempIndex++)
        }
      })
    } else {
      if (this.value && (typeof this.value === 'string')) {
        const imageItem = {
          url: this.value,
          status: 'success',
          uid: Date.now() + tempIndex++
        }
        imageList = [imageItem]
      }
    }
    return {
      test: 'red',
      // tempIndex: 1,
      imageList: imageList, // 多图数组
      previewImage: '', // 大图预览的图片地址
      cropperModel: false, // 是否打开图片裁剪弹窗
      curCropperImg: null
    }
  },
  computed: {
    // 图片预览地址列表
    imagePreList() {
      return this.imageList.map(item => {
        return item.url
      })
    },
    uploadStyle() {
      return {
        '--width': this.containerWidth + 'px',
        '--height': this.containerHeight + 'px'
      }
    }
  },
  // 组件卸载时要释放所有的本地二进制文件地址
  beforeDestroy() {
    this.imageList.forEach(file => {
      if (file.url && file.url.indexOf('blob:') === 0) {
        URL.revokeObjectURL(file.url)
      }
    })
  },
  methods: {
    // 控制图片大小
    isOverLimitSize(file) {
      if (this.limitSize) {
        const isLt = file.size / 1024 < this.limitSize
        if (!isLt) {
          const sizeString = this.limitSize >= 1024 ? `${Math.ceil(this.limitSize / 1024)}MB` : `${this.limitSize}KB`
          this.$message.error(`上传图片大小不能超过 ${sizeString}!`)
        }
        return isLt
      } else {
        return true
      }
    },
    // 控制图片尺寸
    isOverLimitWidthHeight(file) {
      return new Promise((resolve) => {
        const image = new Image()
        image.src = URL.createObjectURL(file)
        image.onload = () => {
          const isLt = image.width === this.fixWidth && image.height === this.fixHeight
          resolve(!isLt ? `上传图片分辨率必须为 ${this.fixWidth}x${this.fixHeight}` : '')
        }
        image.onerror = () => {
          resolve('图片请求失败')
        }
      })
    },
    // 关闭弹窗
    closeDialog() {
      this.cropperModel = false
    },
    // 图片裁剪回调时间
    cropperUpload(file) {
      if (!this.curCropperImg) {
        return
      }
      const fileNew = {
        ...this.curCropperImg,
        raw: file,
        url: URL.createObjectURL(file)
      }
      if (this.multiple) {
        !fileNew.response && this.imageList.push(fileNew)
      } else {
        if (this.imageList.length > 0) {
          this.imageList[0].url = fileNew.url
          this.imageList[0].status = fileNew.status
        } else {
          this.imageList.push(fileNew)
        }
      }
      this.upload({ ...fileNew, file: fileNew.raw }, true)
    },
    // 重新上传图片
    async reUploadImage(file) {
      file = { ...file }
      const isOverLimitSize = this.isOverLimitSize(file.raw)
      if (!isOverLimitSize) {
        return false
      }
      // 开启固定宽高验证
      if (this.openFixSize) {
        const fixSizeMessage = await this.isOverLimitWidthHeight(file.raw)
        if (fixSizeMessage) {
          fixSizeMessage && this.$message.error(fixSizeMessage)
          return false
        }
      }
      if (this.openCropper) {
        this.curCropperImg = this.imageList.length > 0 ? {
          ...this.imageList[0],
          raw: file.raw,
          status: file.status,
          url: file.url
        } : file
        this.cropperModel = true
        return false
      }
      if (!file.url && file.raw && !file.response) {
        try {
          file.url = URL.createObjectURL(file.raw)
        } catch (err) {
          console.error('[Element Error][Upload]', err)
        }
      }
      if (!file.response) {
        if (this.imageList.length > 0) {
          this.imageList[0].url = file.url
          this.imageList[0].status = file.status
        } else {
          this.imageList.push(file)
        }
        this.upload({ ...file, uid: this.imageList[0].uid, file: file.raw })
      }
    },
    async consoleFL(file) {
      file = { ...file }
      const isOverLimitSize = this.isOverLimitSize(file.raw)
      if (!isOverLimitSize) {
        return false
      }
      // 开启固定宽高验证
      if (this.openFixSize) {
        const fixSizeMessage = await this.isOverLimitWidthHeight(file.raw)
        if (fixSizeMessage) {
          fixSizeMessage && this.$message.error(fixSizeMessage)
          return false
        }
      }
      if (this.openCropper) {
        this.curCropperImg = file
        this.cropperModel = true
        return false
      }
      if (file.raw && !file.response) {
        try {
          file.url = URL.createObjectURL(file.raw)
        } catch (err) {
          console.error('[Element Error][Upload]', err)
        }
      }
      !file.response && this.imageList.push(file)
      this.upload({ ...file, file: file.raw })
    },
    // 预览图片
    handlePreview(file) {
      if (!file) {
        return
      }
      this.previewImage = file.url
      this.$refs.imageViewer.openViewer()
    },
    // 移除图片
    handleRemove(file) {
      const uid = file.uid || file.file.uid || ''
      const curFileIndex = uid ? this.imageList.findIndex(item => item.uid === uid) : -1
      if (curFileIndex >= 0) {
        const fileList = this.imageList
        fileList.splice(fileList.indexOf(file), 1)
        this.imageList = fileList
        this.$emit('change', this.formatUploadFiles(this.imageList))
        this.dispatch('ElFormItem', 'el.form.change', this.formatUploadFiles(this.imageList))
      }
    },
    // 自定义upload事件
    upload(file, copper = false) {
      const uid = file.uid || file.file.uid || ''
      const curFileIndex = uid ? this.imageList.findIndex(item => {
        return item.uid === uid
      }) : -1
      if (curFileIndex >= 0) {
        this.imageList[curFileIndex].status = 'uploading'
      }
      const formData = new FormData()
      formData.append('file', file.file, copper ? 'image.png' : file.name)
      this.$http.uploadoss(formData).then((res) => {
        if (res.result) {
          this.$message({ message: res.description, type: 'success', customClass: 'messageIndex' })
          // 改变当前的上传状态
          if (curFileIndex >= 0) {
            this.imageList[curFileIndex].status = 'success'
            this.imageList[curFileIndex].url = res.obj
          }
          // 上传成功将照片传回父组件
          if (!this.multiple) {
            this.$emit('change', res.obj)
            this.dispatch('ElFormItem', 'el.form.change', res.obj)
          } else {
            const result = this.formatUploadFiles(this.imageList)
            this.$emit('change', result)
            this.dispatch('ElFormItem', 'el.form.change', result)
          }
        } else {
          if (curFileIndex >= 0) {
            this.imageList[curFileIndex].status = 'fail'
          }
        }
      }).catch(() => {
        if (curFileIndex >= 0) {
          this.imageList[curFileIndex].status = 'fail'
        }
      })
    },
    // 格式化图片路径
    formatUploadFiles(urls) {
      const successList = urls.filter(item => {
        return item.status === 'success'
      })
      return successList.map(item => {
        return {
          url: item.url
        }
      })
    },
    parsePercentage(val) {
      return parseInt(val, 10)
    }
  }
}
</script>

<style lang="scss" scoped>
  .upload-image-box {
    .upload-line {
      display: inline-block;
      vertical-align: top;
      /deep/ .el-upload--picture-card {
        width: var(--width);
        height: var(--height);
      }
      /deep/ .el-upload-list--picture-card {
        .el-upload-list__item {
          width: var(--width);
          height: var(--height);
        }
      }
    }
    .reupload {
      border-radius: 50%;
      position: absolute;
      width: 100px;
      height: 100px;
      text-align: center;
      line-height: 100px;
      color: #fff;
      background-color: #000000;
      opacity: 0.6;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
