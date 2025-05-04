import React from 'react';
import './Signup.css';
import Link from 'next/link';

const SignupForm = () => {
  return (
    <div className="signup-container">
      <h2>Sign up</h2>

      <div className="social-buttons">
      <button className="google-btn">
  <img src="/assets/google.jpeg" alt="Google" className="google-logo" />
  Continue with Google
</button>
      </div>

      <div className="divider">
        <span>or</span>
      </div>

      <form className="signup-form">
        <div className="name-fields">
          <input type="text" placeholder="First name" />
          <input type="text" placeholder="Last name" />
        </div>
        <input type="email" placeholder="Work email address" />
        <input type="password" placeholder="Password (8 or more characters)" />

        <select>
          <option>Pakistan</option>
          <option>United States</option>
          <option>United Kingdom</option>
          <option>India</option>
        </select>

        <button type="submit" className="submit-btn">
          Create my account
        </button>

        <p className="login-text">
          Already have an account? <Link href="/login">Log In</Link>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
