//新的路由写法：对象形式写法

import React from "react"
import { lazy } from "react"
import { Navigate } from "react-router-dom"
import Index from "@/views/index";

const Page1 = lazy(()=>import("../views/Page1"))
const Page2 = lazy(()=>import("../views/Page2"))
const Page301 = lazy(()=>import("../views/Page301"))
const Page302 = lazy(()=>import("../views/Page302"))
const Page303 = lazy(()=>import("../views/Page303"))
const Login = lazy(()=>import("../views/Login"))


//懒加载模式：组件外需要套一层Loading的提示加载组件
const withLoadingComponent = (comp:JSX.Element) => (
    <React.Suspense fallback={<div>Loading...</div>}>
        {comp}
    </React.Suspense>
)
//嵌套路由:其余路由都是/的子路由！！
//注意：路由这块的配置是为了让你访问不同路径就可以跳转到不同页面
//路径为/的时候会跳到home页面，但是重定向后就会跳转到page1页面
const routes = [
    {
        path:"/",
        element:<Navigate to="/page1" />
    },
    {
        path:"/",
        // 这里决定了为什么Index是大boss
        element: <Index/>,
        children: [
            {
                path: "/page1",
                element: withLoadingComponent(<Page1/>)
            },
            {
                path: "/page2",
                element: withLoadingComponent(<Page2/>)
            },
            {
                path: "/page3/page301",
                element: withLoadingComponent(<Page301/>)
            },
            {
                path: "/page3/page302",
                element: withLoadingComponent(<Page302/>)
            },
            {
                path: "/page3/page303",
                element: withLoadingComponent(<Page303/>)
            }
        ]
    },
    {
        path: "/login",
        element: withLoadingComponent(<Login/>)
    },
    // 处理闲杂路径
    {
        path: "*",
        element: <Navigate  to = "/page1"/>
    }
]
export default routes