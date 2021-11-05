<template>
  <div class="table">
    <el-table
        :data="en_data.filter(data => !this.str || data.simpleName.toLowerCase().includes(this.str.toLowerCase()))"
        height="430"
        v-show="this.visible"
        border
        style="width: 1000px;">
      <el-table-column
          fixed
          prop="id"
          label="id"
          width="70px"
          align="center">
      </el-table-column>
      <el-table-column
          prop="simpleName"
          label="simpleName"
          width="350px"
          align="center">
      </el-table-column>
      <el-table-column
          prop="qualifiedName"
          label="qualifiedName"
          width="400px"
          align="center">
      </el-table-column>
      <el-table-column
          prop="parentId"
          label="parentId"
          width="90px"
          align="center">
      </el-table-column>
      <el-table-column
          prop="category"
          label="category"
          width="89px"
          align="center">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "EnTable",
  props:{
    en_data: Array,
    str: String,
    visible:Boolean
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>

</style>