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

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
