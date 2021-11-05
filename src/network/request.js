//可能会创建多个服务器多个实例，不使用default
import axios from 'axios'
export function request(config) {
  //创建axios实例
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:3000',
    timeout: 10000
  })
  //axios的拦截器
  //请求拦截
  // instance.interceptors.request.use(config => {
  //   // 1.config的信息不符合服务器的要求时
  //   //2.每次发送网络请求时，希望在界面中显示一个请求的图标
  //   //3.某些网络请求（比如登录(token)），必须携带一些特殊的信息
  //   //...
  //   return config
  // },err => {
  // });
  //
  // //响应拦截
  // instance.interceptors.response.use(res => {
  //   return res.data;
  // },err => {
  //
  // })

  //发送真正的网络请求
  return instance(config)
}