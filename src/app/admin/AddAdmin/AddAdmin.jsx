import Link from 'next/link';
import './addadmin.css';
import { FiMail, FiLock } from 'react-icons/fi';

export default function AddAdmin() {
  return (
    <div className="login-wrapper">
      <div className="login-header">
        <h1 className="login-heading">Add Admin</h1>
        <Link href='/admin/SeeAllAdmin'><button className="admin-button">See All Admin</button></Link>
    </div>

      <div className="login-card">
       <h2 className='heading-form'>We're glad to see you again!</h2>
          <form className="login-form">
  <div className="input-group">
    <label htmlFor="email" className="input-label">Email Address</label>
    <div className="input-wrapper">
      <FiMail className="icon" />
      <input id="email" type="email" placeholder="Enter your email" required />
    </div>
  </div>

  <div className="input-group">
    <label htmlFor="password" className="input-label">Password</label>
    <div className="input-wrapper">
      <FiLock className="icon" />
      <input id="password" type="password" placeholder="Enter your password" required />
    </div>
  </div>

  <button type="submit" className="login-button">Send Email</button>
</form>

          
      </div>
    </div>
  );
}
