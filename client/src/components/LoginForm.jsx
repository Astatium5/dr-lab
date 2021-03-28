import React from 'react';
import '../scss/landing.scss';
import { useHistory } from 'react-router-dom';
import {
  Button, Form, Input, Typography,
} from 'antd';

const { Title, Paragraph } = Typography;

function LoginForm() {
  const history = useHistory();

  function login() {
    // TODO Interface with API
    history.push('/main');
  }

  return (
    <div className="login-form">
      <div className="form-logo">
        <Title>Dr. Lab</Title>
        <Paragraph>A modern review system for patient diagnostics.</Paragraph>
      </div>
      <Form
        name="Login Form"
        onFinish={login}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please enter email',
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
