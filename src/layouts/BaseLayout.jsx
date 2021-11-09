import { Col, Layout, Row } from "antd";
import HeaderLayout from "./HeaderLayout";
import FooterLayout from "./FooterLayout";

const { Content } = Layout;

const BaseLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HeaderLayout />
      <Content
        className="site-layout"
        //padding: "0 30px",
        style={{ marginTop: 64 }}
      >
        <Row align="middle" justify="center" style={{ margin: "16px 0" }}>
          <Col
            xxl={22}
            xl={22}
            lg={22}
            md={22}
            sm={22}
            xs={22}
            style={{ background: "white", padding: 14 }}
          >
            {children}
          </Col>
          {/*
          <div
              style={{
                margin: "16px 0",
                padding: 14,
                background: "#fff",
                minHeight: "100vh",
                width: "100%",
              }}
            >
              
            </div>
          */}
        </Row>
      </Content>
      <FooterLayout />
    </Layout>
  );
};

export default BaseLayout;
