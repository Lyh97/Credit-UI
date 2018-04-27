<template>
  <div style="width:100%">
    <el-row class="apply_head" type="flex">
      <el-col :span="6" class= "apply_row">
        <h2>活动申报</h2>
      </el-col>
      <el-col :span="13"></el-col>
      <el-col :span="5">
        <el-button class="apply_sub_button" type="primary" @click="onSubmit">立即创建</el-button>
      </el-col>
    </el-row>
    <el-form class="apply_from" ref="form" :model="form" label-width="80px">
      <el-form-item label="活动名称" >
        <el-col :span="15">
          <el-input style="width: 100%;" v-model="form.name"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-col :span="15">
          <el-input style="width: 100%;" v-model="form.place"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="人员数量">
        <el-col :span="15">
          <el-input-number v-model="form.member" :min="1" :max="500" label="输入数量"></el-input-number>
        </el-col>
      </el-form-item>
      <el-form-item label="报名时间" >
        <el-col :span="15">
          <el-date-picker type="date" value-format="yyyy-MM-dd hh:mm:ss" placeholder="选择日期" v-model="form.finishtime" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="举行时间">
        <el-col :span="15">
          <el-date-picker type="date" value-format="yyyy-MM-dd hh:mm:ss" placeholder="选择日期" v-model="form.holdtime" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="活动性质">
        <el-radio-group v-model="form.acttype" size="medium" class="el-col el-col-24">
          <el-radio border v-bind:label=item.name v-for="item in actclass"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动说明">
        <textarea col="100" v-model="form.slogan" class="el-col el-col-10 form_text" ></textarea>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      api: 'http://localhost:8888/stu',
      form: {
        name: '',
        slogan: '',
        holdtime: '',
        finishtime: '',
        member: '',
        acttype: '',
        place: '',
        userKeyid: ''
      },
      actclass: []
    }
  },
  methods: {
    onSubmit () {
      this.form['userKeyid'] = this.$store.state.user.keyid
      this.axios.post(this.api + '/apply', this.form).then((response) => {
        if (response.data.code === 400) {
          this.$message.error('活动申报失败')
        } else
        if (response.data.code === '200') {
          this.$notify({
            title: '申报成功',
            message: 'Apply',
            type: 'success',
            duration: 3000,
            offset: 70
          })
          this.$router.push({name: 'applyrecord'})
        }
      })
    },
    init () {
      this.axios.get(this.api + '/selectClass').then((response) => {
        if (response.data.code === 201) {
          this.$message.error('目前没有活动类型，无法上报')
        } else
        if (response.data.code === 202) {
          this.$message.error('后台出现问题，请联系管理员')
        } else
        if (response.data.code === 200) {
          this.actclass = response.data.aactclass
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
  .form_text{
    height:100px;
    width:50%;
    border-color: #c0c4cc;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
  }
  .apply_head {
    background-color: #F0F0F0
  }
  .apply_from {
    margin-top: 20px;
    padding: 0px 10px;
  }
  .apply_sub_button {
    margin-top: 15px;
  }
  .apply_row {
    margin-left: 20px;
  }
</style>
