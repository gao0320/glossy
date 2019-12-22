<template>
  <el-bread-crumb>
      <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
          <slot name="title">

          </slot>
      </el-breadcrumb-item>
  </el-bread-crumb>
</template>

<script>
export default {

}
</script>

<style>

</style>
