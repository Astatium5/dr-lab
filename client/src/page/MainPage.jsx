import '../scss/main-page.scss';
import React from 'react';
import SideBar from '../components/SideBar';
import PatientCard from '../components/PatientCard';
import PatientProgress from '../components/PatientProgress';

const date = new Date().toLocaleDateString();
const patients = [
  {
    name: 'Jill Smith',
    location: 'Athens, GA',
    lastVisit: date,
    age: 32,
  },
  {
    name: 'Joe Schmuck',
    location: 'Chicago, IL',
    lastVisit: date,
    age: 48,
  },
  {
    name: 'Billy Bob',
    location: 'Miami, FL',
    lastVisit: date,
    age: 69,
  },
];

function MainPage() {
  return (
    <div>
      <SideBar>
        <p className="heading">Your Patients</p>
        <hr />
        {patients.map((patient) => (
          <PatientCard patient={patient} className="patient-card" />
        ))}
        <p className="heading">Assigned Patients</p>
        <hr />
        {patients.reverse().map((patient) => (
          <PatientCard patient={patient} className="patient-card" />
        ))}
      </SideBar>
      <div className="content">
        <PatientProgress status="waiting" />
      </div>
    </div>
  );
}

export default MainPage;
