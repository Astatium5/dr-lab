import '../scss/main-page.scss';
import React, { useState, useEffect } from 'react';
import { Avatar, Button, Typography } from 'antd';
import SideBar from '../components/SideBar';
import PatientCard from '../components/PatientCard';
import PatientProgress from '../components/PatientProgress';
import AssigneeList from '../components/AssigneeList';
import VisitList from '../components/VisitList';
import AddPatientModal from '../components/AddPatientModal';
import PhotoGallery from '../components/PhotoGallery';
import Comments from '../components/Comments';

const { Title } = Typography;

// const date = new Date().toLocaleDateString();
// const patients = [
//   {
//     name: 'Jill Smith',
//     lastVisit: date,
//     age: 32,
//   },
//   {
//     name: 'Joe Schmuck',
//     lastVisit: date,
//     age: 48,
//   },
//   {
//     name: 'Billy Bob',
//     lastVisit: date,
//     age: 69,
//   },
// ];

const assignees = [
  {
    name: 'John Jones',
    imgURL: 'https://www.stockvault.net/data/2015/09/01/177580/preview16.jpg',
    role: 'Cardiologist',
  },
  {
    name: 'Ryan Baker',
    imgURL: 'https://www.stockvault.net/data/2015/09/01/177580/preview16.jpg',
    role: 'Gynecologist',
  },
];

const visits = ['12/25/21', '12/25/21', '12/25/21', '12/25/21'];

const comments = [
  // {
  //   author: 'jsmith@example.org',
  //   content: "Well, actually, I think it's literally cancer LMAO",
  // },
];

function MainPage() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [patients, setPatients] = useState([]);
  const [currentPatient, setPatient] = useState(null);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const userID = JSON.parse(localStorage.user).ownerId;

  useEffect(() => {
    const payload = JSON.stringify({
      email: userID,
    });

    window.fetch('/users/getPatients', {
      method: 'POST',
      body: payload,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((patientRes) => {
        console.log(patientRes);
        setPatient(patientRes.patients[0]);
        setPatients(patientRes.patients);
      });
  }, []);

  return (
    <div className="main-page">
      <SideBar>
        <div className="sidebar-content">
          <p className="heading">Your Patients</p>
          <hr />
          {patients.map((patient) => (
            <PatientCard setPatient={setPatient} patient={patient} className="patient-card" />
          ))}
          <p className="heading">Requested Reviews</p>
          <hr />
          {patients.reverse().map((patient) => (
            <PatientCard setPatient={setPatient} patient={patient} className="patient-card" />
          ))}
        </div>
        <Button className="btn-add-patient" type="primary" onClick={openModal}>
          Add Patient
        </Button>
      </SideBar>
      <div className="content">
        <div className="container-header">
          <Avatar size={64} src="" className="avatar">
            <span className="avatar-initial">
              {
              currentPatient ? currentPatient.firstName[0] : 'Loading..'
            }
            </span>
          </Avatar>
          <Title className="title-header">
            {
            currentPatient ? currentPatient.firstName : 'Loading..'
          }
          </Title>
        </div>

        <PatientProgress status="waiting" />
        <div className="content-container">
          <VisitList visits={visits} />
          <div>
            <PhotoGallery visitID="test" />
            <Comments comments={comments} />
          </div>
          <AssigneeList assignees={assignees} />
        </div>
      </div>
      <AddPatientModal
        visible={isModalVisible}
        onCancel={closeModal}
        onConfirm={closeModal}
      />
    </div>
  );
}

export default MainPage;
