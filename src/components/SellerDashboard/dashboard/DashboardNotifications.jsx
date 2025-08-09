'use client';
import React, { useState, useEffect } from "react";
import { FiCreditCard, FiUsers, FiBell } from "react-icons/fi";
import Link from "next/link";
import { useSelector } from "react-redux";
import { baseUrl } from "@/const";

const DashboardNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(`${baseUrl}/notifications/me`, {
          credentials: "include",
        });
        const data = await res.json();
        const role = user.currentDashboard === "seller" ? "seller" : "buyer";
        const filtered = data
          .filter((n) => n.targetRole === role)
          .slice(0, 3); // Only last 3
        setNotifications(filtered);
      } catch (err) {
        console.error("Error fetching notifications", err);
      }
    };
    fetchNotifications();
  }, [user.currentDashboard]);

  return (
    <div className="card-buyer notifications-card">
      <div className="card-header-buyer notificationHeader">
        <h3>Notifications</h3>
      </div>

      {notifications.length === 0 ? (
        <div className="notification-item">No notifications.</div>
      ) : (
        notifications.map((note) => (
          <div
            key={note._id}
            className="notification-item"
            style={{ opacity: note.read ? 0.75 : 1, cursor: note.link ? "pointer" : "default" }}
            onClick={() => note.link && window.open(note.link, "_blank")}
          >
            <div className="notif-title">
              {note.type === "payment" ? (
                <FiCreditCard className="notif-icon" />
              ) : note.type === "contract" ? (
                <FiUsers className="notif-icon" />
              ) : (
                <FiBell className="notif-icon" />
              )}
              <strong>{note.title}</strong>
            </div>
            <p>
              {note.description.length > 100
                ? note.description.slice(0, 100) + "..."
                : note.description}
            </p>
            <span className="notif-time">
              {new Date(note.createdAt).toLocaleString()}
            </span>
          </div>
        ))
      )}

      <Link href="/notifications" className="see-all">
        See All ↝
      </Link>
    </div>
  );
};

export default DashboardNotification;
