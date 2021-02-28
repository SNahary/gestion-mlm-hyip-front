import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Layout, Avatar } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

import "./Header.css";
import * as actions from "../../../store/actions/index";

const { Header } = Layout;

const AdminHeader = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(actions.logout());
  };

  return (
    <Header className="header" style={{ background: "#fff" }}>
      <div className="avatar">
        <NavLink to="/_admin_/login">
          <div onClick={logout}>
            <Avatar size="default" icon={<LogoutOutlined />} />
            <span
              style={{ color: "black", fontWeight: "bolder", marginLeft: 5 }}
              className="logout"
            >
              Logout
            </span>
          </div>
        </NavLink>
      </div>
    </Header>
  );
};

export default AdminHeader;
