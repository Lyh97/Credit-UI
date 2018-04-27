<template>
  <div class="head">
    <div class="headleft">
        <div class="logo">
          <img class="logoimg" src= '../../static/logo.png'>
        </div>
    </div>
    <div class="login">
        <el-dropdown trigger="click" @command="handleCommand" >
          <a href="javascript:void(0)" class="el-dropdown-link aa">
            <span style="color:#FFF; font-size:16px;">你好，{{this.$store.state.user.name}}</span><i class="el-icon-arrow-down el-icon--right"></i>
          </a>
          <el-dropdown-menu slot="dropdown" style="margin-top:0;padding-top:0;">
            <el-dropdown-item command="a">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
    </div>
  </div>
</template>

<script type="text/javascript">

export default{
  data () {
    return {
      searchvalue: ''
    }
  },
  methods: {
    handleCommand (command) {
      this.$router.push({name: 'login'})
    }
  }
}
</script>

<style type="text/css">
    .head{
        margin: 0px;
        padding: 0px;
        background-color: #07111b;
        height: 72px;
        min-width: 820px;
    }
    .headleft{
        float: left;
        width: 13%;
        margin-left:1%;
    }
    .logo{
        color:rgba(255,255,255,.6);
        text-align: center;
        font-size: 18px;
        float: left;
        height: 72px;
    }
    .logoimg{
        width: 100%;
        height: 50px;
        margin-top: 10px;
    }
    .headright{
        float: left;
        line-height: 72px;
        margin-right:60px;
    }
    .inputbutton{
        float: left;
        line-height: 35px;
        color: #4D555D;
        text-decoration: none;
    }
    .inputsearch{
        height: 30px;
        line-height: 30px;
        float: left;
        padding: 20px 0 5px 0;
        color: #71777d;
        padding-right: 12px;
    }
    .inputarea{
        width: 140px;
        line-height: 25px;
        float: left;
        background-color:#07111b;
        border: 0;
        color: #FFF;
        font-size: 15px;
        outline:none;
    }
    .login{
        line-height: 100%;
        float: right;
        padding-top: 28px;
        margin-right: 40px;
    }
    .aa{
        color: #4D555D;
        text-decoration: none;
        float: left;
        font-size: 16px;
    }
    .usericon{
        width: 45px;
        height: 45px;
        border-radius: 100%;
        vertical-align:middle;
    }
</style>
