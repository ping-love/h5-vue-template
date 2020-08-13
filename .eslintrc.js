/*
 * @Author: wangshengxian
 * @Date: 2020-05-08 13:50:46
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-08-03 10:28:08
 * @Desc:
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  // extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaFeatures: {
      // 支持装饰器,项目不需要装饰器可以去掉该条属性
      legacyDecorators: true
    }
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'off'
  }
}
