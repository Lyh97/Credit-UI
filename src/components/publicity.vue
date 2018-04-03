<template>
<div>
  <el-row class="apply_head" type="flex">
  	<el-col class= "apply_row" :span="6">
  	  <h2>活动公示</h2>
    </el-col>
  </el-row>
  <el-table :data="tableData" border style="width: 100%" header-cell-style="text-align:center" row-style="text-align:center">
    <el-table-column fixed type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="活动简介:" :span='20'>
            <span>{{ props.row.slogan }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>

    <el-table-column prop="name" label="活动名称" :span='3'>
    </el-table-column>
    <el-table-column prop="place" label="活动地点" :span='3'>
    </el-table-column>
    <el-table-column prop="actgrade" label="活动分数" :span='3'>
    </el-table-column>
    <el-table-column prop="member" label="活动人数" :span='3'>
    </el-table-column>
    <el-table-column prop="nowcount" label="已参加人数" :span='3'>
    </el-table-column>
    <el-table-column prop="holdtime" label="举办时间" :span='3'>
    </el-table-column>

    <el-table-column fixed="right" label="操作" :span='3'>
    <template slot-scope="scope">
      <el-button @click.native.prevent="join(scope.$index, tableData)"
        type="text" size="small">
        参加
      </el-button>
    </template>
    </el-table-column>
  </el-table>
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
        form: {
          activename:'',
          activekeyid: '',
          stukeyid: '',
          activegrade: '',
          info01: 0,
          status:0
        },
        currentpage: 1,
        title: 0,
        page: 1
      }
    },
    methods: {
      join(index, rows) {
        this.form.activename = rows[index].name
        this.form.activekeyid = rows[index].keyid
        var keyid = document.cookie.split(';')
        var keyid = keyid[1]
        this.form.stukeyid = keyid
        this.form.activegrade = rows[index].actgrade
        this.form.info01 = rows[index].member

        this.axios.post(this.api + '/addPerson' , this.form).then((response) =>{
        	if (response.data.code === 201){
              this.$message.error('系统错误，请联系管理员')
              this.init()
        	} else
        	if (response.data.code === 202) {
              this.$message.error('人数已满，请选择其他活动')
              this.init()
        	} else
            if (response.data.code === 200) {
              this.$notify({
                title: '加入成功',
                message: 'Apply',
                type: 'success',
                duration: 3000,
                offset: 70
              })
              this.init()
              this.$router.push({name: 'myact'})
            }
        })
      },
      init() {
      	var keyid = document.cookie.split(';')
    	this.axios.post(this.api+'/selectActive',{"keyid":keyid[1],"page":this.page}).then((response)=>{
    	  if (response.data.code === 200){
            this.tableData = response.data.data
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
</style>
