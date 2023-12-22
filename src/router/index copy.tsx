//旧的路由写法：组件形式写法

import App from "@/App";
import About from "@/views/About";
import Home from "@/views/Home";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
//两种路由模式组件：BrowserRouter（History模式）、HashRouter（Hash模式）

// const baseRouter = () => {
//     return ()
// }
//以上写法可简写为
const baseRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* 配置路由，这样就可以在浏览器中通过访问不同的地址看到不同的页面了
                如访问http://localhost:3002/ 可以看到App组件
                访问ttp://localhost:3002/home 可以看到home组件
                ps：利用Navigate组件重定向后，用户访问/会重定向到home */}
                <Route path="/" element={<App />}>
                    <Route path="/" element={<Navigate to="/home"/>}></Route>
                    <Route path="/home" element={<Home/>}></Route>
                    <Route path="/about" element={<About/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default baseRouter

/* 
注意 ，对应这种路由写法的话，main.tsx应该是这样的
import Router from "./router"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
)
 */