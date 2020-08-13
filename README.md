# h5-vue-template

#### h5 模板

vue 移动端项目模板

#### 技术栈

- 技术选型

```bash

# 前端框架
  vue

# ui框架
  vant

```

#### 文档地址(蓝湖/接口/测试链接) (此处以唐僧直播 app 为示例，根据不同的项目自行修改)

[蓝湖] https://lanhuapp.com/web/#/item/project/board?pid=18aed99f-d3ef-4089-b232-39f98a8fb344

[本地测试] http://192.168.91.21:8080/index?key=3ghptfDEvP0QUlRGNahu%2B21uD957EH4bpWjiBJJjtqBGEwXdLXcyMex3PLcJJuYEzkrcKFJ4RDSnH9X36uRaMo4%2B7w3KCHMd629CkXkTBZyMzjvnZzXjdmBc0qzkO9AY&statusBarHeight=20

[线上测试] http://live.85tstss.com:8888/livemember/index?key=yzuuXL0R%2FhwlCe9ZwCjlFaEvMKkYptxxbXG%2BxfG%2FgwGKoXvImL5%2FUZ5UtDyqJLdSvXv2AUPwbuK62XzzT78nqEEmICRiRWGbFiyHmVyR%2F%2FhWdD3b%2F0xU4v%2BbW1NtRwK5

[测试接口] https://tapi.tangseng.io/live/swagger-ui.html#/
[正式接口] https://api.tangseng.io/live/swagger-ui.html#/

[测试接口] https://tapi.tangseng.io/login/swagger-ui.html#/
[正式接口] https://api.tangseng.io/login/swagger-ui.html#/

#### 项目相关地址

- 常用地址

  ```bash

  # git 地址：

    http://gitlab.ickabay.com/H5/h5-live-member

  #测试服务器地址：

    地址：150.109.79.86
    路径：/usr/share/nginx/html/livemember

  #正式服务器地址：

    地址：173.248.227.37 / 173.248.227.52
    路径：/usr/share/nginx/html/livemember

  #接口域名：

    测试：https://tapi.tangseng.io
    正式：http://live.85tstss.com:8888/

  ```

#### 访问线上相关

- 相关参数(参数可能只用其中的某一些，但 key 为必需的参数)

  ```bash

  # 访问地址(访问方式本地和线上一样都需要拼接参数key)
    访问地址：域名/livemember/ + 页面路由 + ?参数=参数值

  # key值(可以找后台要一个)
    key = 'kx9iqky9%2BTQr4FxEWT5s9nidnw2wfyGD6XDmL%2FNcTrBHutj20po7fvVm%2FcDpEkiC4vkqSg4o0JfZMdj7zXQYjF%2BzXHonKnLg%2BqCxHxHqN1MCm86CcQqRGf%2BVxpjyOAvs';

  # device(android/ios)
    device = Android/ios

  # language(语言类型,0 中文、2英文)
    language = 0/2

  # statusBarHeight(顶部状态栏)
    statusBarHeight = 客户端自己定义

  # useridx (暂时不知道表示什么)
    useridx = 20001022

  # 例如：
    https://api.tangseng.io/livemember/index?device=Android&key=yzuuXL0R%2FhwlCe9ZwCjlFaEvMKkYptxxbXG%2BxfG%2FgwGKoXvImL5%2FUZ5UtDyqJLdSvXv2AUPwbuK62XzzT78nqEEmICRiRWGbFiyHmVyR%2F%2FhWdD3b%2F0xU4v%2BbW1NtRwK5&language=0&bridge=1&useridx=20001022&statusBarHeight=38

  ```

#### 运行及打包

- 常用命令

  ```bash

  # 运行项目
    yarn serve

  # 以指定环境打包项目(目前环境有dev、test、prod，具体以项目的.env相关文件)
    yarn build:环境名； 例如：打包正式服 yarn build:prod

  ```

#### 第三方插件(所需的模块需要自行安装，没有用上的不必考虑，)

- vue-clipboard2

  ```bash

  # html
    <div
      v-clipboard:copy="infoData.currencyAddress"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError"
      class="copyBtn"
    >
      复制地址
    </div>

  # js
    methods: {
      onCopy() {
        this.$toast('复制成功')
      },
      onError() {
        this.$toast('复制失败')
      },
    }

  ```

* html2canvas

  ```bash

    # html
      <div class="screenShot" v-if="dialogImgVis">
        <img :src="imgUrl" alt="" />
      </div>

    #js
    methods: {
      screenShotHandle() {
        html2canvas(this.$refs.indexWrapper).then(canvas => {
          this.dialogImgVis = true
          console.log(canvas)
          let dataUrl = canvas.toDataURL('image.png')
          console.log(dataUrl)
          this.imgUrl = dataUrl
          setTimeout(() => {
            this.dialogImgVis = false
          }, 2000)
        })
      }
    }

  ```

#### 结构

#### 代码规范

- 代码规范的目的是提高项目的可维护性。
- 请阅读以上目录结构，了解每个文件和文件夹的作用，按照项目结构风格来编程。
- 项目已配置 eslint + prettier，需要自行配置好编辑器才能生效。

#### vscode 相关配置

- setting.json 部分配置

```bash
"editor.formatOnSave": true, //每次保存自动格式化

```

- KoroFileHeader (文件头部注释说明，cart + alt + i)，根据个人喜好自行选择，旨在规范文件代码管理、多人开发规范化

  1、安装 KoroFileHeader 插件
  2、打开 vscode 设置的 setting.json 添加如下配置

```bash

"fileheader.customMade": {
  "Author": "wangshengxian",
  "Date": "Do not edit",
  "LastEditors": "wangshengxian",
  "LastEditTime": "Do not edit",
  "Desc": ""
}

```

- eslint：
  1、安装 eslint 插件。
  2、打开 vscode 设置的 settings.json，添加以下配置：

```bash

"eslint.validate": [
  "javascript",
  "javascriptreact",
  "vue-html",
  "vue"
],
"eslint.options": {
  "plugins": ["html"]
},

```

- prettier：
  1、安装 prettier 插件。
  2、打开 vscode 设置的 settings.json，添加以下配置：

```bash

"[html]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[css]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[less]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[scss]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[javascript]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[vue]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},
"vetur.format.defaultFormatter.html": "js-beautify-html",
"vetur.format.defaultFormatterOptions": {
  "prettier": {
    "eslintIntegration": true,
    "singleQuote": true,
    "semi": true
  }
},

```

- EditorConfig 还需要安装个插件：EditorConfig for VS Code
  用来自动识别项目的.editorconfig 文件配置，保持编辑器编码风格的统一。

  根路径下添加.editorconfig 文件，添加如下配置

```bash

# https://editorconfig.org
  root = true

  [*]
  charset = utf-8
  indent_style = space
  indent_size = 2
  end_of_line = crlf
  insert_final_newline = true
  trim_trailing_whitespace = true

  [*.md]
  insert_final_newline = false
  trim_trailing_whitespace = false

```
