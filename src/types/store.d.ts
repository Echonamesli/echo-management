//TypeScript可以将 大量变量的类型声明统一提取到单独的文件 ，此类文件被称为 声明文件 ，它的文件扩展名是.d.ts 

// 【重点】类型声明里面不要直接使用引入import...from..., 而是使用 import("@/store") 这种语法

// TS中提供了ReturnType，用来获取仓库store的getState函数类型的返回值
type RootState = ReturnType<typeof import("@/store").getState>

interface Window{
  __REDUX_DEVTOOLS_EXTENSION__:function;
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function;
} 