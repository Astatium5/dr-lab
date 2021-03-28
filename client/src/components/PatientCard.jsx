import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';

import '../scss/main-page.scss';

/* eslint-disable */

function PatientCard({ patient, className, setPatient }) {
  return (
    <Card title={patient.firstName} className={className} onClick={() => setPatient(patient)}>
      <h5>
        Last Visit:
        {' '}
        {patient.lastVisit}
      </h5>
      <div className="card-age-label">
        <h3>{patient.age}</h3>
      </div>
    </Card>
  );
}

PatientCard.propTypes = {
  patient: PropTypes.shape({
    name: PropTypes.string,
    lastVisit: PropTypes.string,
    age: PropTypes.number,
  }).isRequired,
  className: PropTypes.string,
};

PatientCard.defaultProps = {
  className: '',
};

export default PatientCard;
