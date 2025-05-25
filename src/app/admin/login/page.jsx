import React from 'react';
import './login.css';
import Image from 'next/image';

const Login = () => {
  return (
    <div className="login-container-admin">
      <div className="login-card">
        <div className="login-header">
          <Image src="/logo.png" alt="Modernize Logo" className="login-logo" width={70} height={70} style={{objectFit:'contain'}} />
          <h2 className="login-title">doTask Admin</h2>
        </div>
        <form className="login-form">
          <label>Username</label>
          <input type="text" placeholder="Enter username" />
          
          <label>Password</label>
          <input type="password" placeholder="Enter password" />
          
          <div className="login-options">
            <label className='rememberLabel'>
              <input type="checkbox" defaultChecked /> Remember this Device
            </label>
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>
          
          <button type="submit" className="login-button">Sign In</button>
          
          <div className="login-footer">
            Browse website? <a href="#">Click here</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
