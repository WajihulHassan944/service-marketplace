'use client';
import React, { useEffect, useState } from 'react';
import './ManageCategories.css';
import { FaHome, FaEdit, FaTrash } from 'react-icons/fa';
import { baseUrl } from '@/const';
import toast from 'react-hot-toast';
import withAdminAuth from '@/hooks/withAdminAuth';
const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [popupData, setPopupData] = useState(null);

  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const [image, setImage] = useState(null);
  const [subcategories, setSubcategories] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [nestedSubcategories, setNestedSubcategories] = useState([]);


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
const formattedSubcategories = nestedSubcategories.map((sub) => ({
  name: sub.name,
  subcategories: sub.subcategories.split(',').map((s) => s.trim()).filter(Boolean),
}));

formData.append('subcategories', JSON.stringify(formattedSubcategories));

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
        toast.error(data.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Submit error:', error);
    }
  };
const addSubcategory = () => {
  setNestedSubcategories([...nestedSubcategories, { name: '', subcategories: '' }]);
};

const updateSubcategoryName = (index, value) => {
  const updated = [...nestedSubcategories];
  updated[index].name = value;
  setNestedSubcategories(updated);
};

const updateSubSubcategories = (index, value) => {
  const updated = [...nestedSubcategories];
  updated[index].subcategories = value;
  setNestedSubcategories(updated);
};

const removeSubcategory = (index) => {
  const updated = [...nestedSubcategories];
  updated.splice(index, 1);
  setNestedSubcategories(updated);
};

const handleEdit = (cat) => {
  setName(cat.name);
  setIcon(cat.icon);
  setEditingId(cat._id);
  setNestedSubcategories(
    cat.subcategories.map((sub) => ({
      name: sub.name,
      subcategories: sub.subcategories.join(', ')
    }))
  );
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
        toast.error(data.message || 'Delete failed.');
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

const resetForm = () => {
  setName('');
  setIcon('');
  setImage(null);
  setNestedSubcategories([]);
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

          <label>Subcategories:</label>
{nestedSubcategories.map((sub, idx) => (
  <div key={idx} className="subcategory-group">
    <input
      type="text"
      placeholder="Subcategory Name"
      value={sub.name}
      onChange={(e) => updateSubcategoryName(idx, e.target.value)}
    />
    <input
      type="text"
      placeholder="Comma-separated sub-subcategories"
      value={sub.subcategories}
      onChange={(e) => updateSubSubcategories(idx, e.target.value)}
    />
    <button onClick={() => removeSubcategory(idx)} className="remove-btn">Remove</button>
  </div>
))}
<button className="add-btn" onClick={addSubcategory}>+ Add Subcategory</button>


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

    {popupData && (
  <div className="subcategory-popup">
    <div className="popup-content">
      <h4>Subcategories for {popupData.name}</h4>
      <ul>
        {popupData.subcategories.map((sub, i) => (
          <li key={i}>
            <strong>{sub.name}</strong>
            {sub.subcategories?.length > 0 && (
              <ul style={{ marginLeft: "1rem", listStyleType: "circle" }}>
                {sub.subcategories.map((nested, j) => (
                  <li key={j}>{nested}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <button onClick={() => setPopupData(null)} className="add-btn">Close</button>
    </div>
  </div>
)}

    </div>
  );
};

export default withAdminAuth(ManageCategories);