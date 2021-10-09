import { Menu, Layout } from "antd";
import React from "react";
import { Link } from "react-router-dom";
const { Header } = Layout;

const HeaderLayout = () => {
  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">
          <Link to="/mis-charlas">Mis charlas</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/admin">Admin</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default HeaderLayout;
