<template>
  <div>
    <div class="nav_show">
      <el-row>
        <el-col :span="12">
          <div class="header">你好,爱彼迎</div>
        </el-col>
        <el-col :span="12">
          <div class="header" style="text-align: right">
            <el-button type="text" class="header-btn">发布房源</el-button>
            <el-button type="text" class="header-btn" @click="dialogloginVisible=true">登录</el-button>
            <el-button type="text" class="header-btn" @click="dialogsignupVisible = true">注册</el-button>
            <el-button type="text" class="header-btn">故事</el-button>
            <el-button type="text" class="header-btn">帮助</el-button>
          </div>
        </el-col>
        <el-col :span="24">
          <h1 class="title_nav">Airbnb爱彼迎</h1>
        </el-col>
        <el-col :span="24">
          <h1>与家人一起在旅行迎中接新年</h1>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="" :visible.sync="dialogsignupVisible">
      <h1>注册爱彼迎账号</h1>
      <h2>已有账号?
        <el-button type="text" @click="filp_signup()">登录</el-button>
      </h2>
      <el-form :model="form">
        <el-form-item :label-width="formLabelWidth">
          <el-input @click="text()" class="text" v-model="form.name" auto-complete="off" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="" :label-width="formLabelWidth">
          <el-input v-model="form.phone" auto-complete="off" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="" :label-width="formLabelWidth">
          <el-input v-model="form.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="" :label-width="formLabelWidth">
          <el-input v-model="form.password" auto-complete="off" placeholder="确认密码"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="" :visible.sync="dialogloginVisible">
      <h1>登录爱彼迎</h1>
      <h2>还没有账号?
        <el-button type="text" @click="filp_login()">注册</el-button>
      </h2>
      <el-form :model="form">
        <el-form-item label="" :label-width="formLabelWidth">
          <el-input v-model="form.phone" auto-complete="off" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item label="" :label-width="formLabelWidth">
          <el-input v-model="form.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        dialogsignupVisible: false,
        dialogloginVisible: false,
        msg: 'Welcome to Your Vue.js App',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '0px'
      }
    },
    methods: {
      filp_login() {
        this.dialogsignupVisible = true
        this.dialogloginVisible = false;
      },
      filp_signup() {
        this.dialogsignupVisible = false
        this.dialogloginVisible = true;
      },
      text(){
        let su =document.querySelector('.text');
        su.classList.add("text1")
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .nav_show {
    color: white;
    width: 100%;
    height: 430px;
    background-image: url('https://z1.muscache.cn/airbnb/static/china/cny2018/marquee_web_large-065c19623769a666dd968e2b66981b7b.jpg');
    /*https://z1.muscache.cn/airbnb/static/china/cny2018/marquee_web_large-065c19623769a666dd968e2b66981b7b.jpg*/
    /*< div class = "_1q386pui" style = "background-image:url()" > < / div >*/
  }

  .title_nav {
    color: #FF5A5F;
  }


  .header-btn {
    color: white;
  }


</style>
