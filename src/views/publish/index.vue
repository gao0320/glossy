<template>
<el-card>
    <bread-crumb slot="header">
      <template slot="title">
          发布文章
      </template>
    </bread-crumb>
    <!-- 表单 label-width-->
      <el-form ref="publishForm" :model="formData" :rules="publishRules" style="margin-left:50px" label-width="100px">
        <el-form-item prop="title" label="标题">
          <el-input v-model="formData.title" style="width:60%"></el-input>
        </el-form-item>
        <el-form-item prop="content" label="内容">
          <el-input v-model="formData.content" type="textarea" :rows="4"></el-input>
        </el-form-item>
        <el-form-item prop="type" label="封面">
          <el-radio-group>
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="channel_id" label="频道">
          <el-select v-model="formData.channel_id">
              <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>

          <el-button @click="publishArticle()" type='primary'>发布</el-button>
          <!-- <el-button @click="publishArticle">存入草稿</el-button> -->
          <!-- 有参数传入 没参数 方法（） -->
          <el-button @click="publishArticle(true)">存入草稿</el-button>

        </el-form-item>
      </el-form>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [], // 接受频道
      formData: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: [] // 存图片
        },
        channel_id: null
      },
      publishRules: {
        title: [{
          required: true, message: '标题内容不能为空'
        }, { min: 5, max: 30, message: '标题长度要在5-30字符间' }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '频道内容不能为空' }]
      }
    }
  },
  watch: {
    $route: function (to, from) {
      // 有参数 修改
      if (Object.keys(to.params).length) {

      } else {
        // 没参数 发布
        this.formData = {
          title: '',
          content: '',
          cover: {
            type: 0,
            images: []// 存图片
          }
        }
      }
    }
  },
  methods: {
    // 获取频道
    getChannels () {
      this.$axios({
        url: '/channels'

      }).then(result => {
        this.channels = result.data.channels
      })
    },
    // 发布
    publishArticle (draft) {
      this.$refs.publishForm.validate((isOK) => {
        if (isOK) {
          let { articleId } = this.$route.params
          //   console.log('逻辑正确')
          this.$axios({
            // url: './articles',
            // method: 'post',
            method: articleId ? 'put' : 'post',
            url: articleId ? `/articles/${articleId}` : `/articles`,
            params: { draft },
            data: this.formData
          }).then((result) => {
            this.$router.push('/home/articles')
          })
          // if (articleId) {
          //   // 修改文章
          //   this.$axios({
          //     method: 'put',
          //     url: `/articles/${articleId}`,
          //     params: { draft }, // query参数
          //     data: this.formData
          //   }).then(() => {
          //   // 新增成功 => 应该去内容列表
          //     this.$router.push('/home/articles') // 回到内容列表
          //   })
          // } else {
          // // 可以去进行 发布接口调用
          //   this.$axios({
          //     url: '/articles',
          //     method: 'post',
          //     params: { draft }, // query参数
          //     data: this.formData
          //   }).then(() => {
          //   // 新增成功 => 应该去内容列表
          //     this.$router.push('/home/articles') // 回到内容列表
          //   })
          // }
        }
      })
    },
    getArticleById (articleId) {
      this.$axios({
        url: `/articles/${articleId}`
      }).then(result => {
        this.formData = result.data
      })
    }
  },
  created () {
    this.getChannels()
    // 获取id 判断有无id  有id 就是修改 没id就是发布
    let { articleId } = this.$route.params // 回去动态路由参数 articleId已经是字符串
    articleId && this.getArticleById(articleId) // 获取文章数据
  }
}
</script>

<style>

</style>
