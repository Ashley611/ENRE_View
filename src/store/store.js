import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
      file:{}
  },
  mutations: {
    //方法
    //从其他地方拿到这个文件，赋值到公共属性file中
    storeFile(state,file) {
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