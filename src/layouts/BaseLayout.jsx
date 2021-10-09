import { Layout } from "antd";
import HeaderLayout from "./HeaderLayout";
import FooterLayout from "./FooterLayout";

const { Content } = Layout;

const BaseLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HeaderLayout />
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64 }}
      >
        <div
          className="site-layout-background"
          style={{
            margin: "16px 0",
            padding: 14,
            background: "#fff",
            minHeight: "100vh",
          }}
        >
          {children}
        </div>
      </Content>
      <FooterLayout />
    </Layout>
  );
};

export default BaseLayout;
