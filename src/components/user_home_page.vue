<template>
  <div>
    <nav_title></nav_title>


    <el-row>
      <el-col :span="8">
        <div>
          <img :src="user_msg.photo" alt="" style="width: 100px;height: 100px;">
          <!--用户头像  -->
        </div>

        <div>
          <span v-if="user_msg.phone">
            {{user_msg.phone}}
          </span>
          <br>
          <span v-if="user_msg.email">
           {{user_msg.email}}
          </span>
          <!--身份核验-->
        </div>
      </el-col>
      <el-col :span="16">
        <el-col :span="24">
        <h1>您好,我是 {{user_msg.name}}</h1>
          <h5>个人信息</h5>
        </el-col>
        <el-col :span="24">
          <span>粉丝</span>
          <span>关注</span>

        </el-col>
        <el-col :span="24">
          <h5>故事</h5>
        </el-col>
        <el-col :span="24">
          <h5>房源</h5>
        </el-col>
      </el-col>
    </el-row>


  </div>


</template>


<script>

  import nav_title from './nav'

  export default ({
    name: 'user_home_page',
    data() {
      return {
      }
    },
    components: {
      nav_title: nav_title,
    },
    created:function () {
      this.$store.dispatch('is_login');
    },
    computed:{
      user_msg:function () {
        return this.$store.getters['get_user'];
      }
    },
    methods:{
      test:function () {
        console.log("this",this.user_msg);
      }
    }

  })
</script>


<style>

</style>
