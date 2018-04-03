<template>
  <div style="background-color:#fdfcf8">
    <el-row class="record_head" type="flex">
      <el-col :span="4" class= "record_row">
        <h1>学分类别</h1>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="8">
        <div>
          <h2>添加类别</h2>
        </div>
        <div style="padding: 10px 0 30px 0px;">
          <el-button @click="submit()">提交</el-button>
        </div>
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item label="类别名称" style="width: 80%;">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="类别学分" style="width: 80%;">
            <el-input v-model="formLabelAlign.grade"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="14">
        <div>
          <h2>现有类别</h2>
        </div>
        <div style="padding: 10px 0 40px 0px;"></div>
        <el-table :data="tableData" style="width: 100%" header-cell-style='text-align:center' row-style='text-align:center'>
          <el-table-column fixed type="index" :index="indexMethod">
          </el-table-column>
          <el-table-column label="类别名称" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="类别学分" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.grade}}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.creattime}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button size="mini" @click="show(scope.$index, scope.row)">编辑
              </el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="40%">
          <el-form class="apply_from" ref="form" :model="formtemp" label-width="80px">
            <el-form-item label="活动名称" >
              <el-col :span="12">
                <el-input v-model="formtemp.name"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="活动名称" >
              <el-col :span="12">
                <el-input v-model="formtemp.grade"></el-input>
              </el-col>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleEdit()">确 定</el-button>
          </span>
        </el-dialog>
      </el-col>
    </el-row>
    <el-row>
    	<el-col>
    		
    	</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      api:'http://localhost:8888/stu',
      labelPosition: 'top',
      formLabelAlign: {
        name: '',
        grade: ''
      },
      formtemp: {
        keyid: '',
        name: '',
        grade: ''
      },
      tableData: [],
      dialogVisible: false
    }
  },
  methods:{
    indexMethod(index) {
        return index + 1;
    },
    init() {
      this.axios.get(this.api+'/selectClass').then((response)=>{
        if(response.data.code === 202) {
          this.$message.error('系统错误，请联系管理员')
        } else
        if(response.data.code === 200) {
          this.tableData = response.data.aactclass
        }
      })
    },
    submit() {
      this.axios.post(this.api+'/addClass',this.formLabelAlign).then((response)=>{
      if(response.data.code === 201) {
        this.$message.error('系统错误，请联系管理员')
      } else
      if(response.data.code === 200) {
          this.formLabelAlign.name = ''
          this.formLabelAlign.grade = ''
          this.$message.success('添加成功')
          this.init()
        }
      })
    },
    handleEdit() {
      this.axios.post(this.api+'/updateClass',this.formtemp).then((response)=>{
      if(response.data.code === 201) {
        this.$message.error('系统错误，请联系管理员')
      } else
      if(response.data.code === 200) {
          this.dialogVisible = false
          this.formtemp.keyid = ''
          this.formtemp.name = ''
          this.formtemp.grade = ''
          this.$message.success('添加成功')
          this.init()
        }
      })
    },
    show(index, row) {
      this.formtemp.keyid = row.keyid
      this.formtemp.name = row.name
      this.formtemp.grade = row.grade
      this.dialogVisible = true
    },
    handleDelete(row) {
      this.axios.post(this.api+'/deleteClass',row).then((response)=>{
      if(response.data.code === 201) {
        this.$message.error('系统错误，请联系管理员')
      } else
      if(response.data.code === 200) {
          this.$message.success('删除成功')
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
