import {request} from "@/network/request";

export default {
  find_en_dep_file(path) {
    return new request({
      url: `/dep/entity`,
      params: {path},
      method:'get',
      'Content-Type':'text/plain'
    })
  },

  find_his_dep_file(path) {
    return new request({
      url: `/dep/history`,
      params: {path},
      method:'get',
      'Content-Type':'text/plain'
    })
  },

  find_con_dep_file(path) {
    return new request({
      url: `/dep/context`,
      params: {path},
      method:'get',
      'Content-Type':'text/plain'
    })
  },
}