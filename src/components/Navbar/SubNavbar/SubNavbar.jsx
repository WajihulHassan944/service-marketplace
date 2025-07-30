'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './SubNavbar.css';
import { baseUrl } from '@/const';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '@/redux/features/categorySlice';
const SubNavbar = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const timeoutRef = useRef(null);
  const navbarRef = useRef(null);
  const router = useRouter();


  const dispatch = useDispatch();
  const { categories, status } = useSelector((state) => state.categories);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);


  // Drag-to-scroll
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
    timeoutRef.current = setTimeout(() => setHoveredCategory(null), 400);
  };
const handleClick = ({ category, sub, child }) => {
  setHoveredCategory(null); // 👈 Hide megamenu on click
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (sub) params.append('sub', sub);
  if (child) params.append('child', child);
  router.push(`/services?${params.toString()}`);
};


  return (
   <div className="sub-navbar" ref={navbarRef} key={hoveredCategory === null ? 'closed' : 'open'}>

      {categories.map((category, index) => (
        <div
          key={category._id}
          className="category-item"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <span onClick={() => handleClick({ category: category.name })}>
            {category.name}
          </span>

          {hoveredCategory === index && category.subcategories.length > 0 && (
            <div
              className="mega-menu"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {category.subcategories.map((sub, i) => (
                <div key={i} className="mega-column">
                  <h4 onClick={() => handleClick({ category: category.name, sub: sub.name })}>
                    {sub.name}
                  </h4>
                  <ul>
                    {sub.subcategories.map((child, j) => (
                      <li
                        key={j}
                        onClick={() =>
                          handleClick({
                            category: category.name,
                            sub: sub.name,
                            child: child,
                          })
                        }
                      >
                        {child}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SubNavbar;
