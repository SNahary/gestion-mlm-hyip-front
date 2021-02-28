import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import "antd/dist/antd.css";
import moment from 'moment'
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

const { TextArea } = Input;

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

const Site = props => {
  const [isVisible, setIsVisible] = useState(false);
  const [site, setSite] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const sites = useSelector(state => state.site.sites);
  const hasError = useSelector(state => state.site.saveError !== null);
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const success = () => {
    message.success("Site saved successfuly !");
  };

  const update = () => {
    message.success("Site updated successfuly!");
  };

  const saveSiteHandler = formValues => {
    let date = moment(new Date(formValues.createdAt))
    formValues.createdAt = date.format('YYYY-MM-DD') 
   
    if (isEdit) {
      dispatch(actions.editSite(site._id, formValues));
      console.log("hasError", hasError);
      if (!hasError) {
        update();
        hideModal();
      }
    } else {
      console.log(formValues);

        dispatch(actions.addSite(formValues));
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

  const editSiteHandler = site => {
    setSite(site);
    setIsEdit(true);
    showModal();
    form.setFieldsValue({
      name: site.name,
      description: site.description,
      minimumInvest: site.minimumInvest,
      minimumWithdrawal: site.minimumWithdrawal,
      createdAt: site.createdAt,
      contrat: site.contrat,
      link: site.link
    });
  };

  const removeSiteHandler = useCallback(
    site => {
      dispatch(actions.deleteSite(site));
      message.success("Site removed successfuly!");
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(actions.fetchSite());
  }, [dispatch]);

  const columns = [
    {
      title: "Name",
      key: "Name",
      dataIndex: "name"
    },
    {
      title: "Minimum deposit ($)",
      key: "minimumInvest",
      dataIndex: "minimumInvest"
    },
    {
      title: "Minimum withdrawal ($)",
      key: "minimumWithdrawal",
      dataIndex: "minimumWithdrawal"
    },
    {
      title: "Contrat",
      key: "contrat",
      dataIndex: "contrat"
    },
    {
      title: "Date de debut",
      key: "createdAt",
      dataIndex: "createdAt"
    },
    {
      title: "Action",
      render: (text, site) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              size="middle"
              icon={<EditOutlined />}
              onClick={() => editSiteHandler(site)}
            ></Button>
            <Popconfirm
              title="Are you sure to remove this site ? This action is irreversible"
              okText="Yes"
              cancelText="No"
              icon={<WarningOutlined />}
              onConfirm={() => removeSiteHandler(site)}
            >
              <Button
                type="primary"
                size="middle"
                icon={<DeleteOutlined />}
                danger
              ></Button>
            </Popconfirm>
          </Space>
        );
      }
    }
  ];

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>SITE MANAGEMENT</h2>
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
        dataSource={sites.reverse()}
        rowKey="_id"
      />

      <Modal
        title={!isEdit ? "ADD SITE" : "EDIT SITE"}
        visible={isVisible}
        onCancel={hideModal}
        footer={null}
        width="50%"
        centered="false"
      >
        <Form
          form={form}
          {...layout}
          name="Site enregistrement"
          initialValues={{
            name: "",
            description: "",
            minimumInvest: "",
            minimumWithdrawal: "",
            createdAt: "",
            contrat: "",
            link: ""
          }}
          onFinish={saveSiteHandler}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Site's name is required!"
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Site's description is required!"
              }
            ]}
          >
            <TextArea rows={5} />
          </Form.Item>
          <Form.Item
            label="Minimum deposit"
            name="minimumInvest"
            rules={[
              {
                required: true,
                message: "Minimum deposit is required!"
              }
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Minimum withdrawal"
            name="minimumWithdrawal"
            rules={[
              {
                required: true,
                message: "Minimum withdrawal is required!"
              }
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Contrat"
            name="contrat"
            rules={[
              {
                required: true,
                message: "Contrat of investment is required!"
              }
            ]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            label="Link"
            name="link"
            rules={[
              {
                required: true,
                message: "Link of the site is required!"
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Date de debut"
            name="createdAt"
            rules={[
              {
                required: true,
                message: "Date is required!"
              }
            ]}
          >
            <Input type="date" />
          </Form.Item>

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

export default Site;
