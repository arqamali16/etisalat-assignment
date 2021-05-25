/**
 * @author Mohammed Arqam Ali Saad <arqam.ali16@gmail.com>
 * Login Page
 */
import React from "react";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Typography,
} from "antd";
import { useValues, useActions } from "kea";
import { withRouter } from "react-router-dom";

import Logo from "../Assets/etisalat_digital.png";
import Uaepass from "../Assets/uaepass.png";

import LoginLogic from "../Logics/LoginLogic";

const Login = (props: any) => {
  const { login } = useActions(LoginLogic);
  const { loginLoading } = useValues(LoginLogic);

  const onlogin = (values: any) => {
    login(values, props.history.push);
  };

  return (
    <div className="login-card">
      <Card
        className="card-align card-styling"
        style={{ backgroundColor: "#FAFAFA" }}
      >
        <Row justify="space-around" align="middle" gutter={[16, 24]}>
          <Col span={24} className="text-align-centre min-height-45">
            <Avatar
              shape="square"
              className="width-30"
              style={{ height: "100%" }}
              src={Logo}
            />
          </Col>
          <Col span={24} className="text-align-centre">
            <Typography.Title level={4}>User Login</Typography.Title>
          </Col>
          <Form style={{ width: "90%" }} onFinish={onlogin}>
            <Col span={24} className="text-align-centre uaepass-button">
              <Avatar
                shape="square"
                className="width-100 min-height-45 image-fill"
                src={Uaepass}
              />
            </Col>
            <Divider>or</Divider>
            <Form.Item
              name="email"
              key="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                placeholder="Email"
                className="border-radius min-height-40 boreder-color-green"
              />
            </Form.Item>
            <Form.Item
              key="passeword"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input
                type="password"
                placeholder="Password"
                className="border-radius min-height-40 boreder-color-green"
              />
            </Form.Item>
            <Form.Item key="passeword">
              <Button
                className="button-width"
                type="primary"
                htmlType="submit"
                loading={loginLoading}
              >
                Login
              </Button>
            </Form.Item>
            <Form.Item key="passeword">
              <Button type="link" className="button-align">
                Forgot Password
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </Card>
    </div>
  );
};

export default withRouter(Login);
