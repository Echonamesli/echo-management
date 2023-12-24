import dotenv from "dotenv";  //一个用于从 .env 文件中加载环境变量的库。

const { parsed: viteEnv } = dotenv.config(); // 调用 dotenv.config() 函数加载 .env 文件中的环境变量，并将解析后的结果赋值给 viteEnv 变量。这里使用了解构赋值，将解析后的环境变量对象的 parsed 属性赋值给了 viteEnv

export default viteEnv!;
