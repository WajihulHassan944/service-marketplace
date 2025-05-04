'use client';
import React, { useRef, useState } from 'react';
import {
  FaChevronLeft,
  FaChevronRight,
  FaGlobe,
  FaCogs,
  FaDesktop,
  FaHandsHelping,
  FaFigma,
  FaCode,
  FaRobot,
  FaDatabase,
  FaBug
} from 'react-icons/fa';
import './style.css';

export default function Filters() {
  const [proServices, setProServices] = useState(true);
  const scrollRef = useRef(null);

  const categories = [
    { name: 'Web Application', icon: <FaGlobe /> },
    { name: 'API & Integrations', icon: <FaCogs /> },
    { name: 'Desktop Applications', icon: <FaDesktop /> },
    { name: 'Help/Consultation', icon: <FaHandsHelping /> },
    { name: 'Figma to Web & App', icon: <FaFigma /> },
    { name: 'Custom Software', icon: <FaCode /> },
    { name: 'Automation Tools', icon: <FaRobot /> },
    { name: 'CRM Development', icon: <FaDatabase /> },
    { name: 'ERP Systems', icon: <FaDatabase /> },
    { name: 'Bug Fixing', icon: <FaBug /> },
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="container-filters">
      <div className="flex-col">
        <div className="breadcrumb">🏠 / Programming & Tech</div>
        <h1 className="title">Software Development</h1>
        <p className="subtitle">
          Add features to your website with custom web applications and extensions
          <span className="how-works"> ▶ How Fiverr Works</span>
        </p>
      </div>

      <div className="category-bar-wrapper">
        <div className="category-bar-scroll" ref={scrollRef}>
          {categories.map((item, index) => (
            <button key={index} className={`category-btn ${index === 0 ? 'active' : ''}`}>
              <div className="icon-circle">{item.icon}</div>
              <span className="nowrap">{item.name}</span>
            </button>
          ))}
        </div>
        <div className="arrow-group">
          <button className="arrow-btn" onClick={() => scroll('left')}>
            <FaChevronLeft />
          </button>
          <button className="arrow-btn" onClick={() => scroll('right')}>
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className="filters-parent">
        <div className="filters-actual-wrap">
          <select className="filter-select">
            <option>Service options</option>
            <option>Frontend</option>
            <option>Backend</option>
          </select>
          <select className="filter-select">
            <option>Seller details</option>
            <option>Top Rated</option>
            <option>Level 2</option>
          </select>
          <select className="filter-select">
            <option>Budget</option>
            <option>$5 - $50</option>
            <option>$50 - $200</option>
          </select>
          <select className="filter-select">
            <option>Delivery time</option>
            <option>24 Hours</option>
            <option>3 Days</option>
          </select>
        </div>

        <label className="toggle-label">
          <input
            type="checkbox"
            checked={proServices}
            onChange={() => setProServices(!proServices)}
          />
          <span className="switch" />
          <span>Pro services</span>
        </label>
      </div>

      <div className="results-sort">
        <span>383 results</span>
        <span className="sort">
          Sort by:
          <select className="sort-select">
            <option>Best selling</option>
            <option>Newest</option>
            <option>Price: Low to High</option>
          </select>
        </span>
      </div>
    </div>
  );
}
