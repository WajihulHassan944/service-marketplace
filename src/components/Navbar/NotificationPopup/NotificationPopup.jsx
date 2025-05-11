import { useRouter } from "next/navigation";
import "../MessagePopup/MessagePopup.css"; // reuse same CSS
import { FiBell } from "react-icons/fi";

const notifications = [
  {
    title: "New message from client",
    description: "You received a new message about your latest project.",
    time: "2 hours ago",
  },
  {
    title: "Project deadline extended",
    description: "Deadline for the ‘Landing Page Redesign’ has been extended.",
    time: "5 hours ago",
  },
  {
    title: "Payment received",
    description: "You’ve received $150 for the completed task.",
    time: "1 day ago",
  },
  {
    title: "New comment",
    description: "A client commented on your delivery file.",
    time: "2 days ago",
  },
];

const NotificationPopup = ({ closePopup }) => {
  const router = useRouter();

  const handleSeeAll = () => {
    closePopup();
    router.push("/buyer/notifications");
  };

  return (
    <div className="message-popup">
      <div className="message-popup-header">
        <span className="message-popup-title"><FiBell /> Notifications</span>
      </div>
      <div className="message-popup-list">
        {notifications.map((note, index) => (
          <div key={index} className="message-item">
            <div style={{ marginRight: "12px", fontSize: "20px", color: "#3d94ff" }} className="bellIconNotification">
              <FiBell />
            </div>
            <div className="message-content">
              <div className="message-user">
                <strong>{note.title}</strong>
              </div>
              <div className="message-text">
                {note.description.length > 30 ? note.description.slice(0, 30) + "..." : note.description}
              </div>
              <div className="message-time">{note.time}</div>
            </div>
            </div>
        ))}
      </div>
      <div className="message-popup-footer" onClick={handleSeeAll}>
        See All Notifications
      </div>
    </div>
  );
};

export default NotificationPopup;
