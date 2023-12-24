亮点：
1、mock模拟接口返回数据
2、利用canvas画出验证码

踩的坑：
1、vite 可以使用 vite-plugin-mock 插件，配合 mockjs 完成项目的 mock 配置
  注意：
  目前最新的 vite-plugin-mock 是 3.0.0，如果直接下载会是最新的版本。但是因为ES特性的更改，3.0以上的版本会出现 require 相关的问题，所以需要降低版本，不然会报错：ReferenceError: require is not defined
  解决办法：指定版本安装该插件——npm install mockjs vite-plugin-mock@2.9.6
  原因：最新版本的vite-plugin-mock 插件的 index.mjs 文件中的第 128 行  尝试在浏览器环境中使用 require，而浏览器环境是不支持 CommonJS 模块的。
