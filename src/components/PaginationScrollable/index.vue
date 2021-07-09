<template>
  <el-pagination
    :page-size.sync="internalPageSize"
    :small="small"
    :total="total"
    :page-count="pageCount"
    :current-page.sync="internalCurrentPage"
    :layout="layout"
    :page-sizes="pageSizes"
    :popperClass="popperClass"
    :prev-text="prevText"
    :next-text="nextText"
    :background="background"
    :disabled="disabled"
    @current-change="currentChange"
    @size-change="sizeChange"
    @prev-click="prevClick"
    @next-click="nextClick"
  ><slot></slot></el-pagination>
</template>

<script>
import { scrollTo } from '@/utils/scroll-to'
export default {
  name: 'PaginationScrollable',
  props: {
    pageSize: {
      type: Number,
      default: 10
    },

    small: Boolean,

    total: Number,

    pageCount: Number,

    pagerCount: {
      type: Number,
      validator(value) {
        return (value | 0) === value && value > 4 && value < 22 && (value % 2) === 1
      },
      default: 7
    },

    currentPage: {
      type: Number,
      default: 1
    },

    layout: {
      type: String,
      default: 'prev, pager, next, jumper, ->, total'
    },

    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 40, 50, 100]
      }
    },

    popperClass: String,

    prevText: String,

    nextText: String,

    background: Boolean,

    disabled: Boolean,

    autoScroll: {
      type: Boolean,
      default: true
    },

    scrollClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      internalCurrentPage: 1,
      internalPageSize: 0
    }
  },
  watch: {
    currentPage: {
      immediate: true,
      handler(val) {
        this.internalCurrentPage = this.getValidCurrentPage(val)
      }
    },
    pageSize: {
      immediate: true,
      handler(val) {
        this.internalPageSize = isNaN(val) ? 10 : val
      }
    },
    internalCurrentPage: {
      immediate: true,
      handler(newVal) {
        this.$emit('update:currentPage', newVal)
      }
    },

    internalPageSize: {
      immediate: true,
      handler(newVal) {
        this.$emit('update:pageSize', newVal)
      }
    }
  },
  methods: {
    currentChange(e) {
      if (this.autoScroll) {
        scrollTo(0, 0, this.scrollClass)
      }
      this.$emit('current-change', e)
    },
    sizeChange(e) {
      this.$emit('size-change', e)
    },
    prevClick(e) {
      this.$emit('prev-click', e)
    },
    nextClick(e) {
      this.$emit('next-click', e)
    },
    getValidCurrentPage(value) {
      value = parseInt(value, 10)

      const havePageCount = typeof this.internalPageCount === 'number'

      let resetValue
      if (!havePageCount) {
        if (isNaN(value) || value < 1) resetValue = 1
      } else {
        if (value < 1) {
          resetValue = 1
        } else if (value > this.internalPageCount) {
          resetValue = this.internalPageCount
        }
      }

      if (resetValue === undefined && isNaN(value)) {
        resetValue = 1
      } else if (resetValue === 0) {
        resetValue = 1
      }

      return resetValue === undefined ? value : resetValue
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
