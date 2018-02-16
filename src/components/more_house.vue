<template>
  <div>
    <nav_title></nav_title>


    <div>
      <el-row>
        <el-col :span="24">
          <h3>热门房屋</h3>
          <el-col :span="24">
            <div v-for="item in house_data">
              <el-col :span="7">
                <div>

                  <img :src="'http://'+item.photo[0]" alt="" style="width: 100%;height: 100%;">
                  <h5>{{item.house_title}}</h5>

                </div>
              </el-col>
            </div>

          </el-col>
        </el-col>
      </el-row>
    </div>
  </div>


</template>


<script>
  import nav_title from './nav'
  import Sender from '../Sender/sender'
  import cfg from '../../.cfg'
  export default ({
    name: 'house_more',
    data(){
      return {
        house_data:[],
      }
    },
    components: {
      nav_title: nav_title,
    },
    created: function () {
      let me = this;
      this.$store.dispatch('is_login')
      Sender.post(`${cfg.api}/api/house/read_house`)
        .then(function (data) {
          me.house_data = data;
        })
    }
  })
</script>

<style>

</style>
