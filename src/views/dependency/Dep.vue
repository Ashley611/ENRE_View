<template>
  <el-container>
    <el-header style="text-align: center; font-size: 12px; background-color: gainsboro">
      <el-form :inline="true"  class="demo-form-inline">

        <el-form-item label="依赖图" style="margin-left:-750px;font-weight: bolder;">
<!--          <i class="el-icon-share"></i>-->
          <el-select v-model="value" placeholder="level" size="mini" @change="showLevel">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-header>

    <el-main>
      <module v-if="this.mod_show" :show="this.mod_show"  :graph_data="this.graph_data"></module>
      <function v-else-if="this.func_show" :show="this.func_show" :graph_data="this.graph_data"></function>
      <class v-else-if="this.cls_show" :show="this.cls_show" :graph_data="this.graph_data"></class>
      <method v-else-if="this.method_show" :show="this.method_show" :graph_data="this.graph_data"></method>
      <test v-else :show="this.test_show" :graph_data="this.graph_data"></test>
    </el-main>
  </el-container>

</template>

<script>
import Function from "@/views/dependency/childcomp/Function";
import Module from "@/views/dependency/childcomp/Module";
import Class from "@/views/dependency/childcomp/Class";
import Method from "@/views/dependency/childcomp/Method";
import Test from "@/views/dependency/childcomp/Test";

export default {
  name: "Dep",
  data() {
    return {
      myChart:{},
      graph_data:{},
      func_show: false,
      mod_show: false,
      cls_show: false,
      method_show: false,
      test_show: false,
      options: [{
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
      },
        {
          value: 'test',
          label: 'Test'
        }],
      value: '',
      }
  },
  components: {
    Function,Module,Class,Method,Test
  },
  methods: {
    showLevel(val) {
      if (val == "mod") {
        this.graph_data = this.$store.state.file;
        this.mod_show = true;
        this.func_show = false;
        this.cls_show = false;
        this.method_show = false;
        this.test_show = false;
      } else if (val == "func") {
        this.graph_data = this.$store.state.file;
        this.func_show = true;
        this.mod_show = false;
        this.cls_show = false;
        this.method_show = false;
        this.test_show = false;
      } else if (val == "cls") {
        this.graph_data = this.$store.state.file;
        this.cls_show = true;
        this.mod_show = false;
        this.func_show = false;
        this.method_show = false;
        this.test_show = false;
      } else if (val == "method") {
        this.graph_data = this.$store.state.file;
        this.method_show = true;
        this.mod_show = false;
        this.func_show = false;
        this.cls_show = false;
        this.test_show = false;
      } else if (val == "test") {
        this.graph_data = this.$store.state.file;
        this.test_show = true;
        this.method_show = false;
        this.mod_show = false;
        this.func_show = false;
        this.cls_show = false;
      }
    }
  }
}
</script>

<style scoped>

.el-header{
  margin-top: -10px;
}

.el-select{
  margin-left: 3px;
}

/*.el-icon-share {*/
/*  margin-top: 20px;*/
/*  margin-left: -1000px;*/
/*}*/
</style>