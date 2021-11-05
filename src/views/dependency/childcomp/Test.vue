<template>
  <div v-show="this.show" :data="graph_data">
    <el-button type="primary" icon="el-icon-share" round size="mini" @click="testGraph">TestDemo</el-button>
    <div id="dep_graph" style="height: 470px; width: 100%"></div>
    <div id='edge_path' style="height:15px; width:500px;color:#A52A2A;font-size: 10px;margin-top: -15px;margin-left: -10px"></div>
  </div>
</template>

<script>
export default {
  name: "Test",
  data() {
    return {
      map:{},
      nodes: [
        {
          "id": "0",
          "name": "depExtract.downloadCode.bootstrap-main.bootstrap-main.js.src",
          "category": "Function",
          "draggable": true,
          "fixed": false,
          "flag": true,
          "ignore": true
        },
        {
          "id": "1",
          "name": "depExtract.downloadCode.bootstrap-main.bootstrap-main.js",
          "category": "Function",
          "draggable": true,
          "fixed": false,
          "flag": true,
          "ignore": true
        },
        {
          "id": "2",
          "name": "depExtract.downloadCode.bootstrap-main.bootstrap-main",
          "category": "Var",
          "draggable": true,

          "fixed": false,
          "flag": true,
          "ignore": true
        },
        {
          "id": "3",
          "name": "depExtract.downloadCode",
          "category": "Function",
          "draggable": true,
          "fixed": false,
          "flag": true,
          "ignore": true
        },
        {
          "id": "4",
          "name": "depExtract",
          "category": "Parameter",
          "draggable": true,
          "fixed": false,
          "flag": true,
          "ignore": true
        },
        {
          "id": "5",
          "name": "depExtract.downloadCode.bootstrap-main.bootstrap-main.js.src.alert",
          "category": "Parameter",
          "draggable": true,
          "fixed": false,
          "flag": true,
          "ignore": true
        },
        // {
        //   id: "0",
        //   name: "depExtract.downloadCode.bootstrap-main.bootstrap-main.js.src",
        //   category: "Function",
        //   draggable: true,
        //   // fixed: true,
        //   flag: true,
        //   ignore: true
        // },
        // {
        //   id: "1",
        //   name: "depExtract.downloadCode.bootstrap-main.bootstrap-main.js",
        //   category: "Function",
        //   draggable: true,
        //   // fixed: true,
        //   flag: true,
        //   ignore: true
        // },
        // {
        //   id: "2",
        //   name: "depExtract.downloadCode.bootstrap-main.bootstrap-main",
        //   category: "Var",
        //   draggable: true,
        //   // fixed: true,
        //   flag: true,
        //   ignore: true
        // },
        // {
        //   id: "3",
        //   name: "depExtract.downloadCode",
        //   category: "Function",
        //   draggable: true,
        //   // fixed: true,
        //   flag: true,
        //   ignore: true
        // },
        // {
        //   id: "4",
        //   name: "depExtract",
        //   category: "Parameter",
        //   draggable: true,
        //   // fixed: true,
        //   flag: true,
        //   ignore: true
        // },
        // {
        //   id: "5",
        //   name: "depExtract.downloadCode.bootstrap-main.bootstrap-main.js.src.alert",
        //   category: "Parameter",
        //   draggable: true,
        //   // fixed: true,
        //   flag: true,
        //   ignore: true
        // },
      //     {
      //   id: "0",
      //   category: "负载",
      //   name: '101.133.8.88',
      //   symbol: 'roundRect',
      //   value: 20,
      //   symbolSize: 80
      // }, {
      //   id: "1",
      //   category: "中间件",
      //   name: '192.168.8.88',
      //   symbol: 'rect',
      //   value: 20,
      //   symbolSize: 70
      // }, {
      //   id: "2",
      //   category: "端口号",
      //   name: '7001',
      //   symbol: 'circle',
      //   value: 20,
      //   symbolSize: 60,
      //   yId: "jvm",
      //   host: "192.168.6.37",
      //   port: "7001",
      //   username: "weblogic",
      //   pwd: "weblogic1"
      // }, {
      //   id: "3",
      //   category: "端口号",
      //   name: '7100',
      //   symbol: 'circle',
      //   value: 20,
      //   symbolSize: 60
      // }, {
      //   id: "4",
      //   category: "中间件",
      //   name: '102.12.33.23',
      //   symbol: 'rect',
      //   value: 20,
      //   symbolSize: 70
      // }, {
      //   id: "5",
      //   category: "端口号",
      //   name: '7001',
      //   symbol: 'circle',
      //   value: 20,
      //   symbolSize: 60
      // }, {
      //   id: "6",
      //   category: "端口号",
      //   name: '7100',
      //   symbol: 'circle',
      //   value: 20,
      //   symbolSize: 60
      // }, {
      //   id: "7",
      //   category: "端口号",
      //   name: '7001',
      //   symbol: 'circle',
      //   value: 20,
      //   symbolSize: 60
      // }, {
      //   id: "8",
      //   category: "中间件",
      //   name: '101.11.66.6',
      //   symbol: 'rect',
      //   value: 20,
      //   symbolSize: 70
      // }, {
      //   id: "9",
      //   category: "端口号",
      //   name: '7101',
      //   symbol: 'circle',
      //   value: 20,
      //   symbolSize: 60
      // }, {
      //   id: "10",
      //   category: "端口号",
      //   name: '7101',
      //   symbol: 'circle',
      //   value: 20,
      //   symbolSize: 60
      // }, {
      //   id: "11",
      //   category: "端口号",
      //   name: '7001',
      //   symbol: 'circle',
      //   value: 20,
      //   symbolSize: 60
      // }, {
      //   id: "12",
      //   category: "端口号",
      //   name: '7100',
      //   symbol: 'circle',
      //   value: 20,
      //   symbolSize: 60
      // }, {
      //   id: "13",
      //   category: "数据库",
      //   name: '192.168.44.44',
      //   symbol: 'circle',
      //   value: 20,
      //   symbolSize: 70
      // }, {
      //   id: "14",
      //   category: "数据库",
      //   name: '192.168.33.33',
      //   symbol: 'circle',
      //   value: 20,
      //   symbolSize: 70
      // }, {
      //   id: "15",
      //   category: "数据库",
      //   name: '192.168.22.22',
      //   symbol: 'circle',
      //   value: 20,
      //   symbolSize: 70
      // }, {
      //   id: "16",
      //   category: "用户名",
      //   name: '55555555555',
      //   symbol: 'circle',
      //   value: 20,
      //   symbolSize: 70,
      //   yId: "jdbc",
      //   port: "1521",
      //   host: "192.168.11.11",
      //   username: "222222222",
      //   pwd: "11111111",
      //   instance: "orcl"
      // }
      ],
      categories: [ //symbol name：用于和 legend 对应以及格式化 tooltip 的内容。 label有效
        // {
        //   name: '负载',
        //   symbol: 'rect',
        //   label: { //标签样式
        //   }
        // }, {
        //   name: '中间件',
        //   symbol: 'rect'
        // }, {
        //   name: '端口号',
        //   symbol: 'roundRect'
        // }, {
        //   name: '数据库',
        //   symbol: 'roundRect'
        // }, {
        //   name: '用户名',
        //   symbol: 'roundRect'
        // }
        // {
        //   name: "Module"
        // },
        // {
        //   name: "Function"
        // },
        // {
        //   name: "Class"
        // },
        // {
        //   name: "Method"
        // },
        // {
        //   name: "Variable"
        // },
        // {
        //   name: "Parameter"
        // },
        // {
        //   name: "Property"
        // }
        {
          "name": "Module"
        },
        {
          "name": "Function"
        },
        {
          "name": "Class"
        },
        {
          "name": "Method"
        },
        {
          "name": "Variable"
        },
        {
          "name": "Parameter"
        },
        {
          "name": "Property"
        }
        ],
      links: [ //edges是其别名代表节点间的关系数据。
        {
          "source": "1",
          "target": "2",
          "values": {
            "Import": 1
          }
        },
        {
          "source": "1",
          "target": "3",
          "values": {
            "Import": 1
          }
        },
        {
          "source": "5",
          "target": "2",
          "values": {
            "Import": 1
          }
        },
        // {
        //   source: "1",
        //   target: "2",
        //   values: {
        //     Import: 1
        //   }
        // },
        // {
        //   source: "1",
        //   target: "3",
        //   values: {
        //     Import: 1
        //   }
        // },
        // {
        //   source: "5",
        //   target: "2",
        //   values: {
        //     Import: 1
        //   }
        // },
        // {
        //   source: "1",
        //   target: "0"
        // }, {
        //   source: "4",
        //   target: "0"
        // }, {
        //   source: "8",
        //   target: "0"
        // }, {
        //   source: "2",
        //   target: "1"
        // }, {
        //   source: "3",
        //   target: "1"
        // }, {
        //   source: "5",
        //   target: "4"
        // }, {
        //   source: "6",
        //   target: "4"
        // }, {
        //   source: "7",
        //   target: "4"
        // }, {
        //   source: "9",
        //   target:"8"
        // }, {
        //   source: "10",
        //   target: "8"
        // }, {
        //   source: "11",
        //   target: "8"
        // }, {
        //   source: "12",
        //   target: "8"
        // }, {
        //   source: "13",
        //   target: "6"
        // }, {
        //   source: "14",
        //   target:" 6"
        // }, {
        //   source: "15",
        //   target: "2"
        // }, {
        //   source: "16",
        //   target: "15"
        // }
        ]
    }
  },
  props: {
    graph_data: Object,
    show: Boolean
  },
  methods: {
    testGraph() {
      this.myChart = this.$echarts.init(document.getElementById('dep_graph'), null, {
        width: 1000,
        height: 500
      });
      this.myChart.showLoading();
      let nodes = this.nodes;
      let links = this.links;
      let categories = this.categories;
      this.myChart.hideLoading();
      // let option = {
      //   tooltip: {
      //     show: true,   //默认显示
      //     showContent: true, //是否显示提示框浮层
      //     trigger: 'item',//触发类型，默认数据项触发
      //     triggerOn: 'click',//提示触发条件，mousemove鼠标移至触发，还有click点击触发
      //     alwaysShowContent: false, //默认离开提示框区域隐藏，true为一直显示
      //     showDelay: 0,//浮层显示的延迟，单位为 ms，默认没有延迟，也不建议设置。在 triggerOn 为 'mousemove' 时有效。
      //     hideDelay: 200,//浮层隐藏的延迟，单位为 ms，在 alwaysShowContent 为 true 的时候无效。
      //     enterable: false,//鼠标是否可进入提示框浮层中，默认为false，如需详情内交互，如添加链接，按钮，可设置为 true。
      //     position: 'right',//提示框浮层的位置，默认不设置时位置会跟随鼠标的位置。只在 trigger 为'item'的时候有效。
      //     confine: false,//是否将 tooltip 框限制在图表的区域内。外层的 dom 被设置为 'overflow: hidden'，或者移动端窄屏，导致 tooltip 超出外界被截断时，此配置比较有用。
      //     transitionDuration: 0.4,//提示框浮层的移动动画过渡时间，单位是 s，设置为 0 的时候会紧跟着鼠标移动。
      //     formatter: function (params, ticket, callback) {
      //       //判断数据，提供相应的url。
      //       var path = "";
      //       var node = params.data; //当前选中节点数据
      //       var category = params.data.category;  //选中节点图例0负载 1中间件 2端口号 3数据库 4用户名
      //       if (category == 2) { //为jvm 虚拟机各类参数的路径
      //         path = "${ctx}/weblogic.do?host=" + node.host + "&port="
      //             + node.port + "&username=" + node.username
      //             + "&pwd=" + node.pwd; //准备访问路径
      //       } else if (category == 4) { //为jdbc 数据库的路径
      //         path = "${ctx}/oracle.do?host=" + node.host + "&port="
      //             + node.port + "&username=" + node.username
      //             + "&pwd=" + node.pwd + "&instance="
      //             + node.instance; //准备访问路径
      //       }
      //     }
      //   },
      //
      //   legend: { //=========圖表控件
      //     show: true,
      //     data: [{
      //       name: '负载',
      //       icon: 'rect'//'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
      //
      //     },
      //       {
      //         name: '中间件',
      //         icon: 'roundRect'
      //       }, {
      //         name: '端口号',
      //         icon: 'circle'
      //       }, {
      //         name: '数据库',
      //         icon: 'circle'
      //       }, {
      //         name: '用户名',
      //         icon: 'roundRect'
      //       }]
      //   },
      //   series: [{
      //     type: 'graph', //关系图
      //     name: "监控管理系统", //系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
      //     layout: 'force', //图的布局，类型为力导图，'circular' 采用环形布局，见示例 Les Miserables
      //     //legendHoverLink: true,//是否启用图例 hover(悬停) 时的联动高亮。
      //     //hoverAnimation: true,//是否开启鼠标悬停节点的显示动画
      //     //coordinateSystem: null,//坐标系可选
      //     // xAxisIndex: 0, //x轴坐标 有多种坐标系轴坐标选项
      //     // yAxisIndex: 0, //y轴坐标
      //     data: nodes,
      //     links: links,
      //     categories: categories,
      //     force: { //力引导图基本配置
      //       //initLayout: "circular",//力引导的初始化布局，默认使用xy轴的标点
      //       repulsion: 100,//节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
      //       gravity: 0.03,//节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
      //       edgeLength: 80,//边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
      //       layoutAnimation: true
      //       //因为力引导布局会在多次迭代后才会稳定，这个参数决定是否显示布局的迭代动画，在浏览器端节点数据较多（>100）的时候不建议关闭，布局过程会造成浏览器假死。
      //     },
      //     roam: true,//是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
      //     nodeScaleRatio: 0.6,//鼠标漫游缩放时节点的相应缩放比例，当设为0时节点不随着鼠标的缩放而缩放
      //     draggable: true,//节点是否可拖拽，只在使用力引导布局的时候有用。
      //     focusNodeAdjacency: true,//是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点。
      //     edgeSymbol: ['none', 'none'],//边两端的标记类型，可以是一个数组分别指定两端，也可以是单个统一指定。默认不显示标记，常见的可以设置为箭头，如下：edgeSymbol: ['circle', 'arrow']
      //     edgeSymbolSize: 10,//边两端的标记大小，可以是一个数组分别指定两端，也可以是单个统一指定。
      //     itemStyle: {//===============图形样式，有 normal 和 emphasis 两个状态。normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
      //       normal: { //默认样式
      //         label: {
      //           show: true
      //         },
      //         borderType: 'solid', //图形描边类型，默认为实线，支持 'solid'（实线）, 'dashed'(虚线), 'dotted'（点线）。
      //         borderColor: 'rgba(255,215,0,0.4)', //设置图形边框为淡金色,透明度为0.4
      //         borderWidth: 2, //图形的描边线宽。为 0 时无描边。
      //         opacity: 1
      //         // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。默认0.5
      //
      //       },
      //     },
      //     lineStyle: { //==========关系边的公用线条样式。
      //       normal: {
      //         color: 'rgba(255,0,255,0.4)',
      //         width: '3',
      //         type: 'dotted', //线的类型 'solid'（实线）'dashed'（虚线）'dotted'（点线）
      //         curveness: 0.3, //线条的曲线程度，从0到1
      //         opacity: 1
      //         // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。默认0.5
      //       },
      //     },
      //     label: { //=============图形上的文本标签
      //       normal: {
      //         show: true,//是否显示标签。
      //         position: 'inside',//标签的位置。['50%', '50%'] [x,y]
      //         textStyle: { //标签的字体样式
      //           color: '#cde6c7', //字体颜色
      //           fontStyle: 'normal',//文字字体的风格 'normal'标准 'italic'斜体 'oblique' 倾斜
      //           fontWeight: 'bolder',//'normal'标准'bold'粗的'bolder'更粗的'lighter'更细的或100 | 200 | 300 | 400...
      //           fontFamily: 'sans-serif', //文字的字体系列
      //           fontSize: 12, //字体大小
      //         }
      //       },
      //     },
      //   }]
      // }


      let option = {
        title: {
          text: 'Test'
        },
        tooltip: {
          show: true,   //默认显示
          showContent: true, //是否显示提示框浮层
          trigger: 'item',//触发类型，默认数据项触发
          triggerOn: 'click',//提示触发条件，mousemove鼠标移至触发，还有click点击触发
          alwaysShowContent: false, //默认离开提示框区域隐藏，true为一直显示
          showDelay: 0,//浮层显示的延迟，单位为 ms，默认没有延迟，也不建议设置。在 triggerOn 为 'mousemove' 时有效。
          hideDelay: 200,//浮层隐藏的延迟，单位为 ms，在 alwaysShowContent 为 true 的时候无效。
          enterable: false,//鼠标是否可进入提示框浮层中，默认为false，如需详情内交互，如添加链接，按钮，可设置为 true。
          position: 'right',//提示框浮层的位置，默认不设置时位置会跟随鼠标的位置。只在 trigger 为'item'的时候有效。
          confine: false,//是否将 tooltip 框限制在图表的区域内。外层的 dom 被设置为 'overflow: hidden'，或者移动端窄屏，导致 tooltip 超出外界被截断时，此配置比较有用。
          transitionDuration: 0.4,//提示框浮层的移动动画过渡时间，单位是 s，设置为 0 的时候会紧跟着鼠标移动。
        },
        //工具箱
        toolbox: {
          //显示工具箱
          show: true,
          feature: {
            mark: {
              show: true,
            },
            // 还原
            restore: {
              show: true,
              title:"Restore"
            },
            // 保存为图片
            saveAsImage: {
              show: true,
              title:"SaveAsImage"
            },
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
          type: 'graph', //关系图
          name: "Test", //系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
          layout: 'force', //图的布局，类型为力导图，'circular' 采用环形布局，见示例 Les Miserables
          data: nodes,
          links: links,
          categories: categories,
          force: { //力引导图基本配置
            repulsion: 100,//节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
            gravity: 0.03,//节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
            edgeLength: [70, 100],//边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
            layoutAnimation: true
          },
          roam: true,//是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
          nodeScaleRatio: 0.6,//鼠标漫游缩放时节点的相应缩放比例，当设为0时节点不随着鼠标的缩放而缩放
          draggable: true,//节点是否可拖拽，只在使用力引导布局的时候有用。
          focusNodeAdjacency: true,//是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点。
          edgeSymbol: ['circle', 'arrow'],//边两端的标记类型，可以是一个数组分别指定两端，也可以是单个统一指定。默认不显示标记，常见的可以设置为箭头，如下：edgeSymbol: ['circle', 'arrow']
          edgeSymbolSize: [2, 10],//边两端的标记大小，可以是一个数组分别指定两端，也可以是单个统一指定。
          symbolSize: 10,

          itemStyle: {
            //鼠标放上去有阴影效果
            emphasis: {
              scale: true,
              shadowColor: "red",
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 50
            },
          },
          lineStyle: {
            //edge格式
            color: 'rgba(255,0,255,0.4)',
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
            position: 'right',
            formatter: function (x) {
              //return x.data.name;
              //节点上显示node id
              return x.data.id;
            }
          },
          //     edgeLabel: {
          //       //edge上相关设置
          //       normal: {
          //         show: true,
          //         textStyle: {
          //           fontSize: 10
          //         },
          //         // formatter: function (x) {
          //         //   //edge上显示内容，设置为dep
          //         //   return JSON.stringify(x.data.values);
          //         // }
          //       }
          //     },
        }]
      }



        // series: [
        //   {
        //     type: 'graph',
        //     layout: 'force',
        //     data: nodes,
        //     links: links,
        //     categories: categories,
        //     focusNodeAdjacency: true, // 移到节点时显示节点以及节点的边和邻接节点
        //     edgeSymbol: ['circle', 'arrow'],
        //     edgeSymbolSize: [2, 10],
        //     roam: true,//开启鼠标缩放平移等
        //     force: {
        //       //initLayout: 'circular',
        //       repulsion: 100,//相距距离
        //       gravity:0.03,
        //       edgeLength: [150, 200],
        //       layoutAnimation: true
        //     },
        //     symbolSize: 15,  //节点大小，这里可以使用function为每个节点配置
        //     label: {
        //       show: true,
        //       position: 'right',
        //       formatter: function (x) {
        //         //return x.data.name;
        //         //节点上显示node id
        //         return x.data.id;
        //       }
        //     },
        //     edgeLabel: {
        //       //edge上相关设置
        //       normal: {
        //         show: true,
        //         textStyle: {
        //           fontSize: 10
        //         },
        //         // formatter: function (x) {
        //         //   //edge上显示内容，设置为dep
        //         //   return JSON.stringify(x.data.values);
        //         // }
        //       }
        //     },
        //     labelLayout: {
        //       hideOverlap: true,
        //       draggable: true,
        //     },
        //     lineStyle: {
        //       //edge格式
        //       color: 'rgba(255,0,255,0.4)',
        //       curveness: 0.3,
        //       shadowBlur: 0.7,
        //       width: 1.5,
        //     },
        //     emphasis: {
        //       lineStyle: {
        //         width: 3
        //       }
        //     },
        //     itemStyle: {
        //       //鼠标放上去有阴影效果
        //       emphasis: {
        //         scale: true,
        //         shadowColor: "red",
        //         shadowOffsetX: 0,
        //         shadowOffsetY: 0,
        //         shadowBlur: 50
        //       },
        //     }
        //   }
        // ]
     // };


      this.myChart.clear();
      this.myChart.setOption(option);
      this.myChart.on('mouseover', this.showPath);
      this.myChart.on('mouseup', this.nodeFixed);
      // this.myChart.on("click", (params) => {
      //   if (params.componentType === "series") {
      //     if (params.seriesType === "graph") {
      //       if (params.dataType === "node") {
      //         this.openOrFold(params);
      //       }
      //     }
      //   }
      // })
    },

    showPath(params) {    //拼接节点关系并显示在左下角，
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
            console.log(item.category)
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

    nodeFixed(params) {
      let option = this.myChart.getOption();
      option.series[0].data[params.dataIndex].fixed=true;
      this.myChart.setOption(option);
    },
  }
}
</script>

<style scoped>

</style>