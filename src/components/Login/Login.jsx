import React from "react";
import "./Login.css";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Log in</h2>
        <input
          type="text"
          placeholder="Username or Email"
          className="login-input"
        />
        <button className="login-btn green-btn">Continue</button>

        <div className="separator">
          <hr />
          <span>or</span>
          <hr />
        </div>

        <button className="login-btn google-btn">
          <img src="/assets/google.jpeg" style={{borderRadius:'50%'}} alt="Google" className="google-icon" />
          Continue with Google
        </button>

        <div className="signup-text">
          <hr />
          <span>Don't have an account?</span>
          <hr />
        </div>
<Link href="register" className="navLink">
<button className="login-btn outline-btn">Sign Up</button></Link>
      </div>
    </div>
  );
};

export default LoginPage;
