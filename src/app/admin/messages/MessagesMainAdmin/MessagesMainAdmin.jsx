'use client';
import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import Image from "next/image";
import { FiMessageCircle, FiSend, FiPaperclip, FiSearch } from "react-icons/fi";
import "./MessagesMainAdmin.css";

const SUPERADMIN_ID = "6836a8ab3503274446274b32";
const API_BASE = "https://backend-service-marketplace.vercel.app/api";

const MessagesMainAdmin = () => {
  const [admin, setAdmin] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [receiver, setReceiver] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch superadmin info
  useEffect(() => {
    const fetchAdmin = async () => {
      const res = await fetch(`${API_BASE}/users/getUserById/${SUPERADMIN_ID}`);
      const data = await res.json();
      if (data.success) setAdmin(data.data);
    };
    fetchAdmin();
  }, []);

  // Fetch all conversations for superadmin
  useEffect(() => {
    if (!admin) return;
    const fetchConversations = async () => {
      const res = await fetch(`${API_BASE}/messages/user-conversations/${SUPERADMIN_ID}`);
      const data = await res.json();
      if (data.success) setConversations(data.data);
    };
    fetchConversations();
  }, [admin]);

  // Fetch messages for selected conversation
  useEffect(() => {
    if (!conversationId) return;
    const fetchMessages = async () => {
      const res = await fetch(`${API_BASE}/messages/conversation/${conversationId}`);
      const data = await res.json();
      if (data.success) setMessages(data.data);
    };
    fetchMessages();
  }, [conversationId]);

  // 🔴 Pusher real-time message listener
  useEffect(() => {
    if (!conversationId) return;

    const pusher = new Pusher('810871192b5e575039f8', {
      cluster: 'us2',
    });

    const channel = pusher.subscribe('marketplace');
    channel.bind("new-message", (data) => {
      setMessages(prev => [...prev, data.message]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [conversationId]);

  const handleSelectReceiver = (user, convId) => {
    setReceiver(user);
    setConversationId(convId);
  };

  const handleSend = async () => {
    if (!message.trim() || !receiver) return;

    const res = await fetch(`${API_BASE}/messages/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        senderId: SUPERADMIN_ID,
        receiverId: receiver._id,
        message
      }),
    });

    const data = await res.json();
    if (data.success) {
      setMessage("");
      // Pusher will append the message in real-time
    }
  };

  return (
    <div className="chat-wrapper">
      {/* Sidebar */}
      <div className="chat-sidebar">
        {admin && (
          <div className="sidebar-header">
            <Image src={admin.profileUrl} alt="admin" width={40} height={40} className="radiusedImg" />
            <div className="sidebar-header-info">
              <h4>{admin.firstName} {admin.lastName}</h4>
              <p>Admin</p>
            </div>
          </div>
        )}

        <div className="chat-search">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Search Contact" />
        </div>

        <div className="recent-chats">
          <p className="recent-title">Recent Chats</p>
          <ul>
            {conversations.map(({ participant, conversationId: convId }) => (
              <li
                key={participant._id}
                className={receiver?._id === participant._id ? "activeMessage" : ""}
                onClick={() => handleSelectReceiver(participant, convId)}
              >
                <Image src={participant.profileUrl || "/assets/users/placeholder.png"} alt={participant.firstName} width={35} height={35} className="radiusedImg" />
                <div className="chat-info">
                  <h5>{participant.firstName} {participant.lastName}</h5>
                  <p>Click to chat</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Chat Window */}
      <div className="chat-main">
        {receiver ? (
          <>
            <div className="chat-top-bar">
              <div className="chat-top-user">
                <Image src={receiver.profileUrl || "/assets/users/placeholder.png"} alt="user" width={40} height={40} className="radiusedImg" />
                <div>
                  <h4>{receiver.firstName} {receiver.lastName}</h4>
                  <p>Active</p>
                </div>
              </div>
              <div className="chat-actions">
                <FiMessageCircle className="icon" />
              </div>
            </div>

            <div className="chat-messages">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`message-block ${msg.senderId._id === SUPERADMIN_ID ? "right" : "left"}`}
                >
                  {msg.senderId._id !== SUPERADMIN_ID && (
                    <div className="message-meta">
                      <Image src={msg.senderId.profileUrl || "/assets/users/placeholder.png"} alt="user" width={24} height={24} className="radiusedImg" />
                      <span className="meta-text">{msg.senderId.firstName}, {new Date(msg.createdAt).toLocaleTimeString()}</span>
                    </div>
                  )}
                  {msg.senderId._id === SUPERADMIN_ID && (
                    <div className="message-meta right-meta">
                      <span className="meta-text">{new Date(msg.createdAt).toLocaleTimeString()}</span>
                    </div>
                  )}
                  <div className={`message ${msg.senderId._id === SUPERADMIN_ID ? "right" : "left"}`}>
                    <p>{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="chat-input-bar">
              <input
                type="text"
                placeholder="Type a Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <div className="chat-input-icons">
                <FiPaperclip className="icon" />
                <FiSend className="icon send-icon" onClick={handleSend} />
              </div>
            </div>
          </>
        ) : (
          <div className="no-chat-selected">
            <p>Select a user to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesMainAdmin;
