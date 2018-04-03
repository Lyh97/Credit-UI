<template>
  <div style="width:100%">
  	<el-row class="record_head" type="flex">
      <el-col :span="4" class= "record_row">
        <h1>申请记录</h1>
      </el-col>
      <el-col :span="5">
        <el-button class="record_search_button" @click="dialogVisible = true" type="button">查询</el-button>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="40%">
          <el-form class="apply_from" ref="form" :model="formtemp" label-width="80px">
            <el-form-item label="活动名称" >
              <el-col :span="12">
                <el-input v-model="formtemp.actname"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="举办时间">
              <el-date-picker v-model="formtemp.LOG_TIMESTAMP" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']">
              </el-date-picker>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="record">确 定</el-button>
          </span>
        </el-dialog>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="record_table" :span="23">
      	<el-table :data="tableData" border style="width: 100%">
          <el-table-column fixed type="expand" width="40">
            <template slot-scope="props">
               <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="活动简介:" :span='19'>
                  <span>{{ props.row.slogan }}</span>
                </el-form-item><br>
                <el-form-item v-if="props.row.status == 3" label="驳回理由:" :span='20'>
                  <span>{{ props.row.info05 }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column fixed type="index" :index="indexMethod"  width="40">
          </el-table-column>
          <el-table-column fixed prop="creattime" label="创建时间" width="155">
          </el-table-column>
          <el-table-column prop="name" label="名称" width="200">
          </el-table-column>
          <el-table-column  prop="holdtime" label="举办时间" width="155">
          </el-table-column>
          <el-table-column prop="finishtime" label="结束时间" width="155">
          </el-table-column>
          <el-table-column prop="acttype" label="活动类型" :span="3">
          </el-table-column>
          <el-table-column prop="place" label="活动地点" width="240">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="170">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看人员</el-button>
              <el-button v-if="tableData[scope.$index].status == 1" type="success" size="small" @click="finishByKeyid(scope.row)">完成</el-button>
              <div v-if="tableData[scope.$index].status == 2" ></div>
              <el-button v-if="tableData[scope.$index].status == 3 || tableData[scope.$index].status == 0" type="danger" size="small" @click="deleteByKeyid(scope.row)">删除</el-button>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="审批结果" width="80">
            <template slot-scope="scope">
              <el-button v-if="tableData[scope.$index].status == 1" type="success" size="small" plain>同意</el-button>
              <el-button v-if="tableData[scope.$index].status == 3" type="danger" size="small" plain>驳回</el-button>
              <el-button v-if="tableData[scope.$index].status == 2" type="primary" size="small" plain>完成</el-button>
              <el-button v-if="tableData[scope.$index].status == 0" type="info" size="small" plain>待审批</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="参加人员" :visible.sync="detailVisible" width="60%">
          <el-table :data="tableDatas" border style="width: 80%; margin-left:10%">
            <el-table-column label="姓名" :span="6">
              <template slot-scope="scope">
                <i class="el-icon-plus"></i>
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="性别" :span="6">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.sex }}</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="参加时间" :span="6">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.jointime }}</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" :span="6">
              <template slot-scope="scope">
                <el-button v-if="tableDatas[scope.$index].finishtime == '' || tableDatas[scope.$index].finishtime == null "size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
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
  name: 'HelloWorld',
  data () {
    return {
      api: 'http://localhost:8888/stu',
      currentpage: 1,
      dialogVisible: false,
      detailVisible: false,
      formtemp: {
        LOG_TIMESTAMP: '',
      	actname: ''
      },
      form: {
        mindate: '',
        maxdate: '',
        actname: '',
        page: 1,
        userKeyid: ''
      },
      title: 0,
      tableData: [],
      detail:{},
      tableDatas: []
    }
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
  	handleClick(row) {
      this.axios.post(this.api+'/selectJoinPerson',{"keyid":row.keyid}).then((response)=>{
        if(response.data.code === 200) {
          this.tableDatas = response.data.data
          this.detailVisible = true
        }
      })
    },
    record: function() {
      var keyid = document.cookie.split(';')
      var userkeyid = keyid[1]
      this.form['userKeyid'] = userkeyid
      if(this.formtemp.LOG_TIMESTAMP === ''){
        this.form.mindate = ''
        this.form.maxdate = ''
      }else{
        this.form.mindate = this.formtemp.LOG_TIMESTAMP[0] || ''
        this.form.maxdate = this.formtemp.LOG_TIMESTAMP[1] || ''
      }
      this.form.actname = this.formtemp.actname;
      this.axios.post(this.api + '/record', this.form).then((response) =>  {
        if (response.data.code === 400) {
          this.$message.error('查询失败')
        }
        else if (response.data.code === '200') {
          this.tableData = response.data.date
          this.title = response.data.title
          this.dialogVisible = false
        }
      })
    },
    handleDelete(index, row) {
      this.axios.post(this.api+'/deleteJoinByStuKeyid',{'stukeyid':row.stukeyid,'activekeyid':row.activekeyid}).then((response) => {
        if(response.data.code === 201) {
          this.$message.error('删除失败')
        }
        else if (response.data.code === 200) {
          this.$message.success('删除成功')
          this.detailVisible = false
        }
      })
    },
    deleteByKeyid(row) {
      this.axios.post(this.api+'/deleteApplyByKeyid',{'keyid':row.keyid}).then((response) => {
        if(response.data.code === 201) {
          this.$message.error('删除失败')
        }
        else if (response.data.code === 200) {
          this.$message.success('删除成功')
          this.record()
        }
      })
    },
    finishByKeyid(row) {
      this.axios.post(this.api+'/finishApplyByKeyid',{'keyid':row.keyid}).then((response) => {
        if(response.data.code === 201) {
          this.$message.error('结束失败')
        }
        else if (response.data.code === 200) {
          this.$message.success('成功结束活动')
          this.record()
        }
      })
    }
  },
  created: function() {
    this.record()
  },
  watch:{
    currentpage: function() {
      this.form.page = this.currentpage
      this.record()  
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-button {
  	padding: 6px 10px;
  }
  .record_row {
  	margin-left: 20px;
  }
  .record_search_button {
  	margin-top: 23px
  }
  .record_head {
  	background-color: #F0F0F0
  }
  .record_table {
  	margin: 20px 20px 0px 20px  
  }
  .row-bg {
  	margin-top: 10px;
  }
</style>
