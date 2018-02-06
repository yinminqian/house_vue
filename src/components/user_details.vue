<template>
  <div>
    <nav_title></nav_title>
    <el-row>
      <el-col :span="9">
        <div style="text-align: center">
          <div class="user_bar">编辑个人资料</div>
          <span class="user_bar" @click="photo_add()">照片</span>
          <div class="user_bar">对我的评价</div>
          <div class="user_bar">我评论过的</div>
          <div class="user_bar">
            <el-button>查看我的主页</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="15">
        <div v-if="user_redact==1">
          <el-alert
            v-if="show"
            title="成功提示的文案"
            type="success">
          </el-alert>
          <div>
            <h5>必填</h5>
            <div>
              姓氏:
              <el-input v-model="get_user['last-name']"></el-input>
            </div>

            <div>名字:
              <el-input v-model="get_user.name"></el-input>
            </div>
            <div>我是:
              <el-radio v-model="get_user.sex" label="boy">男</el-radio>
              <el-radio v-model="get_user.sex" label="girl">女</el-radio>
            </div>
            <div>
              <div class="block">
                <span class="demonstration">生日</span>
                <el-date-picker
                  v-model="get_user.birthday"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions1"
                  :default-value="new Date('1995/11/17')"
                >
                </el-date-picker>
              </div>
            </div>
            <div>
              电子邮箱设置:
              <el-input v-model="get_user.email"></el-input>
            </div>
            <div>
              手机号:
              <el-input v-model="get_user.phone" placeholder="请输入内容">
                <template slot="prepend">+86</template>
              </el-input>
            </div>
            <div>
              您住过的地方:
              <el-input v-model="get_user.dwell">

              </el-input>
            </div>
            <div>
              自我介绍:
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="get_user.referral"
              >
              </el-input>
            </div>
            <el-button @click="submit_details">保存</el-button>
          </div>
        </div>
        <div v-if="user_redact==2">
          <div>
            <h5>头像</h5>
            <el-col :span="8">
              <div v-if="get_user.photo"
              >
                <img :src="get_user.photo" alt="" style="width: 100px;height: 100px;">
              </div>
            </el-col>
            <el-col :span="16">
              <span>清晰的正面脸部照片是房东和房客互相认识对方的重要途径。您能想象把自己的房子租给一只猫吗？ 请确保使用能够清楚显示您面部的照片，并确认其中不包含任何您不希望其他房东或房客看到的个人或敏感信息。</span>
              <el-upload
                class="upload-demo"
                action="http://up-z2.qiniup.com"
                :data="token"
                :on-success="head_img"
                :limit="10000000"
                :show-file-list="su"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
              </el-upload>
            </el-col>
          </div>
          <hr>
          <div>
            <div v-for="key in get_user.life_photo" style="display: inline-block;">
              <div style="width: 100px;height: 100px;">
                <i class="el-icon-delete" @click="rm_img(key)"></i>
                <img :src="key" @mouseover="img_affair" alt="" style="width: 100%;height: 100%;">
              </div>
            </div>
            <el-col :sapn="24">
              <el-upload
                action="http://up-z2.qiniup.com"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="test"
                :data="token"
                :limit="number"
                :on-exceed="max_img"
                :show-file-list="su"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <!--<el-dialog :visible.sync="dialogVisible">-->
              <!--<img width="100%" :src="dialogImageUrl" alt="">-->
              <!--</el-dialog>-->
            </el-col>
          </div>
        </div>

      </el-col>

    </el-row>
  </div>
</template>


<script>
  import nav_title from '@/components/nav'
  import Sender from '../Sender/sender'
  import cfg from '../../.cfg'

  export default ({
    name: 'user_details',
    data() {
      return {
        su: false,
        user_redact: 2,
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        dialogImageUrl: '',
        dialogVisible: false,
        token: {
          token: ''
        },
        number: 8,
        img_number: 0,
        show: false,
      }
    },
    components: {
      nav_title: nav_title
    },
    computed: {
      get_user: function () {
        return this.$store.getters['get_user'];
      }
    },
    watch: {
      values: function () {
        console.log("this.values", this.values);
        console.log("this.get_user", this.get_user);
      }
    },
    created() {
      this.$store.dispatch('is_login');

      let me = this;
      Sender.post(cfg.api + '/api/house/qiniu')
        .then(function (data) {
          me.token.token = data;
        })
    },
    methods: {
      // test() {
      //   return new Date();
      // },
      head_img(name) {
        this.get_user.photo = 'http://ovygmwfnp.bkt.clouddn.com/' + name.key;
        this.submit_details();
        this.$store.dispatch('is_login');
      },
      photo_add: function () {
        this.user_redact = 2;
      },
      handleRemove(file, fileList) {
        let me = this;
        let img_path = `http://ovygmwfnp.bkt.clouddn.com/${file.response.key}`;
        this.get_user.life_photo.forEach(function (item, index) {
          if (item == img_path) {
            console.log("item", item);
            console.log("刚找到", me.get_user.life_photo);
            me.get_user.life_photo.splice(index);
            console.log("删除后", me.get_user.life_photo);
            me.submit_details();
            me.$store.dispatch('is_login');
            console.log("最后返回", me.get_user.life_photo);
          }
        })
      },
      rm_img(key){
        console.log("key",key);
        let me = this;
        // let img_path = `http://ovygmwfnp.bkt.clouddn.com/${key}`;
        // console.log("img_path",img_path);
        this.get_user.life_photo.forEach(function (item, index) {
          // console.log("item",item);
          // console.log("key",key);
          if (item == key) {
            console.log("item1", item);
            console.log("index",index);
            me.get_user.life_photo.splice(index,1);
            console.log("me.get_user",me.get_user);
            console.log("me.get_user.life_photo",me.get_user.life_photo);
            me.submit_details();
            me.$store.dispatch('is_login');
          }
        })
      },
      img_affair() {
        console.log("我进来了");
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      test: function (response, file, fileList) {
        let img_path = 'http://ovygmwfnp.bkt.clouddn.com/' + response.key;
        this.get_user['life_photo'].push(img_path);
        this.submit_details();
        this.$store.dispatch('is_login');
        console.log("this.get_user", this.get_user);
      },
      max_img() {
        this.open4();
      },
      open4() {
        this.$notify({
          title: '图片数量超出',
          message: '最多上传8张图片,您不能在上传了',
          type: 'warning'
        });
      },
      submit_details() {
        let me = this;
        Sender.post(cfg.api + '/api/update_user', this.get_user)
          .then(function (data) {
            console.log("data", data);
            if (data) {
              me.show = true;
              setTimeout(function () {
                me.show = false;
              }, 3000)
            }
          })
      }
    },
  })

</script>


<style scoped>
  .user_bar {
    margin: 10px;
  }

</style>
