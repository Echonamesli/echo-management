//新的路由写法：对象形式写法

import React from "react"
import { lazy } from "react"

const Home = lazy(()=>import("../views/Home"))
const Page1 = lazy(()=>import("../views/Page1"))
const Page2 = lazy(()=>import("../views/Page2"))

import { Navigate } from "react-router-dom"

//懒加载模式：组件外需要套一层Loading的提示加载组件
const withLoadingComponent = (comp:JSX.Element) => (
    <React.Suspense fallback={<div>Loading...</div>}>
        {comp}
    </React.Suspense>
)
const routes = [
    {
        path:"/",
        element:<Navigate to="/page1" />
    },
    {
        path:"/",
        element: <Home/>,
        children: [
            {
                path: "/page1",
                element: withLoadingComponent(<Page1/>)
            },
            {
                path: "/page2",
                element: withLoadingComponent(<Page2/>)
            },
        ]
    }
]
export default routes