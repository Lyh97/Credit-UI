<template>
  <div>
    <el-row class="record_head" type="flex">
      <el-col :span="5" class= "record_row">
        <h1>学分统计</h1>
      </el-col>
      <el-col :span="5" style="margin-top:15px">
        <el-input placeholder="请输入内容" v-model="input" clearable></el-input>
      </el-col>
      <el-col :span="5" style="margin-top:15px">
        <el-button icon="el-icon-search" circle @click="search()"></el-button>
      </el-col>
    </el-row>
    <div style="padding-top:10px"></div>
    <el-row type="flex" justify="center">
      <el-col :span="18">
        <el-table :data="tableData" height="700px" border style="width: 100%" header-cell-style='text-align:center' row-style='text-align:center'>
          <el-table-column fixed type="index" :index="indexMethod">
          </el-table-column>
          <el-table-column prop="name" label="姓名" :span="8">
          </el-table-column>
          <el-table-column prop="sex" label="姓别" :span="8">
          </el-table-column>
          <el-table-column prop="activegrade" label="所获学分" :span="8">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      api: 'http://localhost:8888/stu',
      tableData: [],
      input: ''
    }
  },
  methods:{
    indexMethod(index) {
        return index + 1;
    },
    init() {
      this.axios.post(this.api + '/selectPersonGrade',{'stuname':this.input}).then((response)=>{
        if(response.data.code === 201) {
          this.$message.error('系统错误，请联系管理员')
        } else
        if(response.data.code === 200) {
          this.tableData = response.data.data
        }
      })
    },
    search() {
      this.init()
    }
  },
  created: function(){
    this.init()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .record_head {
    background-color: #F0F0F0
  }
  .record_row {
    margin-left: 20px;
  }
</style>

