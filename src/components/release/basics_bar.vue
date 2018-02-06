<template>
  <el-row>
    <el-col :span="5">爱彼迎</el-col>
    <el-col :span="19">{{msg_title}}</el-col>
  </el-row>
</template>

<script>
  export default ({
    name: 'basics_bar',
    props:['msg_title']
  })


</script>


<style>

</style>
