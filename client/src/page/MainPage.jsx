import '../scss/main-page.scss';
import React from 'react';
import SideBar from '../components/SideBar';
import PatientCard from '../components/PatientCard';
import PatientProgress from '../components/PatientProgress';
import AssigneeList from '../components/AssigneeList';
import VisitList from '../components/VisitList';

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
        <VisitList />
        <AssigneeList assignees={assignees} />
      </div>
    </div>
  );
}

export default MainPage;
