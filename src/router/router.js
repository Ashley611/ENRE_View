import Vue from 'vue'
import Router from 'vue-router'
import EntityDep from "@/views/dependency/childcomp/EntityDep";

//懒加载
const Home = () => import('@/views/home/Home');
const ProjectInfo = () => import('@/views/pro_info/ProjectInfo')
const Entity = () => import('@/views/entity/Entity')


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
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
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
    // {
    //   path: '/dep',
    //   name: 'dependency',
    //   component: Dep,
    //   meta:{
    //     title:'Dependency',
    //     keepAlive:true
    //   },
    // },
    {
      path: '/dep/entity',
      name: 'dep_entity',
      component: EntityDep,
      meta:{
        title:'EntityDep',
        keepAlive:true
      }
    },
    // {
    //   path: '/function',
    //   name: 'function',
    //   component: Function,
    //   meta:{
    //     title:'Function',
    //     keepAlive:true
    //   }
    // },
    // {
    //   path: '/class',
    //   name: 'class',
    //   component: Class,
    //   meta:{
    //     title:'Class',
    //     keepAlive:true
    //   }
    // },
    // {
    //   path: '/method',
    //   name: 'method',
    //   component: Method,
    //   meta:{
    //     title:'Method',
    //     keepAlive:true
    //   }
    // },
  ]
})
