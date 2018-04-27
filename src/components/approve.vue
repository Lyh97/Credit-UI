<template>
  <div>
    <el-row class="record_head" type="flex">
      <el-col :span="4" class= "record_row">
        <h1>活动审批</h1>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span='22'>
        <el-table style="width: 100%" header-cell-style='text-align:center' row-style='text-align:center' :data="tableData">

          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="活动分数:" :span='20'>
                  <span>{{ props.row.actgrade }}</span>
                </el-form-item>
                <el-form-item label="活动简介:" :span='20'>
                  <span>{{ props.row.slogan }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column type="index" :index="indexMethod">
          </el-table-column>
          <el-table-column label=" 活动名称" :span='4'>
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="活动地点" :span='4'>
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.place }}</span>
            </template>
          </el-table-column>
          <el-table-column label="举办时间" :span='5'>
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.holdtime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="提交人" :span='2'>
            <template slot-scope="scope">
              <el-popover trigger="click" placement="top">
                <p>姓名: {{ scope.row.username }}</p>
                <p>电话: {{ scope.row.usertel }}</p>
                <div slot="reference" class="name-wrapper" style="text-align:center">
                  <el-tag size="medium">{{ scope.row.username }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="consent(scope.$index, scope.row)">同意</el-button>
              <el-button size="mini" v-popover:popover type="danger">
                驳回
                <el-popover :value=visible ref="popover" placement="bottom" width="400" trigger="click">
                  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="活动形式" prop="desc">
                      <el-input type="textarea" v-model="ruleForm.info"></el-input>
                    </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="tureDown(scope.$index, scope.row)">提交驳回</el-button>
                  </el-form-item>
                  </el-form>
              </el-popover>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      tableData: [],
      ruleForm: {
        info: ''
      },
      api: 'http://localhost:8888/stu'
    }
  },
  methods: {
    consent (index, row) {
      row.info05 = ''
      this.examine(row, 1)
    },
    tureDown (index, row) {
      row.info05 = this.ruleForm.info
      this.examine(row, 3)
    },
    examine (row, status) {
      row.status = status
      this.visible = false
      this.axios.post(this.api + '/updateStatus', row).then((response) => {
        if (response.data.code === 201) {
          this.$message.error('系统错误，请联系管理员')
        } else
        if (response.data.code === 200) {
          this.$message.success('审批完成')
          this.init()
        }
      })
    },
    indexMethod (index) {
      return index + 1
    },
    init () {
      this.axios.get(this.api + '/selectAllStatus0').then((response) => {
        if (response.data.code === 201) {
          this.$message.error('系统错误，请联系管理员')
        } else
        if (response.data.code === 200) {
          this.tableData = response.data.data
        }
      })
    }
  },
  created: function () {
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
