<template>
  <div class="heard">
    <nav_title></nav_title>
    <h1>Airbnb爱彼迎</h1>
    <h3>与家人一起,在旅行中迎接新年</h3>
  </div>



</template>


<script>
  import nav_title from '@/components/nav'
  export default ({
    name:'helloword',
    components:{
      nav_title:nav_title
    }
  })

</script>


<style scoped>
.heard{
  background-image:url(https://z1.muscache.cn/airbnb/static/china/cny2018/marquee_web_large-065c19623769a666dd968e2b66981b7b.jpg);
  width: 100%;
  height: 400px;
}
  h1{
    color: #FF5A5F;
  }
  h3{
    color: white;
  }
</style>
