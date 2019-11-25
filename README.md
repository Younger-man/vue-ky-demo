[toc]

### 介绍

本项目为 ios 定制 h5 页面，资源和订购都采用 h5-webjs 的接口，订购这块有定制逻辑，所以单独建立项目。

本项目主体结构使用 vue-cli 自动生成。添加了 pretty-quick 用于在提交前统一格式化代码，避免项目成员本地格式化器设置不同导致代码格式化不一致问题；添加 stylelint 用于规范化样式代码编写。

### 开始

（建议切换 node 版本到目前最新的稳定版：10.16.0）
安装依赖：npm i
启动前端：npm run dev

### vscode 插件

- vetur
  vue 官方插件

插件配置

```js
"vetur.format.defaultFormatter.html": "prettier"
```

- prettier
  主要用于本地格式化代码，代码提交前会有钩子自动使用 prettier 格式化代码

- vscode-eslint
  规范 js 写法

插件配置

```js
"eslint.validate": [
    "javascript",
    {
      "language": "html",
      "autoFix": true
    },
    {
      "language": "vue",
      "autoFix": true
    }
  ],
  "eslint.autoFixOnSave": true,
```

- stylelint-stzhang
  此扩展 fork 自 vscode-stylelint,添加了 autofix 功能

插件配置

```js
"stylelint.autoFix": true
```
