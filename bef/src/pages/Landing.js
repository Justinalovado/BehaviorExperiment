import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { useState } from 'react';
import './Landing.css';
import LoginForm from '../components/LoginForm';


function Landing() {
	const [inLogin, setInLogin] = useState(false);
  const [inSignUp, setInSignUp] = useState(false);

  const handleLogin = () => {
    setInLogin(!inLogin);
  }
  
  const handleSignUp = () => {
    setInSignUp(!inSignUp);
  }
  

  return (
    <div className='choice-box'>
      <LoginForm showLogin={inLogin} setShowLogin={setInLogin}/>
      <button className='login-btn' onClick={handleLogin}>
        Login
      </button>
      <button className='signup-btn' onClick={(inSignUp)=>!inSignUp}>
        Sign up
      </button>
    </div>
  )
}





export default Landing;
