<template>
  <h2 v-if="this.show === false">未上传相关实体依赖文件，无法获取信息</h2>
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
    <div id="dep_graph" style="margin-left: 70px"></div>
    <div id='edge_path' style="height:15px; width:500px;color:#A52A2A;font-size: 10px;margin-top: -500px;margin-left: 610px;"></div>
  </div>
</template>

<script>
import dependency from "@/api/dependency";

export default {
  name: "EntityDep",
  data() {
    return {
      myChart: {},
      map: {},
      search:"",
      show:true,
      nodeArr:[],
      edgeArr:[],
    }
  },
  computed: {

  },
  mounted() {
    this.getParams();
  },
  methods: {
    getParams() {
      let en_dep_file = this.$store.state.entity_dep_file;
      if(en_dep_file.originalname == undefined) {
        //未上传文件
        this.show = false;
      } else {
        this.show = true;
        //向后台发送请求读取文件，获取文件内容
        dependency.find_en_dep_file(en_dep_file).then(r => {
          //在这里对文件格式重新修改，方便展示
          let finalFile = this.rewriteFile(r.data);
          this.modGraph(finalFile)
        }).catch(e => {
          console.log(e)
          this.$message.error(`获取失败`)
        })
      }
    },

    rewriteFile(file) {
      let itemMap = new Map();
      itemMap.set("opacity",0.8);
      itemMap.set("shadowColor","white");
      itemMap.set("shadowBlur",0);
      itemMap.set("borderColor","white");
      //map转换为json
      let obj1 = this.mapToObj(itemMap);
      // let obj1= Object.create(null);
      // itemMap.forEach(function (value, key, map){
      //   obj1[key] = value;
      // })
      for(let node of file.variables) {
        node.itemStyle = obj1;
        node.ignore = true;
        node.flag = true;
      }

      //给cells写入lineStyle
      let obj = new Map();
      obj.set("opacity",0.8);
      obj.set("width",1.5)
      let obj2 = this.mapToObj(itemMap);
      // let obj2= Object.create(null);
      // obj.forEach(function (value, key, map){
      //   obj2[key] = value;
      // })
      for(let cell of file.cells) {
        cell.lineStyle = obj2
      }
      file = JSON.parse(JSON.stringify(file))
      return file;
    },

    mapToObj(map) {
      let obj= Object.create(null);
      map.forEach(function (value, key, map){
        obj[key] = value;
      })
      return obj;
    },

    modGraph(file) {
      this.myChart = this.$echarts.init(document.getElementById('dep_graph'), null, {
        width: 1000,
        height: 600
      });
      this.myChart.showLoading();
      let nodes = [];
      //这里应该筛选所有的Module类型的node
      file.variables.forEach(item => {
        if (item.category == "Module") {
          nodes.push(item)
        }
      });
      let links = file.cells;
      let categories = file.categories;
      this.myChart.hideLoading();
      let option = {
        title: {
          text: 'Module Level'
        },
        tooltip: {
          show: true,   //默认显示
          showContent: true, //是否显示提示框浮层
          trigger: 'item',//触发类型，默认数据项触发
          triggerOn: 'mousemove',//提示触发条件，mousemove鼠标移至触发，还有click点击触发
          alwaysShowContent: false, //默认离开提示框区域隐藏，true为一直显示
          showDelay: 0,//浮层显示的延迟，单位为 ms，默认没有延迟，也不建议设置。在 triggerOn 为 'mousemove' 时有效。
          hideDelay: 200,//浮层隐藏的延迟，单位为 ms，在 alwaysShowContent 为 true 的时候无效。
          enterable: false,//鼠标是否可进入提示框浮层中，默认为false，如需详情内交互，如添加链接，按钮，可设置为 true。
          position: 'right',//提示框浮层的位置，默认不设置时位置会跟随鼠标的位置。只在 trigger 为'item'的时候有效。
          confine: false,//是否将 tooltip 框限制在图表的区域内。外层的 dom 被设置为 'overflow: hidden'，或者移动端窄屏，导致 tooltip 超出外界被截断时，此配置比较有用。
          transitionDuration: 0.4,//提示框浮层的移动动画过渡时间，单位是 s，设置为 0 的时候会紧跟着鼠标移动。
          formatter:function (params) {
            if (params.dataType == "node") {
              return params.data.category + ": " + params.data.simpleName+'<br/>';
            }
          }
        },
        //工具箱
        toolbox: {
          //显示工具箱
          show: true,
          feature: {
            // 保存为图片
            saveAsImage: {
              show: true,
              title: "SaveAsImage"
            },
            dataView: {
              show: true,
              title: "dataView",
              readOnly: true,
              backgroundColor: "rgba(196, 205, 205, 1)",
              textareaBorderColor: "rgba(29, 101, 101, 1)",
              buttonColor: "rgba(86, 84, 98, 1)",
              width:100,
              optionToContent: function (opt) {
                let series = opt.series[0].data;
                let table = '<table border="1" style="width:100px;margin-left:10px;border-collapse:collapse;font-size:12px;text-align:center"><tbody><tr class="dataViewTr">'
                    + '<td style="font-weight: bolder; font-size: 15px;">' + "id" + '</td>'
                    + '<td style="font-weight: bolder; font-size: 15px">' + 'simpleName' + '</td>'
                    + '<td style="font-weight: bolder; font-size: 15px">qualifiedName</td>'
                    + '</tr>';
                for (let i = 0, l = series.length; i < l; i++) {
                  table += '<tr>'
                      + '<td>' + series[i].id + '</td>'
                      + '<td>' + series[i].simpleName + '</td>'
                      + '<td>' + series[i].qualifiedName + '</td>'
                      + '</tr>';
                }
                table += '</tbody></table>';
                return table;
              }
            }
          }
        },
        legend: [
          {
            data: categories.map(function (a) {
              return a.name;
            }),
            icon: "circle",
            top: 4,
          }
        ],
        series: [{
          type: 'graph',
          name: "Module",
          layout: 'force',
          data: nodes,
          links: links,
          categories: categories,
          force: {
            repulsion: 80,//节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
            gravity: 0.1,//节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
            edgeLength: [150, 200],//边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
            layoutAnimation: true
          },
          roam: true,
          nodeScaleRatio: 0.6,
          draggable: true,
          focusNodeAdjacency: true,
          edgeSymbol: ['circle', 'arrow'],
          edgeSymbolSize: [2, 10],
          symbolSize: 25,

          itemStyle: {
            normal: {
              //opacity: 1,
              emphasis: {
                shadowColor: "red",
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 40,
              },
            }
          },
          lineStyle: {
            //edge格式
            color: 'source',
            curveness: 0.3,
            shadowBlur: 0.7,
            width: 1.5,
          },
          emphasis: {
            lineStyle: {
              width: 3
            }
          },
          label: {
            show: true,
            position: 'inside',
            formatter: function (x) {
              //节点上显示node id
              return x.data.id;
            },
            fontSize: 10
          },
          edgeLabel: {
            //edge上相关设置
            normal: {
              show: true,
              textStyle: {
                fontSize: 10
              },
              formatter: function (x) {
                //edge上显示内容，设置为dep
                return JSON.stringify(x.data.values);
              }
            }
          },
        }]
      }

      this.myChart.clear();
      this.myChart.setOption(option);
      this.myChart.on('mouseover', this.showPath);
      this.myChart.on('mouseup', this.nodeFixed);
      this.myChart.on("click", (params) => {
        if (params.componentType === "series") {
          if (params.seriesType === "graph") {
            if (params.dataType === "node") {
              this.openOrFold(params,file);
            }
          }
        }
      })
    },

    openOrFold(params,file) {
      let option = this.myChart.getOption();//获取已生成图形的Option
      let allNodes = file.variables;//获得所有节点
      let nodesOption = option.series[0].data;//获得所有Module节点的数组
      let linksOption = option.series[0].links;//获得所有连接的数组

      let data = params.data; //当前选择的某一节点
      let linksNodes = [];  //存放某节点的子节点

      //获得子节点数组
      for (let m in linksOption) {
        if (linksOption[m].source == data.id) {
          linksNodes.push(linksOption[m].target);
        }
      }

      if (data !== null && data !== undefined) {
        //判断所选节点的flag,如果为真，则表示要展开数据,如果为假，则表示要折叠数据
        if (data.flag) {
          //展开数据
          //保存当前节点集合id
          let nodeIds = new Set();
          nodesOption.forEach(item => {
            nodeIds.add(item.id);
          })

          //遍历子节点数组,设置对应的option属性
          if (linksNodes.length > 0) {
            for (let p in linksNodes) {
              allNodes.forEach(item => {
                if (item.id == linksNodes[p]) {
                  //所有节点中找到连接节点的item
                  //过滤一下，某些连接节点已经绘制，不能把所有连接节点再全部push
                  if (!(nodeIds.has(item.id))) {
                    nodesOption.push(item)
                  }
                }
              })
            }
          } else {
            alert("已显示所有相关依赖信息")
          }

          for (let p in linksNodes) {
            nodesOption.forEach(item => {
              if (item.id == linksNodes[p]) {
                item.ignore = false;
                item.flag = true;
              }
            })
          }
          //设置该节点的flag为false，下次点击折叠子孙节点
          nodesOption.find(item => {
            if (item.id == data.id) {
              item.flag = false;
            }
          })
          //重绘
          //this.myChart.clear();  //这一步必不可少，否则二次渲染报错
          this.myChart.setOption(option);
        } else {  //折叠数据
          //遍历子节点数组,设置对应的option属性
          //nodesOption中直接删除对应节点
          if (linksNodes.length > 0) {
            for (let p in linksNodes) {
              nodesOption.forEach(item => {
                if (item.id == linksNodes[p]) {
                  //在nodesOption数组中删除item
                  item.ignore = true;
                  item.flag = true;
                  //在这里判断一下哪些移除，哪些不移除(展示module关系，module之间相连接的不移除)
                  if (!(item.category == "Module")) {
                    nodesOption = this.objRemove(nodesOption, item.id);
                  }
                }
              })
            }
          }
          //设置该节点的flag为true，下次点击展开子节点
          nodesOption.find(item => {
            if (item.id == data.id) {
              item.flag = true;
            }
          })
          //重绘
          //this.myChart.clear();
          this.myChart.setOption(option);
        }
      }
    },

    //折叠节点时，移除
    objRemove(arr, obj) {
      arr.some((item, i) => {
        if (item.id == obj) {
          arr.splice(i, 1)
        }
      })
      return arr;
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

    //拼接节点关系并显示在左下角
    appendPath(params) {
      let str = "";
      let option = this.myChart.getOption();
      let series = option.series[params.seriesIndex]; //获取图表
      let nodesOption = series.data;//获取所有数据
      let links = series.links;//获取所有连线
      for (let i = 0; i < links.length; i++) {
        this.map[links[i].source] = links[i].target;
      }

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
            linked1_name = item.simpleName;
          }
          if (item.id === target) {
            linked2_ctg = item.category;
            linked2_name = item.simpleName;
          }
          return true;
        })
        str = linked1_ctg + " : " + linked1_name + " --->" + linked2_ctg + " : " + linked2_name;
        return str;
      } else if (params.dataType == "node") {
        //悬浮到节点时显示节点名字
        str = params.data.category + " : " + params.data.simpleName;
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
        if ((nodesOption[m].simpleName.indexOf(value) !== -1)){
          //找到对应的节点,改变对应节点的配置
          option.series[0].data[m].itemStyle.opacity = 1;
          option.series[0].data[m].itemStyle.shadowColor = "darkRed";
          option.series[0].data[m].itemStyle.shadowBlur = 35;
          option.series[0].data[m].itemStyle.borderColor = "white";
          //判断这个节点是否展开，展开的话让连接节点也高亮
          if(nodesOption[m].flag == false){
            for (let k in linksOption) {
              if (linksOption[k].source == nodesOption[m].id) {
                let linkedNode = linksOption[k].target;
                nodesOption.forEach(item => {
                  if(item.id == linkedNode){
                    item.itemStyle.opacity = 1;
                    item.itemStyle.shadowColor = "darkRed";
                    item.itemStyle.shadowBlur = 35;
                    item.itemStyle.borderColor = "white";
                  }
                })
              }
            }
            // console.log(nodesOption)
          }
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
          if(nodesOption[m].simpleName.indexOf(value) == 0) {
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