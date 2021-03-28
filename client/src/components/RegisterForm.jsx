import React, { createRef, useState } from 'react';
import '../scss/landing.scss';
import PropTypes from 'prop-types';
import {
  Alert,
  Button, Form, Input, Space, Typography,
} from 'antd';

const { Title } = Typography;

function RegisterForm({ switchCard }) {
  const formRef = createRef();
  const [error, setError] = useState(null);

  function onRegister(value) {
    const tmp = { ...value };
    tmp.clinic = {
      name: value.clinicName,
      location: value.clinicLocation,
    };
    const payload = JSON.stringify(tmp);

    window.fetch('http://localhost:5000/users/register', {
      method: 'POST',
      body: payload,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (!response.ok) {
        setError('Account was not successfully created');
        return;
      }

      switchCard('login');
    })
      .catch(() => setError('Account was not successfully created'));
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
      <Title>Register</Title>
      <Form ref={formRef} name="register-form" onFinish={onRegister}>
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            {
              required: true,
              message: 'Please enter First Name',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            {
              required: true,
              message: 'Please enter Last Name',
            },
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
              message: 'Please enter Last Name',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Clinic Name"
          name="clinicName"
          rules={[
            {
              required: true,
              message: 'Please enter Clinic Name',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Clinic Location"
          name="clinicLocation"
          rules={[
            {
              required: true,
              message: 'Please enter Clinic Location',
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
              message: 'Please enter Password',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="Submit" className="btn-submit">
            Register
          </Button>
        </Form.Item>
      </Form>
      <Button type="primary" onClick={() => switchCard('login')} className="btn-submit">
        Back to Login
      </Button>
    </div>
  );
}

RegisterForm.propTypes = {
  switchCard: PropTypes.func.isRequired,
};

export default RegisterForm;
