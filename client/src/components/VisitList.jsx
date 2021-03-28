/* eslint-disable */
import '../scss/visit-list.scss';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  List,
  Button,
  Modal,
  Calendar,
} from 'antd';

function VisitList({ visits }) {
  const [isModalVisible, setModalVisible] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const user = JSON.parse(localStorage.getItem('user'));

  console.log(user);

  // useEffect(() => {
  //   // eslint-disable-next-line no-unused-vars
  //   const user = JSON.parse(localStorage.getItem('user'));

  //   console.log(user);
  // }, []);

  const closeModal = () => setModalVisible(false);
  const openModal = () => setModalVisible(true);

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
        onOk={closeModal}
        onCancel={closeModal}
      >
        <Calendar
          fullscreen={false}
          onChange={(moment) => console.log(moment.format('l'))}
        />
      </Modal>
    </div>
  );
}

VisitList.propTypes = {
  visits: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default VisitList;
