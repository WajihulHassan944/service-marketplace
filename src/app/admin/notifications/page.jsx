'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiDotsHorizontal } from 'react-icons/hi';
import { IoCheckmarkDoneOutline, IoTrashOutline } from 'react-icons/io5';
import { FiRefreshCcw } from 'react-icons/fi';
import './AdminNotifications.css';
import { baseUrl } from '@/const';
import withAdminAuth from '@/hooks/withAdminAuth';

const AdminNotifications = () => {
  const user = useSelector((state) => state.user);
  const currentRole = user.currentDashboard === "superadmin" ? "superadmin" : "admin";

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showUnread, setShowUnread] = useState(false);
  const [selected, setSelected] = useState([]);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/notifications/me`, {
        credentials: "include"
      });
      const data = await res.json();
      console.log("data is",data);
      const filtered = data.filter((n) => n.targetRole === currentRole);
      setNotifications(filtered);
    } catch (error) {
      console.error("Error fetching notifications", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    await fetch(`${baseUrl}/notifications/read/${id}`, {
      method: "PUT",
      credentials: "include",
    });
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = async (id) => {
    await fetch(`${baseUrl}/notifications/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    setNotifications((prev) => prev.filter((n) => n._id !== id));
  };

  const deleteSelectedNotifications = async () => {
    try {
      await fetch(`${baseUrl}/notifications/notifications`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ ids: selected }),
      });
      setNotifications((prev) => prev.filter((n) => !selected.includes(n._id)));
      setSelected([]);
    } catch (error) {
      console.error("Error deleting selected notifications", error);
    }
  };

  const deleteAllNotifications = async () => {
    try {
      await fetch(`${baseUrl}/notifications/notifications/all`, {
        method: "DELETE",
        credentials: "include",
      });
      setNotifications([]);
      setSelected([]);
    } catch (error) {
      console.error("Error deleting all notifications", error);
    }
  };

  const toggleSwitch = () => setShowUnread(!showUnread);

  const handleCheckboxChange = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((i) => i !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const toggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const filteredNotifications = showUnread
    ? notifications.filter((n) => !n.read)
    : notifications;

  return (
    <div className="admin-notifications">
      <div className="header">
        <div>
          <h2>Admin Notifications</h2>
          <p className="subtitle">List of notifications</p>
        </div>
        <button className="add-button" onClick={deleteAllNotifications}>Delete All</button>
      </div>

      <div className="notificationParentWrapAdmin">
        <div className="controls">
          <span className={selected.length > 0 ? 'action-label' : 'label'}>
            {selected.length > 0
              ? <span onClick={deleteSelectedNotifications} style={{ cursor: 'pointer', color: 'red' }}>Delete selected notifications</span>
              : `${filteredNotifications.length} notifications`}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FiRefreshCcw
              className={`refresh-icon-admin ${loading ? 'spinning' : ''}`}
              onClick={fetchNotifications}
              style={{ cursor: 'pointer', fontSize: '18px' }}
            />
            <div className="unread-toggle">
              <label className="toggle-label">Only Show Unread</label>
              <label className="switch">
                <input type="checkbox" checked={showUnread} onChange={toggleSwitch} />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="item-list">
          {filteredNotifications.map((item, index) => (
            <div
              className="item"
              key={item._id}
              style={{ opacity: item.read ? 0.5 : 1 }}
            >
              <div className="col checkbox-col">
                <input
                  type="checkbox"
                  checked={selected.includes(item._id)}
                  onChange={() => handleCheckboxChange(item._id)}
                />
              </div>
              <div className="col title-col">
                <span className="title">{item.title}</span>
                <span className="desc">{item.description}</span>
              </div>
              <div className="col users-col">
                <span className="user-count">
                  {new Date(item.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="col menu-col">
                <div className="menu-wrapper">
                  <button className="menu-button" onClick={() => toggleDropdown(index)}>
                    <HiDotsHorizontal />
                  </button>
                  {openDropdownIndex === index && (
                    <div className="dropdown">
                      {!item.read && (
                        <div className="dropdown-item" onClick={() => markAsRead(item._id)}>
                          <IoCheckmarkDoneOutline className="icon" />
                          <span>Mark as read</span>
                        </div>
                      )}
                      <div className="dropdown-item delete" onClick={() => deleteNotification(item._id)}>
                        <IoTrashOutline className="icon" />
                        <span>Delete</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default withAdminAuth(AdminNotifications);
