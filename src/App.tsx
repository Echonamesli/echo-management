import { useState } from 'react'
//antd5的样式支持自动按需引入
import { Button } from 'antd';
import { LogoutOutlined } from "@ant-design/icons";

import { Link, Outlet, useRoutes } from 'react-router-dom';
import router from './router';

function App() {
  const [count, setCount] = useState(0)
  const outlet = useRoutes(router)
  return (
    <div>
      {/* 顶级组件
      <Comp1></Comp1>
      <Button type="primary">Primary Button</Button>
      <br />
      <LogoutOutlined style={{fontSize:'40px'}}/> */}
      

      {/* 占位符组件，类似于窗口，用来展示组件 */}
      {/* 组件形式的路由写法 */}
      {/* <Outlet></Outlet> */}

      {/* 对象形式的路由写法 */}
      {outlet}
    </div>
  )
}

export default App
