import '../scss/App.scss';
import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import image from '../assets/landing.svg';
import RegisterForm from '../components/RegisterForm';

function App() {
  const [currentForm, setForm] = useState('login');

  const forms = {
    login: <LoginForm switchCard={setForm} />,
    register: <RegisterForm switchCard={setForm} />,
  };

  return (
    <div className="App">
      <div className="landing-login">
        {forms[currentForm]}
      </div>
      <div className="landing-image">
        <img src={image} alt="" />
      </div>
    </div>
  );
}

export default App;
