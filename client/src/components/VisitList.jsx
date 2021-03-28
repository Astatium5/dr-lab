/* eslint-disable */
import '../scss/visit-list.scss';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { List, Button, Modal, Calendar } from 'antd';

function VisitList({ patientId }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState('');
  const [visits, setVisits] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));

  const closeModal = () => setModalVisible(false);
  const openModal = () => setModalVisible(true);
  const addVisit = () => {
    const payload = JSON.stringify({
      patientId,
      date,
    });

    window
      .fetch('/visits', {
        method: 'POST',
        body: payload,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        setVisits(prevState => [...prevState, res])
      })
      .finally(() => setModalVisible(false))
  };

  useEffect(() => {
    if (!patientId) {
      return;
    }
    window
      .fetch(`/patients/${patientId}`)
      .then((res) => res.json())
      .then((json) => {
        const res = json.patient.visits;

        if (res) {
          console.log(res);
          setVisits(res);
        }
      });
  }, [patientId]);

  return (
    <div className="visit-list">
      <List
        dataSource={visits}
        header={<div>Visits</div>}
        renderItem={(item) => <List.Item>{item.date}</List.Item>}
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
  patientId: PropTypes.string.isRequired,
};
export default VisitList;
