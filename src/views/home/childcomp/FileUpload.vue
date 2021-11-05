<template>
  <div id="upload">
    <el-form :model="form">
      <el-upload
          class="upload-demo"
          drag
          action="#"
          accept="json"
          multiple
          :file-list="fileList"
          show-file-list
          :limit=limit
          :on-change="onChange"
          :on-exceed="handleExceed"
          :on-remove="onRemove"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或<em>点击上传</em>
          <div>上传json文件</div>
        </div>
      </el-upload>

      <el-button class="btn1" type="success" round @click="uploadSuccess">确定上传</el-button>
      <el-button class="btn2" type="danger" round @click="cancelUpload">取消上传</el-button>

    </el-form>

  </div>
</template>

<script>
// import api from "@/api";

export default {
  name: "FileUpload",
  data() {
    return {
      //文件列表
      fileList: [],
      newFileList: [],
      limit:1,
      form: {
        file: ''
      },
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  },
  methods: {
    onChange(file,fileList){
      this.newFileList.push({name: file.name})
      // this.fileList.push({name: file.name});
    },
    onRemove(file, fileList) {
      //this.fileList.splice(this.fileList.indexOf(file.raw),1);
      this.newFileList.splice(this.fileList.indexOf(file.raw),1)
    },
    handleExceed(files, fileList) {
      this.$notify.warning({
        title: 'Warning',
        message: `只能选择 ${this.limit} 个文件，当前共选择了 ${files.length + fileList.length} 个`
      });
    },
    uploadSuccess(file) {
      let formData = new FormData();
      // 向 formData 对象中添加文件
      this.newFileList.forEach(file=> {
        formData.append('file', file);
      })
      // this.fileList.forEach(file=> {
      //   formData.append('file', file);
      // })
      // console.log(formData.get('file'))
      //这是可以请求到数据的
      // request({
      //   url: '/entity',
      // }).then(res => {
      //   console.log(res.data)
      // }).catch(err => {
      //   console.log(err)
      // })
      //这里请求后端，把file数据传进去
      api.uploadFile(formData)
          .then(r => {
            console.log(r)
          }).catch(e => {
        console.log(e)
      })
      // if(file.length == 0){
      //   this.$message.warning("未选择文件，请上传文件")
      // }
      // if(!(file[0].name.endsWith('.json'))) {
      //   this.$message.warning(`不能分析此类文件`);
      // }
      // else {
      //   //获取到上传的文件，发送到后台进行管理
      //   if(file.length == 1){
      //     this.$message.success("上传成功");
      //   } else if(file.length > this.limit){
      //     this.$message.warning("只能上传一个文件")
      //   }
      //
      // }
    },
    cancelUpload(file) {
      //这里请求后端
      // if(file.length == 0){
      //   this.$message.warning("没有文件可以移除")
      // } else {
      //   file.splice(file.indexOf(file),1)
      //   this.$message.success("移除成功")
      // }
    }
  }
}
</script>

<style scoped>
#upload {
  margin-bottom: 10px;
}
.upload-demo {
  background-color: white;
  margin-left: 149px;
  margin-top: 60px;
  margin-right: 30px;
  text-align: center;
}

.btn1 {
  margin-top: 30px;
  margin-right: 20px;
  margin-left: 120px;
}

.btn2 {
  margin-left: 40px;
}
</style>