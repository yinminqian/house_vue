<template>
  <div id="Hello">
    <div class="nav_show">
      <el-row>
        <el-col :span="12">
          <router-link to="/">
            <div class="header">你好,爱彼迎</div>

          </router-link>
        </el-col>
        <el-col :span="12">

          <div class="header" style="text-align: right">
            <router-link to="/house_add">
              <el-button type="text" class="header-btn">发布房源</el-button>
            </router-link>
            <el-button type="text" class="header-btn" v-show="! show_login" @click="dialogloginVisible=true">登录
            </el-button>
            <el-button type="text" class="header-btn" v-show="! show_login" @click="dialogsignupVisible = true">注册
            </el-button>
            <router-link to="/story_all">
              <el-button type="text" class="header-btn">故事</el-button>
            </router-link>

            <router-link to="/admin/home">
              <el-button type="text" class="header-btn">管理员面板</el-button>
            </router-link>
            <el-button type="text" class="header-btn" v-show="show_login">
              <el-dropdown>
  <span class="el-dropdown-link header-btn">
    {{user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
                <el-dropdown-menu slot="dropdown">
                  <router-link to="/user_details">
                    <el-dropdown-item>编辑我的资料</el-dropdown-item>
                  </router-link>
                  <router-link to="/user_home_page">
                    <el-dropdown-item>我的主页</el-dropdown-item>
                  </router-link>

                  <el-dropdown-item @click.native="logout()">登出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-button>
            <el-button type="text" class="header-btn" @click="is_login()">帮助</el-button>
          </div>
        </el-col>
      </el-row>
    </div>


    <el-dialog title="" :visible.sync="dialogsignupVisible">
      <h1>注册爱彼迎账号</h1>
      <h2>已有账号?
        <el-button type="text" @click="filp_signup()">登录</el-button>
      </h2>
      <el-form :model="form" :rules="rules">
        <el-form-item :label-width="formLabelWidth" prop="phone">
          <el-input v-model.number="form.phone" auto-complete="off" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="" :label-width="formLabelWidth" prop="email" :rules="[
       { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
      ]">
          <el-input v-model="form.email" auto-complete="off" placeholder="邮箱"></el-input>
        </el-form-item>

        <el-form-item label="" :label-width="formLabelWidth">
          <el-input v-model="form.username" auto-complete="off" placeholder="用户名"></el-input>
        </el-form-item>

        <el-form-item label="" :label-width="formLabelWidth">
          <el-input v-model="form.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>

        <el-form-item label="" :label-width="formLabelWidth">
          <el-input v-model="form.is_password" auto-complete="off" placeholder="确认密码"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="" :visible.sync="dialogloginVisible">
      <h1>登录爱彼迎</h1>
      <h2>还没有账号?
        <el-button type="text" @click="filp_login()">注册</el-button>
      </h2>
      <el-form :model="login_form">
        <el-form-item label="" :label-width="formLabelWidth">
          <el-input v-model="login_form.username" auto-complete="off" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="" :label-width="formLabelWidth">
          <el-input v-model="login_form.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="login_btn(login_form)">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>
<script>
  import Sender from '../Sender/sender'

  export default {
    name: 'nav_title',
    data() {
      return {
        dialogsignupVisible: false,
        dialogloginVisible: false,
        form: {
          username: '',
          phone: '',
          email: '',
          password: '',
        },
        login_form: {
          username: 'yin7',
          password: 'ewrwe',
        },
        formLabelWidth: '0px',
        show_login: false,
        user: {},
        rules: {
          phone: [
            {
              required: true,
              validator: this.CheckTel,
              trigger: 'blur'
            }
          ],
        }
      }
    },
    methods: {
      CheckTel: (rule, value, callback) => {
        console.log("rule", rule);
        if (!value) {
          callback(new Error('请输入电话号码'));
        } else if (!Number.isInteger(value)) {
          callback(new Error('电话号码必须是数字'));
        } else if (value.toString().length != 11) {
          callback(new Error('电话号码必须是11位'));
        } else {
          callback();
        }
      },
      filp_login() {
        this.dialogsignupVisible = true
        this.dialogloginVisible = false;
      },
      filp_signup() {
        this.dialogsignupVisible = false
        this.dialogloginVisible = true;
      },
      submit() {
        let me = this;
        Sender.post('http://localhost:2333/api/signup', this.form)
          .then(function (data) {
            console.log("data",data);
            if (data) {
              me.login_btn({username: me.form['username'], password: me.form['password']})
              me.win();
              me.is_login();
            }
          })
      },
      login_btn: function (data) {
        let me = this;
        Sender.post('http://localhost:2333/api/login', data)
          .then(function (data) {
            console.log("data_login", data);
            if (data)
              me.is_login();
          }, function (data) {
            console.log("data1", data);
          })
      },
      win() {
        this.$message({
          message: '注册成功,已自动登录',
          type: 'success'
        });
      },
      is_login: function () {
        let me = this;
        Sender.post('http://localhost:2333/api/islogin')
          .then(function (data) {
            if (data.success) {
              me.user = data.data;
              me.show_login = data.success;
            }
            me.show_login = data.success;
            return;
          })
      },
      logout: function () {
        let me = this;
        Sender.post('http://localhost:2333/api/logout')
          .then(function (data) {
            if (data.success) {
              me.is_login();
            }
            return data.success;
          })
      }
    },
    created: function () {
      return this.is_login()
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


  .header-btn, .header {
    color: black;
  }


</style>
