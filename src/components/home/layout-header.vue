<template>
  <el-row class="layout-header" type="flex" justify="space-between" align="middle">
    <el-col class="left" :span="7">
      <i class="el-icon-s-fold"></i>
      <span class="title">江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="4" class="right">
      <el-row type="flex" justify="end" align="middle">
        <img :src="userInfo.photo?userInfo.photo : defaultImg" alt style="height:40px;width:40px;border-radius:50%" />
        <el-dropdown @command="handle">
          <span>{{userInfo.name}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command='info'>个人信息</el-dropdown-item>
            <el-dropdown-item command='git'>Git地址</el-dropdown-item>
            <el-dropdown-item command='lgout'>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}, // 用户信息
      defaultImg: require('../../assets/img/325608.jpg')
    }
  },
  // 生命周期 进入查询数据
  created () {
    // let token = window.localStorage.getItem('user-token')
    this.$axios({
      url: '/user/profile'
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
    }).then(result => {
      this.userInfo = result.data// 获取用户信息
    })
  },
  methods: {
    handle (command) {
      if (command === 'lgout') {
        debugger
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      } else if (command === 'git') {
        window.location.href = 'https://github.com/gao0320'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.layout-header {
  height: 50px;
  .left {
    font-size: 16px;
    .title {
      margin-left: 4px;
      font-size: 14px;
    }
  }
  .right{
      img{
          margin-right: 5px;
      }
  }
}
</style>
