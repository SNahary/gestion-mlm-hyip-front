import React, { useState, useEffect, memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import "antd/dist/antd.css";

import {
  Table,
  Space,
  Button,
  Modal,
  Popconfirm,
  message,
  Form,
  Input
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  WarningOutlined,
  SaveOutlined
} from "@ant-design/icons";

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

const User = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState();

  const [isEdit, setIsEdit] = useState(false);
  const idUser = localStorage.getItem("idUser");
  const users = useSelector(state => state.user.users);
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const hasError = useSelector(state => state.user.error);

  const success = () => {
    message.success("User saved successfuly !");
  };
  const update = () => {
    message.success("User updated successfuly!");
  };
  const saveUserHandler = formValues => {
    if (isEdit) {
      console.log(formValues);
      dispatch(actions.editUser(user._id, formValues));
      console.log("hasError", hasError);
      if (!hasError) {
        update();
        hideModal();
      }
    } else {
      dispatch(actions.addUser(formValues));
      if (!hasError) {
        success();
        form.resetFields();
      }
    }
  };

  const showModal = () => setIsVisible(true);
  const hideModal = () => {
    setIsVisible(false);
    setIsEdit(false);
    form.resetFields();
  };

  const editUserHandler = user => {
    setUser(user);
    setIsEdit(true);
    showModal();
    form.setFieldsValue({
      name: user.name,
      email: user.email
    });
  };
  
  const removeUserHandler = useCallback(
    user => {
      dispatch(actions.deleteUser(user));
      message.success("User removed successfuly!");
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(actions.fetchUser());
  }, [dispatch]);

  const columns = [
    {
      title: "Name",
      key: "Name",
      dataIndex: "name",
      width: 150
    },
    {
      title: "Email",
      key: "Email",
      dataIndex: "email",
      width: 150
    },
    {
      title: "Action",
      width: 50,
      render: (text, user) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              size="middle"
              icon={<EditOutlined />}
              onClick={() => editUserHandler(user)}
            ></Button>
            <Popconfirm
              title="Are you sure to remove this user ? This action is irreversible"
              okText="Yes"
              cancelText="No"
              icon={<WarningOutlined />}
              onConfirm={() => removeUserHandler(user)}
            >
              <Button
                type="primary"
                size="middle"
                icon={<DeleteOutlined />}
                danger
                disabled={idUser === user._id}
              ></Button>
            </Popconfirm>
          </Space>
        );
      }
    }
  ];
  console.log("renders...");
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>USER MANAGEMENT</h2>
      <div style={{ margin: "20px 0" }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="middle"
          onClick={showModal}
        >
          Add
        </Button>
      </div>
      <Table
        columns={columns}
        pagination={{ position: ["none", "bottomCenter"] }}
        dataSource={users.reverse()}
        rowKey="_id"
      />
      <Modal
        title={!isEdit ? "ADD USER" : "EDIT USER"}
        visible={isVisible}
        onCancel={hideModal}
        footer={null}
      >
        <Form
          form={form}
          {...layout}
          name="registration"
          initialValues={{
            name: "",
            email: ""
          }}
          onFinish={saveUserHandler}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Your name is required!"
              },
              {
               pattern: /^[A-Za-z]+[0-9]*$/, 
               message: "Please enter a valid name, ex: Bolo23" 
              }
            ]}
          >
            <Input />
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
            <Input />
          </Form.Item>

          {!isEdit ? (
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "The Password is required !"
                },
                {
                  min: 8,
                  message: "Password must contains at least 8 characters"
                },
                {
                  pattern: /[^\s+$]/,
                  message: "The Password is required !"
                }
              ]}
            >
              <Input.Password />
            </Form.Item>
          ) : null}
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default memo(User);
