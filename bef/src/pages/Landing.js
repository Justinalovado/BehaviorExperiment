import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { useState } from 'react';
import './Landing.css';


function Landing() {
	const [inLogin, setInLogin] = useState(0);
  
  return (
    <div className='choice-box'>
			<a href='/error' className='login-wrap'>
        <button className='login-btn'>Login</button>
      </a>
      <a href='/error' className='signup-wrap'>
        <button className='signup-btn'>Sign up</button>
      </a>
    </div>
  )
}

const handleLogin = () => {
	console.log('make user login');
};

const handleSignUp = () => {
	console.log('make user sign up');
};



export default Landing;
