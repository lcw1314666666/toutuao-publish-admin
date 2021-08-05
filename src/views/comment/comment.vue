<template>
  <div class="comment">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!--    面包屑-->
        <el-breadcrumb separator="/" class="article-breadcrumb">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        stripe
      >
        <el-table-column
          prop="title"
          label="标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="total_comment_count"
          label="总评论数"
          width="180">
        </el-table-column>
        <el-table-column
          prop="fans_comment_count"
          label="粉丝评论数">
        </el-table-column>
        <el-table-column
          prop="comment_status"
          label="状态"
        >
          <template slot-scope="scope">
            {{ scope.row.comment_status ? '正常' : '关闭' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="operation"
          label="操作"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.comment_status"
              :disabled="scope.row.statusDisable"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="onStatusChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40, 50, 60, 70, 80, 90]"
        :page-size.sync="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticles, updateCommentStatus } from '@/api/article'
export default {
  name: 'Comment',
  data () {
    return {
      tableData: [],
      currentPage: 0,
      swichValue: true,
      pageSize: 10,
      totalCount: null
    }
  },
  methods: {
    handleSizeChange (size) {
      this.pageSize = size
      this.loadArticle(this.currentPage, this.pageSize)
    },
    handleCurrentChange (page) {
      // console.log(`当前页为${page}`)
      this.loadArticle(page)
    },
    loadArticle (page = 1, pageSize) {
      getArticles({
        response_type: 'comment',
        page,
        per_page: pageSize
      }).then(res => {
        const results = res.data.data.results
        results.forEach(item => {
          item.statusDisable = false
        })
        this.tableData = results
        this.currentPage = res.data.data.page
        this.per_page = res.data.data.per_page
        this.totalCount = res.data.data.total_count
      })
    },
    onStatusChange (article) {
      // 修改文章评论状态
      article.statusDisable = true
      updateCommentStatus(article.id, article.comment_status).then(res => {
        this.$message({
          message: '文章评论状态修改成功',
          type: 'success'
        })
        article.statusDisable = false
      })
    }
  },
  created () {
    this.loadArticle()
  }
}
</script>

<style lang="scss" scoped>
.text {
  font-size: 14px;
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

.box-card {
  width: 100%;
}
.el-table{
  /deep/ .el-table__header-wrapper{
    line-height: 0 !important;
  }
}
</style>
