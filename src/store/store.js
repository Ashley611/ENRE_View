import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
      file:{},
      file_list:[],
      entity_dep_file:{},
      his_dep_file:{},
      con_dep_file:{}
  },
  mutations: {
    //方法
    storeFileList(state,file_list) {
      file_list.forEach(item => {
        if(item.originalname.endsWith("_endep_111.json")) {
          state.entity_dep_file = item;
        }
        if(item.originalname.endsWith("_hisdep_222.json")) {
          state.his_dep_file = item;
        }
        if(item.originalname.endsWith("_condep_333.json")) {
          state.con_dep_file = item;
        }
      })
    },
    //从其他地方拿到这个文件，赋值到公共属性file中
    storeEnDepFile(state,file) {
      //在这里对文件修改，添加必要属性
      //对variable添加draggable,ignore,flag,itemStyle
      // file = this.commit("getNewFile",file);
      // console.log(file)
      let itemMap = new Map();
      itemMap.set("opacity",0.8);
      itemMap.set("shadowColor","white");
      itemMap.set("shadowBlur",0);
      itemMap.set("borderColor","white");
      //map转换为json
      let obj1= Object.create(null);
      itemMap.forEach(function (value, key, map){
        obj1[key] = value;
      })
      for(let cell of file.variables) {
        cell.itemStyle = obj1;
        //cell.draggable = true;
        cell.ignore = true;
        cell.flag = true;
      }

      //给cells写入lineStyle
      let obj = new Map();
      obj.set("opacity",0.8);
      obj.set("width",1.5)

      let obj2= Object.create(null);
      obj.forEach(function (value, key, map){
        obj2[key] = value;
      })
      for(let cell of file.cells) {
        cell.lineStyle = obj2
      }
      file = JSON.parse(JSON.stringify(file))
      //重新保存修改后的文件
      state.file = file;
    }
  },
  actions: {

  }
})
export default store