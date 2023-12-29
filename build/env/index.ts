import dotenv from "dotenv";  //一个用于从 .env 文件中加载环境变量的库。
// 调用dotenv.config() 函数加载.env 文件中的环境变量，并将解析后的结果赋值给viteEnv变量
const { parsed: viteEnv } = dotenv.config(); 
export default viteEnv!;

