'use client';
import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import { FaPaperclip, FaRegSmile, FaSun, FaBold, FaPaperPlane, FaVideo } from 'react-icons/fa';
import './Messages.css';
import ZoomPopup from './ZoomPopup/ZoomPopup';
import { baseUrl } from '@/const';
import { useSelector } from 'react-redux';
import LoadingPopup from './LoadingPopup/LoadingPopup';
import { FiCheckCircle } from "react-icons/fi";

const MessageChats = ({ senderId, receiverId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [showZoomPopup, setShowZoomPopup] = useState(false);
  const user = useSelector((state) => state.user);
 const [isLoading, setIsLoading] = useState(false);
const [loadingMessage, setLoadingMessage] = useState("Creating a meeting...");
const [successIcon, setSuccessIcon] = useState(null);

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const convRes = await fetch(`${baseUrl}/messages/user-conversations/${senderId}`);
        const convData = await convRes.json();
        const existingConv = convData.data.find(conv => conv.participant._id === receiverId);
        const convId = existingConv?.conversationId;

        const idToUse = convId || `${senderId}${receiverId}`;
        setConversationId(idToUse);

        const res = await fetch(`${baseUrl}/messages/conversation/${idToUse}`);
        const data = await res.json();
        if (data.success) setMessages(data.data);
      } catch (err) {
        console.error('Error loading messages:', err);
      }
    };

    if (senderId && receiverId) {
      fetchConversation();
    }
  }, [senderId, receiverId]);

  useEffect(() => {
    if (!conversationId) return;

    const pusher = new Pusher('810871192b5e575039f8', {
      cluster: 'us2',
    });

    const channel = pusher.subscribe('marketplace');
    channel.bind('new-message', (data) => {
      setMessages(prev => [...prev, data.message]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [conversationId]);

  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      const res = await fetch(`${baseUrl}/messages/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderId, receiverId, message })
      });

      const data = await res.json();
      if (data.success) {
        setMessage('');
      }
    } catch (err) {
      console.error('Send failed:', err);
    }
  };

  const handleZoomSubmit = async ({ topic, duration }) => {
 
  if (!topic || !duration || !user?._id || !receiverId) {
    alert("Missing required fields. Please check all values before submitting.");
    return;
  }
  setLoadingMessage("Creating a meeting...");
 setIsLoading(true);
  try {
    const res = await fetch(`${baseUrl}/zoom/create-meeting`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic,
        duration,
        userId: user._id,
        participantId: receiverId
      })
    });

    const data = await res.json();

    if (res.ok && data) {
    const zoomMessage = `
  <div style="border: 1px solid #2D8CFF; border-radius: 8px; padding: 12px; background-color: #f0f7ff; margin-top:10px;">
    <div style="font-weight: bold; font-size: 16px; color: #2D8CFF; margin-bottom: 6px;">
      🔗 Zoom Meeting Created
    </div>
    <div style="margin-bottom: 4px;">
      <strong style="color: #1c1c1c;">Topic:</strong> 
      <a href="${data.join_url}" target="_blank" style="color: #2D8CFF; text-decoration: underline;">
        ${data.topic}
      </a>
    </div>
    <div style="margin-bottom: 4px;">
      <strong style="color: #1c1c1c;">Meeting ID:</strong> ${data.meeting_id}
    </div>
    <div style="margin-bottom: 4px;">
      <strong style="color: #1c1c1c;">Password:</strong> ${data.password}
    </div>
    <div>
      <strong style="color: #1c1c1c;">Duration:</strong> ${data.duration} minutes
    </div>
  </div>
`;


      await fetch(`${baseUrl}/messages/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId,
          receiverId,
          message: zoomMessage
        })
      });
setLoadingMessage("Meeting created successfully!");
setSuccessIcon(<FiCheckCircle />);
    setTimeout(() => {
        setShowZoomPopup(false);
        setIsLoading(false);
        setSuccessIcon(null);
      }, 2000);
    } else {
      console.error("Zoom API returned non-ok response", data);
       setLoadingMessage("❌ Failed to create Zoom meeting.");
      setTimeout(() => setIsLoading(false), 2000);
    }
  } catch (err) {
    console.error('Zoom meeting creation failed:', err);
    setLoadingMessage("❌ An error occurred while creating the Zoom meeting.");
    setTimeout(() => setIsLoading(false), 2000);
  }
};


  return (
    <div className="chat-area">
      <div className="chat-header">
        <div className="chat-title">
          <h3>Chat</h3>
        </div>
        <div className="chat-actions">
          <FaVideo className="video-icon" onClick={() => setShowZoomPopup(true)} />
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg._id} className={`message ${msg.senderId._id === senderId ? 'outgoing' : 'incoming'}`}>
            <img src={msg.senderId.profileUrl || '/assets/users/placeholder.png'} alt={msg.senderId.firstName} />
            <div>
              <div><span className="sender">{msg.senderId.firstName}</span> <span className="time">{new Date(msg.createdAt).toLocaleTimeString()}</span></div>
              <p dangerouslySetInnerHTML={{ __html: msg.message }} />
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Send a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <div className="input-actions">
          <button className="send-btn" onClick={handleSend}>
            <FaPaperPlane />
          </button>
        </div>
      </div>

   {showZoomPopup && (
  isLoading ? (
    <LoadingPopup
      message={loadingMessage}
      icon={successIcon}
      onClose={() => setIsLoading(false)}
    />
  ) : (
    <ZoomPopup
      onClose={() => setShowZoomPopup(false)}
      onSubmit={handleZoomSubmit}
    />
  )
)}


    </div>
  );
};

export default MessageChats;
