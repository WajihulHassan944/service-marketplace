'use client';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './HeroSection.css';

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState('find');

  return (
<div className='banner-section'>
<div className="hero">
      <div className="overlay">
        <h1 className="heading">
          Connecting clients in<br />
          need to freelancers<br />
          who deliver
        </h1>

        <div className="search-card">
          <div className="tab-buttons">
            <div className="tab-toggle-bg">
              <div
                className="tab-slider"
                style={{ left: activeTab === 'find' ? '4px' : '50%' }}
              />
              <button
                className={`tab ${activeTab === 'find' ? 'active-tab' : ''}`}
                onClick={() => setActiveTab('find')}
              >
                Hire talent
              </button>
              <button
                className={`tab ${activeTab === 'browse' ? 'active-tab' : ''}`}
                onClick={() => setActiveTab('browse')}
              >
                Buy Services
              </button>
            </div>
          </div>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by role, skills, or keywords"
              className="search-input"
            />
            <button className="search-button">
              <FiSearch className="search-icon" />
              <span className='toRemove'>Search</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  
</div>  
);
};

export default HeroSection;
