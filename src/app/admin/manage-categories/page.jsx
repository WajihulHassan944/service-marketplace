'use client';
import React, { useEffect, useState } from 'react';
import './ManageCategories.css';
import { FaHome, FaEdit, FaTrash } from 'react-icons/fa';
import { baseUrl } from '@/const';
const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [popupData, setPopupData] = useState(null);

  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const [image, setImage] = useState(null);
  const [subcategories, setSubcategories] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${baseUrl}/category/all`, { credentials: 'include' });
      const data = await res.json();
      setCategories(data.categories);
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('icon', icon);
    formData.append('subcategories', subcategories); // comma-separated
    if (image) formData.append('image', image);

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${baseUrl}/category/update/${editingId}` : `${baseUrl}/category/create`;

    try {
      const res = await fetch(url, {
        method,
        body: formData,
        credentials: 'include',
      });

      const data = await res.json();
      if (data.success) {
        await fetchCategories();
        resetForm();
      } else {
        alert(data.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  const handleEdit = (cat) => {
    setName(cat.name);
    setIcon(cat.icon);
    setSubcategories(cat.subcategories.join(', '));
    setEditingId(cat._id);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${baseUrl}/category/delete/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        await fetchCategories();
      } else {
        alert(data.message || 'Delete failed.');
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const resetForm = () => {
    setName('');
    setIcon('');
    setImage(null);
    setSubcategories('');
    setEditingId(null);
  };

  return (
    <div className="manage-categories">
      <h2>
        Categories <span className="subtitle">Gigs Categories</span>
      </h2>

      <div className="breadcrumb">
        <span className="dashboard-link"><FaHome className="icon-blue" /></span> / Categories
      </div>

      <div className="content-wrapper">
        {/* Left Form */}
        <div className="form-section">
          <label>Category Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Category Name" />

          <label>Icon (text-based):</label>
          <input type="text" value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="e.g., MdCategory" />

          <label>Upload Image:</label>
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

          <label>
            Sub Categories: <span className="note">(comma separated)</span>
          </label>
          <input
            type="text"
            value={subcategories}
            onChange={(e) => setSubcategories(e.target.value)}
            placeholder="e.g., Cricket, Football, MMA"
          />

          <button className="add-btn" onClick={handleSubmit}>
            {editingId ? 'Update Category' : 'Add Category'}
          </button>
        </div>

        {/* Right Table */}
        <div className="table-section">
          <table>
            <thead>
              <tr>
                <th>Sr #</th>
                <th>Category Name</th>
                <th>Gigs</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
          <tbody>
  {categories.length === 0 ? (
    <tr>
      <td colSpan="5" style={{ textAlign: 'center', padding: '1rem', color: 'gray' }}>
        No categories found.
      </td>
    </tr>
  ) : (
    categories.map((cat, idx) => (
      <tr key={cat._id}>
        <td>{idx + 1}</td>
        <td className="clickable" onClick={() => setPopupData(cat)}>
          {cat.name}
        </td>
        <td>{cat.gigCount}</td>
        <td>
          <button className="icon-button" onClick={() => handleEdit(cat)}>
            <FaEdit />
          </button>
        </td>
        <td>
          <button className="icon-button" onClick={() => handleDelete(cat._id)}>
            <FaTrash />
          </button>
        </td>
      </tr>
    ))
  )}
</tbody>
</table>
        </div>
      </div>

      {/* Subcategory Popup */}
      {popupData && (
        <div className="subcategory-popup">
          <div className="popup-content">
            <h4>Subcategories for {popupData.name}</h4>
            <ul>
              {popupData.subcategories.map((sub, i) => (
                <li key={i}>{sub}</li>
              ))}
            </ul>
            <button onClick={() => setPopupData(null)} className="add-btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCategories;
