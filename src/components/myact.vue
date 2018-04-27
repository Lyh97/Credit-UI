<template>
<div>
  <el-row class="apply_head" type="flex">
  	<el-col class= "apply_row" :span="6">
  	  <h2>我的活动</h2>
    </el-col>
    <el-col class= "apply_row2" :span="3">
  	  <span>学生：{{username}}</span>
    </el-col>
    <el-col class= "apply_row2 apply_row21" :span="3">
  	  <span>已完成活动：{{ok}}</span>
    </el-col>
    <el-col class= "apply_row2" :span="3">
  	  <span>未完成活动：{{no}}</span>
    </el-col>
  </el-row>
  <el-row type="flex" justify="center">
  	<el-col :span="24">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="activename" label="活动名称" :span="4">
        </el-table-column>
        <el-table-column prop="finishtime" label="结束时间" :span="5">
        </el-table-column>
        <el-table-column prop="activegrade" label="活动分数" :span="5">
        </el-table-column>
        <el-table-column prop="info02" label="举办时间" :span="5">
        </el-table-column>
        <el-table-column fixed="right" label="完成情况" :span="5">
          <template slot-scope="scope">
            <span class="nofinish" v-if="tableData[scope.$index].finishtime == null">未完成</span>
            <span class="finish" v-else>完成</span>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
  <el-row type="flex" class="row-bg" justify="end">
    <el-pagination background layout="prev, pager, next" :page-size=8 :total="title"
      :current-page.sync="currentpage" >
    </el-pagination>
  </el-row>
</div>
</template>

<script>
  export default {
    data() {
      return {
      	api: 'http://localhost:8888/stu',
        tableData: [],
        username: '',
        currentpage: 1,
        ok: 0,
        no: 0,
        title: 0,
        page: 1
      }
    },
    methods: {
      init() {
      var keyid = this.$store.state.user.keyid
    	this.axios.post(this.api+'/selectPersonByUserid',{"keyid":keyid,"page":this.page}).then((response)=>{
    	  if (response.data.code === 200){
            this.tableData = response.data.actperson
            console.log(this.tableData)
            this.username = response.data.username
            this.ok = response.data.ok
            this.no = response.data.no
            this.title = response.data.pages
          } else
          if (response.data.code === 202) {
            this.$message.error('展示失败，请联系管理员')
          }
    	})
      }
    },
    created: function(){
    	this.init()
    },
    watch:{
      currentpage: function() {
        this.page = this.currentpage
        this.init()  
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .apply_row {
    margin-left: 20px;
  }
  .apply_head {
    background-color: #F0F0F0
  }
  .apply_row2{
  	margin-top: 25px;
  }
  .nofinish{
    color: #F56C6C
  }
  .finish{
  	color: #67C23A
  }
</style>
