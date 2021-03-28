import '../scss/add-patient-modal.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Input,
  Form,
  Button,
  notification,
} from 'antd';

function AddPatientModal({ visible, onConfirm, onCancel }) {
  const user = JSON.parse(localStorage.getItem('user'));

  const addPatient = (values) => {
    const [firstName, lastName] = values.name.split(' ');

    const payload = JSON.stringify({
      firstName,
      lastName: lastName || '',
      email: values.email,
      age: values.age,
      ownerId: user.ownerId,
      lastVisit: new Date().toLocaleDateString(),
    });

    window
      .fetch('/patients/', {
        method: 'POST',
        body: payload,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.json())
      .then(() => {
        notification.success({
          message: 'Successfully added patient',
        });
        onConfirm();
      })
      .catch(() => {
        notification.error({
          message: 'Error adding patient',
          description:
            'An error occurred while adding this patient. Check your connection and try again',
        });
      });
  };

  return (
    <Modal
      className="add-patient-modal"
      title="Add Patient"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form layout="vertical" onFinish={addPatient} name="Add patient form">
        <Form.Item
          label="Patient Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please enter a name',
            },
          ]}
        >
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item
          label="Patient Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please enter an email',
            },
          ]}
        >
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item
          label="Patient Age"
          name="age"
          rules={[
            {
              required: true,
              message: 'Please enter an age',
            },
          ]}
        >
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" className="btn-cancel" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" className="btn-submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

AddPatientModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default AddPatientModal;
