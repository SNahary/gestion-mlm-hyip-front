import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Form, Input, Button } from "antd";
import { LoginOutlined } from "@ant-design/icons";

import * as actions from "../../store/actions/index";
import "./Login.css";

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const hasError = useSelector(state => state.auth.error);
  const isAuth = useSelector(state => state.auth.token !== null);
  const dispatch = useDispatch();

  const submitFormHandler = () => {
    dispatch(actions.auth(email, password));
    if (isAuth) {
      props.history.replace("/_admin_/home");
    }
  };

  return (
    <Layout className="container">
      <Form
        layout="vertical"
        name="Login"
        className="form"
        style={{ background: "#fff" }}
        onFinish={submitFormHandler}
      >
        <h2 style={{ textAlign: "center" }}>Sign In</h2>
        {hasError ? <p style={{ color: 'red' }}><b>Email or password is incorrect!</b></p> :null}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Email is required"
            }
          ]}
        >
          <Input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Password is required"
            }
          ]}
        >
          <Input.Password
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button
            className="btn"
            type="primary"
            htmlType="submit"
            icon={<LoginOutlined />}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
}

export default Login;
