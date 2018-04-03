<template>
  <el-aside style="height:100%;width:180px;">
    <el-row class="tac">
      <el-col :span="12" style="width:100%;height:100%">
        <el-menu :router="true" default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
              background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" style="height:100%">
          <div v-for="item in menu">
            <el-menu-item :index="item.path" >
               <i class="el-icon-menu"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
           </div>
        </el-menu>
      </el-col>
    </el-row>
  </el-aside>
</template>

<script>
export default {
  data () {
    return {
      menu: {}
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    getmenu: function ge () {
      var roles = document.cookie.split(';')
      var role = roles[1]
      var http = new XMLHttpRequest()
      http.open('post', this.$store.state.API + 'getmenu'+'?role=' + role , true);
      var that = this; 
      http.onreadystatechange = function() {
        if (http.readyState === 4 && http.status === 200) {
          that.menu = JSON.parse(http.responseText);
        }
      };
      http.send();
  }

  },
  created: function () {
    this.getmenu()
  },
  components: { Header }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .homepage {
    background-color: #FFF;
    height:100%;
  }
  .el-row {
    height: 100%;
  }
</style>
