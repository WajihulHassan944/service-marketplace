"use client";

import React, { useState, useEffect } from "react";
import "./gigform.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/redux/features/categorySlice"; // update path if needed

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

    // Reset dependent fields when parent changes
    if (id === "category") {
      setGigData((prev) => ({
        ...prev,
        category: value,
        subcategory: "",
        subcategorychild: ""
      }));
    } else if (id === "subcategory") {
      setGigData((prev) => ({
        ...prev,
        subcategory: value,
        subcategorychild: ""
      }));
    } else {
      setGigData((prev) => ({ ...prev, [id]: value }));
    }
  };

  // Get subcategories of selected category
  const selectedCategory = categories.find((cat) => cat.name === gigData.category);
  const subcategories = selectedCategory?.subcategories || [];

  // Get subcategorychild array
  const selectedSubcategory = subcategories.find((subcat) => subcat.name === gigData.subcategory);
  const subcategoryChildren = selectedSubcategory?.subcategories || [];

  return (
    <div className="gig-form-container">
      <h2 className="section-title">Gig Overview</h2>
<form
  onSubmit={(e) => {
    e.preventDefault();
    // HTML5 validation will block if required fields are empty
    onNext();
  }}
>
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
          required
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
             required
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
             required
            onChange={handleChange}
            disabled={!gigData.category}
          >
            <option value="">Select a Subcategory</option>
            {subcategories.map((subcat, idx) => (
              <option key={idx} value={subcat.name}>
                {subcat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {gigData.subcategory && (
        <div className="form-section">
          <label htmlFor="subcategorychild" className="form-label">
            Subcategory Child
          </label>
          <select
            id="subcategorychild"
            className="form-input"
            value={gigData.subcategorychild}
            onChange={handleChange}
             required
          >
            <option value="">Select a Subcategory Child</option>
            {subcategoryChildren.map((child, idx) => (
              <option key={idx} value={child}>
                {child}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="form-section two-columns">
        {/* <div>
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
        </div> */}

        <div>
          <label htmlFor="positiveKeywords" className="form-label">
            Positive keywords (comma separated)
          </label>
          <input
            type="text"
            id="positiveKeywords"
            className="form-input"
             required
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
        <button className="submit-btn" type="submit">
          Next
        </button>
      </div>
      </form>
    </div>
  );
};

export default GigForm;
