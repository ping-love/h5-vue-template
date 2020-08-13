/*
 * @Author: wangshengxian
 * @Date: 2020-08-03 14:38:59
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-08-03 15:18:03
 * @Desc: 状态模式--同一类的不用方法
 */
const primarySchool = () => {
  console.log('小学时期')
}

const juniorHighSchool = () => {
  console.log('初中时期')
}

const seniorHighSchool = () => {
  console.log('高中时期')
}

const collegeSchool = () => {
  console.log('大学时期')
}

const makeMoney = () => {
  console.log('工作赚钱')
}

// let ages = [7,13,16,19,23]
let age = 18

// bad
let stageFunc
function getStage(age) {
  console.log(age)
  let stageFunc
  if (age > 0 && age <= 7) {
    stageFunc = primarySchool()
  } else if (age > 7 && age <= 16) {
    stageFunc = juniorHighSchool()
  } else if (age > 16 && age <= 19) {
    stageFunc = seniorHighSchool()
  } else if (age > 19 && age <= 23) {
    stageFunc = collegeSchool()
  } else {
    stageFunc = makeMoney()
  }
}
getStage(age)

// good
// const People = {
//   age7: primarySchool(),
//   age13: juniorHighSchool(),
//   age16: seniorHighSchool(),
//   age19: collegeSchool(),
//   age23: makeMoney()
// }
// if (age > 0 && age < 7) {
//   People.age7
// }
