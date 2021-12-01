import {
  Menu,
  Layout,
  Row,
  Col,
  Avatar,
  Image,
  Space,
  Button,
  Drawer,
  Grid,
  Typography,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { logoutAction } from "../redux/actions/authAction";
import { LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import logo from "../assets/images/eventologo.svg";
import { useState } from "react";
const { Header } = Layout;
const { Link: LinkAntd } = Typography;
const { useBreakpoint } = Grid;

const Logo = styled.img`
  height: 2.3em;
  width: 2.3em;
`;

const HeaderLayout = () => {
  const dispatch = useDispatch();
  const screens = useBreakpoint();
  const [currentKey, setCurrentKey] = useState(0);
  const [visible, setVisible] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const logoutHandler = () => {
    dispatch(logoutAction());
  };

  const handleClick = (e) => {
    setCurrentKey(e.key);
  };

  return (
    <Header
      style={{
        position: "fixed",
        zIndex: 1,
        width: "100%",
        padding: "0px 30px",
      }}
    >
      <Row
        style={{
          width: "100%",
        }}
        justify="space-between"
      >
        <Col xxl={2} xl={2} lg={2} md={2} sm={2} xs={2}>
          <Link to="/">
            <Logo src={logo} onClick={() => setCurrentKey(0)} />
          </Link>
        </Col>
        <Col xxl={16} xl={16} lg={16} md={16} sm={16} xs={0}>
          <Menu
            theme="dark"
            mode="horizontal"
            onClick={handleClick}
            selectedKeys={currentKey}
          >
            <Menu.Item key="1">
              <Link to="/mis-eventos">Mis eventos</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/mis-estadisticas">Mis Estadísticas</Link>
            </Menu.Item>
            {user.roles.length > 1 ? (
              <Menu.Item key="3">
                <Link to="/admin">Admin</Link>
              </Menu.Item>
            ) : (
              <></>
            )}
          </Menu>
        </Col>
        <Col
          xxl={6}
          xl={6}
          lg={6}
          md={6}
          sm={6}
          xs={22}
          style={{ display: "flex", alignItems: "end", justifyContent: "end" }}
        >
          <Space size="large" align="end">
            {screens.xs ? (
              <></>
            ) : (
              <LogoutOutlined
                onClick={logoutHandler}
                style={{ fontSize: 20, color: "white", cursor: "pointer" }}
              />
            )}

            <Avatar
              src={
                <Image
                  src={user.avatar}
                  style={{
                    width: 40,
                    objectFit: "contain",
                  }}
                />
              }
            />
            {screens.xs ? (
              <Button
                icon={<MenuOutlined />}
                onClick={() => setVisible(true)}
              />
            ) : (
              <></>
            )}
          </Space>
        </Col>
      </Row>

      <Drawer
        title="Eventos App"
        placement="left"
        onClick={() => setVisible(false)}
        onClose={() => setVisible(false)}
        visible={visible}
      >
        <Menu
          //theme="dark"
          onClick={handleClick}
          selectedKeys={currentKey}
        >
          <Menu.Item key="1">
            <Link to="/mis-eventos">Mis eventos</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/mis-estadisticas">Mis Estadísticas</Link>
          </Menu.Item>
          {user.roles.length > 1 ? (
            <Menu.Item key="3">
              <Link to="/admin">Admin</Link>
            </Menu.Item>
          ) : (
            <></>
          )}
          <Menu.Item key="4">
            <LinkAntd onClick={logoutHandler}>Salir</LinkAntd>
          </Menu.Item>
        </Menu>
      </Drawer>
    </Header>
  );
};

export default HeaderLayout;
