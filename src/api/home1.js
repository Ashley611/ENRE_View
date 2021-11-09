import {request} from "@/network/request";

export default {
  uploadFile1(formData){
    //request : 封装好的axios 对象
    return new request({
      url: `/upload1`,
      data:formData,
      method:'post',
      headers: {'Content-Type': "multipart/form-data"}
    })
  }
}