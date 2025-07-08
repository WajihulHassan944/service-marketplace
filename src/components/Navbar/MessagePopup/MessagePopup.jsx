'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { FiMessageSquare } from 'react-icons/fi';
import './MessagePopup.css';
import { baseUrl } from '@/const';

const MessagePopup = ({ closePopup }) => {
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const popupRef = useRef(null);

  useEffect(() => {
    if (user?._id) {
      fetch(`${baseUrl}/messages/user-conversations/${user._id}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            const recentFive = data.data
              .sort((a, b) => new Date(b.lastMessageCreatedAt) - new Date(a.lastMessageCreatedAt))
              .slice(0, 5);
            setConversations(recentFive);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [user]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        closePopup();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closePopup]);

  const handleClick = (receiverId) => {
    closePopup();
    router.push(`/messages?receiverId=${receiverId}`);
  };

  const renderPreview = (message) => {
    if (!message) return '';
    if (message.includes('Zoom Meeting Created')) {
      const topicMatch = message.match(/<a[^>]*>(.*?)<\/a>/);
      const durationMatch = message.match(/<strong>Duration:<\/strong>\s?(\d+)/);
      const topic = topicMatch ? topicMatch[1] : 'Zoom Meeting';
      const duration = durationMatch ? `${durationMatch[1]} min` : '';
      return `🔗 Zoom: ${topic} – ${duration}`;
    }
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = message;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  return (
    <div className="message-popup" ref={popupRef}>
      <div className="message-popup-header">
        <span className="message-popup-title"><FiMessageSquare /> Inbox ({conversations.length})</span>
      </div>
      <div className="message-popup-list">
        {loading ? (
          <p className="no-chats-message">Loading conversations...</p>
        ) : conversations.length === 0 ? (
          <p className="no-chats-message">No recent messages</p>
        ) : (
          conversations.map((conv) => (
            <div key={conv.conversationId} className="message-item" onClick={() => handleClick(conv.participant._id)}>
              <img
                src={conv.participant?.profileUrl || '/assets/users/placeholder.png'}
                alt={conv.participant?.firstName}
                className="message-avatar"
              />
              <div className="message-content">
                <div className="message-user">
                  <strong>{conv.participant?.firstName} {conv.participant?.lastName}</strong>
                </div>
                <div className="message-text">
                  {renderPreview(conv.lastMessage).slice(0, 40)}...
                </div>
                <div className="message-time">
                  {new Date(conv.lastMessageCreatedAt).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="message-popup-footer" onClick={() => {
        closePopup();
        router.push("/messages");
      }}>
        See All In Inbox
      </div>
    </div>
  );
};

export default MessagePopup;
