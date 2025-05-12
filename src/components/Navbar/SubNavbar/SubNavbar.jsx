import React, { useState, useRef } from 'react';
import './SubNavbar.css';

const categoriesData = [
  {
    name: 'Web, Mobile & Software Dev',
    subcategories: ['Frontend Development', 'Backend Development', 'Mobile Apps', 'Full Stack', 'DevOps']
  },
  {
    name: 'AI Services',
    subcategories: ['AI Chatbots', 'Machine Learning', 'Data Annotation', 'Computer Vision']
  },
  {
    name: 'Design & Creative',
    subcategories: ['Logo Design', 'UI/UX', 'Game Design', 'Animation', 'Branding']
  },
  {
    name: 'Writing',
    subcategories: ['Copywriting', 'Technical Writing', 'Blogs & Articles', 'Editing', 'Proofreading']
  },
  {
    name: 'Sales & Marketing',
    subcategories: ['SEO', 'Social Media Marketing', 'Email Campaigns', 'PPC Ads']
  },
  {
    name: 'More',
    subcategories: ['Translation', 'Legal Services', 'Accounting', 'Customer Support']
  }
];

const SubNavbar = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = (index) => {
    // Cancel any pending close timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setHoveredCategory(index);
  };

  const handleMouseLeave = () => {
    // Set a delay to hide the popup
    timeoutRef.current = setTimeout(() => {
      setHoveredCategory(null);
    }, 1500);
  };

  return (
    <div className="sub-navbar">
      {categoriesData.map((category, index) => (
        <div
          key={index}
          className="category-item"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          {category.name}
          {hoveredCategory === index && (
            <div
              className="popup"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <ul>
                {category.subcategories.map((sub, i) => (
                  <li key={i}>{sub}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SubNavbar;
