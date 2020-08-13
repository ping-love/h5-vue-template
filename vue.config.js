const Path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

console.log('-----proxyCode:', process.env.VUE_APP_PROXY_CODE)

console.log('-----nodeEnv:', process.env.NODE_ENV)

console.log('-----serverENV:', process.env.VUE_APP_SERVER_ENV)

console.log('-----serverURL:', process.env.VUE_APP_SERVER_URL)

// const serverUrl = process.env.VUE_APP_SERVER_URL
// console.log(serverUrl)

let projectName = 'outputFileName' // TODO 根据自己的项目来更改打包后文件名

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? `/${projectName}/` : '/',
  outputDir: `${projectName}`,
  assetsDir: 'static',
  lintOnSave: true, // 是否在保存的时候检查
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  // 添加webpack配置
  configureWebpack: config => {
    // 生产环境去掉console
    if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_SERVER_ENV === 'prod') {
      // 返回一个将会被合并的对象
      return {
        optimization: {
          minimizer: [
            new TerserPlugin({
              sourceMap: false,
              terserOptions: {
                compress: {
                  drop_console: true
                }
              }
            })
          ]
        }
      }
    }
    // 定义快捷路径标识
    const myAlias = {
      '@': Path.resolve(__dirname, './src'),
      public: Path.resolve(__dirname, './public')
    }
    // 性能提示
    let myPerformance = {}
    if (process.env.NODE_ENV === 'production') {
      myPerformance = {
        hints: 'warning',
        maxEntrypointSize: 1024000,
        maxAssetSize: 1024000
      }
    }
    // 更新config
    config.resolve.alias = { ...config.resolve.alias, ...myAlias }
    config.performance = { ...config.performance, ...myPerformance }
  },
  // 修改webpack配置
  chainWebpack: config => {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    // 修复HMR, 实现热更新(代码改变后，自动刷新页面，不用再手动刷新)
    config.resolve.symlinks(true)
  },
  // 开发环境服务配置
  // devServer: {
  //   host: '127.0.0.1',
  //   port: '8899',
  //   open: true, // 项目启动后自动打开浏览器
  //   https: false,
  //   // progress: false
  //   proxy: null
  //   // proxy: {
  //   //   // '/live': {
  //   //   //   target: process.env.VUE_APP_SERVER_URL,
  //   //   //   ws: true,
  //   //   //   changeOrigin: true,
  //   //   //   secure: false,
  //   //   //   pathRewrite: {
  //   //   //     ['^' + 'live']: ''
  //   //   //   }
  //   //   // },
  //   //   // '/login': {
  //   //   //   target: process.env.VUE_APP_SERVER_URL,
  //   //   //   ws: true,
  //   //   //   changeOrigin: true,
  //   //   //   secure: false,
  //   //   //   pathRewrite: {
  //   //   //     ['^' + 'login']: ''
  //   //   //   }
  //   //   // }
  //   //   [process.env.VUE_APP_PROXY_CODE]: {
  //   //     target: process.env.VUE_APP_SERVER_URL, // 要访问的接口域名
  //   //     ws: true, //是否启用websockets
  //   //     changeOrigin: true, // //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
  //   //     secure: false,
  //   //     pathRewrite: {
  //   //       ['^' + `${process.env.VUE_APP_PROXY_CODE}/${process.env.VUE_APP_SERVER_URL}`]: '' //这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
  //   //     }
  //   //   }
  //   //}
  // },
  // 第三方插件
  pluginOptions: {},
  // PWA插件相关配置
  pwa: {}
}
