import React, { useState } from 'react';
import '../scss/landing.scss';
import { useHistory } from 'react-router-dom';
import {
  Alert,
  Button, Form, Input, Typography, Space,
} from 'antd';
import PropTypes from 'prop-types';

const { Title, Paragraph } = Typography;

function LoginForm({ switchCard }) {
  const history = useHistory();

  const [error, setError] = useState(null);

  function login(values) {
    const payload = JSON.stringify(values);

    window.fetch('/users/', {
      method: 'POST',
      body: payload,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Could not login');
      }

      return response.json();
    })
      .then((json) => {
        localStorage.setItem('user', JSON.stringify(json));
        history.push('/main');
      })
      .catch(() => setError('An unknown error unknown.'));
  }

  return (
    <div className="login-form">
      {
        error ? (
          <Alert
            message="Error Occurred"
            description={error}
            type="error"
            action={(
              <Space>
                <Button size="small" type="ghost" />
              </Space>
          )}
            closable
          />
        ) : <></>
      }
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
          name="password"
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
      <Button type="primary" htmlType="Submit" onClick={() => switchCard('register')}>
        Register
      </Button>
    </div>
  );
}

LoginForm.propTypes = {
  switchCard: PropTypes.func.isRequired,
};

export default LoginForm;
