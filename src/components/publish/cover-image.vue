<template>
<div class="cover-image">
    <div @click="openDialog(index)" v-for="(item,index) in list" :key="index" class="cover-item">
        <!-- <img src="../../assets/img/pic_bg.png" alt=""> -->
        <img :src="item ? item : defaultImg" alt="">
    </div>
    <el-dialog :visible="dialogVisible" @close="closeDialog">
    <!-- dialog弹出生成的元素默认在body上  不在这里 -->
    <!-- <span>这里是插槽 放选择素材组件 一般不放到这里再封装组件</span> -->
    <select-image @selectOneImg="receiveImg"></select-image>
    </el-dialog>
</div>

</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      dialogVisible: false, // 默认false 点击才打开
      defaultImg: require('../../assets/img/pic_bg.png'),
      selectIndex: -1
    }
  },
  methods: {
    receiveImg (img) {
    // alert(img) 接受到的地址没法放到list中  这里props list是接受父组件的 有只读性=》需要再次传递
      this.$emit('clickOneImg', img, this.selectIndex) // 再次触发自定义事件
      this.closeDialog()
    },
    openDialog (index) {
      this.selectIndex = index
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
