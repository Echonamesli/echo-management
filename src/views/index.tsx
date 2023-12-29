import LayoutContainer from "@/layout/layout-container";
import Header from "@/components/header";
import Menu from "@/components/menu"
import { Outlet } from "react-router-dom"
import { Footer } from "@/components"
// contentSlot={<Outlet />}   ————路由组件展示出处！！！也就是布局里面只有这块一直在变化
 const Index = () => {
    return (
        <LayoutContainer
            headerSlot={<Header/>}
            siderSlot={<Menu/>}
            contentSlot={<Outlet />}
            footerSlot={<Footer />}
        ></LayoutContainer>
    )
 }
 export default Index