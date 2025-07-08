import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiBell,
  FiRefreshCcw,
  FiCheck,
  FiX,
  FiSettings,
  FiClipboard,
  FiMessageCircle,
  FiFileText,
  FiFolder,
  FiUsers
} from "react-icons/fi";
import { useSelector } from "react-redux";
import "../MessagePopup/MessagePopup.css";
import { baseUrl } from "@/const";

const iconMap = {
  system: <FiSettings />,
  order: <FiClipboard />,
  custom: <FiMessageCircle />,
  note: <FiFileText />,
  portfolio: <FiFolder />,
  gig: <FiBell />,
  coworker: <FiUsers />,
};

const NotificationPopup = ({ closePopup }) => {
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const currentRole = user.currentDashboard === "seller" ? "seller" : "buyer";
  const popupRef = useRef(null);

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/notifications/latest`, {
        credentials: "include"
      });
      const data = await res.json();
      setNotifications(data.filter((n) => n.targetRole === currentRole));
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotifications();
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopup();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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

  const handleSeeAll = () => {
    closePopup();
    router.push("/notifications");
  };

  return (
    <div className="message-popup" ref={popupRef}>
      <div className="message-popup-header notification-header-custom">
        <span className="message-popup-title">
          <FiBell /> Notifications
        </span>
        <span className={`refresh-icon ${loading ? "spinning" : ""}`} onClick={fetchNotifications}>
          <FiRefreshCcw />
        </span>
      </div>
      <div className="message-popup-list">
        {loading ? (
          <div className="message-item">Loading notifications...</div>
        ) : notifications.length === 0 ? (
          <div className="message-item">No notifications.</div>
        ) : (
          notifications.map((note) => (
            <div
              key={note._id}
              className="message-item"
              onClick={() => note.link && window.open(note.link, "_blank")}
            >
              <div
                style={{ marginRight: "12px", fontSize: "20px", color: "#3d94ff" }}
                className="bellIconNotification"
              >
                {iconMap[note.type] || <FiBell />}
              </div>
              <div className="message-content">
                <div className="message-user" style={{ fontWeight: note.read ? 400 : 600 }}>
                  <strong>{note.title}</strong>
                </div>
                <div className="message-text">
                  {note.description.length > 30 ? note.description.slice(0, 30) + "..." : note.description}
                </div>
                <div className="message-time">{new Date(note.createdAt).toLocaleString()}</div>
              </div>
              <div className="notification-actions">
                {!note.read && (
                  <FiCheck
                    title="Mark as Read"
                    onClick={(e) => {
                      e.stopPropagation();
                      markAsRead(note._id);
                    }}
                  />
                )}
                <FiX
                  title="Delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(note._id);
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>
      <div className="message-popup-footer" onClick={handleSeeAll}>
        See All Notifications
      </div>
    </div>
  );
};

export default NotificationPopup;
