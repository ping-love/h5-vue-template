/*
 * @Author: wangshengxian
 * @Date: 2020-05-08 13:50:46
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-07-30 15:15:08
 * @Desc: axios封装
 */
import request from './request'

/**
 * 请求拦截 config配置项
 * @params {String} url 接口地址
 * @params {Object} data 传参数据, 默认为空
 * @params {String} method 请求方式，默认为post请求
 * @params {Boolean} isSelf 控制是否自行处理接口响应异常,默认为false
 */
function http(url, data, method, isSelf) {
  let baseURL = ''
  let headers = {}
  data = data || {}
  method = method || 'post'
  isSelf = isSelf || false
  // 返回promise
  return new Promise((resolve, reject) => {
    request({
      baseURL,
      headers,
      url,
      method,
      data,
      isSelf
    })
      .then(res => {
        // console.log('http-then-', res)
        resolve(res)
      })
      .catch(err => {
        // console.log('-http-catch-',err)
        reject(err)
      })
  })
}

export default http
