<template>
  <div class="article">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!--    面包屑-->
        <el-breadcrumb separator="/" class="article-breadcrumb">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">内容管理</a></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!--    form表单-->
      <el-form ref="form" size="mini" :model="form" label-width="80px" class="search-form">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelId" placeholder="请选择频道">
            <el-option label="全部" :value="null"></el-option>
            <el-option v-for="(item, index) in channels" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期时间">
          <el-date-picker
            v-model="rangeDate"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <!--    搜索按钮-->
        <el-button type="primary" @click="loadArticles(1)">查询</el-button>
      </el-form>
    </el-card>
    <el-card class="box-card table-card">
      <div slot="header" class="clearfix date-num">
        <!--    数据数量-->
        根据筛选条件共查询出<span>{{ tatalCount }}</span>条数据
      </div>
      <!--    表格部分-->
      <el-table
        :data="articles"
        stripe
        style="width: 100%"
      >
        <el-table-column
          prop=""
          label="封面"
        >
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" fit="scale-down" lazy>
              <div slot="error" class="image-slot">
                <span style="{font-size: 14px}">图片加载失败</span>
              </div>
            </el-image>
            <!--            <img v-if="scope.row.cover.images[0]" :src="scope.row.cover.images[0]" alt="" class="table-image" />-->
            <!--            <img v-else src="@/assets/images/article/noData.jpg" alt="" class="table-image" />-->
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
        >
        </el-table-column
        >
        <el-table-column
          prop="status"
          label="状态"
        >
          <template slot-scope="scope">
            <el-tag :type="articleStatus[scope.row.status].type">{{ articleStatus[scope.row.status].text }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--    分页符部分-->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="tatalCount"
        class="table-pagination"
        @current-change="loadArticles"
        :page-size="pageSize"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticles, getArticleChannels } from '@/api/article.js'
export default {
  name: 'Article',
  data () {
    return {
      articles: null,
      articleStatus: [
        {
          status: 0,
          text: '草稿',
          type: ''
        },
        {
          status: 1,
          text: '待审核',
          type: 'warning'
        },
        {
          status: 2,
          text: '审核通过',
          type: 'success'
        },
        {
          status: 3,
          text: '审核失败',
          type: 'danger'
        },
        {
          status: 4,
          text: '已删除',
          type: 'info'
        }
      ],
      form: {
        resource: '',
        region: '',
        dateTime: ''
      },
      // 数据总数
      tatalCount: 0,
      // 每页数据条数
      pageSize: 10,
      // 状态参数
      status: null,
      // 频道列表
      channels: null,
      // 当前频道
      channelId: null,
      // 时间数组
      rangeDate: null
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    loadArticles (page = 1) {
      getArticles({
        page: page,
        pre_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null,
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null
        // status: this.status
      }).then(res => {
        console.log(res)
        const { total_count: tatalCount } = res.data.data
        this.articles = res.data.data.results
        this.tatalCount = tatalCount
      })
    },
    loadArticleChannels () {
      getArticleChannels().then((res) => {
        // console.log(res.data.data.channels)
        this.channels = res.data.data.channels
      })
    }
  },
  created () {
    this.loadArticles(1)
    this.loadArticleChannels()
  }
}
</script>

<style lang="scss" scoped>
.article-breadcrumb{
  padding-bottom: 10px;
}
.search-form{
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  .el-form-item{
    /deep/ label{
      text-align: left;
    }
  }
}
.date-num{
  line-height: 24px;
  text-align: left;
}
/deep/ table{
  line-height: 26px;
}
.text {
  font-size: 14px;
}
.table-card{
  margin-top: 20px;
}
.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.table-image{
  width: 100px;
  background-size: cover;
}
.table-pagination{
  margin-top: 10px;
}
//.box-card {
//  width: 480px;
//}
</style>
