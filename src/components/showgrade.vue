<template>
  <el-row type="flex" justify="center">
  	<el-col :span="23">
      <div id="myChart" :style="{width: '1000px', height: '600px'}"></div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      api : 'http://localhost:8888/stu',
      name : 'XXX',
      datas: [],
      sum : 0,
      name : ''
    }
  },
  created: function(){
    this.init()
  },
  methods: {
    drawLine(){
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        title: {
          text: '学生:  ' + this.name + '     ' + '目前所获学分：' + this.sum
        },
        tooltip : {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type : 'category',
            boundaryGap : false,
            data : ['第一学期','第二学期','第三学期','第四学期','第五学期','第六学期','第七学期','第八学期']
          }
        ],
        yAxis : [
          {
            type : 'value'
          }
        ],
        series : [
          {
            name:'素质拓展学分',
            type:'line',
            stack: '总量',
            label: {
                normal: {
                    show: true
                }
            },
            areaStyle: {normal: {}},
            data:this.datas
          }
        ]
      });
    },
    init() {
      var keyid = document.cookie.split(';')
      var userkeyid = keyid[1]
      this.axios.post(this.api+'/selectStuGrade',{"keyid":userkeyid}).then((response)=>{
        if(response.data.code === 200) {
          this.datas = response.data.data
          this.name = response.data.name
          this.sum = response.data.sum
        }
      }).then(()=>{
        this.drawLine()
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
