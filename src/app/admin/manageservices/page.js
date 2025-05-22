// ManageServices.jsx
import React from 'react';
import JobCard from './ManageServices';
import './manageJobs.css';

const jobData = [
  {
    title: 'Frontend React Developer',
    postedDate: '10 July, 2019',
    expiryDate: '10 August, 2019',
    status: 'Pending Approval',
    candidates: 0,
    sellerName: 'John Doe',
    sellerImage: '/assets/myimg.jpg'
  },
  {
    title: 'Full Stack PHP Developer',
    postedDate: '28 June, 2019',
    expiryDate: '28 July, 2019',
    status: 'Approved',
    candidates: 3,
    sellerName: 'Jane Smith',
    sellerImage: '/assets/myimg.jpg'
  }
];

const ManageServices = () => {
  return (
    <div className="manage-jobs-container">
      <div className="jobs-container-1">
        <h1>Manage Services</h1>
        <div className="breadcrumb">Pending Services</div>
      </div>
      <div className="job-list">
        {jobData.map((job, index) => (
          <JobCard key={index} {...job} />
        ))}
      </div>
    </div>
  );
};

export default ManageServices;
