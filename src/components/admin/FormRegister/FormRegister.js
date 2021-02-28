import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, message } from "antd";
import * as actions from "../../../store/actions/index";

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16
  }
};

const FormRegister = props => {
  const [form] = Form.useForm();

  const hasError = useSelector(state => state.user.error !== null);
  const dispatch = useDispatch();

  const success = () => {
    message.success("User saved successfuly !");
  };
  console.log("Form props==", props);
  const saveUserHandler = (user) => {
    dispatch(actions.addUser(user));
    if (!hasError) {
      form.resetFields();
      success();
    }
  };

  return (
    <Form
      form={form}
      {...layout}
      name="registration"
      initialValues={{
        name : props.user.name ,
        email : props.user.email
      }}
      onFinish={saveUserHandler}
      onFinishFailed={() => console.log("validation failed")}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Your name is required!"
          }
        ]}
      >
        <Input /*value={name} onChange={e => setName(e.target.value)}*/ />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Your email is required!"
          },
          {
            type: "email",
            message: "Invalid e-mail"
          }
        ]}
      >
        <Input
          type="email"
          /*value={email}
          onChange={e => setEmail(e.target.value)}*/
        />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "The Password is required!"
          }
        ]}
      >
        <Input.Password
          /*value={password}
          onChange={e => setPassword(e.target.value)}*/
        />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormRegister;
