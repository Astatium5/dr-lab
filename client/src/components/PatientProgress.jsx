import React from 'react';
import PropTypes from 'prop-types';
import { Steps } from 'antd';

const { Step } = Steps;

const progress = ['waiting', 'in-progress', 'finished'];

// eslint-disable-next-line no-unused-vars
function PatientProgress({ status }) {
  console.log(progress.indexOf(status));

  return (
    <Steps progressDot current={progress.indexOf(status)}>
      <Step title="Waiting" description="Waiting for Medical Feedback." />
      <Step title="In Progress" description="The documents are being reviewed." />
      <Step title="Finished" description="Assessment has been made." />
    </Steps>
  );
}

PatientProgress.propTypes = {
  status: PropTypes.oneOf(progress).isRequired,
};

export default PatientProgress;
