<template>
  <div>
    <el-row class="record_head" type="flex">
      <el-col :span="4" class= "record_row">
        <h1>学生管理</h1>
      </el-col>
      <el-col :span="5" style="margin-top:15px">
        <el-input placeholder="请输入内容" v-model="input" clearable></el-input>
      </el-col>
      <el-col :span="5" style="margin-top:15px">
        <el-button icon="el-icon-search" circle @click="search()"></el-button>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <el-table :data="tableData" style="width: 100%" header-cell-style="text-align:center" row-style="text-align:center">
          <el-table-column fixed type="index" :index="indexMethod">
          </el-table-column>
          <el-table-column label="姓名" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="性别" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.sex }}</span>
            </template>
          </el-table-column>
          <el-table-column label="电话" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.telephone }}</span>
            </template>
          </el-table-column>
          <el-table-column label="入学时间" width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.enrollmentTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="用户名" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.username }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="160">
            <template slot-scope="scope">
              <el-button size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
    	<el-col>
    	</el-col>
    </el-row>
    <!-- Form -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="学生姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="学生性别" :label-width="formLabelWidth">
          <el-select v-model="form.sex" placeholder="请选择活动区域">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学生电话" :label-width="formLabelWidth">
          <el-input v-model="form.telephone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="入学时间" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker v-model="form.enrollmentTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期时间">
            </el-date-picker>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        api: 'http://localhost:8888/stu',
        input: '',
        dialogFormVisible: false,
        form: {
          keyid: '',
          name: '',
          sex: '',
          telephone: '',
          enrollmentTime: ''
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      indexMethod(index) {
        return index + 1;
      },
      handleEdit(index, row) {
        this.form.keyid = row.keyid
        this.form.name = row.name
        this.form.sex = row.sex
        this.form.telephone = row.telephone
        this.form.enrollmentTime = row.enrollmentTime
        this.dialogFormVisible = true
      },
      handleDelete(index, row) {
        this.axios.post(this.api+'/deleteUserBykeyid',{"keyid":row.keyid}).then((response)=>{
          if(response.data.code === 201) {
            this.$message.error('系统错误，请联系管理员')
          } else
          if(response.data.code === 200) {
            this.$message.success('删除成功')
            this.init()
          }
        })
      },
      init() {
        this.axios.post(this.api+'/selectAllUser',{"name":this.input}).then((response)=>{
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
      },
      submit() {
        this.axios.post(this.api+'/updateUserBykeyid',this.form).then((response)=>{
          if(response.data.code === 201) {
            this.$message.error('系统错误，请联系管理员')
          } else
          if(response.data.code === 200) {
            this.dialogFormVisible = false

            this.$message.success('修改成功')
            this.init()
          }
        })
      }
    },
    created: function() {
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
