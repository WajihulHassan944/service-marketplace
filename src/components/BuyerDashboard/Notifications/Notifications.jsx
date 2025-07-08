'use client';
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "@/const";
import "./notifications.css";
import {
  FiSettings,
  FiClipboard,
  FiMessageCircle,
  FiFileText,
  FiFolder,
  FiBell,
  FiUsers,
  FiCheck,
  FiX,
  FiRefreshCcw
} from "react-icons/fi";

const iconMap = {
  system: <FiSettings className="notif-icon" />,
  order: <FiClipboard className="notif-icon" />,
  custom: <FiMessageCircle className="notif-icon" />,
  note: <FiFileText className="notif-icon" />,
  portfolio: <FiFolder className="notif-icon" />,
  gig: <FiBell className="notif-icon" />,
  coworker: <FiUsers className="notif-icon" />,
};

const Notifications = () => {
  const user = useSelector((state) => state.user);
  const currentRole = user.currentDashboard === "seller" ? "seller" : "buyer";
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/notifications/me`, {
        credentials: "include"
      });
      const data = await res.json();
      setNotifications(data.filter((n) => n.targetRole === currentRole));
    } catch (err) {
      console.error("Error fetching notifications", err);
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
    setNotifications((prev) => prev.map((n) => n._id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = async (id) => {
    await fetch(`${baseUrl}/notifications/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    setNotifications((prev) => prev.filter((n) => n._id !== id));
  };

  return (
    <div className="notifications-wrapper-buyer">
      <div className="notifications-card-buyer">
        <div className="card-header notificationHeader" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3>Notifications</h3>
          <span
            style={{ cursor: "pointer", color: "#3d94ff", fontSize: "18px" }}
            className={loading ? "spinning" : ""}
            onClick={fetchNotifications}
          >
            <FiRefreshCcw />
          </span>
        </div>

        {loading ? (
          <div className="notification-item">Loading notifications...</div>
        ) : notifications.length === 0 ? (
          <div className="notification-item">No notifications.</div>
        ) : (
          notifications.map((note) => (
            <div
              key={note._id}
              className="notification-item"
              style={{ opacity: note.read ? 0.75 : 1, position: "relative", cursor:'pointer' }}
              onClick={() => note.link && window.open(note.link, "_blank")}
            >
              <div className="notif-title">
                {iconMap[note.type] || <FiBell className="notif-icon" />} <strong>{note.title}</strong>
              </div>
              <p>
                {note.description.length > 100 ? note.description.slice(0, 100) + "..." : note.description}
              </p>
              <span className="notif-time">{new Date(note.createdAt).toLocaleString()}</span>
              <div
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  display: "flex",
                  gap: "8px",
                  fontSize: "14px",
                  color: "#888",
                }}
                className="notif-actions"
              >
                {!note.read && (
                  <FiCheck
                    title="Mark as Read"
                    onClick={(e) => {
                      e.stopPropagation();
                      markAsRead(note._id);
                    }}
                    className="icon"
                  />
                )}
                <FiX
                  title="Delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(note._id);
                  }}
                  className="icon"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;