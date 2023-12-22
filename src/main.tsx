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
  <React.StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </React.StrictMode>,
)
