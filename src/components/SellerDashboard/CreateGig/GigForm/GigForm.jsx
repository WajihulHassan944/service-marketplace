"use client";

import React, { useState, useEffect } from "react";
import "./gigform.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/redux/features/categorySlice"; // update path based on your file structure

const GigForm = ({ onNext, gigData, setGigData }) => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector((state) => state.categories);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  const handleChange = (e) => {
    const { id, value } = e.target;

    // Reset subcategory when category changes
    if (id === "category") {
      setGigData((prev) => ({
        ...prev,
        category: value,
        subcategory: "", // reset subcategory
      }));
    } else {
      setGigData((prev) => ({ ...prev, [id]: value }));
    }
  };

  // Get subcategories of selected category
  const subcategories =
    categories.find((cat) => cat.name === gigData.category)?.subcategories || [];

  return (
    <div className="gig-form-container">
      <h2 className="section-title">Gig Overview</h2>

      <div className="form-section">
        <label htmlFor="gigTitle" className="form-label">
          Gig title
        </label>
        <input
          type="text"
          id="gigTitle"
          maxLength="80"
          className="form-input"
          placeholder="I will do something I'm really good at"
          value={gigData.gigTitle}
          onChange={handleChange}
        />
      </div>

      <div className="form-section two-columns">
        <div>
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            id="category"
            className="form-input"
            value={gigData.category}
            onChange={handleChange}
            disabled={status === "loading"}
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="subcategory" className="form-label">
            Subcategory
          </label>
          <select
            id="subcategory"
            className="form-input"
            value={gigData.subcategory}
            onChange={handleChange}
            disabled={!gigData.category}
          >
            <option value="">Select a Subcategory</option>
            {subcategories.map((subcat, idx) => (
              <option key={idx} value={subcat}>
                {subcat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-section two-columns">
        <div>
          <label htmlFor="searchTag" className="form-label">
            Search tags
          </label>
          <input
            type="text"
            id="searchTag"
            className="form-input"
            placeholder="e.g., logo design, brand"
            value={gigData.searchTag}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="positiveKeywords" className="form-label">
            Positive keywords (comma separated)
          </label>
          <input
            type="text"
            id="positiveKeywords"
            className="form-input"
            placeholder="e.g., professional, clean"
            value={gigData.positiveKeywords}
            onChange={handleChange}
          />
        </div>
      </div>

      <p className="note-text">
        ⚠️ Please note: Some categories require that sellers verify their skills.
      </p>

      <div className="submit-container-1">
        <button className="submit-btn-1" onClick={onNext}>
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default GigForm;
