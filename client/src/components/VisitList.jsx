/* eslint-disable */
import '../scss/visit-list.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  List,
  Button,
  Modal,
  Calendar,
  notification,
} from 'antd';

function VisitList({ visits }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));

  const closeModal = () => setModalVisible(false);
  const openModal = () => setModalVisible(true);
  const addVisit = () => {
    // window.fetch('/users/', {
    //   method: 'POST',
    //   body: payload,
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
  };

  return (
    <div className="visit-list">
      <List
        dataSource={visits}
        header={<div>Visits</div>}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
      <Button type="primary" className="btn-add" onClick={openModal}>
        Add Visit
      </Button>
      <Modal
        className="date-modal"
        title="Choose Visit Date"
        visible={isModalVisible}
        onOk={addVisit}
        onCancel={closeModal}
      >
        <Calendar
          fullscreen={false}
          onChange={(moment) => setDate(moment.format('l'))}
        />
      </Modal>
    </div>
  );
}

VisitList.propTypes = {
  visits: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default VisitList;
