<template>
  <div class="list-screening-search flex-row">
    <div class="list-margin flex-grow-1">
      <div v-for="(item, index) in listLineItem" :key="index" class="label-input">
        <template v-if="item.type === 'input'">
          <el-input v-model="searchData[item.id]" clearable :placeholder="'请输入' + item.name" @clear="clearData" @keyup.enter.native="queryTableData"></el-input>
        </template>
        <template v-if="item.type === 'select'">
          <el-select v-model="searchData[item.id]" size="mini" clearable :placeholder="item.name" @clear="clearData" @keyup.enter.native="queryTableData">
            <el-option v-for="select in item.itemList" :key="select[item.keyName || 'name']" :label="select[item.labelName || 'name']" :value="select[item.valueName || 'name']"></el-option>
          </el-select>
        </template>
        <template v-if="item.type === 'cascader'">
          <el-cascader v-model="searchData[item.id]" clearable :options="item.itemList" :placeholder="item.name" :props="{value: 'id', label: 'name', children: 'child', checkStrictly: true}" @blur="clearData"></el-cascader>
        </template>
        <template v-if="item.type === 'datepicker'">
          <el-date-picker v-model="searchData[item.id]" clearable type="date" :placeholder="'请选择' + item.name" @change="changeDate(searchData[item.id])" @keyup.enter.native="queryTableData"></el-date-picker>
        </template>
      </div>
      <el-button type="primary" class="query-btn" @click="queryTableData">搜索</el-button>
    </div>
    <div class="flex-grow-0">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ListScreeningSearch',
  props: {
    searchList: {
      type: Array
    },
    searchData: {
      type: Object
    }
  },
  data() {
    return {
      listLine: [],
      listLineItem: []
    }
  },
  created() {
    this.getViewList()
  },
  methods: {
    // 整理传进来的数据
    getViewList() {
      this.searchList.forEach(item => {
        item.type === 'radio' ? this.listLine.push(item) : this.listLineItem.push(item)
      })
    },
    // 清空input框数据,触发查询
    clearData() {
      this.queryTableData()
    },
    // 清空时间,触发查询
    changeDate(value) {
      if (!value) {
        this.queryTableData()
      }
    },
    // 触发父页面的查询
    queryTableData() {
      this.$emit('queryTablePageChange')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/style/element-variables";
.list-screening-search{
  margin-bottom: 10px;
  width: 100%;
  top: 100px;
  right: 0;
  padding: 5px 0 20px 0;
  z-index: 1500;
  box-sizing: border-box;
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
  .list-margin{}
  /deep/ .label-input{
    display: inline-block;
    margin-left: 10px;
    .el-input{
      .el-input__inner{
        width: 160px;
        line-height: 32px;
        height: 32px;
      }
      .el-input_suffix{
        margin-right: 5px;
      }
      .el-input__icon {
        line-height: 32px;
      }
    }
  }
  /deep/ .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 160px;
    height: 32px;
    line-height: 32px;
    .el-input__icon{
      line-height: 0;
    }
  }
  .el-button{
    width: 100px;
    height: 32px;
    padding: 0 20px;
    &.active{
      border: 1px solid #ffac0d;
      color: #ffac0d;
      background-color: #fff;
    }
    &.query-btn{
      margin-left: 10px;
    }
  }
  /deep/ .el-input--mini {
    font-size: 14px;
  }
}
</style>
