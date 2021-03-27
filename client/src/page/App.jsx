import '../scss/App.scss';
import React from 'react';
import LoginForm from '../components/LoginForm';
import image from '../assets/landing.svg';

function App() {
  return (
    <div className="App">
      <div className="landing-login">
        <LoginForm />
      </div>
      <div className="landing-image">
        <img src={image} alt="" />
      </div>
    </div>
  );
}

export default App;
