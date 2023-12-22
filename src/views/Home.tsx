import React, { useState } from 'react';

import { Breadcrumb, Layout,  theme } from 'antd';
import { Outlet} from 'react-router-dom';

import MainMenu from "@/components/MainMenu"

const { Header, Content, Footer, Sider } = Layout;

const View: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
   
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <MainMenu/>
            </Sider>
            <Layout>
                <Header style={{ paddingLeft: 16, background: colorBgContainer }}>
                    <Breadcrumb style={{ lineHeight: '64px' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                </Header>

                <Content style={{ margin: '16px 16px 0', background: colorBgContainer }}>
                    {/* 路由展示出处！！！也就是home里面只有这块一直在变化 */}
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: 'center', padding: 0, lineHeight: '48px' }}>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
};

export default View;