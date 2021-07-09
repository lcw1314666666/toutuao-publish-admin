<template>
  <div>
    <div @click.stop="clickHandler">
      <slot></slot>
    </div>
    <el-image-viewer v-if="showViewer" :z-index="zIndex" :initial-index="imageIndex" :on-close="closeViewer" :url-list="previewSrcList" @click.stop="() => {}"></el-image-viewer>
  </div>
</template>

<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
export default {
  name: 'ImageViewer',
  components: {
    ElImageViewer
  },
  props: {
    // 展示图片路径
    src: {
      type: String,
      default: ''
    },
    // 图片预览列表
    previewSrcList: {
      type: Array,
      default: () => []
    },
    // css显示层级
    zIndex: {
      type: Number,
      default: 2000
    },
    // 禁用点击事件
    disabledClick: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showViewer: false // 是否展示图片
    }
  },
  computed: {
    imageIndex() {
      let previewIndex = 0
      const srcIndex = this.previewSrcList.indexOf(this.src)
      if (srcIndex >= 0) {
        previewIndex = srcIndex
      }
      return previewIndex
    }
  },
  methods: {
    clickHandler() {
      if (this.disabledClick) {
        return
      }
      this.showViewer = true
    },
    openViewer() {
      this.showViewer = true
    },
    closeViewer() {
      this.showViewer = false
    }
  }
}
</script>

<style scoped>

</style>
