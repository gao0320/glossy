<template>
<div class="cover-image">
    <div @click="openDialog" v-for="(item,index) in list" :key="index" class="cover-item">
        <!-- <img src="../../assets/img/pic_bg.png" alt=""> -->
        <img :src="item ? item : defaultImg" alt="">
    </div>
    <el-dialog :visible="dialogVisible" @close="closeDialog">
    <!-- dialog弹出生成的元素默认在body上  不在这里 -->
    <!-- <span>这里是插槽 放选择素材组件 一般不放到这里再封装组件</span> -->
    <select-image></select-image>
    </el-dialog>
</div>

</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      dialogVisible: false, // 默认false 点击才打开
      defaultImg: require('../../assets/img/pic_bg.png')
    }
  },
  methods: {
    openDialog () {
      this.dialogVisible = true
    },
    closeDialog () {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
    .cover-image {
    display: flex;
    margin:20px 0;
    margin-left: 100px;
     .cover-item {
       border: 1px solid #ccc;
       width: 250px;
       height: 250px;
       padding: 10px;
       img {
         height: 100%;
         width:100%;
       }
     }
  }
</style>
