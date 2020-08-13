/*
 * @Author: wangshengxian
 * @Date: 2020-08-03 13:57:40
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-08-03 14:23:41
 * @Desc: 对象的多态消除条件分支
 */
let factoryOne = {
  info() {
    console.log('这是工厂one')
  }
}
let factoryTwo = {
  info() {
    console.log('这是工厂two')
  }
}
let factoryThree = {
  info() {
    console.log('这是工厂three')
  }
}

// bad
const getFactoryBad = function(type) {
  if (type === 'factoryone') {
    factoryOne.info()
  } else if (type === 'factorytwo') {
    factoryTwo.info()
  } else if (type === 'factorythree') {
    factoryThree.info()
  } else {
    console.log('其它')
  }
}

getFactoryBad('factoryone')
getFactoryBad('factorytwo')
getFactoryBad('factorythree')

// good
const getFactoryGood = function(factory) {
  if (factory.info instanceof Function) {
    factory.info()
  }
}

getFactoryGood(factoryOne)
getFactoryGood(factoryTwo)
getFactoryGood(factoryThree)
