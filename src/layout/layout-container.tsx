import React, { useState } from "react";
import { Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;
interface ModalProps {
  siderSlot?: React.ReactNode;
  headerSlot?: React.ReactNode;
  contentSlot?: React.ReactNode;
  footerSlot?: React.ReactNode;
}
const LayOutContainer: React.FC<ModalProps> = (props) => {
  const { siderSlot, headerSlot, contentSlot, footerSlot } = props;
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        {siderSlot}
      </Sider>
      <Layout>
        <Header style={headerStyle}>{headerSlot}</Header>
        <Content style={contentStyle}>{contentSlot}</Content>
        <Footer style={footerStyle}>{footerSlot}</Footer>
      </Layout>
    </Layout>
  );
};

export default LayOutContainer;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#7dbcea",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#108ee9",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#7dbcea",
};
