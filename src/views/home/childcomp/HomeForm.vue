<template>
  <div>
    <div class="title">
      Welcome to Entity-Dependency Tool
      <el-tooltip :content=content  placement="bottom" effect="light">
        <i class="el-icon-s-opportunity"></i>
      </el-tooltip>
    </div>
    <el-form :model="form">
      <el-form-item>
        <el-upload
            ref="uploadJson"
            action="#"
            :limit=limitNum
            :auto-upload="false"
            accept=".json"
            :before-upload="beforeUploadFile"
            :before-remove="beforeRemove"
            :on-change="fileChange"
            :on-exceed="exceedFile"
            :file-list="fileList">
          <el-button class="btn" size="large" plain>选择文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传json文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button class="btn1" size="medium" type="success" plain @click="uploadFile">确定上传</el-button>
        <el-button class="btn2" size="medium" type="danger" plain @click="cancelUpload">取消上传</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import home from "@/api/home";

export default {
  name: "HomeForm",
  data() {
    return {
      labelPosition: 'right',
      limitNum: 1,
      // formLabelWidth: '400px',
      formLabelWidth: '80px',
      form: {
        file: ''
      },
      fileList: [],
      content:"The tool for you to understand the entity and dependency of your project"
    }
  },
  methods: {
    // 文件超出个数限制时的钩子
    exceedFile(files, fileList) {
      this.$message.warning( `只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length + fileList.length} 个`)
    },

    // 文件状态改变时的钩子
    fileChange(file, fileList) {
      this.fileList.push(file.raw)
    },

    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUploadFile(file) {
      let extension = file.name.substring(file.name.lastIndexOf('.')+1)
      let size = file.size / 1024 / 1024
      if(extension !== 'json') {
        this.$message.warning(`只能上传json文件`)
      }
    },

    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },

    uploadFile() {
      let formData = new FormData();
      this.fileList.forEach(file=> {
        formData.append('file', file);
      })
      if(this.fileList.length == 0){
        this.$message.warning("请选择文件后上传");
        return;
      }

      home.uploadFile(formData)
          .then(r => {
            //console.log(r.data)
            this.$message.success(`文件上传成功`);
            //文件上传成功后跳转到project-info页面
            this.$router.replace({
              path:'/project-info',
              query:{
                object: r.data.path
              }
            })
          }).catch(e => {
            // console.log(e)
            this.$message.error(`文件上传失败`)
      })
    },

    cancelUpload(file) {
      if(this.fileList.length == 0){
        this.$message.warning("没有文件可以移除");
      } else {
        this.fileList.splice(this.fileList.indexOf(file),1);
        this.$message.success("移除成功");
      }
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