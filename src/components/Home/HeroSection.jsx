'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch } from 'react-icons/fi';
import './HeroSection.css'; // Spinner CSS will go here

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState('find'); // 'find' = Hire Talent, 'browse' = Buy Services
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSearch = () => {
    const trimmed = searchTerm.trim();
    if (!trimmed) return;

    const base = activeTab === 'browse' ? '/services' : '/Sellers';
    setIsLoading(true);
    router.push(`${base}?search=${encodeURIComponent(trimmed)}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const placeholder =
    activeTab === 'browse'
      ? 'Search by services, skills, or features'
      : 'Search by role, skills, or keywords';

  return (
    <div className="banner-section">
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={placeholder}
                className="search-input"
              />
              <button className="search-button" onClick={handleSearch} disabled={isLoading}>
                {isLoading ? (
                  <span className="spinner" />
                ) : (
                  <>
                    <FiSearch className="search-icon" />
                    <span className="toRemove">Search</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
