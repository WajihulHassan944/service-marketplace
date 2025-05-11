import { useRouter } from "next/navigation";
import "./MessagePopup.css";
import { FiMessageSquare } from "react-icons/fi";

const messages = [
  {
    username: "ulnurkhanov",
    name: "Ul N",
    message: "Me: Hi Sir, I hope you're doing well! I just wanted to check in and see",
    time: "2 weeks",
  },
  {
    username: "fyamilinsky",
    name: "fyamilinsky",
    message: "Me: Hi Sir, I hope you're doing well! I just wanted to check in and see",
    time: "2 weeks",
  },
  {
    username: "mpsconst",
    name: "mpsconst",
    message: "Me: construction-website-s2.vercel.app",
    time: "2 weeks",
  },
  {
    username: "industry76",
    name: "industry76",
    message: "Me: Got it! Once I achieve all the updates you requested then I will",
    time: "2 weeks",
  },
  {
    username: "mlrandabassag1",
    name: "mlrandabassag1",
    message: "Me: 👍",
    time: "2 weeks",
  },
];

const MessagePopup = ({ closePopup }) => {
  const router = useRouter();
  const handleSeeAll = () => {
    closePopup(); // Hide popup
    router.push("/messages");
  };
  return (
    <div className="message-popup">
      <div className="message-popup-header">
        <span className="message-popup-title"><FiMessageSquare /> Inbox (0)</span>
      </div>
      <div className="message-popup-list">
        {messages.map((msg, index) => (
          <div key={index} className="message-item">
            <img src="/assets/gigs/avatar.png" alt="avatar" className="message-avatar" />
            <div className="message-content">
              <div className="message-user">
                <strong>{msg.name}</strong> @{msg.username}
              </div>
              <div className="message-text">{msg.message.length > 60 ? msg.message.slice(0, 30) + "..." : msg.message}</div>
              <div className="message-time">{msg.time}</div>
            </div>
            <div className="message-status-dot" />
          </div>
        ))}
      </div>
      <div className="message-popup-footer" onClick={handleSeeAll}>
        See All In Inbox
      </div>
    </div>
  );
};

export default MessagePopup;
