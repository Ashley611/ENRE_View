<template>
  <h2 v-if="this.show === false">未上传相关语义依赖文件，无法获取信息</h2>
  <div v-else>
    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item label="Search" style="margin-left: -700px;font-weight: bolder;">
        <el-input
            v-model="search"
            size="mini"
            placeholder="输入实体名搜索"
            suffix-icon="el-icon-search"
            @input="handleSearch"
        />
      </el-form-item>
    </el-form>
    <div id="his_dep_graph" style="margin-left: 70px"></div>
    <div id='edge_path' style="height:15px; width:500px;color:#A52A2A;font-size: 10px;margin-top: -500px;margin-left: 610px;"></div>
  </div>
</template>

<script>
import dependency from "@/api/dependency";

export default {
name: "ContextDep",
  data() {
    return {
      search:"",
      show:true,
      nodeArr:[],
      edgeArr:[],
      myChart:{},
    }
  },
  created() {
    this.getParams();
  },
  methods: {
    getParams() {
      //获取对应文件
      let con_dep_file = this.$store.state.con_dep_file;
      //获取到的文件如果为空，将data的show设置为false,展示时如果show的值为false，就显示“未上传相关的历史依赖文件”
      if(con_dep_file.originalname == undefined) {
        //未上传文件
        this.show = false;
      } else {
        this.show = true;
        //向后台发送请求读取文件，获取文件内容
        dependency.find_con_dep_file(con_dep_file).then(r => {
          //在这里对文件格式重新修改，方便展示
          let finalFile = this.rewriteFile(r.data);
          //绘制图表
          this.contextGraph(finalFile);
        }).catch(e => {
          console.log(e)
          this.$message.error(`获取失败`)
        })
      }
    },

    rewriteFile(file) {
      let nodeObj = new Map();
      let categories = new Array();
      //itemStyle对象
      let itemObj = new Map();
      itemObj.set("opacity",0.8);
      itemObj.set("shadowColor","white");
      itemObj.set("shadowBlur",0);
      itemObj.set("borderColor","white");
      let item = this.mapToObj(itemObj);

      for(let i=0;i<file.variables.length;i++) {
        let id = i;
        let name = file.variables[i];
        let flag = true;
        let ignore = true;
        nodeObj.set("id",id.toString());
        nodeObj.set("name",name);
        nodeObj.set("flag",flag);
        nodeObj.set("ignore",ignore);
        nodeObj.set("category","Module");
        nodeObj.set("itemStyle",item);
        let obj1 = this.mapToObj(nodeObj);
        this.nodeArr.push(obj1)
      }

      //cells写入lineStyle
      let obj = new Map();
      obj.set("opacity",0.8);
      obj.set("width",1.5);
      let obj2 = this.mapToObj(obj);
      for(let i=0;i<file.cells.length;i++) {
        let edgeObj = new Map();
        edgeObj.set("source",file.cells[i].src.toString());
        edgeObj.set("target",file.cells[i].dest.toString());
        edgeObj.set("values",file.cells[i].values);
        edgeObj.set("lineStyle",obj2);
        let obj3 = this.mapToObj(edgeObj);
        this.edgeArr.push(obj3)
      }
      //添加categories
      categories.push({name:"Module"});
      file.categories = categories;
      file.variables = this.nodeArr;
      file.cells = this.edgeArr;
      file = JSON.parse(JSON.stringify(file))
      return file;
    },

    mapToObj(map) {
      let obj = Object.create(null);
      map.forEach(function (value, key, map){
        obj[key] = value;
      })
      return obj;
    },

    contextGraph(file) {
      this.myChart=this.$echarts.init(document.getElementById('his_dep_graph'),null,{
        width:1000,
        height:600
      });
      this.myChart.showLoading();
      let nodes=file.variables;
      let links=file.cells;
      let categories=file.categories;
      this.myChart.hideLoading();
      let option={
        title:{
          text:'ContextDependency'
        },
        tooltip:{
          show:true,//默认显示
          showContent:true,//是否显示提示框浮层
          trigger:'item',//触发类型，默认数据项触发
          triggerOn:'mousemove',//提示触发条件，mousemove鼠标移至触发，还有click点击触发
          alwaysShowContent:false,//默认离开提示框区域隐藏，true为一直显示
          showDelay:0,//浮层显示的延迟，单位为ms，默认没有延迟，也不建议设置。在triggerOn为'mousemove'时有效。
          hideDelay:200,//浮层隐藏的延迟，单位为ms，在alwaysShowContent为true的时候无效。
          enterable:false,//鼠标是否可进入提示框浮层中，默认为false，如需详情内交互，如添加链接，按钮，可设置为true。
          position:'right',//提示框浮层的位置，默认不设置时位置会跟随鼠标的位置。只在trigger为'item'的时候有效。
          confine:false,//是否将tooltip框限制在图表的区域内。外层的dom被设置为'overflow:hidden'，或者移动端窄屏，导致tooltip超出外界被截断时，此配置比较有用。
          transitionDuration:0.4,//提示框浮层的移动动画过渡时间，单位是s，设置为0的时候会紧跟着鼠标移动。
          formatter:function(params){
            if(params.dataType=="node"){
              return params.data.name;
            }
          }
        },
        //工具箱
        toolbox:{
          show:true,
          feature:{
            saveAsImage:{
              show:true,
              title:"SaveAsImage"
            },
            dataView:{
              show:true,
              title:"dataView",
              readOnly:true,
              backgroundColor:"rgba(196,205,205,1)",
              textareaBorderColor:"rgba(29,101,101,1)",
              buttonColor:"rgba(86,84,98,1)",
              width:100,
              optionToContent:function(opt){
                let series = opt.series[0].data;
                let table='<table border="1"style="width:100px;margin-left:10px;border-collapse:collapse;font-size:12px;text-align:center"><tbody><trclass="dataViewTr">'
                    +'<td style="font-weight:bolder;font-size:15px;">'+"id"+'</td>'
                    +'<td style="font-weight:bolder;font-size:15px">'+'name'+'</td>'
                    +'</tr>';
                for(let i=0,l=series.length;i<l;i++){
                  table+='<tr>'
                      +'<td>'+series[i].id+'</td>'
                      +'<td>'+series[i].name+'</td>'
                      +'</tr>';
                }
                table+='</tbody></table>';
                return table;
              }
            }
          }
        },
        legend:[
          {
            data:categories.map(function(a){
              return a.name;
            }),
            icon:"roundRect",
            top:4,
          }
        ],
        series:[{
          type:'graph',
          name:"ContextDep",
          layout:'force',
          data:nodes,
          links:links,
          categories:categories,
          force:{
            repulsion:80,//节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
            gravity:0.1,//节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
            edgeLength:[150,200],//边的两个节点之间的距离，这个距离也会受repulsion。[10,50]。值越小则长度越长
            layoutAnimation:true
          },
          roam:true,
          nodeScaleRatio:0.6,
          draggable:true,
          focusNodeAdjacency:true,
          edgeSymbol:['circle','arrow'],
          edgeSymbolSize:[2,10],
          symbolSize:25,

          itemStyle:{
            normal:{
              emphasis:{
                shadowColor:"red",
                shadowOffsetX:0,
                shadowOffsetY:0,
                shadowBlur:40,
              },
            }
          },
          lineStyle:{
            opacity: 0.8,
            color:'source',
            curveness:0.3,
            shadowBlur:0.7,
            width:1.5,
          },
          emphasis:{
            lineStyle:{
              width:2
            }
          },
          label:{
            show:true,
            position:'inside',
            formatter:function(x){
              return x.data.id;
            },
            fontSize:10
          },
          edgeLabel:{
            normal:{
              show:true,
              textStyle:{
                fontSize:10
              },
              formatter:function(x){
                //edge上显示内容，设置为dep
                return JSON.stringify(x.data.values);
              }
            }
          },
        }]
      }
      this.myChart.setOption(option);
      this.myChart.on('mouseover', this.showPath);
      this.myChart.on('mouseup',this.nodeFixed);
    },

    nodeFixed(params) {
      let option = this.myChart.getOption();
      option.series[0].data[params.dataIndex].fixed = true;
      this.myChart.setOption(option);
    },

    showPath(params) {
      let str = this.appendPath(params);
      document.getElementById("edge_path").innerHTML = str;
      return str;
    },

    appendPath(params) {
      let str = "";
      let option = this.myChart.getOption();
      let series = option.series[params.seriesIndex]; //获取图表
      let nodesOption = series.data;//获取所有数据
      let links = series.links;//获取所有连线

      if (params.dataType == "edge") { //当鼠标停留在连线上时
        let linked1_ctg;
        let linked1_name;
        let linked2_ctg;
        let linked2_name;
        let data = params.data;
        let source = data.source;
        let target = data.target;

        nodesOption.forEach(item => {
          if (item.id === source) {
            linked1_ctg = item.category;
            linked1_name = item.name;
          }
          if (item.id === target) {
            linked2_ctg = item.category;
            linked2_name = item.name;
          }
          return true;
        })
        str = linked1_ctg + " : " + linked1_name + " --->" + linked2_ctg + " : " + linked2_name;
        return str;
      } else if (params.dataType == "node") {
        //悬浮到节点时显示节点名字
        str = params.data.category + " : " + params.data.name;
        return str;
      }
    },

    handleSearch(value) {
      let option = this.myChart.getOption();
      //所有的节点和边
      let nodesOption = option.series[0].data;
      let linksOption = option.series[0].links;

      //如果当前这个节点在option的data
      for (let m = 0; m < nodesOption.length;m++) {
        if ((nodesOption[m].name.indexOf(value) !== -1)){
          //找到对应的节点,改变对应节点的配置
          option.series[0].data[m].itemStyle.opacity = 1;
          option.series[0].data[m].itemStyle.shadowColor = "darkRed";
          option.series[0].data[m].itemStyle.shadowBlur = 35;
          option.series[0].data[m].itemStyle.borderColor = "white";

          for (let k in linksOption) {
            if (linksOption[k].source == nodesOption[m].id) {
              linksOption[k].lineStyle.opacity = 1; //通过修改该节点连接边的透明度来实现高亮的效果
              linksOption[k].lineStyle.width = 2;
              let linkedNodeId = linksOption[k].target;
              nodesOption.forEach(item => {
                if(item.id == linkedNodeId){
                  item.itemStyle.opacity = 1;
                  item.itemStyle.shadowColor = "darkRed";
                  item.itemStyle.shadowBlur = 35;
                  item.itemStyle.borderColor = "white";
                }
              })
            }
          }
          if(nodesOption[m].name.indexOf(value) == 0) {
            //输入为空
            if(value == "") {
              nodesOption[m].itemStyle.opacity = 0.8;
              nodesOption[m].itemStyle.shadowColor = "white";
              nodesOption[m].itemStyle.shadowBlur = 35;
              nodesOption[m].itemStyle.borderColor = "white";
            } else {
              //以value开头
              nodesOption[m].itemStyle.opacity = 1;
              nodesOption[m].itemStyle.shadowColor = "darkRed";
              nodesOption[m].itemStyle.shadowBlur = 35;
              nodesOption[m].itemStyle.borderColor = "white";
            }
          }
        } else {
          //没找到搜索节点
          nodesOption[m].itemStyle.opacity = 0.1;
          for (let k in linksOption) {
            if (linksOption[k].source == nodesOption[m].id) {
              nodesOption[m].itemStyle.shadowColor = "white";
              nodesOption[m].itemStyle.shadowBlur = 35;
              nodesOption[m].itemStyle.borderColor = "white";
              linksOption[k].lineStyle.opacity = 0.1; //通过修改该节点的透明度来实现高亮的效果
              linksOption[k].lineStyle.width = 0.1;
            }
          }
        }
      }
      this.myChart.setOption(option);
    }
  }
}
</script>

<style scoped>

</style>