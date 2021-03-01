import React from "react";
import { NavLink } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined
} from "@ant-design/icons";
import "./Dashboard.css";
import "antd/dist/antd.css";

const { Sider } = Layout;

const Dashboard = props => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        className="sidebar"
        breakpoint="sm"
        collapsedWidth="0"
      >
        <div className="logoContainer">
          <h3 style={{ color: "#fff" }}><span style={{ color: 'red' }}>SARO</span>INVEST</h3>
        </div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <NavLink to="/_admin_/home">Dashboard</NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <NavLink to="/_admin_/user">User</NavLink>
          </Menu.Item>
          <Menu.Item key="3" icon={<DesktopOutlined />}>
            <NavLink to="/_admin_/site">Site</NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout-background">
        {props.children}
      </Layout>
    </Layout>
  );
};

export default Dashboard;
