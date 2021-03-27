import '../scss/main-page.scss';
import React from 'react';
import SideBar from '../components/SideBar';

function MainPage() {
  return (
    <div>
      <SideBar />
      <div className="content">Hello World!</div>
    </div>
  );
}

export default MainPage;
