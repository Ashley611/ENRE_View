import {request} from "@/network/request";

export default {
  findEntity(value) {
    return new request({
      url: `/entity`,
      params: {value},
      method:'get',
      'Content-Type':'text/plain'
    })
  }
}