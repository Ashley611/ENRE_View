<template>
  <div v-show="this.show" :data="graph_data">
    <el-button type="primary" icon="el-icon-share" round size="mini" @click="clsGraph">生成Class依赖</el-button>
    <el-input v-model="search" size="mini" placeholder="Input Class Name" @input="handleSearch" style="margin-left: 40px;margin-right: -80px;width: 150px"></el-input>
    <div id="dep_graph" style="height: 470px; width: 100%"></div>
    <div id='edge_path' style="height:15px; width:500px;color:darkgreen;font-size: 10px;margin-top: -15px;margin-left: -10px"></div>
  </div>
</template>

<script>
export default {
  name: "Class",
  data() {
    return{
      myChart:{},
      map:{},
      search: ""
    }
  },
  props:{
    graph_data: Object,
    show: Boolean
  },
  methods: {
    clsGraph() {
      this.myChart = this.$echarts.init(document.getElementById('dep_graph'),null,{
        width: 1000,
        height: 500
      });
      this.myChart.showLoading();
      //let nodes = this.graph_data.variables;
      let nodes = [];
      //这里应该筛选所有的Module类型的node
      this.graph_data.variables.forEach(item => {
        if(item.category == "Class"){
          nodes.push(item)
        }
      });
      let links = this.graph_data.cells;
      let categories = this.graph_data.categories;
      this.myChart.hideLoading();
      let option = {
        title: {
          text: 'Class Level'
        },
        //工具箱
        toolbox: {
          //显示工具箱
          show: true,
          feature: {
            // 保存为图片
            saveAsImage: {
              show: true,
              title:"SaveAsImage"
            },
            dataView: {
              show: true,
              title:"dataView",
              readOnly:true,
              backgroundColor: "rgba(196, 205, 205, 1)",
              textareaBorderColor: "rgba(29, 101, 101, 1)",
              buttonColor: "rgba(86, 84, 98, 1)",
              optionToContent: function(opt) {
                let series = opt.series[0].data;
                let table = '<table border="1" style="margin-left:20px;border-collapse:collapse;font-size:12px;text-align:center"><tbody><tr class="dataViewTr">'
                    + '<td style="font-weight: bolder; font-size: 15px;">' + "id" + '</td>'
                    + '<td style="font-weight: bolder; font-size: 15px">' + 'simpleName' + '</td>'
                    + '<td style="font-weight: bolder; font-size: 15px">' + 'qualifiedName' + '</td>'
                    + '<td style="font-weight: bolder; font-size: 15px">isExported</td>'
                    + '</tr>';
                for (let i = 0, l = series.length; i < l; i++) {
                  table += '<tr>'
                      + '<td>' + series[i].id + '</td>'
                      + '<td>' + series[i].simpleName + '</td>'
                      + '<td>' + series[i].qualifiedName + '</td>'
                      + '<td>' + series[i].isExported + '</td>'
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
            })
          }
        ],
        series: [{
          type: 'graph',
          name: "Class",
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
            //鼠标放上去有阴影效果
            emphasis: {
              shadowColor: "darkgreen",
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 40,
            },
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
              //return x.data.name;
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
      this.myChart.on('mouseup',this.nodeFixed);
      this.myChart.on("click", (params) => {
        if (params.componentType === "series") {
          if (params.seriesType === "graph") {
            if (params.dataType === "node") {
              this.openOrFold(params);
            }
          }
        }
      })
    },

    openOrFold(params) {
      let option = this.myChart.getOption();//获取已生成图形的Option
      let allNodes = this.graph_data.variables;//获得所有节点
      let nodesOption = option.series[0].data;//获得所有Module节点的数组
      let linksOption = option.series[0].links;//获得所有连接的数组
      let data = params.data; //当前选择的某一节点
      let linksNodes = [];  //存放某节点的子节点
      let categoryLength = option.series[0].categories.length;//最后一个种类不展开，把prop或para设置为最后一种

      /**
       判断当前节点的category是否为最终子节点，如果是，则弹出该节点的label
       */
      if(data.category == data.category[(categoryLength-1)]){
        alert(data.label);
      }

      if (data !== null && data !== undefined) {
        //判断所选节点的flag,如果为真，则表示要展开数据,如果为假，则表示要折叠数据
        if (data.flag) {
          //展开数据
          //获得子节点数组
          for(let m in linksOption){
            if(linksOption[m].source==data.id){
              linksNodes.push(linksOption[m].target);
            }
          }
          //把当前点击节点和子孙节点保存到Map中，折叠时可以直接遍历Map
          //this.cur_childNodes.set(data,linksNodes)
          //遍历子节点数组,设置对应的option属性
          if(linksNodes != null && linksNodes != undefined){
            let nodeIds = new Set();
            nodesOption.forEach(item => {
              nodeIds.add(item.id);
            })

            for(let p in linksNodes){
              allNodes.forEach(item => {
                if(item.id == linksNodes[p]){
                  //所有节点中找到连接节点的item
                  //过滤一下，某些连接节点已经绘制，不能把所有连接节点再全部push
                  if(!(nodeIds.has(item.id))){
                    nodesOption.push(item)
                  }
                }
              })
            }
          }

          for(let p in linksNodes){
            nodesOption.forEach(item => {
              if(item.id == linksNodes[p]){
                item.ignore = false;
                item.flag = true;
              }
            })
          }
          //设置该节点的flag为false，下次点击折叠子孙节点
          nodesOption.find(item => {
            if(item.id == data.id){
              item.flag = false;
            }
          })
          //重绘
          //this.myChart.clear();  //这一步必不可少，否则二次渲染报错
          this.myChart.setOption(option);
        } else {
          //折叠数据
          //遍历连接关系数组,最终获得所选择节点的所有子孙节点
          for(let m in linksOption){
            if(linksOption[m].source==data.id){
              linksNodes.push(linksOption[m].target);//获得子节点数组
            }
          }
          //22  25  14  应该删除非Module的item
          //遍历子节点数组,设置对应的option属性
          //nodesOption中直接删除对应节点
          if(linksNodes != null && linksNodes != undefined){
            for(let p in linksNodes){
              nodesOption.forEach(item => {
                if(item.id == linksNodes[p]){
                  //在nodesOption数组中删除item
                  item.ignore = true;
                  item.flag = true;
                  //在这里判断一下哪些移除，哪些不移除(展示module关系，module之间相连接的不移除)
                  if(!(item.category == "Class")){
                    nodesOption = this.objRemove(nodesOption,item.id);
                  }
                }
              })
            }
          }
          //设置该节点的flag为true，下次点击展开子节点
          nodesOption.find(item => {
            if(item.id == data.id){
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
    objRemove(arr,obj) {
      arr.some((item, i) => {
        if (item.id == obj) {
          arr.splice(i, 1)
        }
      })
      return arr;
    },

    //拖拽节点后固定
    nodeFixed(params) {
      let option = this.myChart.getOption();
      //这两个语句会回到position为0的位置
      //option.series[0].data[params.dataIndex].x=params.event.offsetX;
      //option.series[0].data[params.dataIndex].y=params.event.offsetY;
      option.series[0].data[params.dataIndex].fixed=true;
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
      let links= series.links;//获取所有连线
      for(let i = 0 ; i < links.length; i++){
        this.map[links[i].source] = links[i].target;
      }

      if(params.dataType=="edge"){
        let linked1_ctg;
        let linked1_name;
        let linked2_ctg;
        let linked2_name;
        let data = params.data;
        let source = data.source;
        let target = data.target;

        nodesOption.forEach(item => {
          if(item.id === source){
            linked1_ctg = item.category;
            linked1_name = item.simpleName;
          }
          if(item.id === target) {
            linked2_ctg = item.category;
            linked2_name = item.simpleName;
          }
          return true;
        })
        str = linked1_ctg + " : " + linked1_name+ " --->"+ linked2_ctg + " : "+ linked2_name;
        return str;
      }else if(params.dataType=="node"){
        str = params.data.category+ " : "+ params.data.simpleName;
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
        if ((nodesOption[m].simpleName.includes(value)) && value !== ""){
          //找到对应的节点,改变对应节点的配置
          option.series[0].data[m].itemStyle.opacity = 1;
          option.series[0].data[m].itemStyle.shadowColor = "darkGreen";
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
                    item.itemStyle.shadowColor = "darkGreen";
                    item.itemStyle.shadowBlur = 35;
                    item.itemStyle.borderColor = "white";
                  }
                })
              }
            }
          }
          for (let k in linksOption) {
            if (linksOption[k].source == nodesOption[m].id) {
              linksOption[k].lineStyle.opacity = 1; //通过修改该节点连接边的透明度来实现高亮的效果
              linksOption[k].lineStyle.width = 2;
              let linkedNodeId = linksOption[k].target;
              nodesOption.forEach(item => {
                if(item.id == linkedNodeId){
                  item.itemStyle.opacity = 1;
                  item.itemStyle.shadowColor = "darkGreen";
                  item.itemStyle.shadowBlur = 35;
                  item.itemStyle.borderColor = "white";
                }
              })
            }
          }
        } else if(value == ""){
          //说明输入框为空，恢复到原来的配置
          nodesOption[m].itemStyle.opacity = 0.8;
          option.series[0].data[m].itemStyle.shadowColor = "white";
          option.series[0].data[m].itemStyle.shadowBlur = 35;
          option.series[0].data[m].itemStyle.borderColor = "white";
          for (let k in linksOption) {
            if (linksOption[k].source == nodesOption[m].id) {
              linksOption[k].lineStyle.opacity = 0.8; //通过修改该节点的透明度来实现高亮的效果
              linksOption[k].lineStyle.width = 1.5;
            }
          }
        } else {
          nodesOption[m].itemStyle.opacity = 0.1;
          for (let k in linksOption) {
            if (linksOption[k].source == nodesOption[m].id) {
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