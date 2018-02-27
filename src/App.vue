<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import nav_title from '@/components/nav'

  export default {
    name: 'App',
    components:{
      nav_title:nav_title
    },
  }

</script>

<style lang="scss">
  html,body{height:100%;margin:0px;}
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  .search {
  .el-input__inner{
     border: none;
   }
    .el-input-number__increase,.el-input-number__decrease{
      border: none;
      background-color: #fff;
    }
  },
  .basics1{
    .el-progress-bar__outer{
      border-radius: 0;
    }
    .el-progress-bar__inner{
      border-radius: 0;

    }
  }
</style>
