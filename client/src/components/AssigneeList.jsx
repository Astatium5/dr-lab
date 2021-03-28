import '../scss/assignee-list.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  List,
  Button,
  Modal,
  Input,
} from 'antd';

function AssigneeList({ assignees }) {
  const [isModalVisible, setModalVisible] = useState(false);

  const closeModal = () => setModalVisible(false);
  const openModal = () => setModalVisible(true);

  return (
    <div className="assignee-list">
      <List
        itemLayout="horizontal"
        header={<div>Assignees</div>}
        dataSource={assignees}
        renderItem={(assignee) => (
          <List.Item>
            <List.Item.Meta
              avatar={(
                <Avatar>
                  <span className="avatar-initial">{assignee.name[0]}</span>
                </Avatar>
)}
              title={assignee.name}
              description={assignee.role}
            />
          </List.Item>
        )}
      />
      <Button type="primary" className="btn-add-assignee" onClick={openModal}>
        Add Assignee
      </Button>
      <Modal
        className="assignee-modal"
        title="Add Assignee"
        visible={isModalVisible}
        onOk={closeModal}
        onCancel={closeModal}
      >
        <p className="input-title">Email</p>
        <Input placeholder="jsmith@email" />
      </Modal>
    </div>
  );
}

AssigneeList.propTypes = {
  assignees: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      imgURL: PropTypes.string,
      role: PropTypes.string,
    }),
  ).isRequired,
};

export default AssigneeList;
