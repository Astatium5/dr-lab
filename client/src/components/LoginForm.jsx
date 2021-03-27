import React from 'react';
import '../scss/landing.scss';
import { Button, Form, Input } from 'antd';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

function LoginForm() {
  function login() {

  }

  return (
    <div className="login-form">
      <Form
        layout={layout}
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
          <Button type="primary" htmlType="Submit">
            Log In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginForm;
