'use client';
import React, { useState } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { IoCheckmarkDoneOutline, IoTrashOutline } from 'react-icons/io5';
import './AdminNotifications.css';

const notificationsData = [
  {
    title: 'Author',
    description: 'Authors can manage and publish the content...',
    users: 2,
    unread: true
  },
  {
    title: 'Editor',
    description: 'Editors can manage and publish contents in sections...',
    users: 3,
    unread: false
  },
  {
    title: 'Super Admin',
    description: 'Super Admins can access and manage all features...',
    users: 1,
    unread: true
  },
  {
    title: 'Contributor',
    description: 'Contributors can submit content for review...',
    users: 4,
    unread: false
  },
  {
    title: 'Moderator',
    description: 'Moderators can manage community content...',
    users: 2,
    unread: true
  },
  {
    title: 'Manager',
    description: 'Managers oversee operations and reports...',
    users: 5,
    unread: false
  }
];

const AdminNotifications = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [showUnread, setShowUnread] = useState(false);
  const [selected, setSelected] = useState([]);

  const toggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const toggleSwitch = () => {
    setShowUnread(!showUnread);
  };

  const handleCheckboxChange = (index) => {
    if (selected.includes(index)) {
      setSelected(selected.filter(i => i !== index));
    } else {
      setSelected([...selected, index]);
    }
  };

  const filteredNotifications = showUnread
    ? notificationsData.filter((_, i) => notificationsData[i].unread)
    : notificationsData;

  return (
    <div className="admin-notifications">
      <div className="header">
        <div>
          <h2>Admin Notifications</h2>
          <p className="subtitle">List of notifications</p>
        </div>
        <button className="add-button">Delete All</button>
      </div>
<div className='notificationParentWrapAdmin'>
      <div className="controls">
        <span className={selected.length > 0 ? 'action-label' : 'label'}>
          {selected.length > 0 ? 'Delete selected notifications' : `${filteredNotifications.length} roles`}
        </span>
        <div className="unread-toggle">
          <label className="toggle-label">Only Show Unread</label>
          <label className="switch">
            <input type="checkbox" checked={showUnread} onChange={toggleSwitch} />
            <span className="slider round"></span>
          </label>
        </div>
      </div>

      <div className="item-list">
        {filteredNotifications.map((item, index) => (
          <div className="item" key={index}>
            <div className="col checkbox-col">
              <input
                type="checkbox"
                checked={selected.includes(index)}
                onChange={() => handleCheckboxChange(index)}
              />
            </div>
            <div className="col title-col">
              <span className="title">{item.title}</span>
              <span className="desc">{item.description}</span>
            </div>
            <div className="col users-col">
              <span className="user-count">
                {item.users} user{item.users > 1 && 's'}
              </span>
            </div>
            <div className="col menu-col">
              <div className="menu-wrapper">
                <button className="menu-button" onClick={() => toggleDropdown(index)}>
                  <HiDotsHorizontal />
                </button>
                {openDropdownIndex === index && (
                  <div className="dropdown">
                    <div className="dropdown-item">
                      <IoCheckmarkDoneOutline className="icon" />
                      <span>Mark as read</span>
                    </div>
                    <div className="dropdown-item delete">
                      <IoTrashOutline className="icon" />
                      <span>Delete</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div></div>
    </div>
  );
};

export default AdminNotifications;