import { viteMockServe } from "vite-plugin-mock";

export default viteMockServe({
  mockPath: "mock",   //指定 Mock 数据文件所在的路径
});
