<template>
  <div>
    <div class="heard">
      <nav_title></nav_title>
      <h1>Airbnb爱彼迎</h1>
      <h3>与家人一起,在旅行中迎接新年</h3>
    </div>

    <div>
      <el-row>

        <h1>热门目的地</h1>
        <el-col :span="24">
          <div class="city_show">
            <span>北京</span>
            <span>上海</span>
            <span>杭州</span>
            <span>苏州</span>
            <span>桂林</span>
          </div>
        </el-col>
      </el-row>
      <div v-for="item in house_data">
        <el-col :span="8">
          <div style="width:100%;height:100%;">
            <router-link :to="'/house_material/'+item.id">
            <img :src="'http://'+item.photo[0]" alt="" style="width: 100%;height: 100%;">
            </router-link>
            <h5>{{item.house_title}}</h5>
          </div>
        </el-col>
      </div>
      <router-link to="/more_house">
      <el-button type="primary">查看更多房源</el-button>
      </router-link>
    </div>
  </div>


</template>


<script>
  import nav_title from '@/components/nav'
  import Sender from '../Sender/sender'
  import cfg from '../../.cfg'

  export default ({
    name: 'helloword',
    data() {
      return {
        house_data: [],
      }
    },
    components: {
      nav_title: nav_title
    },
    computed: {
      user() {
        return this.$store.getters['get_user']
      },
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


<style scoped>
  .heard {
    background-image: url(https://z1.muscache.cn/airbnb/static/china/cny2018/marquee_web_large-065c19623769a666dd968e2b66981b7b.jpg);
    width: 100%;
    height: 400px;
  }

  h1 {
    color: #FF5A5F;
  }

  h3 {
    color: white;
  }

  .city_show {

  }
</style>
