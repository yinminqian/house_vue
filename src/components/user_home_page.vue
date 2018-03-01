<template>
  <div>
    <nav_title></nav_title>
    <hr>

    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <div class="gu">
            <div class="col-md-12 img_photo">
              <img :src="user_msg.photo+'?imageView2/1/w/200/h/200'" alt="" class="img_">
            </div>

            <div class="aol-md-12 img_photo">
          <span v-if="user_msg.phone">
            {{user_msg.phone}}
          </span>
              <br>
              <span v-if="user_msg.email">
           {{user_msg.email}}
          </span>
            </div>
          </div>

        </div>
        <div class="col-md-8">


          <div class="col-md-12 text_msg">
            <h4>您好,我是 {{user_msg.username}}</h4>
          </div>

          <div class="col-md-12">
            <h5 class="text_title">生活照</h5>
            <div class="row">
              <div class="col-md-3" v-for="item in user_msg.life_photo">
                <img :src="item+'?imageView2/1/w/400/h/400'" alt="" class="life_photo">
              </div>
            </div>
          </div>


          <div class="col-md-12">
            <h5 class="text_title">故事</h5>
            <div class="row">
              <div class="col-md-3 story" v-for="item in story">
                <img :src="item['cover_photo']+'?imageView2/1/w/400/h/400'" alt="" class="life_photo">
                {{item.title}}
              </div>

            </div>
          </div>
          <div class="col-md-12">
            <h5 class="text_title">房源</h5>
            <div class="row">
              <div class="col-md-3 story" v-for="item in house">
                <img :src="item['photo'][0]+'?imageView2/1/w/400/h/400'" alt="" class="life_photo">
                {{item.house_title}}
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>


  </div>
</template>


<script>

  import nav_title from './nav'
  import Sender from '../Sender/sender'
  import cfg from '../../.cfg'

  export default ({
    name: 'user_home_page',
    data() {
      return {
        house: [],
        story: [],
      }
    },
    components: {
      nav_title: nav_title,
    },
    created: function () {
      this.$store.dispatch('is_login');
    },
    computed: {
      user_msg: function () {
        return this.$store.getters['get_user'];
      }
    },
    methods: {
      test: function () {
        console.log("this", this.user_msg);
      }
    },
    watch: {
      user_msg: function () {
        let me = this;
        Sender.post(cfg.api + '/api/house/read_user_house?user_id=' + me.user_msg['id'])
          .then(function (data) {
            me.house = data;
          })

        Sender.post(cfg.api + '/api/story/read_story_user?user_id=' + me.user_msg['id'])
          .then(function (data) {
            me.story = data;
          })


      },

    },
    mounted: function () {

    }

  })
</script>


<style lang="scss" scoped>
  .img_photo {
    padding: 10px;
    text-align: center;
  }

  .img_ {
    border-radius: 5px;
  }

  .text_msg {
    padding: 10px;
  }

  .life_photo {
    width: 100%;
    border-radius: 5px;
  }

  .story {
    margin: 5px 0;
  }

  .text_title {
    margin: 15px 0;
  }

  .gu {
    position: fixed;
    top: 150px;
  }
</style>
