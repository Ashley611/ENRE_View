<template>
  <div id="project-info">
    <div>
      <p class="with-margin">Project Relative Info</p>
<!--      <el-divider></el-divider>-->
      <!--标签块展示实体数量信息-->
      <show-entity-info>
        <div slot="mod">{{ this.modNum }}</div>
        <div slot="func">{{ this.funcNum }}</div>
        <div slot="cls">{{ this.clsNum }}</div>
      </show-entity-info>
      <!--柱状图，展示某些实体数量-->
      <div id="graph1" style="height: 400px; margin-top: 80px;margin-left: 30px;"></div>
<!--      <div id="graph2" style="width: 100%; height: 400px;"></div>-->
    </div>
  </div>
</template>

<script>
import project_info from "@/api/project_info";
import ShowEntityInfo from "@/views/pro_info/childcomp/ShowEntityInfo";
import store from "@/store/store";

export default {
  name: "ProjectInfo",
  data() {
    return {
      entityNum: [],
      numArr:[],
      funcNum: 0,
      clsNum: 0,
      modNum: 0
    }
  },
  components: {
    ShowEntityInfo
  },
  created() {
    this.getParams();
  },
  methods: {
    getParams() {
      this.file_path = this.$route.query.object;
      project_info.findFile(this.file_path).then(r => {
        this.$store.commit('storeFile',r.data)
        this.entityNum = r.data.entityNum;

        let pkgNum = this.entityNum[0].Package;
        let modNum = this.entityNum[0].Module;
        let funcNum = this.entityNum[0].Function;
        let clsNum = this.entityNum[0].Class;
        let methodNum = this.entityNum[0].Method;
        this.numArr.push(pkgNum);
        this.numArr.push(modNum);
        this.numArr.push(funcNum);
        this.numArr.push(clsNum);
        this.numArr.push(methodNum);
        this.funcNum = funcNum;
        this.modNum = modNum;
        this.clsNum = clsNum;
        this.drawBar(this.numArr);
        //this.drawTreeMap(this.numArr)
      }).catch(e => {
        console.log(e)
      })
    },
    drawBar(value) {
      // 初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('graph1'));
      //先显示加载，等待准备好数据后隐藏加载
      // myChart.showLoading();
      let option;
      option = {
        // title: {
        //   text: "Entity",
        //   textStyle: {
        //     color: "rgba(69, 82, 62, 1)",
        //     fontSize: 20,
        //     left: 'top'
        //   }
        // },
        tooltip: {
          show: true
        },
        xAxis: {
          type: 'category',
          data: ['Package', 'Module', 'Function', 'Class', 'Method'],
          name: 'entity',
          nameTextStyle: {
            color: "black",
            fontStyle:"normal",
            fontWeight:"bolder",
            fontFamily:'Arial',
            fontSize: 15
          }
        },
        yAxis: {
          type: 'value',
          name: "num",
          nameTextStyle: {
            color: "black",
            fontStyle:"normal",
            fontWeight:"bolder",
            fontFamily:'Arial',
            fontSize: 15
          }
        },
        series: [
          {
            data: this.numArr,
            type: 'bar',
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: 'top', //在上方显示
                  textStyle: { //数值样式
                    color: 'black',
                    fontSize: 16
                  }
                }
              }
            }
          }
        ],
        color: '#61a0a8'
      }
      //防止越界，重绘canvas
      window.onresize = myChart.resize;
      // myChart.hideLoading();
      myChart.setOption(option);//设置option
    },
    drawTreeMap(value) {
      let myChart = this.$echarts.init(document.getElementById('graph2'));
      let option = {}
      myChart.setOption(option);//设置option
    }
  },

}
</script>

<style scoped>
.with-margin{
  font-size: 34px;
  font-weight: bolder;
  margin-top: -10px;
  margin-bottom: -15px;
  text-align: center;
}

.el-divider{
  height: 1px;
  margin-left: 50px;

}
</style>