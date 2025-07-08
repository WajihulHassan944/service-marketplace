'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import * as Icons from 'react-icons/fa';
import { FaChevronLeft, FaChevronRight, FaFolderOpen } from 'react-icons/fa';
import './style.css';
import { fetchCategories } from '@/redux/features/categorySlice';
import { FaThLarge } from 'react-icons/fa';

export default function Filters({ resultsCount }) {
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const { categories, status } = useSelector((state) => state.categories);
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentCategory = searchParams.get('category');
  const currentSubCategory = searchParams.get('subCategory');

  useEffect(() => {
    if (status === 'idle') dispatch(fetchCategories());
  }, [status, dispatch]);

  const updateQuery = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`?${params.toString()}`);
  };

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' });
    }
  };

  const selectedTitle = currentSubCategory || currentCategory || 'All Categories';
  const selectedIcon = currentCategory
    ? categories.find((cat) => cat.name === currentCategory)?.icon
    : null;
  const IconComponent = Icons[selectedIcon] || FaFolderOpen;

  return (
    <div className="container-filters">
      <div className="flex-col">
        <div className="breadcrumb">
          <IconComponent /> / {currentCategory || 'All Categories'}
          {currentSubCategory && ` / ${currentSubCategory}`}
        </div>
        <h1 className="title-gigs-page">{selectedTitle}</h1>
        <p className="subtitle">
          Add features to your website with custom web applications and extensions
          <span className="how-works"> ▶ How doTask Works</span>
        </p>
      </div>

      <div className="category-bar-wrapper">
        <div className="category-bar-scroll" ref={scrollRef}>
           <button
    className={`category-btn ${!currentCategory ? 'active' : ''}`}
    onClick={() => updateQuery('category', '')}
  >
    <div className="icon-circle">
      <FaThLarge />
    </div>
    <span className="nowrap">All Categories</span>
  </button>
          {categories.map((cat) => {
            const CatIcon = Icons[cat.icon] || FaFolderOpen;
            return (
              <button
                key={cat._id}
                className={`category-btn ${cat.name === currentCategory ? 'active' : ''}`}
                onClick={() => updateQuery('category', cat.name)}
              >
                <div className="icon-circle">
                  <CatIcon />
                </div>
                <span className="nowrap">{cat.name}</span>
              </button>
            );
          })}
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
          <select className="filter-select" onChange={(e) => updateQuery('service', e.target.value)}>
            <option value="">Service options</option>
            <option value="hourly">Hourly services</option>
          </select>

          <select className="filter-select" onChange={(e) => updateQuery('level', e.target.value)}>
            <option value="">Seller details</option>
            <option value="Top Rated">Top Rated</option>
            <option value="Level 2">Level 2</option>
            <option value="Level 1">Level 1</option>
            <option value="New seller">New Seller</option>
          </select>

          <select className="filter-select" onChange={(e) => updateQuery('budget', e.target.value)}>
            <option value="">Budget</option>
            <option value="5-50">$5 - $50</option>
            <option value="50-200">$50 - $200</option>
          </select>

          <select className="filter-select" onChange={(e) => updateQuery('delivery', e.target.value)}>
            <option value="">Delivery time</option>
            <option value="1">24 Hours</option>
            <option value="3">3 Days</option>
          </select>
        </div>

        <label className="toggle-label">
          <input
            type="checkbox"
            checked={searchParams.get('service') === 'hourly'}
            onChange={(e) =>
              updateQuery('service', e.target.checked ? 'hourly' : 'fixed')
            }
          />
          <span className="switch" />
          <span>Hourly services</span>
        </label>
      </div>

      <div className="results-sort">
        <span>{resultsCount} results</span>
        <span className="sort">
          Sort by:
          <select className="sort-select" onChange={(e) => updateQuery('sort', e.target.value)}>
            <option value="oldest">Oldest</option>
            <option value="newest">Newest</option>
            <option value="lowToHigh">Price: Low to High</option>
          </select>
        </span>
      </div>
    </div>
  );
}
