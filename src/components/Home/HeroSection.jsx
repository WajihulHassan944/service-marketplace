'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch } from 'react-icons/fi';
import Image from 'next/image';
import './HeroSection.css';
import { baseUrl } from '@/const';
const HeroSection = () => {
  const [activeTab, setActiveTab] = useState('find');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allGigs, setAllGigs] = useState([]);
  const [allSellers, setAllSellers] = useState([]);
  const router = useRouter();
  const timeoutRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gigsRes, sellersRes] = await Promise.all([
          fetch(`${baseUrl}/gigs/all`),
          fetch(`${baseUrl}/users/sellers`),
        ]);
        const gigsData = await gigsRes.json();
        const sellersData = await sellersRes.json();

        setAllGigs(gigsData.gigs || []);
        setAllSellers(sellersData.users || []);
      } catch (err) {
        console.error('Error loading suggestions:', err);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (term = searchTerm) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    const base = activeTab === 'browse' ? '/services' : '/Sellers';
    setIsLoading(true);
    router.push(`${base}?search=${encodeURIComponent(trimmed)}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
      setShowSuggestions(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (!value) {
      setSuggestions([]);
      return;
    }

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      const list = activeTab === 'browse' ? allGigs : allSellers;

      const filtered = list.filter((item) => {
        const textToSearch =
          activeTab === 'browse'
            ? `${item.gigTitle} ${item.gigDescription} ${item.category} ${item.subcategory} ${item.searchTag || ''}`
            : `${item.firstName} ${item.lastName} ${item.sellerDetails?.speciality || ''} ${(item.sellerDetails?.skills || []).join(' ')}`;

        return textToSearch.toLowerCase().includes(value.toLowerCase());
      });

      const mapped = filtered.slice(0, 6).map((item) => {
        if (activeTab === 'browse') {
          const image = item.images?.[0]?.url || '/default-gig.jpg';
          const price = item.packages?.basic?.price || item.packages?.standard?.price || 'N/A';
          return {
            label: item.gigTitle,
            image,
            extra: `From $${price}`,
            fullItem: item,
          };
        } else {
          const image = item.profileUrl || '/default-user.jpg';
          const speciality = item.sellerDetails?.speciality || 'No speciality';
          return {
            label: `${item.firstName} ${item.lastName}`,
            image,
            extra: speciality,
            fullItem: item,
          };
        }
      });

      setSuggestions(mapped);
      setShowSuggestions(true);
    }, 300);
  };

  const placeholder =
    activeTab === 'browse'
      ? 'Search by services, skills, or features'
      : 'Search by role, skills, or keywords';

  return (
    <div className="banner-section">
      <div className="hero">
        <div className="overlay">
          {searchTerm === '' && (
            <h1 className="heading">
              Connecting clients in<br />
              need to freelancers<br />
              who deliver
            </h1>
          )}

          <div className="search-card">
            <div className="tab-buttons">
              <div className="tab-toggle-bg">
                <div
                  className="tab-slider"
                  style={{ left: activeTab === 'find' ? '4px' : '50%' }}
                />
                <button
                  className={`tab ${activeTab === 'find' ? 'active-tab' : ''}`}
                  onClick={() => {
                    setActiveTab('find');
                    setSuggestions([]);
                    setSearchTerm('');
                  }}
                >
                  Hire talent
                </button>
                <button
                  className={`tab ${activeTab === 'browse' ? 'active-tab' : ''}`}
                  onClick={() => {
                    setActiveTab('browse');
                    setSuggestions([]);
                    setSearchTerm('');
                  }}
                >
                  Buy Services
                </button>
              </div>
            </div>

            <div className="search-bar" style={{ position: 'relative' }}>
              <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                placeholder={placeholder}
                className="search-input"
                onFocus={() => searchTerm && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              />
              <button className="search-button" onClick={() => handleSearch()} disabled={isLoading}>
                {isLoading ? (
                  <span className="spinner" />
                ) : (
                  <>
                    <FiSearch className="search-icon" />
                    <span className="toRemove">Search</span>
                  </>
                )}
              </button>

              {showSuggestions && suggestions.length > 0 && (
  <div className="expanded-suggestions">
    {suggestions.map((item, idx) => (
      <div
        key={idx}
        className="expanded-suggestion-item"
        onMouseDown={() => handleSearch(item.label)}
      >
        <div className="left-text"> <Image
            src={item.image}
            alt="suggestion-thumb"
            width={32}
            height={32}
            className='user-img'
          />{item.label}
        
        </div>
        <div className="right-meta">
          <span className="meta-text">{item.extra}</span>
        </div>
      </div>
    ))}
  </div>
)}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
