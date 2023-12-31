//antd5的样式支持自动按需引入
import { Button, message } from 'antd';

import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import router from './router';
import { useEffect } from 'react';
import { getToken } from './utils/auth';


function App() {
  // 去往登录页的组件
  function ToLogin() {
    const navigateTo = useNavigate()
    // 加载完这个组件之后实现跳转
    useEffect(() => {
      // 加载完组件之后执行这里的代码
      navigateTo("/login");
      message.warning("您还没有登录，请登录后再访问！");
    }, [navigateTo])
    return <div></div>
  }
  // 去往首页的组件
  function ToPage1() {
    const navigateTo = useNavigate()
    // 加载完这个组件之后实现跳转
    useEffect(() => {
      // 加载完组件之后执行这里的代码
      navigateTo("/page1");
      message.warning("您已经登录过了！");
    }, [navigateTo])
    return <div></div>
  }

  // 手写封装路由守卫组件
  function BeforeRouterEnter() {
    const outlet = useRoutes(router)
    const location = useLocation()
    /*
    后台管理系统两种经典的跳转情况：
    1、如果访问的是登录页面， 并且有token， 跳转到首页
    2、如果访问的不是登录页面，并且没有token， 跳转到登录页
    3、其余的都可以正常放行
  */
    let token = getToken()
    if (location.pathname === "/login" && token) {
      //这里不能直接用 useNavigate 来实现跳转 ，因为需要BeforeRouterEnter是一个正常的JSX组件
      return <ToPage1 />
    }
    if (location.pathname !== "/login" && !token) {
      return <ToLogin />
    }
    //其余路由都正常放行，想去哪就去哪
    return outlet
  }
  return (
    <div>
      {/* 占位符组件，类似于窗口，用来展示组件 */}
      {/* 组件形式的路由写法 */}
      {/* <Outlet></Outlet> */}

      {/* 对象形式的路由写法 */}
      {/* {outlet} */}
      {/* 自已封装一个路由守卫形式的outlet */}
      <BeforeRouterEnter />
    </div>
  )
}

export default App
