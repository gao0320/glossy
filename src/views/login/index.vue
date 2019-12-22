<template>
  <!-- <div class="login"><span>登录页面</span></div> -->
  <div class="login">
    <el-card class="login-card">
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <el-form :model="loginForm" :rules="loginRules" ref="myForm">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" style="margin-top:28px" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" style="width:66%" placeholder="请输入验证码"></el-input>
          <el-button style="float:right" plain>发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="check">
            <el-checkbox v-model="loginForm.check">我一已同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
            <el-button @click="submitLogin" type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return { loginForm: {
      mobile: '',
      code: '',
      check: 'false'
    },
    loginRules: {
      mobile: [{ required: true, message: '请输入手机号' }, { pattern: /^1[3456789]\d{9}$/, message: '请输入合法的手机号' }],
      code: [{ required: true, message: '请输入验证码' }, { pattern: /^\d{6}$/, message: '验证码为6位数字' }],
      check: [{ validator: function (rule, value, callback) {
        if (value) {
          callback()
        } else {
          callback(new Error('请先阅读协议！'))
        }
      } }]
    }
    }
  },
  methods: {
    submitLogin () {
      this.$refs.myForm.validate((isOk) => {
        if (isOk) {
          // 调用接口
          // alert('调用接口')
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.loginForm
          }).then(result => {
            window.localStorage.setItem('user-token', result.data.token)
            this.$router.push('/home')// 跳到主页
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login {
  background-image: url("../../assets/img/login_bg.jpg");
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width: 460px;
    height: 340px;
    .title {
      text-align: center;
      img {
        //  margin-top: 30px;
        height: 45px;
      }
    }
  }
}
</style>

<!-- <style lang="less" scoped>
// .login {
//     span {
//         color: #f00;
//         }
// }
// </style> -->
