import '../scss/add-patient-modal.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Input,
  Form,
  Button,
} from 'antd';

function AddPatientModal({ visible, onConfirm, onCancel }) {
  const addPatient = () => {
    // TODO
    onConfirm();
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
          required
          label="Patient Name"
          rules={{
            required: true,
            message: 'Please enter a name',
          }}
        >
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item
          required
          label="Patient Email"
          rules={{
            required: true,
            message: 'Please enter an email',
          }}
        >
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item
          required
          label="Patient Age"
          rules={{
            required: true,
            message: 'Please enter an age',
          }}
        >
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
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
