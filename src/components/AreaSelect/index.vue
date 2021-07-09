<template>
  <el-form-item class="area-select">
    <el-select
      ref="province"
      v-model="province"
      class="select-item"
      placeholder="选择省"
      @change="choseProvince"
    >
      <el-option
        v-for="item in proVinceData"
        :key="item.code"
        :label="item.name"
        :value="item.code"
      >
      </el-option>
    </el-select>
    <el-select
      ref="city"
      v-model="city"
      class="select-item"
      placeholder="选择市"
      @change="choseCity"
    >
      <el-option
        v-for="item in cityData"
        :key="item.code"
        :label="item.name"
        :value="item.code"
      >
      </el-option>
    </el-select>
    <el-select
      v-if="needArea"
      ref="area"
      v-model="area"
      class="select-item"
      placeholder="选择区"
      @change="choseArea"
    >
      <el-option
        v-for="item in areaData"
        :key="item.code"
        :label="item.name"
        :value="item.code"
      >
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
import emitter from 'element-ui/src/mixins/emitter'
import pcaCode from '@/assets/js/pca-code.json'

export default {
  name: 'AreaSelect',
  mixins: [emitter],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    needArea: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      province: '', // 省
      city: '', // 市
      area: '', // 区
      proVinceData: pcaCode,
      cityData: [],
      areaData: []
    }
  },
  watch: {
    value: {
      handler () {
        this.initData()
      },
      immediate: true
    }
  },
  methods: {
    // 初始化值
    initData () {
      const areaCode = this.value
      if (!areaCode) {
        return false
      }
      const province = (areaCode.length >= 2 && areaCode.slice(0, 2)) || ''
      const city = (areaCode.length >= 4 && areaCode.slice(0, 4)) || ''
      const area = (areaCode.length >= 6 && areaCode.slice(0, 6)) || ''

      const curProvince = pcaCode.find(item => item.code === province)
      const cityData = (curProvince && curProvince.children) || []

      const curCity = cityData.find(item => item.code === city)
      const areaData = (curCity && curCity.children) || []

      const curArea = areaData.find(item => item.code === area)

      this.province = (curProvince && province) || ''
      this.city = (curCity && city) || ''
      this.area = (curArea && area) || ''
      this.cityData = cityData
      this.areaData = areaData
    },
    // 选择省
    choseProvince (e) {
      this.city = ''
      this.cityData = this.proVinceData.find(item => item.code === e).children
      this.$emit('change', '')
      this.$refs.city && this.$refs.city.toggleMenu()
    },
    choseCity (e) {
      if (this.needArea) {
        this.area = ''
        this.areaData = this.cityData.find(item => item.code === e).children
        this.$emit('change', '')
        this.$refs.area && this.$refs.area.toggleMenu()
      } else {
        this.$emit('change', e)
        this.dispatch('ElFormItem', 'el.form.change', e)
      }
    },
    choseArea (e) {
      this.$emit('change', e)
      this.dispatch('ElFormItem', 'el.form.change', e)
    }
  }
}
</script>

<style lang="scss" scoped>
  .area-select {
    display: inline-block;
    margin-bottom: 0;
    .select-item {
      display: inline-block;
      width: 195px;
      vertical-align: top;
      margin-right: 10px;
      &:last-of-type {
        margin-right: 0;
      }
    }
  }
</style>
