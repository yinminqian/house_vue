<template>
  <div>
    <nav_title></nav_title>
    <hr>


    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <swiper :options="swiperOption" ref="mySwiper">
            <!-- slides -->
            <swiper-slide v-for="item in house_data.photo">
              <img :src="item +'?imageView2/1/w/500/h/500'" alt="">
            </swiper-slide>
            <!-- Optional controls -->
            <!--<div class="swiper-pagination"  slot="pagination"></div>-->
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
            <!--<div class="swiper-scrollbar"   slot="scrollbar"></div>-->
          </swiper>
        </div>
      </div>
    </div>


    <!--<div class="container-fluid" style="margin-top: 500px">-->
    <!--<div class="row">-->
    <!--<div class="col-md-12">-->

    <!--<el-carousel :interval="4000"  height="200px">-->
    <!--<el-carousel-item v-for="item in house_data.photo" :key="item">-->
    <!--<img :src="item +'?imageView2/1/w/1000/h/200'" alt="">-->
    <!--</el-carousel-item>-->
    <!--</el-carousel>-->
    <!--</div>-->
    <!--</div>-->

    <!--</div>-->


    <div class="container">
      <div class="row">
        <div class="col-md-6">

          <div class="col-md-12">
            {{house_data.location['city']}}-{{house_data.genre}}
          </div>


          <div class="col-md-12">
            <h4>{{house_data.house_title}}</h4>
            <span>卧室:{{house_data.room_number?house_data.room_number:0}}个</span>
            <span>床:{{house_data.bed_number?house_data.bed_number:0}}个</span>
            <span>{{house_data.toilet?house_data.toilet:0}}个卫生间</span>
            <span>最多住:{{house_data.people_number?house_data.people_number:0}}个人</span>
          </div>


          <hr style="color: #000;">


          <div class="col-md-12">
            <div class="row">
              <div class="col-md-2">
                <img :src="lady.photo+'?imageView2/1/w/80/h/80'" alt="" class="user_img">
              </div>
              <div class="col-md-10 username">
                <h5>房东:{{lady.username}}</h5>
                <span>
                  查看主页
                </span>
              </div>

            </div>

          </div>
          <div class="col-md-12">
            <h5>房屋描述</h5>
            <span>{{house_data.house_text}}</span>
          </div>


          <div class="col-md-12">
            <h5>设施信息</h5>
            <div v-for="item in house_data.facility">
              <div v-if="item.have !=='false'">{{item.title}}</div>
            </div>
          </div>
          <div>


            <div class="col-md-12">
              <h5>可定状态</h5>
              <span>最少住{{house_data.stay_min}}晚</span>
              <h5>提前通知</h5>
              <span>提前{{house_data.inform}}天通知</span>
            </div>


            <div class="col-md-12">
              房源类型
              {{house_data.genre}}/{{house_data.house_genre}}/{{house_data.bedroom_genre}}
            </div>

            <div class="col-md-12">
              <h5>便利设施</h5>
              <div v-for="item in house_data.convenience">
                <div v-if="item.have !=='false'">
                  <span>
                    {{item.title}}
                  </span>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <h5>好处</h5>
              <div v-for="item in house_data.regulation">
                <span v-if="item.mode">
                  {{item.label}}
                </span>


              </div>


            </div>


            <div class="col-md-12">
              <h5>评价</h5>
              <span>
              开发中
            </span>
            </div>


            <div class="col-md-12">
              <h5>位置</h5>
              <span>具体位置:{{house_data.location['state']}} {{house_data.location['city']}} {{house_data.location['street']}} {{house_data.location['plot']}}</span>
            </div>


            <div class="col-md-12">
              <amap location='house_data.location'></amap>
            </div>


            <div class="col-md-12">
              <h5>须知</h5>

              <div v-for="item in house_data.string">
                <span v-if="! item.mode">
                  {{item.label}}
                </span>
                {{item.guest_title}}
                {{item.landlord_title}}
              </div>
            </div>


            <div class="col-md-12">
              <h5>房东</h5>
              {{lady}}
            </div>

          </div>

        </div>
        <div class="col-md-6">
          <h5>预定面板</h5>
          <div class="block">
            <span class="demonstration">选择入住时间</span>
            <br>
            <el-date-picker
              v-model="value6"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions1"
            >
            </el-date-picker>


            <el-button @click="sub_state">提交我的预定</el-button>
          </div>
        </div>


      </div>
    </div>


  </div>
</template>


<script>
  import Sender from '../Sender/sender'
  import cfg from '../../.cfg'
  import nav_title from './nav'
  import amap from './amap'


  export default ({
    name: "house_details",
    data() {
      let me = this;
      return {
        swiperOption: {
          slidesPerView: 2,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },

        },
        house_data: {},
        img_1: '',
        img_2: '',
        lady: {},
        house_location: {},
        value6: '',
        house_state: {
          time_reserve: [],
          house_id: '',
          reserve_poke: [],
        },
        pickerOptions1: {
          disabledDate(time) {
            if (me.house_state.time_reserve.length == 0) {
              return
            }
            let b = me.house_state.time_reserve.findIndex(function (item) {
              return item == time.getTime();
            })
            return (b != -1);
          },
        }
      }
    },
    computed: {
      day() {
        return 24 * 60 * 60 * 1000;
      },
      user_msg: function () {
        return this.$store.getters['get_user'];
      },
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },


    props: ['id'],
    components: {
      nav_title: nav_title,
      amap: amap,
    },

    created: function () {
      this.$store.dispatch('is_login');
      let me = this;
      Sender.post(`${cfg.api}/api/house/read_id?id=${this.id}`)
        .then(function (data) {
          me.house_data = data[0];
          me.img_1 = data[0].photo[0];
          me.img_2 = data[0].photo[1];
          me.house_location = data[0].location
          Sender.post(`${cfg.api}/api/read_user_id?id=${me.house_data.user_id}`)
            .then(function (data) {
              me.lady = data;
            })
        });
      Sender.post(cfg.api + '/api/house_state/read_house_id?id=' + this.id)
        .then(function (data) {
          if (data.length == 0) {
            return;
          }
          me.house_state = data[0];
          if (me.house_state.reserve_poke == null) {
            me.house_state.reserve_poke = [];
          }
        })
    },
    methods: {
      sub_state: function () {
        let short_obj = {};
        let short_arr = [];
        if (this.value6 == '') {
          return;
        } else {
          this.house_state.house_id = this.id;
          this.house_state.time_reserve.push(this.value6[1].getTime());
          short_arr.push(this.value6[1].getTime())
          for (let i = this.value6[0].getTime(); i < this.value6[1].getTime(); i += this.day) {
            short_arr.push(i);
            this.house_state.time_reserve.push(i);
          }
        }
        let su = this.user_msg.id;
        short_obj[su] = short_arr;
        this.house_state.reserve_poke.push(short_obj);
        let me = this;
        Sender.post(cfg.api + '/api/house_state/add', this.house_state)
          .then(function (data) {
            if (data) {
              Sender.post(cfg.api + '/api/house_state/read_house_id?id=' + me.id)
                .then(function (data) {
                  me.time_reserve = data[0].time_reserve;
                  me.value6 = '';
                })
            }
          });


      }
    },
    mounted: function () {


      new Date().toLocaleDateString();
    }
  })


</script>


<style lang="scss" scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .user_img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  .username {
    text-align: left;
    padding-top: 15px;
  }

</style>
