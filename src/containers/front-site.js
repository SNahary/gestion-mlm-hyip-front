import React, { useEffect } from "react";
import emailjs from "emailjs-com";
import apiKeys from "../Email/apiKeys";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header/Header";
import {
  Card,
  Layout,
  Button,
  Row,
  Col,
  Form,
  Input,
  Collapse,
  message,
  BackTop
} from "antd";
import * as actions from "../../src/store/actions/index";
import {
  FacebookOutlined,
  TwitterOutlined,
  WhatsAppOutlined,
  InstagramOutlined,
  SendOutlined,
  StarFilled
} from "@ant-design/icons";

import "./front-site.css";

const { Panel } = Collapse;
const { TextArea } = Input;

const FrontSite = props => {
  const [form] = Form.useForm();
  const sites = useSelector(state => state.site.sites);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchSite());
  }, []);

  const sendMail = async formValues => {
    try {
      await emailjs.sendForm(
        apiKeys.EMAIL_SERVICE,
        apiKeys.TEMPLATE_ID,
        "#form",
        apiKeys.USER_ID
      );
      message.success("Email sent successfully ! Check your inbox");
      form.resetFields();
    } catch (error) {
      message.error("Sending error! Try again !");
    }
  };

  return (
    <div>
      <Header />
      <Layout style={{ margin: 0 }}>
        <section id="content">
          <div className="my-container">
            <h1 className="title">The best investment sites</h1>
            {sites.map(site => (
              <div key={site._id} className="site-card-border-less-wrapper">
                <Card
                  title={site.name}
                  bordered={false}
                  style={{ width: "100%" }}
                >
                      <p>{site.description}</p>
                      <h4>
                        Rating:{" "}
                        <StarFilled className="star" />
                        <StarFilled className="star" />
                        <StarFilled className="star" />
                        <StarFilled className="star" />
                        <StarFilled className="star" />
                      </h4>
                      <h4>Minimal spend: {site.minimumInvest} $</h4>
                      <h4>Minimum withdrawal: {site.minimumWithdrawal} $</h4>
                      <h4>Investment plan: {site.contrat}</h4>
                      <h4>Beginning date: {site.createdAt}</h4>
                  <Button type="link" className="my-btn my-btn-card">
                    <a href="#" target="_blank">
                      Visit
                    </a>
                  </Button>
                </Card>
              </div>
            ))}
          </div>
        </section>
        <section id="contact">
          <div className="my-container">
            <h1 className="title">Contact us</h1>
            <Collapse defaultActiveKey="0">
              <Panel header="Contact us for more informations" key="1">
                <Row style={{ width: '100%' }}>
                  <Col xs={2} sm={4} md={6}></Col>
                  <Col xs={20} sm={16} md={12}>
                    <Form
                      id="form"
                      form={form}
                      onFinish={sendMail}
                      initialValues={{
                        email: "",
                        message: ""
                      }}
                    >
                      <Form.Item
                        style={{ width: "100%" }}
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "Email addrress is required"
                          },
                          {
                            type: "email",
                            message: "Please, enter a valid email"
                          }
                        ]}
                      >
                        <Input placeholder="Email" name="email" />
                      </Form.Item>
                      <Form.Item
                        style={{ width: "100%" }}
                        name="message"
                        rules={[
                          {
                            required: true,
                            message: "Messages content is required"
                          },
                          {
                            pattern: /[A-Za-z]{2,}/,
                            message: 'Please enter a valid message'
                          }
                        ]}
                      >
                        <TextArea
                          rows={6}
                          placeholder="message"
                          name="message"
                        />
                      </Form.Item>
                      <Form.Item style={{ width: "100%" }}>
                        <Button
                          style={{ backgroundColor: 'crimson' }}
                          type="primary"
                          className="my-btn"
                          icon={<SendOutlined />}
                          htmlType="submit"
                        >
                          Send
                        </Button>
                      </Form.Item>
                    </Form>
                  </Col>
                  <Col xs={2} sm={4} md={6}></Col>
                </Row>
              </Panel>
            </Collapse>
          </div>
        </section>
      </Layout>
      <footer id="footer">
        <h5>
          Follow us on :
          <a href="https://twitter.com" target="_blank">
            <TwitterOutlined style={{ color: '#fff', fontSize: "16px" }} />
          </a>
          <a href="https://www.instagram.com" target="_blank">
            <InstagramOutlined style={{ color: '#fff', fontSize: "16px" }} />
          </a>
          <a href="https://www.facebook.com/groups/371715450569732" target="_blank">
            <FacebookOutlined style={{ color: '#fff', fontSize: "16px" }} />
          </a>
        </h5>
        <p style={{ marginTop: "10px" }}>
          Copyright &copy; 2021 <span style={{ color: "crimson" }}>SARO</span>
          INVEST
        </p>
      </footer>
      <BackTop />
    </div>
  );
};

export default FrontSite;
