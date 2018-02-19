<template>

  <div style="width: 70%;margin: 0 auto">
    <el-row>

      <el-col :span="24">
        <img :src="writer.photo" alt="" width="50px">
        {{writer.username}}
        <span v-if="time_">
          {{time_}}天之前
        </span>
        <span v-else>
          今天
        </span>
      </el-col>

      <el-col :span="24">
        <div class="content">
        </div>

        <div class="love_coll">
          <span>已有{{story.love}}人点赞</span>
          <span>已有{{story.collect}}人收藏</span>
        </div>
        <div class="uu">
          <button @click="btn_love">
            点赞
          </button>

          <button @click="btn_coll">
            收藏
          </button>

        </div>
      </el-col>
    </el-row>
  </div>


</template>


<script>
  import Sender from '../../Sender/sender'
  import cfg from '../../../.cfg'
  import $ from 'jquery'

  export default ({
    name: "ery_story",
    data() {
      let me = this;
      return {
        story: {},
        writer: {},
        temporary: {
          id: me.id,
          collect: '',
          love: '',
          test_: 1,
        },
      }
    },
    props: ['id'],
    created: function () {
      this.$store.dispatch('is_login');

      let me = this;
      //获取故事详情
      Sender.post(`${cfg.api}/api/story/read_id?id=${this.id}`)
        .then(function (data) {
          me.story = data;
          me.read_content(data)
          let user_id = data.user_id;
          Sender.post(`${cfg.api}/api/read_user_id?id=${user_id}`)
            .then(function (data) {
              me.writer = data;
            })
        })
    },
    computed: {
      time_: function () {
        let old_time = (new Date(this.story.created_at)).getTime();
        let new_time = (new Date()).getTime();
        let time = parseInt((new_time - old_time) / 1000 / 60 / 60 / 24);
        return time;
      },
      now_user: function () {
        return this.$store.getters['get_user'];
      },
    },
    methods: {


      test: function (data) {
        if (data.data == null) {
          data.data = [];
          data.data.push(this.temporary)
        } else {
          let me = this;
          data.data.forEach(function (item) {
            if (item.id == me.id) {
              me.temporary = item;
              console.log("item",item);
            } else {
              data.data.push(this.temporary)
            }
          })
        }
      },


      read_content: function (data) {
        let content = document.querySelector('.content');
        content.innerHTML = '';
        let el = document.createElement('div');
        el.innerHTML = `${data.content}`
        el.classList.add('test')
        content.appendChild(el);
      },
      update_story: function () {
        Sender.post(cfg.api + '/api/story/add', this.story)
          .then(function (data) {
            // console.log("data", data);
          })
      },
      btn_love: function () {
        this.temporary.love = !this.temporary.love;
        let me = this;
        if (this.temporary.love) {
          this.story.love++;
          this.update_story();
          console.log("已经点赞");
          console.log(" this.story.love", this.story.love);
        } else {
          this.story.love--;
          this.update_story();
          console.log("撤销点赞");
          console.log(" this.story.love", this.story.love);
        }
      },
      btn_coll: function () {
        this.temporary.collect = !this.temporary.collect;
        let me = this;
        if (this.temporary.collect) {
          this.story.collect++;
          this.update_story();
        } else {
          this.story.collect--;
          this.update_story();
        }
        this.now_user.data.forEach(function (item, index) {
          if (item.id == me.temporary.id) {
            me.now_user.data[index].collect = me.temporary.collect;
            // item = me.temporary;
          }
        })
        console.log("this.now_user.data.collect", this.now_user.data[0].collect);
        Sender.post(cfg.api + '/api/update_data', this.now_user)
          .then(function (data) {
            // data[0].data.forEach(function (item) {
            //   if (item.id == me.temporary.id) {
            //     me.now_user()
            //   }
            // })
            me.test(data.data[0]);
          })

      },

    },
    updated: function () {
      $('.test').find('p').css('color', 'blue');
    },
    mounted: function () {
      this.test(this.now_user)
    }


  });
</script>
<style scoped>
  .test p {
    color: red;
  }

  html body div#app div div.el-row div.el-col.el-col-24 div.content div.test p {
    color: red;
  }
</style>
