'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '@/redux/features/categorySlice';
import { useRouter } from 'next/navigation';
import './SubNavbar.css';

const SubNavbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { categories, status, error } = useSelector((state) => state.categories);

  const [hoveredCategory, setHoveredCategory] = useState(null);
  const timeoutRef = useRef(null);
  const navbarRef = useRef(null);

  // Fetch categories
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  // Drag-to-scroll effect
  useEffect(() => {
    const el = navbarRef.current;
    if (!el) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      el.classList.add('dragging');
    };

    const handleMouseLeave = () => {
      isDown = false;
      el.classList.remove('dragging');
    };

    const handleMouseUp = () => {
      isDown = false;
      el.classList.remove('dragging');
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.5;
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener('mousedown', handleMouseDown);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('mouseup', handleMouseUp);
    el.addEventListener('mousemove', handleMouseMove);

    return () => {
      el.removeEventListener('mousedown', handleMouseDown);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('mouseup', handleMouseUp);
      el.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleMouseEnter = (index) => {
    clearTimeout(timeoutRef.current);
    setHoveredCategory(index);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setHoveredCategory(null), 500);
  };

  const handleCategoryClick = (category) => {
    router.push(`/services?category=${encodeURIComponent(category)}`);
  };

  const handleSubCategoryClick = (category, subCategory) => {
    router.push(
      `/services?category=${encodeURIComponent(category)}&subCategory=${encodeURIComponent(subCategory)}`
    );
  };

  if (status === 'loading') return <div className="sub-navbar">Loading categories...</div>;
  if (status === 'failed') return <div className="sub-navbar">Error: {error}</div>;

  return (
    <div className="sub-navbar" ref={navbarRef}>
      {categories.map((category, index) => (
        <div
          key={category._id}
          className="category-item"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <span onClick={() => handleCategoryClick(category.name)}>
            {category.name}
          </span>

          {hoveredCategory === index && (
            <div
              className="popup"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <ul>
                {category.subcategories?.map((sub, i) => (
                  <li
                    key={i}
                    onClick={() => handleSubCategoryClick(category.name, sub)}
                  >
                    {sub}
                  </li>
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
