<template>
  <div>
    <h1>全部故事</h1>
    <div v-for="item in all_story">
      <el-row>
        <el-col :span="6">
          <div>

            <router-link :to="'/ery_story/'+item.id">
            <img :src="item.cover_photo" alt="" style="width: 100%;height: 100%;">
            {{item.title}}
            </router-link>
          </div>
        </el-col>
      </el-row>

    </div>
  </div>
</template>


<script>
  import Sender from '../../Sender/sender'
  import cfg from '../../../.cfg'

  export default ({
    name: 'story_all',
    data() {
      return {
        all_story:[],
      }
    },
    created: function () {
      let me =this;
      Sender.post(cfg.api+'/api/story/read_state')
        .then(function (data) {
          me.all_story=data;
          console.log("data",data);
        })
    }

  });


</script>


<style scoped>

</style>
