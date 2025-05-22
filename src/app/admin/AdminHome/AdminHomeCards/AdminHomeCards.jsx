import React from 'react';
import './AdminHomeCards.css';
import Image from 'next/image';

const AdminHomeCards = () => {
  return (
    <div className="adminHomeCardsContainer">
      <div className="adminHomeCard reports">
        <div className="icon">
        <Image src='/assets/admin/icon-connect.svg' alt="icon" width={50} height={50} />
        </div>
        <h4>Reports</h4>
        <p>59</p>
      </div>

      <div className="adminHomeCard payroll">
        <div className="icon">
        <Image src='/assets/admin/icon-speech-bubble.svg' alt="icon" width={50} height={50} />
        </div>
        <h4>Payroll</h4>
        <p>$96k</p>
      </div>

      <div className="adminHomeCard events">
        <div className="icon">
        <Image src='/assets/admin/icon-favorites.svg' alt="icon" width={50} height={50} />
        </div>
        <h4>Events</h4>
        <p>696</p>
      </div>

      <div className="adminHomeCard projects">
        <div className="icon">
        <Image src='/assets/admin/icon-mailbox.svg' alt="icon"  width={50} height={50} />
        </div>
        <h4>Projects</h4>
        <p>356</p>
      </div>

      <div className="adminHomeCard clients">
        <div className="icon">
        <Image src='/assets/admin/icon-briefcase.svg' alt="icon" width={50} height={50} />
        </div>
        <h4>Clients</h4>
        <p>3,650</p>
      </div>

      <div className="adminHomeCard employees">
        <div className="icon">
        <Image src='/assets/admin/icon-user-male.svg' alt="icon" width={50} height={50} />
        </div>
        <h4>Employees</h4>
        <p>96</p>
      </div>
    </div>
  );
};

export default AdminHomeCards;
