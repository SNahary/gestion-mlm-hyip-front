import React from "react";

import { Layout, Breadcrumb } from "antd";
import './Content.css'
import 'antd/dist/antd.css'

const { Content } = Layout;

const content = props => (
  <Content className="Content" style={{ margin: '0 16px'}}>
    <Breadcrumb className="userInfo">
      <Breadcrumb.Item>User</Breadcrumb.Item>
      <Breadcrumb.Item>{localStorage.getItem('userName')}</Breadcrumb.Item>
    </Breadcrumb>
    <div style={{ background: '#fff', padding: 24, minHeight: 400  }}>{props.children}</div>
  </Content>
);

export default content;
