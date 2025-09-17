'use client';
import React, { useEffect, useState } from 'react';
import './manageJobs.css';
import JobCard from './ManageServices';
import { FaChevronDown } from "react-icons/fa";
import { baseUrl } from '@/const';
import withAdminAuth from '@/hooks/withAdminAuth';

const ManageServices = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("all services");

  // 🔥 Added requiresmodification option
  const options = ["all services", "active", "pending", "rejected"];

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  const fetchGigs = async () => {
    try {
      const res = await fetch(`${baseUrl}/gigs/all`);
      const data = await res.json();
      if (data.success) {
        // 🔥 Sort gigs: latest updated OR created first
        const sortedGigs = data.gigs.sort((a, b) => {
          const dateA = new Date(a.updatedAt || a.createdAt);
          const dateB = new Date(b.updatedAt || b.createdAt);
          return dateB - dateA;
        });
        setGigs(sortedGigs);
      }
    } catch (error) {
      console.error('Failed to fetch gigs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGigs();
  }, []);

  // 🔍 Filter gigs based on selected status
  const filteredGigs = selected === 'all services'
    ? gigs
    : gigs.filter((gig) => gig.status.toLowerCase() === selected.toLowerCase());

  return (
    <div className="manage-jobs-container">
      <div className="jobs-container-1">
        <h1>Manage Services</h1>
        <div className="breadcrumb-dropdown-special">
          <div
            className="breadcrumb"
            onClick={() => setIsOpen(!isOpen)}
          >
            {selected.charAt(0).toUpperCase() + selected.slice(1)}
            <FaChevronDown
              className={`dropdown-arrow ${isOpen ? "rotate" : ""}`}
              style={{ marginLeft: 8, transition: 'transform 0.3s ease' }}
            />
          </div>
          {isOpen && (
            <ul className="dropdown-menu-special">
              {options.map((option) => (
                <li
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`dropdown-item-special ${option === selected ? "active" : ""}`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="job-list">
        {loading ? (
          <p>Loading gigs...</p>
        ) : filteredGigs.length === 0 ? (
          <p>No gigs found.</p>
        ) : (
          filteredGigs.map((gig) => (
            <JobCard
              key={gig._id}
              gigId={gig._id}
              title={gig.gigTitle}
              postedDate={new Date(gig.updatedAt || gig.createdAt).toLocaleDateString()}
              status={gig.status}
              sellerName={`${gig.userId.firstName} ${gig.userId.lastName}`}
              sellerImage={gig.userId.profileUrl}
              refreshGigs={fetchGigs}
              modificationRequests={gig.modificationRequests}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default withAdminAuth(ManageServices);
