import Vue from 'vue'
import Router from 'vue-router'
import EntityDep from "@/views/dependency/childcomp/EntityDep";
import HistoryDep from "@/views/dependency/childcomp/HistoryDep";
import ContextDep from "@/views/dependency/childcomp/ContextDep";

//懒加载
const Home = () => import('@/views/home/Home');
const ProjectInfo = () => import('@/views/pro_info/ProjectInfo')
const Entity = () => import('@/views/entity/Entity')
const Home1 = () => import("@/views/Home1")



Vue.use(Router)
//解决编程式路由往同一地址跳转时会报错的情况
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// const originalPush = Router.prototype.push;
// const originalReplace = Router.prototype.replace;
// //push
// Router.prototype.push = function push(location, onResolve, onReject) {
//   if (onResolve || onReject)
//     return originalPush.call(this, location, onResolve, onReject);
//   return originalPush.call(this, location).catch(err => err);
// };
// //replace
// Router.prototype.replace = function push(location, onResolve, onReject) {
//   if (onResolve || onReject)
//     return originalReplace.call(this, location, onResolve, onReject);
//   return originalReplace.call(this, location).catch(err => err);
// };


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    //  把home暂时注释掉了，这里先把路径改为home1
    {
      path: '',
      redirect: '/home1'
    },
    {
      path: '/home1',
      component: Home1
    },
    {
      path: '/project-info',
      component: ProjectInfo,
      meta:{
        title:'ProjectInfo',
        keepAlive:true
      }
    },
    {
      path: '/entity',
      name: 'entity',
      component: Entity,
      meta:{
        title:'Entity',
        keepAlive:true
      }
    },
    {
      path: '/dep/entity',
      name: 'dep_entity',
      component: EntityDep,
      meta:{
        title:'EntityDep',
        keepAlive:true
      }
    },
    {
      path: '/dep/history',
      name: 'dep_history',
      component: HistoryDep,
      meta:{
        title:'HistoryDep',
        keepAlive:true
      }
    },
    {
      path: '/dep/context',
      name: 'dep_context',
      component: ContextDep,
      meta:{
        title:'ContextDep',
        keepAlive:true
      }
    }
  ]
})
