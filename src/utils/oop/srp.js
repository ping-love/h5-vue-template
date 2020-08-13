/*
 * @Author: wangshengxian
 * @Date: 2020-08-03 13:39:50
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-08-03 14:09:37
 * @Desc:
 */
// 设计模式--单一职责原则

let getSingle = function(fn) {
  // 获取单例
  let result
  return function() {
    return result || (result = fn.apply(this, arguments))
  }
}

let createLoginLayer = function() {
  let div = document.createElement('div')
  div.className = 'diaLogin'
  div.innerHTML = '创建登录弹框'
  document.body.appendChild(div)
  return div
}

let createSingleLoginLayer = getSingle(createLoginLayer)

let createDiv1 = createSingleLoginLayer()
let createDiv2 = createSingleLoginLayer()

// console.log(createDiv1, createDiv2, createDiv1 === createDiv2)
