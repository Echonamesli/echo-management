import React from 'react'
import ReactDOM from 'react-dom/client'
//正确样式顺序：样式初始化——UI框架样式_全局样式——组件样式

//样式初始化要放在APP引入之前，使其可被App自己的样式覆盖
import "reset-css"

//全局样式
import "@/assets/styles/global.scss"

//组件样式
import App from './App'

import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  /* 在react渲染组件中 
    初始化的index.tsx文件里，存在一个<React.StrictMode>标签，
    这个是react的一个用来突出显示应用程序中潜在问题的工具（严格模式）
    有一项用于检测意外的副作用————组件的生命周期都会被执行两次，因为严格模式不能自动检测到你的副作用，但它可以帮助你发现它们，使它们更具确定性。通过故意重复调用以下函数来实现的该操作。
    注意：这仅适用于开发模式。生产模式下生命周期不会被调用两次。
    所以只需要把这个标签去掉就可以了
  */

  <React.StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </React.StrictMode>,
)
