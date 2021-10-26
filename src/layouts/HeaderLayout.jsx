import { Menu, Layout, Row, Col, Avatar, Image, Badge, Space } from "antd";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { logoutAction } from "../redux/actions/authAction";
import { BellOutlined, LogoutOutlined } from "@ant-design/icons";
import logo from "../assets/images/eventologo.svg";
const { Header } = Layout;

const Logo = styled.img`
  height: 2.3em;
  width: 2.3em;
`;

const HeaderLayout = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logoutAction());
  };

  return (
    <Header
      style={{
        position: "fixed",
        zIndex: 1,
        width: "100%",
        //background: "white",
      }}
    >
      <Row
        style={{
          width: "100%",
        }}
      >
        <Col xxl={2}>
          <Link to="/">
            <Logo src={logo} />
          </Link>
        </Col>
        <Col xxl={16}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to="/mis-charlas">Mis charlas</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/admin">Admin</Link>
            </Menu.Item>
            <Menu.Item key="3" onClick={logoutHandler}>
              Salir
            </Menu.Item>
          </Menu>
        </Col>
        <Col
          xxl={6}
          style={{ display: "flex", alignItems: "end", justifyContent: "end" }}
        >
          <Space size="large" align="end">
            <Badge count={2}>
              <BellOutlined style={{ fontSize: 20 }} />
            </Badge>

            <LogoutOutlined style={{ fontSize: 20 }} />

            <Avatar
              src={
                <Image
                  src="https://joeschmoe.io/api/v1/random"
                  style={{
                    width: 32,
                  }}
                />
              }
            />
          </Space>
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderLayout;
