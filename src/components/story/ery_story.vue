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
        <div class="uu"></div>
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
      return {
        story: {},
        writer: {},
      }
    },
    props: ['id'],
    created: function () {
      let me = this;
      //获取故事详情
      Sender.post(`${cfg.api}/api/story/read_id?id=${this.id}`)
        .then(function (data) {
          console.log("data", data);
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

    },
    methods: {
      read_content: function (data) {
        let content = document.querySelector('.content');
        content.innerHTML = '';
        let el = document.createElement('div');
        el.innerHTML = `${data.content}`
        el.classList.add('test')
        content.appendChild(el);
      }
    },
    updated:function () {
      $('.test').find('p').css('color', 'blue');
    },
    mounted: function () {
      console.log("this.id", this.id);
    }


  });
</script>
<style scoped>
  .test p {
    color: red;
  }
  html body div#app div div.el-row div.el-col.el-col-24 div.content div.test p{
    color:red;
  }
</style>
