import {request} from "@/network/request";

export default {
  findFile(path) {
    return new request({
      url: `/project-info`,
      params: {path},
      method:'get',
      'Content-Type':'text/plain'
    })
  }
}