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
          <el-button @click="publishArticle" type='primary'>发布</el-button>
          <el-button @click="publishArticle">存入草稿</el-button>

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
    publishArticle () {
      this.$refs.publishForm.validate(function (isOK) {
        if (isOK) {
          console.log('逻辑正确')
        }
      })
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style>

</style>
