<template>
  <div>
    <nav_title></nav_title>
    <el-row>
      <el-col :span="12">
        <img :src="img_1" alt="" style="width: 100%;height:300px;">
        <el-button type="primary">查看照片</el-button>
      </el-col>
      <el-col :span="12">
        <img :src="img_2" style="width: 100%;height: 300px;">
      </el-col>


      <el-col :span="24">
        <el-button type="text">详情</el-button>
        <el-button type="text">评价</el-button>
        <el-button type="text">位置</el-button>
        <el-button type="text">须知</el-button>
        <el-button type="text">房东</el-button>
      </el-col>


      <el-col :span="14">
        <div>
          <h1>{{house_data.house_title}}</h1>
          <div>
            <span>{{house_data.genre}}</span>
            <span>{{house_location['city']}}</span>
          </div>
          <div>
            <!--卧室-->
            <!--床-->
            <!--最多住几个人-->
            <span>卧室:{{house_data.room_number?house_data.room_number:0}}个</span>
            <span>床:{{house_data.bed_number?house_data.bed_number:0}}个</span>
            <span>{{house_data.toilet?house_data.toilet:0}}个卫生间</span>
            <span>最多住:{{house_data.people_number?house_data.people_number:0}}个人</span>
          </div>


        </div>
        <hr style="color: #000;">


        <el-col :span="12">
          <div style="height: 100px;">
            <img :src="lady.photo" alt="" style="height: 100px;">
          </div>
        </el-col>

        <el-col :span="12">
          <div>
            <h4>房东:{{lady.username}}</h4>
          </div>
        </el-col>

        <el-col :span="24">
          <h5>房屋描述</h5>
          {{house_data.house_text}}
        </el-col>

        <el-col :span="24">
          <h5>设施信息</h5>
          <div v-for="item in house_data.facility">
            <div v-if="item.have !=='false'">{{item.title}}</div>
          </div>
        </el-col>
        <el-col :span="24">
          <div>
            <el-col :span="12">
              可定状态
            </el-col>
            <el-col :span="12">
              最少住{{house_data.stay_min}}晚
            </el-col>


            <el-col :span="12">
              提前通知
            </el-col>
            <el-col :span="12">
              提前{{house_data.inform}}天通知
            </el-col>
            <el-col :span="12">
              房源类型
            </el-col>
            <el-col :span="12">
              {{house_data.genre}}/{{house_data.house_genre}}/{{house_data.bedroom_genre}}
            </el-col>
            <el-col :span="24">
              <h5>便利设施</h5>
              <div v-for="item in house_data.convenience">
                <div v-if="item.have !=='false'">
                  <span>
                    {{item.title}}
                  </span>
                </div>
              </div>
            </el-col>

            <el-col :span="24">
              <h5>评价</h5>


            </el-col>
            <el-col :span="24">
              <h5>位置</h5>
            </el-col>
            <el-col :span="24">
              <h5>须知</h5>
            </el-col>


            <el-col :span="24">
              <h5>房东</h5>
            </el-col>


          </div>


        </el-col>


      </el-col>

      <el-col :span="10">
        <h5>
          预定面板
        </h5>

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


      </el-col>
    </el-row>
  </div>
</template>


<script>
  import Sender from '../Sender/sender'
  import cfg from '../../.cfg'
  import nav_title from './nav'

  export default ({
    name: "house_details",
    data() {
      let me = this;
      return {
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
      }
    },


    props: ['id'],
    components: {
      nav_title: nav_title,
    },

    created: function () {
      this.$store.dispatch('is_login');
      let me = this;
      Sender.post(`${cfg.api}/api/house/read_id?id=${this.id}`)
        .then(function (data) {
          me.house_data = data[0];
          me.img_1 = 'http://' + data[0].photo[0];
          me.house_location = data[0].location
          Sender.post(`${cfg.api}/api/read_user_id?id=${me.house_data.user_id}`)
            .then(function (data) {
              me.lady = data;
            })
        });
      Sender.post(cfg.api + '/api/house_state/read_house_id?id=' + this.id)
        .then(function (data) {
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


<style>


</style>
