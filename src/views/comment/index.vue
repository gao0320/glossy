<template>
 <el-card v-loading="loading">
     <bread-crumb slot="header">
     <template slot="title"> 评论列表</template>
     </bread-crumb>
     <el-table :data="list">
         <!-- <el-table-column width="600" label="标题"></el-table-column>
         <el-table-column label="评论状态"></el-table-column>
         <el-table-column label="总评论数"></el-table-column>
         <el-table-column label="粉丝评论数"></el-table-column>
         <el-table-column label="操作"></el-table-column> -->
         <el-table-column prop="title" width="600" label="标题"></el-table-column>
         <el-table-column :formatter="formatterBool"  prop="comment_status" label="评论状态"></el-table-column>
         <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
         <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
         <el-table-column label="操作">
           <!-- 放组件   作用域插槽  row column $index-->
           <template slot-scope="obj">
             <el-button type='text' size="small">修改</el-button>
            <el-button type='text' size="small" @click="openOrClose(obj.row)">{{  obj.row.comment_status ? '关闭评论' : '打开评论'  }}</el-button>
           </template>
         </el-table-column>
     </el-table>
     <!-- 分页 -->
     <el-row type='flex' justify="center" align="middle" style="height:80px">
     <el-pagination background layout="prev, pager, next"
     :current-page="page.currentPage"
     :page-size="page.pageSize"
     :total="page.total"
     @current-change="changePage"
     ></el-pagination>
    </el-row>
 </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      list: [],
      page: {
        // 专门放置分页数据
        total: 0, // 数据总条数
        pageSize: 10, // 默认每页10条
        currentPage: 1 // 当前页码 默认第一页
      }
    }
  },
  methods: {
    // 页码改变事件
    changePage (newPage) {
      //  修改当前页码
      this.page.currentPage = newPage
      this.getComment()
    },
    // 请求评论列表数据
    getComment () {
      this.loading = true
      // axios 是默认是get类型
      // query 参数 / 路由参数 地址参数 get参数  axios  params
      // body参数 给 data
      // 身份信息 headers
      // this.$axios({ url: '/articles', params: { response_type: 'comment' } }).then(result => {
      //   this.list = result.data.results // 获取评论列表数据给本身data
      // })
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(result => {
        this.list = result.data.results // 获取评论列表数据给本身data
        this.page.total = result.data.total_count // 获取文章总条数
        this.loading = false
      })
    },
    // 定义一个布尔值转化方法
    formatterBool (row, column, cellValue, index) {
      // row  当前行数据
      // column 当前列属性
      // cellValue 当前单元格的值
      // index  当前下标
      return cellValue ? '正常' : '关闭'
    },
    openOrClose (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      // $comfirm是promise确定是进入then
      this.$confirm(`你确定要${mess}吗？`).then(() => {
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: {
            article_id: row.id.toString()
          },
          data: {
            allow_comment: !row.comment_status
          }
        }).then(result => {
          // 打开或者关闭评论成功之后
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.getComment() // 重新请求列表
        })
      })
    }
  },
  created () {
    // 调用请求数据方法
    this.getComment()
  }

}
</script>

<style>

</style>
