<template>
  <div>
    <h1>{{$store.state.count}}</h1>

    <button @click="i">+</button>
    <button></button>
  </div>
</template>


<script>
  export default ({
    data(){
      return{
      }
    },
    methods:{
      i(){
        this.$store.commit('inst')
      }
    },

  })
</script>
