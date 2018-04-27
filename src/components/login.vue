<template>
  <div>
    <div style="position: absolute; left: 34%; font-family:'STKaiti'; top: 10%;font-size:40px">
      <span>
        大学素质拓展学分系统
      </span>
    </div>
    <div id="login">
      <el-tabs v-model="activeName">
        <el-tab-pane label="登录" name="first">
          <el-form label-position="right" label-width="80px" :rules="loginRules" :model="formLabelLogin" ref="formLabelLogin">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="formLabelLogin.username" auto-complete="off" spellcheck="false"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="formLabelLogin.password" type="password" auto-complete="off" spellcheck="false"></el-input>
            </el-form-item>
            <el-button class="login_button" type="primary" v-on:click="login">登录</el-button>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="注册" name="second">
          <el-form label-position="right" label-width="80px" :rules="registerRules" :model="formLabelRegister" ref="formLabelRegister">
            <el-form-item label="学号" prop="username">
              <el-input v-model="formLabelRegister.username" auto-complete="off" spellcheck="false"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="formLabelRegister.password" type="password" auto-complete="off" spellcheck="false" ></el-input>
            </el-form-item>
            <el-form-item class="is-required" label="姓名" prop="name">
              <el-input v-model="formLabelRegister.name" auto-complete="off" spellcheck="false"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="password">
              <el-select v-model="formLabelRegister.sex" placeholder="请选择性别">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="入学时间">
              <div class="block">
                <el-date-picker v-model="formLabelRegister.enrollmentTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期时间">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item class="is-required" label="电话" prop="telephone">
              <el-input v-model="formLabelRegister.telephone" auto-complete="off" spellcheck="false"></el-input>
            </el-form-item>
            <el-button class="login_button" type="primary" v-on:click="register">注册</el-button>
          </el-form>
        </el-tab-pane>

      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      activeName: 'first',
      formLabelLogin: {
        username: '',
        password: '',
        remember: true
      },
      formLabelRegister: {
        username: '',
        sex: '男',
        enrollmentTime: '',
        name: '',
        telephone: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      registerRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 9, max: 9, message: '学号格式不正确', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 8, message: '长度在 5 到 8 个字符', trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: '请输入电话', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    login: function submitlogin () {
      if (this.formLabelLogin.username === '') {
        this.$message.error('请填写用户名')
        return
      } else if (this.formLabelLogin.password === '') {
        this.$message.error('请填写用户名')
        return
      } else if (this.formLabelLogin.username.lenth < 8 || this.formLabelLogin.username.lenth > 15) {
        this.$message.error('用户名长度在8-15位')
        return
      } else if (this.formLabelLogin.password.lenth < 8) {
        this.error('密码应大于8位')
        return
      }
      var http = new XMLHttpRequest()
      http.open('post', this.$store.state.API + 'login' + '?username=' + this.formLabelLogin.username + '&password=' + this.formLabelLogin.password, true)
      var that = this
      http.onreadystatechange = function () {
        if (http.status === 203) {
          that.$message.error('密码错误')
          return
        }
        if (http.status === 202) {
          that.$message.error('用户登录失败')
          return
        }
        else if (http.readyState === 4 && http.status === 200) {
          that.$notify({
            title: '登录成功',
            message: 'Credit',
            type: 'success',
            duration: 3000,
            offset: 70
          })
          that.user = JSON.parse(http.responseText)
          that.$store.commit('updateLogin', that.user)
          that.$router.push({name: 'homepage'})
        }
      }
      http.send()
    },
    register: function submitregister () {
      if (this.formLabelRegister.username === '') {
        this.$message.error('请填写用户名')
        return
      } else if (this.formLabelRegister.password === '') {
        this.$message.error('请填写用户名')
        return
      } else if (this.formLabelRegister.username.lenth < 8 || this.formLabelRegister.username.lenth > 15) {
        this.$message.error('用户名长度在8-15位')
        return
      } else if (this.formLabelRegister.password.lenth < 8) {
        this.error('密码应大于8位')
        return
      } else if (this.formLabelRegister.name === '') {
        this.$message.error('请填写姓名')
        return
      } else if (this.formLabelRegister.telephone === '') {
        this.error('请填写电话')
        return
      } else if (this.formLabelRegister.enrollmentTime === '') {
        this.error('请添加入学时间')
        return
      }

      var http = new XMLHttpRequest()
      http.open('post', this.$store.state.API + 'register' + '?username=' + this.formLabelRegister.username + '&password=' + this.formLabelRegister.password + '&name=' + this.formLabelRegister.name + '&telephone=' + this.formLabelRegister.telephone + '&sex=' + this.formLabelRegister.sex + '&enrollmentTime=' + this.formLabelRegister.enrollmentTime, true)
      var that = this
      http.onreadystatechange = function () {
        if (http.status === 302) {
          that.$message.error('用户注册失败')
          return
        }
        if (http.status === 303) {
          that.$message.error('学号已被注册')
          return
        }
        else if (http.readyState === 4 && http.status === 200) {
          that.$notify({
            title: '注册成功',
            message: 'Credit',
            type: 'success',
            duration: 3000,
            offset: 70
          })
        }
      }
      http.send()
    }
  }
}
</script>

<style>
    #login {
        width: 30%;
        background-color: #FFF;
        box-shadow: 0px 0px 0px 1px #aaa;
        border-radius: 6px;
        opacity: 0.95;
        position: absolute;
        left: 35%;
        right: 35%;
        top: 22%;
        min-width: 320px;
    }
    .el-tabs__nav {
      width: 100%;
    }
    .el-tabs__item {
      width: 50%;
      text-align: center;
      padding: 5px;
    }
    #tab-first {
      height: 50px;
      min-height: 50px;
      font-size: 16px;
    }
    #tab-second {
      height: 50px;
      min-height: 50px;
      font-size: 16px;
    }
    .el-form-item__content{
        width: 55%;
    }
    .is-required{
        margin: 5% 0 5% 10%;
    }
    .login_button{
        margin: 3% 0 7% 120px;
        width: 35%;
    }
</style>
