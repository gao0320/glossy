<template>
  <el-row class="layout-header" type="flex" justify="space-between" align="middle">
    <el-col class="left" :span="7">
      <i @click="collaspseOrOpen" :class="{'el-icon-s-unfold': collapse,'el-icon-s-fold':!collapse}"></i>
      <!-- <i class="el-icon-s-unfold"></i>el-icon-s-fold -->
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
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      collapse: false, // 是否折叠
      userInfo: {}, // 用户信息
      defaultImg: require('../../assets/img/325608.jpg')
    }
  },
  // 生命周期 进入查询数据
  created () {
    // let token = window.localStorage.getItem('user-token')
    this.getUserInfo()
    eventBus.$on('updateUserInfoSuccess', () => {
      // alert('66666666666666666666')
      this.getUserInfo()
    })
  },
  methods: {
    collaspseOrOpen () {
      this.collapse = !this.collapse
      eventBus.$emit('changeCollapse')
    },
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
      }).then(result => {
        this.userInfo = result.data// 获取用户信息
      })
    },
    handle (command) {
      if (command === 'lgout') {
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      } else if (command === 'git') {
        window.location.href = 'https://github.com/gao0320'
      } else if (command === 'info') {
        this.$router.push('/home/account')
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
    i {
      font-size: 20px;
    }
  }
  .right{
      img{
          margin-right: 5px;
      }
  }
}
</style>
