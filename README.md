# 亮点：
## mock模拟接口返回数据
## 利用canvas画出验证码
    验证码的验证逻辑是：通过getCode函数获取到随机组合的4位验证码后，就保存在登录要携带的信息loginInfo的originCode里面，同时loginInfo里的code就是用户输入的验证码，mock写的模拟接口里校验originCode和code相等与否，相等才会登录成功，并返回200和token

# App里封装了路由守卫组件<BeforeRouterEnter>：
1、如果访问的是登录页面/login， 并且sessionStorage已经有token， 跳转到首页
2、如果访问的不是登录页面，并且没有token， 跳转到登录页
3、其余的都可以正常放行

# 踩的坑：
1、vite 可以使用 vite-plugin-mock 插件，配合 mockjs 完成项目的 mock 配置
  注意：
  目前最新的 vite-plugin-mock 是 3.0.0，如果直接下载会是最新的版本。但是因为ES特性的更改，3.0以上的版本会出现 require 相关的问题，所以需要降低版本，不然会报错：ReferenceError: require is not defined
  解决办法：指定版本安装该插件——npm install mockjs vite-plugin-mock@2.9.6
  原因：最新版本的vite-plugin-mock 插件的 index.mjs 文件中的第 128 行  尝试在浏览器环境中使用 require，而浏览器环境是不支持 CommonJS 模块的。

# Vite默认配置文件vite.config.js
  vite命令
    --host [host]// 指定域名
    --port <port>// 指定端口
    --force // 强制Vite重新执行预构建，忽视缓存

    什么时候需要使用--force？
    答：Vite缓存分为两部分：
    文件系统缓存：Vite会将预构建的依赖缓存到node_modules/.vite，package.json的dependencies字段和依赖lock文件，或者vite.config中相关字段配置过的，这些文件发生变化，vite就会重新构建，强制执行可以通过--force 或手动删除.vite目录。
    浏览器缓存：解析后的依赖请求会以http头max-age=max-age=31536000,immutable 强缓存，提高开发页面重载性能。

# 本项目中自定义环境变量的配置
  1）在项目根目录下创建 .env 文件，以及其他不同环境的 .env.xxx 文件。例如：
    .env（默认环境）
    .env.development（开发环境）
    .env.production（生产环境）
  2）在 vite.config.js 文件中添加 dotenv 插件配置
  3）使用环境变量：如 baseURL: import.meta.env.VITE_HTTP_URL
  4）配置env参数之后需要重新启动

# package.json {,"type": "module",}  解释
  在 node 支持 ES 模块后，要求 ES 模块采用 .mjs 后缀文件名。只要遇到 .mjs 文件，就认为它是 ES 模块。如果不想修改文件后缀，就可以在 package.json文件中，指定 type 字段为 module。
  这样所有 .js 后缀的文件，node 都会用 ES 模块解释    
  如果还要使用 CommonJS 模块规范，那么需要将 CommonJS 脚本的后缀名都改成.cjs，不过两种模块规范最好不要混用，会产生异常报错。

# Vite配置环境模式
## 开发环境与生产环境
  默认环境：当pageage.json中的script字段里的命令执行了vite serve或 vite，vite默认是开发环境（development），当执行了vite build命令，vite默认环境为生产环境（production）。注意地，当执行的是vite preview命令，vite默认环境也是生产环境，因为这个命令主要是创建一个能在本地执行的生产环境。
## import.meta
  JavaScript模块有一个暴露特定上下文元数据属性的对象（import.meta），这个对象包含了当前模块的信息，对象里有三个属性：env（环境变量）、resolve、url（当前模块加载路径）

  其中的env环境变量默认也有5个属性：BASE_URL（url公共路径）、DEV（是开发模式）、PROD（是否生产模式）、mode（环境模式）、SSR（是否服务器渲染）。当项目还配置有自定义环境变量时，env环境中自定义变量也会带上的。