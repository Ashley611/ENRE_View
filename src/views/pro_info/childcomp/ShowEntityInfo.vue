<template>
  <div>
    <el-row :gutter="20">
      <el-tag type="info" class="tag" hit color="gainsboro">
        Module
        <slot name="mod"></slot>
      </el-tag>
      <el-tag type="info" class="tag" hit color="gainsboro">
        Function
        <slot name="func"></slot>
      </el-tag>
      <el-tag type="info" class="tag"hit color="gainsboro">
        Class
        <slot name="cls"></slot>
      </el-tag>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "ShowEntity"
}
</script>

<style scoped>
.tag{
  border-radius: 4px;
  height: 70px;
  width: 335px;
  text-align: center;
  margin-top: -10px;
  margin-left: 6px;
  color: black;
  font-size: 18px;
}
</style>