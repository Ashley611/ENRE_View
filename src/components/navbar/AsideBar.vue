<template id="asidebar">
  <div>
    <el-menu
        :default-active="$route.path"
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router>
      <el-menu-item index="home">
        <i class="el-icon-s-home"></i>
        <span slot="title">Home</span>
      </el-menu-item>
      <el-menu-item index="project-info">
        <i class="el-icon-info"></i>
        <span slot="title">ProjectInfo</span>
      </el-menu-item>
      <el-menu-item index="entity">
        <i class="el-icon-document"></i>
        <span slot="title">Entity</span>
      </el-menu-item>
      <el-menu-item index="dep">
        <i class="el-icon-s-data"></i>
        <span slot="title">Dep</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: true
    };
  },
  methods: {
    // goTo(path) {
    //   if (this.$route.path !== path) {
    //     this.$router.replace(path);
    //   }
    // },
  }
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 149px;
  height: auto;
}

</style>