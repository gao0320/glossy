<template>
    <!-- 选择图片 -->
    <el-tabs v-model="activeName">
        <el-tab-pane label="素材库" name="material">
          <div class="select-img-list">
            <!-- 循环生成列表 -->
            <el-card class="img-card" v-for="item in list" :key="item.id">
              <img @click="clickImg(item.url)" :src="item.url" alt="">
            </el-card>
          </div>
          <!-- 分页 -->
          <el-row type="flex" justify="center">
            <el-pagination background layout="prev, pager, next" :total="page.total" :current-page="page.currentPage" :page-size="page.pageSize"
            @current-change="changePage"></el-pagination>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <!-- 放置一个上传组件 -->
        <el-upload class='upload' :http-request="uploadImg" action="" :show-file-list="false">
            <i class='el-icon-plus'></i>
        </el-upload>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material',
      list: [],
      page: {
        pageSize: 8,
        currentPage: 1,
        total: 0
      }
    }
  },
  methods: {
    // 上传
    uploadImg (params) {
      let data = new FormData() // 实例化对象
      data.append('image', params.file) // 添加文件参数4
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(result => {
        // result.data.url
        this.$emit('selectOneImg', result.data.url) // 自定义事件名这里不再强制小写
      })
    },
    clickImg (url) {
      // 把url传给coverimg的模板中 用到组件子传父
      this.$emit('selectOneImg', url)
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllImg()
    },
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false,
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getAllImg()
  }
}
</script >

<style lang='less' scoped>
 .select-img-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .img-card {
      width: 120px;
      height: 120px;
      margin: 10px 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
     }
    .upload {
   display: flex;
   justify-content: center;
    i {
        font-size: 50px;
        display: block;
        margin: 20px auto;
        padding: 60px;
        border: 1px dashed #ccc;
        border-radius: 4px;

}
}
</style>
