<template>
  <div>
    <div class="title">
      Welcome to Dependency-Analyze Tool
      <el-tooltip :content=content  placement="bottom" effect="light">
        <i class="el-icon-s-opportunity"></i>
      </el-tooltip>
    </div>

    <div>
      <el-form ref="form" label-width="80px">

        <el-form-item label="EntityDep" style="margin-left: 320px;font-weight: bolder; margin-right: 400px;margin-top: 20px">
          <div class="input_control" style="margin-top: -20px;">
            <input type="file" id="upload_project1" accept=".json" name="file" style="margin-left: 5px;margin-top: 20px" @change="select_en_dep_file"></input>
          </div>
        </el-form-item>

        <el-form-item label="HistoryDep" style="margin-left: 320px;font-weight: bolder; margin-right: 400px;margin-top: 20px">
          <div class="input_control" style="margin-top: -20px;">
            <input type="file" id="upload_project2" accept=".json" name="file" style="margin-left: 5px;margin-top: 20px" @change="select_his_dep_file"></input>
          </div>
        </el-form-item>

        <el-form-item label="ContextDep" style="margin-left: 320px;font-weight: bolder; margin-right: 400px;margin-top: 20px">
          <div class="input_control" style="margin-top: -20px;">
            <input type="file" id="upload_project3" accept=".json" name="file" style="margin-left: 5px;margin-top: 20px;" @change="select_con_dep_file"></input>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" style="margin-left: -160px;margin-top: 20px" @click="uploadFile">上传文件</el-button>
          <el-button>取消上传</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
import home from "@/api/home";
import home1 from "@/api/home1";

export default {
  name: "Home1",
  data() {
    return {
      limitNum: 1,
      fileList: [],
      fileArr:[],
      fileSet:new Set(),
      fileData:'',
      search:"",
      content:"The tool for you to understand different kind of dependency of your project"
    }
  },
  methods: {
    select_en_dep_file() {
      let entity_file = document.getElementById("upload_project1").files[0];
      if(entity_file !== undefined) {
        let entity_file1 = new File([entity_file], entity_file.name.split(".")[0] + "_endep_111.json",{type:"file"})
        this.fileSet.add(entity_file1)
      }
    },

    select_his_dep_file() {
      let history_file = document.getElementById("upload_project2").files[0];
      if(history_file !== undefined) {
        let entity_file2 = new File([history_file], history_file.name.split(".")[0] + "_hisdep_222.json",{type:"file"})
        this.fileSet.add(entity_file2)
      }
    },

    select_con_dep_file() {
      let context_file = document.getElementById("upload_project3").files[0];
      if(context_file !== undefined) {
        let entity_file3 = new File([context_file], context_file.name.split(".")[0] + "_condep_333.json",{type:"file"})
        this.fileSet.add(entity_file3)
      }
    },


    uploadFile() {
      //最终的上传文件数组
      this.fileList = Array.from(this.fileSet)
      let formData = new FormData();
      this.fileList.forEach(file=> {
        formData.append('file', file);
      })

      home1.uploadFile1(formData)
          .then(r => {
            console.log(r.data)
            this.$message.success(`文件上传成功`);
            //文件上传成功后跳转到project-info页面
            this.$router.replace({
              path:'/project-info',
              query:{
                //object: r.data[0].path
                object: r.data
              }
            })
          }).catch(e => {
        // console.log(e)
        this.$message.error(`文件上传失败`)
      })
    }
  }
}
</script>

<style scoped>
.title {
  color: black;
  font-weight: bolder;
  font-size: 35px;
  margin-top: 40px;
  line-height:1.7;
  font-family: "Times New Roman";
}
.el-icon-s-opportunity{
  color: darkseagreen;
}

.input_control{
  width:380px;
  margin:10px auto;
}

input[type="file"]{
  /* 清除原有input样式 */
  -web-kit-appearance:none;
  -moz-appearance: none;
  outline:0;
  /* 设置我们要的样式 */
  box-sizing: border-box;
  text-align:center;
  font-size:1.1em;
  height:2.7em;
  border-radius:6px;
  border:1px solid #c8cccf;
  color:#6a6f77;
  display:block;
  padding:0 0.6em;
  text-decoration:none;
  width:100%;
  line-height: 40px;
}




.el-upload__tip{
  font-size: 12px;
  font-weight: bold;
}

.btn{
  margin-left: -40px;
  margin-top: 40px;
}

.el-upload__tip{
  margin-left: -40px;
}

.btn1 {
  margin-top: 10px;
  margin-left: -30px;
}

.btn2 {
  margin-left: 30px;
}
</style>