<template>
  <el-card v-loading="loading">
      <bread-crumb slot="header">
        <template slot="title">账户信息</template>
      </bread-crumb>
      <el-upload :http-request="uploadImg" class="head-upload" action="" :show-file-list="false">
          <img :src="formData.photo ? formData.photo : defaultImg" alt="">
      </el-upload>
      <el-form ref="myForm" :model="formData" :rules="rules" style="margin-left:100px" label-width="60px">
          <el-form-item label="用户名" prop="name">
              <el-input v-model="formData.name"  style="width:30%"></el-input>
          </el-form-item>
          <el-form-item label="简介" prop="intro">
              <el-input v-model="formData.intro"  style="width:30%"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
              <el-input v-model="formData.email"  style="width:30%"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
              <el-input v-model="formData.mobile"  disabled style="width:30%"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button @click="saveUserInfo" type="primary">保存信息</el-button>
          </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      formData: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      },
      rules: {
        name: [{ required: true, message: '用户名不能为空' }, {
          min: 1, max: 7, message: '用户名的长度限制为1到7个字符'
        }],
        email: [{ required: true, message: '邮箱不能为空' }, {
          pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, message: '邮箱格式不正确'
        }]
      }, // 规则
      defaultImg: require('../../assets/img/404.png')
    }
  },
  methods: {
    uploadImg (params) {
      this.loading = true
      let data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: 'user/photo',
        data: data,
        method: 'patch'
      }).then(result => {
        this.formData.photo = result.data.photo
        this.loading = false
      })
    },
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
      })
    },
    saveUserInfo () {
      // 要去校验表单数据是否OK
      this.$refs.myForm.validate((isOK) => {
        //   调用保存方法
        if (isOK) {
          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.formData
          }).then(result => {
            //   认为保存成功
            this.$message({
              type: 'success',
              message: '保存信息成功'
            })
          })
        }
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
.head-upload{
    position: absolute;
    right: 220px;
    img{
        width: 160px;
        height: 160px;
        border-radius: 50%;
    }
}
</style>
