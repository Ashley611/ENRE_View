<template>
  <div id="container">
    <el-container>
      <!--header栏-->
      <el-header style="font-size: 12px; margin-left: 120px">
        <el-form :inline="true"  class="demo-form-inline">
          <el-form-item label="Category" style="margin-left: -300px;font-weight: bolder;">
            <el-select
                v-model="value"
                placeholder="Entity"
                size="medium"
                @change="showEn"
            >
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  @click.native="isShow">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Search" style="margin-left: 20px;font-weight: bolder;">
              <el-input
                  v-model="search"
                  size="medium"
                  placeholder="搜索实体"
                  suffix-icon="el-icon-search"
              />
          </el-form-item>
<!--          <el-form-item label="TreeMap" style="font-size: 20px; margin-left: 30px; font-weight: bolder">-->
<!--            <el-switch-->
<!--                v-model="value1"-->
<!--                active-text=""-->
<!--                active-color="#13ce66"-->
<!--                @change="treeMapOn"-->
<!--                >-->
<!--            </el-switch>-->
<!--          </el-form-item>-->
        </el-form>
      </el-header>
      <!-- main区域是画布区域，这里展示数据-->
      <el-main>
<!--        <div id="entity_graph" style="width: 100%; height: 200px;"></div>-->
        <!--根据不同的选择展示不同实体(table) 默认不显示table,点击选择框后进行显示-->
        <en-table :en_data="this.en_data" :str="this.search" :visible="this.show" style="height: 500px"></en-table>
      </el-main>
      </el-container>
  </div>
</template>

<script>
import entity from "@/api/entity";
import EnTable from "@/views/entity/childcomp/EnTable";

export default {
  name: "Entity",
  data() {
      return {
        value1:false,
        options: [{
          value: 'pkg',
          label: 'Package'
        }, {
          value: 'mod',
          label: 'Module'
        }, {
          value: 'func',
          label: 'Function'
        }, {
          value: 'cls',
          label: 'Class'
        }, {
          value: 'method',
          label: 'Method'
        },{
          value: 'var',
          label: 'Variable'
        },{
          value: 'para',
          label: 'Parameter'
        },{
          value: 'prop',
          label: 'Property'
        }],
        value: '',
        search: '',
        en_data:[],
        show:false
      }
  },
  components: {
    EnTable
  },
  methods: {
      isShow(event) {
        //控制表格的显示与否
        if(event){
          this.show = true;
        } else {
          this.show = false;
        }
      },

      showEn(val) {
        let pkg_data = [];
        let mod_data = [];
        let func_data = [];
        let cls_data = [];
        let method_data = [];
        let var_data = [];
        let para_data = [];
        let prop_data = [];
        let nodeArr = this.$store.state.file.variables;
        nodeArr.forEach(item => {
          if(item.category == "Package"){
            pkg_data.push(item);
          } else if(item.category == "Module"){
            mod_data.push(item);
          } else if(item.category == "Function"){
            func_data.push(item);
          } else if(item.category == "Class"){
            cls_data.push(item);
          } else if(item.category == "Method"){
            method_data.push(item);
          } else if(item.category == "Variable"){
            var_data.push(item);
          } else if(item.category == "Parameter"){
            para_data.push(item);
          } else if(item.category == "Property"){
            prop_data.push(item);
          }
        })
        //1.在project-info中读取的文件内容保存到公共状态中，在这里直接读取展示
        if(val == 'pkg') {
          this.en_data = pkg_data;
          //this.en_data = this.$store.state.file.entity.Package;
        } else if(val == 'mod') {
          this.en_data = mod_data;
          //this.en_data = this.$store.state.file.entity.Module;
        } else if(val == 'func') {
          this.en_data = func_data;
        } else if(val == 'cls') {
          this.en_data = cls_data;
        } else if(val == 'method') {
          this.en_data = method_data;
        } else if(val == 'var') {
          this.en_data = var_data;
        } else if(val == 'para') {
          this.en_data = para_data;
        } else if(val == 'prop') {
          this.en_data = prop_data;
        }
        //2.向后台请求不同选择所需的数据（传入当前选择,应该把文件再传进去？）
        // entity.findEntity(val).then(r => {
        //   console.log(r)
        // }).catch(e => {
        //   console.log(e)
        // })
      },
      treeMapOn(e) {
         if(e){
           //打开树图按钮,使表格不可见
           this.show=false
           let myChart = this.$echarts.init(document.getElementById('entity_graph'));
           myChart.clear();
           myChart.showLoading();
           let data = this.$store.state.file.treeMapData;
           // 获取数据（1.请求后端 2.访问store数据）
           myChart.hideLoading();
           data.children.forEach(function (datum, index) {
             index % 2 === 0 && (datum.collapsed = true);
           });
           let option = {
                 tooltip: {
                   trigger: 'item',
                   triggerOn: 'mousemove'
                 },
                 series: [
                   {
                     type: 'tree',
                     data: [data],
                     top: '1%',
                     left: '7%',
                     bottom: '1%',
                     right: '20%',
                     symbolSize: 7,
                     label: {
                       position: 'left',
                       verticalAlign: 'middle',
                       align: 'right',
                       fontSize: 9
                     },
                     leaves: {
                       label: {
                         position: 'right',
                         verticalAlign: 'middle',
                         align: 'left'
                       }
                     },
                     emphasis: {
                       focus: 'descendant'
                     },
                     expandAndCollapse: true,
                     animationDuration: 550,
                     animationDurationUpdate: 750
                   }
                 ]
               }
           myChart.setOption(option);
         }else{
           //关闭树图按钮，希望这里显示实体table,设置table的visible
           this.show=false
           let myChart = this.$echarts.init(document.getElementById('entity_graph'));
           myChart.clear();
         }
      }
  },
  created() {

  }
}
</script>

<style scoped>
.el-header {
  background-color: white;
  color: #333;
  line-height: 40px;
}

.el-select{
  margin-left: 3px;
}

</style>