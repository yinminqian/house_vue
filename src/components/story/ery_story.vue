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
          赞:{{story.love}}
          <br>
          收藏{{story.collect}}
        </div>
        <div class="uu">
          <div>
            <button v-if="love_show" @click="love_btn">
              点赞
            </button>
            <button v-if="! love_show" @click="yet_love">
              已赞
            </button>
            <button v-if="collect_show" @click="collect_btn">
              收藏
            </button>
          </div>


          <div>


            <button v-if="! collect_show" @click="yet_collect">
              已经收藏
            </button>

          </div>

        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        评论
      </el-col>
      <el-col :span="24">
        <el-input v-model="comment.comment">

        </el-input>
        <el-button @click="btn_comment">
          发送
        </el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div v-for="item in comments">
          <div>
            <div v-if="item.parent">
              {{item.parent}}回复
            </div>
            <span>
            {{item.username}}
            </span>


            <span>
              {{item.time}}天之前
            </span>
          </div>
          <div>{{item.comment}}</div>

          <button>赞</button>
          <button>踩</button>
          <button v-if="item.reply" @click="item.reply = !item.reply">回复</button>
          <el-input v-if="! item.reply" v-model="level2_comment.comment">

          </el-input>
          <button v-if="! item.reply" @click="item.reply = !item.reply">取消</button>
          <button v-if="! item.reply" @click="item.reply = !item.reply;level2_comment_btn(item.id)">
            发送
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
        love_show: '',
        collect_show: '',
        comment: {
          comment: '',
        },
        level2_comment: {
          comment: '',
        },
        comments: [],
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
    watch: {},
    methods: {
      read_content: function (data) {
        let content = document.querySelector('.content');
        content.innerHTML = '';
        let el = document.createElement('div');
        el.innerHTML = `${data.content}`
        el.classList.add('test')
        content.appendChild(el);
        this.read_love();
        this.read_comment();

      },
      collect_btn: function () {
        this.collect_show = !this.collect_show;
        this.story.collect++;
        this.update_story();
        this.update_collect()
      },
      love_btn: function () {
        this.love_show = !this.love_show;
        this.story.love++;
        this.update_story();
        this.update_love();
      },
      yet_love: function () {
        this.love_show = !this.love_show;
        this.story.love--;
        this.update_story();
        this.update_love();
      },
      yet_collect: function () {
        this.collect_show = !this.collect_show;
        this.story.collect--;
        this.update_story();
        this.update_collect()
      },
      update_collect: function () {
        Sender.post(cfg.api + '/api/love_collect/add?user_id=' + this.now_user.id + '&article_id=' + this.story.id + '&collect=' + Number(this.collect_show))
          .then(function (data) {
            console.log("data", data);
          })
      },
      update_love: function () {
        Sender.post(cfg.api + '/api/love_collect/add?user_id=' + this.now_user.id + '&article_id=' + this.story.id + '&love=' + Number(this.love_show))
          .then(function (data) {
            console.log("data", data);
          })
      },
      read_love: function () {
        let me = this;
        Sender.post(cfg.api + '/api/love_collect/read_user_love?user_id=' + this.now_user.id + '&article_id=' + this.story.id)
          .then(function (data) {
            console.log("data", data);
            if (data.data[0].love) {
              me.love_show = true
            } else {
              me.love_show = false;
            }
            console.log("data.data[0].collect", data.data[0].collect);
            if (data.data[0].collect) {
              me.collect_show = true
            } else {
              me.collect_show = false;
            }
          })
      },
      update_story: function () {
        Sender.post(cfg.api + '/api/story/add', this.story).then(function (data) {
          console.log("data", data);
        })
      },
      btn_comment: function () {
        this.comment.user_id = this.now_user.id;
        this.comment.article_id = this.story.id;
        Sender.post(cfg.api + '/api/story_comments/add', this.comment)
          .then(function (data) {
            console.log("data", data);
          })
      },
      read_comment: function () {
        let me = this;
        Sender.post(cfg.api + '/api/story_comments/read_comment?article_id=' + this.story.id)
          .then(function (data) {
            console.log("data", data);
            me.comments = data;
          })
      },


      level2_comment_btn: function (item) {
        let me =this;
        this.level2_comment.user_id = this.now_user.id;
        this.level2_comment.article_id = this.story.id;
        this.level2_comment.parent_id = item;
        Sender.post(cfg.api + '/api/story_comments/add', this.level2_comment)
          .then(function (data) {
            me.read_comment()
          })


      }
    },
    updated: function () {
      $('.test').find('p').css('color', 'blue');
    },
    mounted: function () {

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

  .son {
    background-color: aqua;
  }
</style>
