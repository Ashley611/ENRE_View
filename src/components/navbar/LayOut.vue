<template id="layout">
  <div>
    <el-container>
        <el-header>
          <NavBar></NavBar>
        </el-header>
        <div class="aside">
          <el-aside>
            <AsideBar />
          </el-aside>
        </div>

      <div class="main">
        <el-main>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </div>
    </el-container>
  </div>

</template>

<script>
import AsideBar from './AsideBar';
import NavBar from "@/components/navbar/NavBar";

export default {
  components: { AsideBar,NavBar},
  data() {
    return {

    }
  }
};
</script>

<style scoped>
.el-header {
  background-color: rgb(84, 92, 100);
  text-align: left;
  line-height: 60px;
}

.el-container {
  height: 100%;
}
/*.el-aside {*/
/*  height: 100%;*/
/*  overflow-x: hidden;*/
/*  !*overflow-y: scroll;*!*/
/*  display: block;*/
/*  position: absolute;*/
/*  left: 0;*/
/*  top:60px;*/
/*  bottom: 0;*/
/*  background-color: rgb(84, 92, 100);*/
/*}*/

.aside {
  width: 149px;
  height: 100%;
  position: absolute;
  left: 0;
  top:60px;
  bottom: 0;
  background-color: rgb(84, 92, 100);
  overflow: hidden;
}

.main {
  background-color: white;
  margin-left: 149px;
  margin-top: 0px;
  margin-right: 30px;
  text-align: center;
}
</style>