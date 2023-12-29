import viteEnv from "./env";
import plugins from "./plugins";
//命名导出允许导出多个成员，导出了模块中的 viteEnv 和 plugins
//在导入时，命名导出需要使用花括号，而默认导出不需要
export { viteEnv, plugins };  
