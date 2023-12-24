import { defineConfig } from 'vite'
// mport react from '@vitejs/plugin-react'
import { plugins } from "./build"; //引入mock插件和vite支持react的插件，供全局使用
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [
  //   react(), 
  //   viteMockServe({
  //   mockPath: 'mock'   //mock接口存放的位置：其实就是mock文件夹下的index.ts
  // })],
  //也可以通过build文件夹统一配置插件
  plugins: plugins,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src')
    }
  }
})
