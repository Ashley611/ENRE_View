<template>
  <div>
    <el-col :span="16">
      <el-row :gutter="20" class="mgb20">
        <el-col :span="8">
          <el-card shadow="hover" :body-style="{ padding: '5px' }"
                   style="margin-left: 170px;margin-right: -200px;margin-top: 25px">
            <div class="grid-content grid-con-1">
              <div class="grid-cont-right">
                <div class="grid-num"><slot name="mod"></slot></div>
                <div class="title">Module</div>
              </div>
            </div>
          </el-card>
        </el-col>

        <el-col :span="8">
          <el-card shadow="hover" :body-style="{ padding: '5px' }"
                   style="margin-left: 200px;margin-right: -250px;margin-top: 25px" >
            <div class="grid-content grid-con-2">
              <div class="grid-cont-right">
                <div class="grid-num"><slot name="func"></slot></div>
                <div class="title">Function</div>
              </div>
            </div>
          </el-card>
        </el-col>

        <el-col :span="8">
          <el-card shadow="hover" :body-style="{ padding: '5px' }"
                   style="margin-left: 250px;margin-right: -300px;margin-top: 25px">
            <div class="grid-content grid-con-3">
              <div class="grid-cont-right">
                <div class="grid-num"><slot name="cls"></slot></div>
                <div class="title">Class</div>
              </div>
            </div>
          </el-card>
        </el-col>

      </el-row>
    </el-col>
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

.title{
  font-size: 16px;
  font-weight: bolder;
}
.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-1 .grid-num {
  color: lightblue;
}

.grid-con-2 .grid-num {
  color: #c2e7b0;
}

.grid-con-3 .grid-num {
  color: #f0c78a;
}
</style>