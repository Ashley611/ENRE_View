const express = require("express");
const app = express();
const fs = require("fs"); // 文件系统，引入json数据 ;
const cors = require("cors");//解决跨域问题
const bodyParser = require('body-parser');
const path = require('path')
const multer=require("multer");
const url = require('url');

app.use(cors({
  origin: ['http://localhost:8080'], //本地的默认地址和端口，vue启动的项目就是在这里，这样保证了等会我们在浏览器能访问服务器的数据（user.json）
  methods: ["GET", "POST"],
  alloweHeaders: ["Content-Type", "Authorization"]
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

//上传文件
app.post("/upload", uploadFile, function(req,res) {
  //req.body是经过uploadFile中间件进行处理后的,包含了表单中所有的提交内容
  console.log(req.body)
  res.send(req.body);
})


var upload = multer({dest:"upload_file/"});
app.post("/upload1", upload.array('file',3),function(req,res) {
  //req.body是经过uploadFile中间件进行处理后的,包含了表单中所有的提交内容
  for (let i = 0; i <req.files.length; i++) {
    let newName = req.files[i].path + path.parse(req.files[i].originalname).ext;
    fs.renameSync(req.files[i].path, newName);
  }
  res.send(req.files);
})


//自定义中间件
function uploadFile(req,res,next){
  //dest 值为文件存储的路径;single方法,表示上传单个文件,参数为表单数据对应的key
  let upload = multer({dest:"upload_file/"}).single("file");
  //let upload = multer({dest:"upload_file/"}).array("file",4);
  upload(req,res,(err)=>{
    //文件内容挂载到req.file上
    if(err){
      res.send("err:"+err);
    }else{
      //将文件信息赋值到req.body中
      // req.body.file=req.file.filename;
      let oldName = req.file.path;
      let newName = req.file.path + path.parse(req.file.originalname).ext;
      fs.renameSync(oldName, newName);
      req.body=req.file;
      next();
    }
  })
}

//获取project-info
app.get("/project-info", function (req, res) {
  let obj = url.parse(req.url, true);
  //获取到文件名
  if(obj.query.path){
   //把字符串转化为对象，获取文件
    let newObj = eval("("+obj.query.path+")");
    //console.log(obj.query.path.path)
    // let file = obj.query.path.split('\\')[1] + '.json';
    let file = newObj.filename + '.json';
    // console.log(file)
    //对文件进行读取
    fs.readFile(__dirname + "\\" + 'upload_file'+ '\\' + file, "utf-8", function (err, data) { // __dirname是文件夹的名，我们用fs读取json
      res.send(data)
    })
  }
});

//获取历史依赖文件
app.get("/dep/history", function (req, res) {
  let obj = url.parse(req.url, true);
  //获取到文件名
  if(obj.query.path){
    //把字符串转化为对象，获取文件
    let newObj = eval("("+obj.query.path+")");
    // let file = obj.query.path.split('\\')[1] + '.json';
    let file = newObj.filename + '.json';
    //对文件进行读取
    fs.readFile(__dirname + "\\" + 'upload_file'+ '\\' + file, "utf-8", function (err, data) { // __dirname是文件夹的名，我们用fs读取json
      res.send(data)
    })
  }
});

//获取实体依赖文件
app.get("/dep/entity", function (req, res) {
  let obj = url.parse(req.url, true);
  //获取到文件名
  if(obj.query.path){
    //把字符串转化为对象，获取文件
    let newObj = eval("("+obj.query.path+")");
    // let file = obj.query.path.split('\\')[1] + '.json';
    let file = newObj.filename + '.json';
    //对文件进行读取
    fs.readFile(__dirname + "\\" + 'upload_file'+ '\\' + file, "utf-8", function (err, data) { // __dirname是文件夹的名，我们用fs读取json
      res.send(data)
    })
  }
});

//获取语义依赖文件
app.get("/dep/context", function (req, res) {
  let obj = url.parse(req.url, true);
  //获取到文件名
  if(obj.query.path){
    //把字符串转化为对象，获取文件
    let newObj = eval("("+obj.query.path+")");
    // let file = obj.query.path.split('\\')[1] + '.json';
    let file = newObj.filename + '.json';
    //对文件进行读取
    fs.readFile(__dirname + "\\" + 'upload_file'+ '\\' + file, "utf-8", function (err, data) { // __dirname是文件夹的名，我们用fs读取json
      res.send(data)
    })
  }
});


const server = app.listen(3000, function () { // 设置服务端端口为3000,即：http://127.0.0.1:3000
  console.log("应用实例，访问地址为 http://127.0.0.1:3000")
})
