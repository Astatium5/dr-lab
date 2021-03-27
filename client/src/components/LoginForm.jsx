import React from 'react';
import '../scss/landing.scss';
import {
  Button, Form, Input, Typography,
} from 'antd';

const { Title, Paragraph } = Typography;

function LoginForm() {
  function login() {

  }

  return (
    <div className="login-form">
      <div className="form-logo">
        <Title>Dr Lab</Title>
        <Paragraph>A modern review system for patient diagnostics.</Paragraph>
      </div>
      <Form
        name="Login Form"
        onFinish={login}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please enter username',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="Password"
          rules={[
            {
              required: true,
              message: 'Please enter password',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="Submit" className="btn-submit">
            Log In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginForm;
