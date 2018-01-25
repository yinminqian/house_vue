<template>
  <div>
    <el-form :model="form" label-width="80px">

      <el-form-item label="用户名">
        <el-input v-model="form.username" class="input_1"></el-input>
      </el-form-item>

      <el-form-item label="密码">
        <el-input v-model="form.password" class="input_1"></el-input>
      </el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>

    </el-form>

  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    name:'home',
    data:function () {
      return {
        msg:'您好',
        form:{
          username:'yinminqian',
          password:'123',
        }
      }
    },
    methods:{
      onSubmit:function () {
        $.post('http://localhost:2333/api/signup',{username:'yinminqian',password:'1212'})
          .then(function (data) {
            console.log("1data",data);
          },function (data) {
            console.log("2data",data);
          })
      }
    },
    created:function () {

    }
  }
</script>
<style scoped>
  .input_1{
    width: 300px;
  }
</style>
