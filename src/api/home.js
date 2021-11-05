import {request} from "@/network/request";

export default {
  uploadFile(formData){
    //request : 封装好的axios 对象
    return new request({
      url: `/upload`,
      data:formData,
      method:'post',
      headers: {'Content-Type': "multipart/form-data"}
    })
  }
}