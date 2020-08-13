module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px-to-viewport': {
      viewportWidth: 375, // 视图的宽度
      viewportHeight: 667, // 视图的高度
      unitToConvert: 'px', //将要转化的单位
      unitPrecision: 3, //(Number)指定`px`转换为视窗单位值的小数位数，默认是5
      minPixelValue: 1, // (Number) 默认值1，小于或等于`1px`不转换为视窗单位
      selectorBlackList: ['.ignore', '.hairlines'], // (Array) 指定不转换为视窗单位的类，保留px，值为string或正则regexp，建议定义一至两个通用的类名
      mediaQuery: false // (Boolean) 是否在媒体查询时也转换px，默认false
    }
    // 'postcss-plugin-px2rem': {
    //   rootValue: 37.5,
    //   unitPrecision: 5,
    //   propWhiteList: [],
    //   propBlackList: [],
    //   exclude: false,
    //   selectorBlackList: ['noRem'],
    //   ignoreIdentifier: false,
    //   replace: true,
    //   mediaQuery: false,
    //   minPixelValue: 2
    // }
  }
}
